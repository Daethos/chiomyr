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
        // copy[start.index] = drop; // ForPure Swap
        setDragAndDropInventory(copy);
        EventEmitter.emit('refresh-inventory', copy);
        setInventorySwap({ start: { id: null, index: -1 }, end: { id: null, index: -1 } });
        
    };

    const getDroppingStyle = {
        boxShadow: '0 0 0 0.5em purple',
        display: "inline-block",
        transform: 'scale(0.9)',
    };  

    return ( 
        <View style={styles.storyInventoryBag}> {dragAndDropInventory.map((item, index) => {
            if (!item) return;
            return (
                <Inventory key={index} ascean={ascean} index={index} highlighted={highlighted} setHighlighted={setHighlighted} 
                    pouch={dragAndDropInventory} inventory={item} scaleImage={scaleImage} setScaleImage={setScaleImage} 
                    inventorySwap={inventorySwap} setInventorySwap={setInventorySwap} />
        )})} </View>
    );
};