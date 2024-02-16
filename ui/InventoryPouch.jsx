import Inventory from "./Inventory";
import { useEffect, useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from "react-native";
import { styles } from '../styles';
import EventEmitter from "../phaser/EventEmitter";

export default function InventoryPouch({ ascean, setHighlighted, highlighted, dragAndDropInventory, setDragAndDropInventory }) {
    const [scaleImage, setScaleImage] = useState({ id: '', scale: 48 });
    const [inventorySwap, setInventorySwap] = useState({ start: { id: null, index: -1 }, end: { id: null, index: -1 } });

    useEffect(() => {
        console.log(inventorySwap, 'InventorySwap')
        if (inventorySwap.start.id === null || inventorySwap.end.id === null) return;
        if (inventorySwap.start.id === inventorySwap.end.id) {
            setInventorySwap({ start: { id: null, index: -1 }, end: { id: null, index: -1 } });
            return;
        };
        handleInventoryDrop();
    }, [inventorySwap]);

    function handleInventoryDrop() {
        const { start, end } = inventorySwap;
        let copy = Array.from(dragAndDropInventory);
        const [reorderedItem] = copy.splice(start.index, 1);
        copy.splice(end.index, 0, reorderedItem);
        // For pure swap
        // copy[start.index] = drop;
        setDragAndDropInventory(copy);
        EventEmitter.emit('refresh-inventory', copy);
        setInventorySwap({ start: { id: null, index: -1 }, end: { id: null, index: -1 } });
        
    }

    function handleOnDrag(e, index) {
        e.dataTransfer.setData('index', index);
    };

    function handleDragOver(e) {
        e.preventDefault();
        // figure out which item is being dragged over
        const overIndex = e.target.getAttribute('index');
        console.log(overIndex, 'OverIndex in handleDragOver');
    };

    function handleOnDrop(e) {
        const index = e.dataTransfer.getData('index');
        console.log(index, 'Index in handleOnDrop');
        const copy = Array.from(dragAndDropInventory);
        const removed = copy.splice(index, 1);
        copy.splice(index, 0, removed[0]);
        setDragAndDropInventory(copy);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (destination.index === source.index) return;
        const itemIndex = dragAndDropInventory.findIndex((item) => item._id === draggableId);
        if (itemIndex !== -1) {
            const itemsCopy = Array.from(dragAndDropInventory);
            const [reorderedItem] = itemsCopy.splice(source.index, 1);
            itemsCopy.splice(destination.index, 0, reorderedItem);
            setDragAndDropInventory(itemsCopy);
        };
    }; 

    function keyExtractor(item) {
        return item?._id;
    };
    function renderItem({ item, drag, isActive }) {
        console.log(item, 'Item in renderItem')
        return (
            // <ScaleDecorator>
            <TouchableOpacity>
                <Inventory ascean={ascean} index={item._id} highlighted={highlighted} setHighlighted={setHighlighted} pouch={dragAndDropInventory} inventory={item} />
            </TouchableOpacity>
            // </ScaleDecorator>
        );
    };
    function onReordered(fromIndex, toIndex) {
        const copy = Array.from(dragAndDropInventory);
        const removed = copy.splice(fromIndex, 1);
        copy.splice(toIndex, 0, removed[0]);
        setDragAndDropInventory(copy);
    };

    const getDroppingStyle = {
        boxShadow: '0 0 0 0.5em purple',
        display: "inline-block",
        transform: 'scale(0.9)',
    };  

    return (
    // <DragDropContext onDragEnd={onDragEnd}> 
    //     <View style={styles.storyInventoryBag}>
    //         {dragAndDropInventory.map((item, index) => {
    //             if (!item) return;
    //             return (
    //                 <Droppable key={index} droppableId={item._id}>
    //                     {(provided, snapshot) => (
    //                     <View ref={provided.innerRef} {...provided.droppableProps} {...provided.dragHandleProps} style={snapshot.isDraggingOver ? getDroppingStyle : {}}>
    //                         <Inventory ascean={ascean} index={index} highlighted={highlighted} setHighlighted={setHighlighted} pouch={dragAndDropInventory} inventory={item} />
    //                         {provided.placeholder}
    //                     </View>
    //                     )}
    //                 </Droppable>
    //         )})} 
    //     </View>
    // </DragDropContext>
        <View style={styles.storyInventoryBag}> 
        {dragAndDropInventory.map((item, index) => {
            if (!item) return;
            return (
                <Inventory key={index} ascean={ascean} index={index} highlighted={highlighted} setHighlighted={setHighlighted} pouch={dragAndDropInventory} 
                inventory={item} scaleImage={scaleImage} setScaleImage={setScaleImage} inventorySwap={inventorySwap} setInventorySwap={setInventorySwap} />
        )})}
        </View>
    );
};