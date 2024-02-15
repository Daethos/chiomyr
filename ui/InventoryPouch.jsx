// import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Inventory from "./Inventory";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { styles } from '../styles';
import DragList, {DragListRenderItemInfo} from 'react-native-draglist';
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";

export default function InventoryPouch({ ascean, setHighlighted, highlighted, dragAndDropInventory, setDragAndDropInventory }) {
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
        return (
            <ScaleDecorator>
            <TouchableOpacity onLongPress={drag} disabled={isActive}>
                <Inventory ascean={ascean} index={item._id} highlighted={highlighted} setHighlighted={setHighlighted} pouch={dragAndDropInventory} inventory={item} />
            </TouchableOpacity>
            </ScaleDecorator>
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
        <ScrollView style={styles.storyInventoryBag}>
            {/* <DraggableFlatList
                horizontal
                data={dragAndDropInventory}
                onDragEnd={({ data }) => setDragAndDropInventory(data)}
                keyExtractor={item => item._id}
                renderItem={renderItem}
            /> */}
                {/* {dragAndDropInventory.map((item, index) => {
            if (!item) return;
            return (
                <Inventory key={index} ascean={ascean} index={index} highlighted={highlighted} setHighlighted={setHighlighted} pouch={dragAndDropInventory} inventory={item} />
        )})} */}
        </ScrollView>
    );
};