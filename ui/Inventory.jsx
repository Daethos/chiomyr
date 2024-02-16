import { useEffect, useState, useRef } from 'react';

import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import ItemModal from '../components/ItemModal';
// import useGameSounds from './Sounds';
// import { getAsceanAndInventoryFetch, getOnlyInventoryFetch, setCurrency } from '../../game/reducers/gameState';
import { checkPlayerTrait, checkTraits } from './PlayerTraits';
import { styles } from '../styles';
import { equipmentRemove, equipmentSwap, getInventory, populate } from '../assets/db/db';
import EventEmitter from '../phaser/EventEmitter';
// import { Draggable } from 'react-beautiful-dnd'
import { useDeviceOrientation } from '@react-native-community/hooks';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
  } from 'react-native-reanimated';
  import { Gesture, GestureDetector } from 'react-native-gesture-handler';
const GET_FORGE_COST = {
    Common: 1,
    Uncommon: 3,
    Rare: 12,
    Epic: 60,
};

const GET_NEXT_RARITY = {
    Common: "Uncommon",
    Uncommon: 'Rare',
    Rare: "Epic",
    Epic: "Legendary",
};

const AnimatedView = Animated.createAnimatedComponent(View);

const Inventory = ({ ascean, index, inventory, pouch, blacksmith = false, compare = false, setHighlighted, highlighted, scaleImage, setScaleImage, inventorySwap, setInventorySwap }) => {
    // const { playEquip, playUnequip } = useGameSounds(0.3);
    const orientation = useDeviceOrientation();
    const [inventoryModalShow, setInventoryModalShow] = useState(false);
    const [removeModalShow, setRemoveModalShow] = useState(false);
    const [forgeModalShow, setForgeModalShow] = useState(false);

    const [inventoryType, setInventoryType] = useState({});
    const [inventoryTypeTwo, setInventoryTypeTwo] = useState(null);
    const [inventoryTypeThree, setInventoryTypeThree] = useState(null);
    const [inventoryRingType, setInventoryRingType] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingContent, setLoadingContent] = useState('');
    const targetRef = useRef(null);
    const [weaponCompared, setWeaponCompared] = useState(null);
    const [ringCompared, setRingCompared] = useState(null);
    const [swap, setSwap] = useState({ start: -1, end: -1 });

    // const scaleImage = useSharedValue(48);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const contextX = useSharedValue(0);
    const contextY = useSharedValue(0);

    const onDoubleTap = Gesture.Tap().numberOfTaps(2)
        .onStart(() => {
            console.log('Tap!');
            // const copy = Array.from(pouch);

            // const removed = copy.splice(fromIndex, 1);
            // copy.splice(toIndex, 0, removed[0]);
            // setDragAndDropInventory(copy);
            // EventEmitter.emit('refresh-inventory', copy);
        })
        .onEnd(() => {
            if (scaleImage.scale !== 48 * 2) {
                console.log('Double Tap - IF')
                setScaleImage({id: inventory._id, scale: 96});
                setInventorySwap({
                    ...inventorySwap,
                    start: { id: inventory._id, index: index },
                })
                // scaleImage.value = scaleImage.value * 2;
            } else {
                console.log('Double Tap - ELSE')
                setScaleImage({id: inventory._id, scale: 48});
                setInventorySwap({
                    ...inventorySwap,
                    end: { id: inventory._id, index: index },
                });
                // scaleImage.value = scaleImage.value / 2;
            };
        });
    const onDrag = Gesture.Pan()
        .onBegin(() => {
            console.log('Begin Drag');
            contextX.value = translateX.value;
            contextY.value = translateY.value;
        })
        .onChange((event) => {
            console.log('Dragging');
            translateX.value = event.translationX + contextX.value;
            translateY.value = event.translationY + contextY.value;
        });
 
    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: translateX.value,
            }, {
                translateY: translateY.value,
            }],
        };
    }, []);
    
    const [editState, setEditState] = useState({
        weaponOne: ascean.weaponOne,
        weaponTwo: ascean.weaponTwo,
        weaponThree: ascean.weaponThree,
        helmet: ascean.helmet,
        chest: ascean.chest,
        legs: ascean.legs,
        amulet: ascean.amulet,
        ringOne: ascean.ringOne,
        ringTwo: ascean.ringTwo,
        trinket: ascean.trinket,
        shield: ascean.shield,
        newWeaponOne: '',
        newWeaponTwo: '',
        newWeaponThree: '',
        newHelmet: '',
        newChest: '',
        newLegs: '',
        newAmulet: '',
        newRingOne: '',
        newRingTwo: '',
        newTrinket: '',
        newShield: '',
        _id: ascean._id,
        inventoryType: '',
    });

    const GET_DRAGGING_STYLE = {
        margin: blacksmith ? '0 2% 10% 2%' : '0 0 0 0',
        border: getBorderStyle(inventory?.rarity),
        boxShadow: '0 0 0 0.25rem gold',
        display: "inline-block",
        cursor: 'grabbing',
        transform: 'scale(0.75)',
    }; 

    useEffect(() => {
        checkInventory();
        asceanLoaded();
        setEditState({
            ...editState,
            weaponOne: ascean.weaponOne,
            weaponTwo: ascean.weaponTwo,
            weaponThree: ascean.weaponThree,
            helmet: ascean.helmet,
            chest: ascean.chest,
            legs: ascean.legs,
            amulet: ascean.amulet,
            ringOne: ascean.ringOne,
            ringTwo: ascean.ringTwo,
            trinket: ascean.trinket,
            shield: ascean.shield,
            _id: ascean._id,
        })
    }, [ascean, inventory]);

    const asceanLoaded = async () => {
        try {
            setLoadingContent('');
            setRemoveModalShow(false);
            setIsLoading(false);
        } catch (err) {
            console.log(err.message, 'Trouble Loading Ascean');
        };
    };

    function canUpgrade(inventory, name, rarity) {
        const matches = inventory.filter(item => item?.name === name && item?.rarity === rarity);
        console.log(matches.length, "Matches Length")
        return matches.length >= 3;
    };

    function handleInventory(e) {
        let type = '';
        type = `new${inventoryType}`;
        console.log(inventoryType, '<- What is the type?');
        console.log(e.target.value, '<- What is the e?');
        setEditState({
            ...editState,
            [inventoryType]: e.target.value === ascean[inventoryType]._id ? ascean[inventoryType] : inventory,
            [type]: e.target.value,
            inventoryType: inventoryType,
        });
    };

    function handleInventoryW2(e) {
        console.log('weaponTwo <- What is the type?');
        console.log(e.target.value, '<- What is the e?');
        setEditState({
            ...editState,
            [inventoryTypeTwo]: e.target.value === ascean[inventoryTypeTwo]._id ? ascean.weaponTwo : inventory,
            newWeaponOne: '',
            newWeaponTwo: e.target.value,
            newWeaponThree: '',
            inventoryType: inventoryTypeTwo,
        });
    };

    function handleInventoryW3(e) {
        console.log('weaponThree <- What is the type?');
        console.log(e.target.value, '<- What is the e?');
        setEditState({
            ...editState,
            [inventoryTypeThree]: e.target.value === ascean[inventoryTypeThree]._id ? ascean.weaponThree : inventory,
            newWeaponOne: '',
            newWeaponTwo: '',
            newWeaponThree: e.target.value,
            inventoryType: inventoryTypeThree,    
        });
    };

    function handleInventoryR2(e) {
        console.log('RingTwo <- What is the type?');
        console.log(e.target.value, '<- What is the e?');
        setEditState({
            ...editState,
            [inventoryRingType]: e.target.value === ascean[inventoryRingType]._id ? ascean.ringTwo : inventory,
            newRingOne: '',
            newRingTwo: e.target.value,
            inventoryType: inventoryTypeTwo,
        });
    };
    
    async function checkInventory() {
        try {
            let type = '';
            let typeTwo = '';
            let typeThree = '';
            let ringType = '';
            if (inventory?.grip) {
                type = 'weaponOne';
                typeTwo = 'weaponTwo';
                typeThree = 'weaponThree';
                setInventoryType('weaponOne');
                setInventoryTypeTwo('weaponTwo');
                setInventoryTypeThree('weaponThree');
                setWeaponCompared('weaponOne');
            };
            if (inventory?.name.includes('Hood') || inventory?.name.includes('Helm') || inventory?.name.includes('Mask')) {
                type = 'helmet';
                setInventoryType('helmet');
            };
            if (inventory?.name.includes('Cuirass') || inventory?.name.includes('Robes') || inventory?.name.includes('Armor')) {
                setInventoryType('chest');
                type = 'chest';
            };
            if (inventory?.name.includes('Greaves') || inventory?.name.includes('Pants') || inventory?.name.includes('Legs')) {
                setInventoryType('legs');
                type = 'legs';
            };
            if (inventory?.name.includes('Amulet') || inventory?.name.includes('Necklace')) {
                setInventoryType('amulet');
                type = 'amulet';
            };
            if (inventory?.name.includes('Ring')) {
                setInventoryType('ringOne');
                setInventoryRingType('ringTwo');
                type = 'ringOne';
                ringType = 'ringTwo';
                setRingCompared('ringOne');
            };
            if (inventory?.name.includes('Trinket')) {
                setInventoryType('trinket');
                type = 'trinket';
            };
            if (inventory?.type.includes('Shield')) {
                setInventoryType('shield');
                type = 'shield';
            };
        } catch (err) {
            console.log(err.message, '<- This is the error in checkInventory');
        };
    };

    async function handleUpgradeItem() {
        if (inventory?.rarity === 'Common' && ascean?.currency?.gold < 1) {
            return;
        } else if (inventory?.rarity === 'Uncommon' && ascean?.currency?.gold < 3) {
            return;
        } else if (inventory?.rarity === 'Rare' && ascean?.currency?.gold < 12) {
            return;
        } else if (inventory?.rarity === 'Epic' && ascean?.currency?.gold < 60) {
            return;
        } else if (inventory?.rarity === 'Legendary' && ascean?.currency?.gold < 300) {
            return;
        } else if (inventory?.rarity === 'Mythic' && ascean?.currency?.gold < 1500) {
            return;
        } else if (inventory?.rarity === 'Divine' && ascean?.currency?.gold < 7500) {
            return;
        } else if (inventory?.rarity === 'Ascended' && ascean?.currency?.gold < 37500) {
            return;
        } else if (inventory?.rarity === 'Godly' && ascean?.currency?.gold < 225000) {
            return;
        };
        try {
            // playUnequip();
            setIsLoading(true);
            setLoadingContent(`Forging A Greater ${inventory?.name}`);
            const matches = pouch.filter((item) => item.name === inventory?.name && item?.rarity === inventory?.rarity);
            const data = {
                asceanID: ascean._id,
                upgradeID: inventory._id,
                upgradeName: inventory.name,
                upgradeType: inventory.itemType,
                currentRarity: inventory.rarity,
                inventoryType: inventoryType,
                upgradeMatches: matches,
            };
            console.log(data, "Upgrading Item?")

            // const res = await eqpAPI.upgradeEquipment(data);

            setInventoryModalShow(false);
            setForgeModalShow(false);
            setLoadingContent('');
            setIsLoading(false);

            EventEmitter.emit('update-inventory-request');
            // dispatch(getOnlyInventoryFetch(ascean._id));
            // dispatch(setCurrency(res.currency));
            
            // playEquip();
        } catch (err) {
            console.log(err.message, '<- Error upgrading item');
        };
    };

    async function handleRemoveItem() {
        try {
            setIsLoading(true);
            setLoadingContent(`Removing And Destroying ${inventory?.name}`); 
            const data = {
                id: ascean._id,
                inventory: inventory,
            };
            await equipmentRemove(data);
            // await asceanAPI.removeItem(data);
            setInventoryModalShow(false);
            setRemoveModalShow(false);
            setLoadingContent('');
            setIsLoading(false);
            // playUnequip();
            EventEmitter.emit('update-inventory-request');
            // dispatch(getOnlyInventoryFetch(ascean._id));
            
        } catch (err) {
            console.log(err.message, '<- This is the error in handleRemoveItem');
        };
    };

    async function handleEquipmentSwap() {
        try {
            setIsLoading(true);
            setLoadingContent(`Equipping ${inventory?.name} of ${inventory?.rarity} quality.`);
            // await asceanAPI.equipmentSwap();
            const res = await equipmentSwap(inventory._id, editState, ascean._id);
            console.log(res, '<- This is the response from handleEquipmentSwap');
            setInventoryModalShow(false);
            setIsLoading(false);
            setLoadingContent('');
            // const inventory = await getInventory(pop._id);
            // console.log(inventory, 'Inventory')
            EventEmitter.emit('update-full-request');
            // playEquip();
            
            // dispatch(getAsceanAndInventoryFetch(ascean._id));
        } catch (err) {
            console.log(err, '<- This is the error in Swapping Equipment');
        };
    };

    const getRarityColor = (rarity) => {
        switch (rarity) {
            case 'Common':
                return 'white';
            case 'Uncommon':
                return 'green';
            case 'Rare':
                return 'blue';
            case 'Epic':
                return 'purple';
            case 'Legendary':
                return 'darkorange';
            default:
                return 'grey';
        };
    };

    const getRarity = { 
        color: getRarityColor(inventory?.rarity),
        textShadow: "1px 1px 1px black"
    };

    const getHigherRarityColor = (rarity) => {
        switch (rarity) {
            case 'Common':
                return '3px solid green';
            case 'Uncommon':
                return '3px solid blue';
            case 'Rare':
                return '3px solid purple';
            case 'Epic':
                return '3px solid darkorange';
            default:
                return '3px solid white';
        };
    };

    function setModalShow() {
        console.log(inventory?.name, show, 'Setting Modal Show');
        // setInventoryModalShow(show);
        // setInventoryType(item.itemType);
    };

    function canEquip(level, rarity) {
        switch (rarity) {
            case 'Common':
                return true;
            case 'Uncommon':
                if (level > 3) return true;
                return false;
            case 'Rare':
                if (level > 5) return true;
                return false;
            case 'Epic':
                if (level > 11) return true;
                return false;
            case 'Legendary':
                if (level > 19) return true;
                return false;
            default:
                return false;
        };
    };

    function equipLevel(rarity) {
        switch (rarity) {
            case 'Common':
                return 0;
            case 'Uncommon':
                return 4;
            case 'Rare':
                return 6;
            case 'Epic':
                return 12;
            case 'Legendary':
                return 20;
            default:
                return 0;
        };
    };

    function textColor(val1, val2) {
        if (val1 === undefined) val1 = 0;
        if (val2 === undefined) val2 = 0;
        if (val1 > val2) {
            return 'green';
        } else if (val1 < val2) {
            return 'red';
        } else {
            return '#fdf6d8';
        };
    };

    function getBorderStyle(rarity) {
        switch (rarity) {
            case 'Common':
                return `${4}px solid white`;
            case 'Uncommon':
                return `${4}px solid green`;
            case 'Rare':
                return `${4}px solid blue`;
            case 'Epic':
                return `${4}px solid purple`;
            case 'Legendary':
                return `${4}px solid orange`;
            default:
                return `${4}px solid grey`;
        };
    };


    const getBackgroundStyle = () => {
        if (scaleImage.scale > 48 && scaleImage.id === inventory?._id) {
            return 'gold';
        } else if (highlighted && highlighted?.item && highlighted?.item._id === inventory?._id) {
            return '#820303';
        } else {
            return 'transparent';
        };
    };

    const getItemStyle = (rarity) => {
        return {
            background: getBackgroundStyle(),
            border: getBorderStyle(rarity),
            display: "inline-flex",

        };
    };

    const getCurrentItemStyle = {
        // margin: blacksmith ? '0 2% 0 2%' : '0 0 0 0',
        background: 'transparent',
        border: getBorderStyle(inventory?.rarity),
        display: "inline-block"
    };

    const getNewItemStyle ={
        margin: blacksmith ? '0 2% 0 2%' : '0 0 0 0',
        background: "transparent",
        border: getHigherRarityColor(inventory?.rarity),
        display: "inline-block"
    };

    const createTable = (inventoryType) => { 
        return (
            <table style={{ fontWeight: 500 }}>
            <tbody>
                <tr style={{ fontSize: "1em", color: 'gold' }}>
                    <td>
                    {inventory?.name} <img src={inventory?.imgUrl} />
                    </td>
                    <td>
                    {ascean[inventoryType]?.name} <img src={ascean[inventoryType]?.imgUrl} />
                    </td>
                </tr>
                <tr>
                    <td style={{ color: 'goldenrod' }}>
                    { inventory?.grip && inventory?.type ?
                        <>
                        {inventory?.type} [{inventory?.grip}] {'\n'}
                        {inventory?.attackType} [{inventory?.damageType?.[0]}{inventory?.damageType?.[1] ? ' / ' + inventory?.damageType[1] : '' }{inventory?.damageType?.[2] ? ' / ' + inventory?.damageType[2] : '' }]  {'\n'}
                        </>
                    : inventory?.type ? 
                        <>{inventory?.type} {'\n'}</> 
                    : null }  
                    </td>
                    <td style={{ color: 'goldenrod' }}>
                    { ascean[inventoryType]?.grip && ascean[inventoryType]?.type ?
                        <>
                        {ascean[inventoryType]?.type} [{ascean[inventoryType]?.grip}] {'\n'}
                        {ascean[inventoryType]?.attackType} [{ascean[inventoryType]?.damageType?.[0]}{ascean[inventoryType]?.damageType?.[1] ? ' / ' + ascean[inventoryType]?.damageType[1] : null }{ascean[inventoryType]?.damageType?.[2] ? ' / ' + ascean[inventoryType]?.damageType[2] : null }]  {'\n'}
                        </>
                    : ascean[inventoryType]?.type ? 
                        <>{ascean[inventoryType]?.type} {'\n'}</> 
                    : null }
                    </td>
                </tr>
                <tr style={{ color: '#fdf6d8' }}>
                    <td style={{ color: textColor((inventory?.constitution + inventory?.strength + inventory?.agility + inventory?.achre + inventory?.caeren + inventory?.kyosir), 
                        (ascean[inventoryType]?.constitution + ascean[inventoryType]?.strength + ascean[inventoryType]?.agility + ascean[inventoryType]?.achre + ascean[inventoryType]?.caeren + ascean[inventoryType]?.kyosir)) }}>
                        {inventory?.constitution > 0 ? 'Con: +' + inventory?.constitution + ' ' : (null)}
                        {inventory?.strength > 0 ? 'Str: +' + inventory?.strength + ' ' : (null)}
                        {inventory?.agility > 0 ? 'Agi: +' + inventory?.agility + ' ' : (null)}
                        {inventory?.achre > 0 ? 'Ach: +' + inventory?.achre + ' ' : (null)}
                        {inventory?.caeren > 0 ? 'Caer: +' + inventory?.caeren + ' ' : (null)}
                        {inventory?.kyosir > 0 ? 'Kyo: +' + inventory?.kyosir + ' ' : (null)}
                    </td>

                    <td style={{ color: textColor((ascean[inventoryType]?.constitution + ascean[inventoryType]?.strength + ascean[inventoryType]?.agility + ascean[inventoryType]?.achre + ascean[inventoryType]?.caeren + ascean[inventoryType]?.kyosir), 
                        (inventory?.constitution + inventory?.strength + inventory?.agility + inventory?.achre + inventory?.caeren + inventory?.kyosir)) }}>
                        {ascean[inventoryType]?.constitution > 0 ? 'Con: +' + ascean[inventoryType]?.constitution + ' ' : (null)}
                        {ascean[inventoryType]?.strength > 0 ? 'Str: +' + ascean[inventoryType]?.strength + ' ' : (null)}
                        {ascean[inventoryType]?.agility > 0 ? 'Agi: +' + ascean[inventoryType]?.agility + ' ' : (null)}
                        {ascean[inventoryType]?.achre > 0 ? 'Ach: +' + ascean[inventoryType]?.achre + ' ' : (null)}
                        {ascean[inventoryType]?.caeren > 0 ? 'Caer: +' + ascean[inventoryType]?.caeren + ' ' : (null)}
                        {ascean[inventoryType]?.kyosir > 0 ? 'Kyo: +' + ascean[inventoryType]?.kyosir + ' ' : (null)}
                    </td>
                </tr>

                { (inventory?.physicalDamage && inventory?.grip) || (inventory?.magicalDamage && inventory?.grip) ? (
                <tr style={{ color: '#fdf6d8' }}>
                    <td style={{ color: textColor((inventory?.physicalDamage + inventory?.magicalDamage), (ascean[inventoryType]?.physicalDamage + ascean[inventoryType]?.magicalDamage)) }}>
                    Damage: {inventory?.physicalDamage} Phys | {inventory?.magicalDamage} Magi
                    </td>
                    <td style={{ color: textColor((ascean[inventoryType]?.physicalDamage + ascean[inventoryType]?.magicalDamage), (inventory?.physicalDamage + inventory?.magicalDamage)) }}>
                    Damage: {ascean[inventoryType]?.physicalDamage} Phys | {ascean[inventoryType]?.magicalDamage} Magi
                    </td>
                </tr>
                ) : ( null ) }
                { inventory?.physicalResistance > 0 || ascean[inventoryType]?.physicalResistance > 0 || inventory?.magicalResistance > 0 || ascean[inventoryType]?.magicalResistance ? 
                <tr>
                    <td style={{ color: textColor((inventory?.physicalResistance + inventory?.magicalResistance), (ascean[inventoryType]?.physicalResistance + ascean[inventoryType]?.magicalResistance)) }}>
                    { inventory?.physicalResistance || inventory?.magicalResistance ?
                        <>
                        Defense: {inventory?.physicalResistance} Phys | {inventory?.magicalResistance} Magi
                        </>
                    : 'Defense: 0 Phys | 0 Magi' }
                    </td>
                    <td style={{ color: textColor((ascean[inventoryType]?.physicalResistance + ascean[inventoryType]?.magicalResistance), (inventory?.physicalResistance + inventory?.magicalResistance)) }}>
                    { ascean[inventoryType]?.physicalResistance || ascean[inventoryType]?.magicalResistance ?
                        <>
                        Defense: {ascean[inventoryType]?.physicalResistance} Phys | {ascean[inventoryType]?.magicalResistance} Magi 
                        </>
                    : 'Defense: 0 Phys | 0 Magi' }
                    </td>
                </tr>
                : ( null ) }
                {inventory?.magicalPenetration > 0 || ascean[inventoryType]?.magicalPenetration > 0 || inventory?.physicalPenetration > 0 || ascean[inventoryType]?.physicalPenetration > 0 ? (
                <tr>
                    <td style={{ color: textColor((inventory?.physicalPenetration + inventory?.magicalPenetration), (ascean[inventoryType]?.physicalPenetration + ascean[inventoryType]?.magicalPenetration)) }}>
                    { inventory?.physicalPenetration || inventory?.magicalPenetration ? (
                        <>
                        Penetration: {inventory?.physicalPenetration} Phys | {inventory?.magicalPenetration} Magi 
                        </>
                    ) : 'Penetration: 0 Phys | 0 Magi' }
                    </td>
                    <td style={{ color: textColor((ascean[inventoryType]?.physicalPenetration + ascean[inventoryType]?.magicalPenetration), (inventory?.physicalPenetration + inventory?.magicalPenetration)) }}>
                    { ascean[inventoryType]?.physicalPenetration || ascean[inventoryType]?.magicalPenetration ? (
                        <>
                        Penetration: {ascean[inventoryType]?.physicalPenetration} Phys | {ascean[inventoryType]?.magicalPenetration} Magi
                        </>
                    ) : 'Penetration: 0 Phys | 0 Magi' }
                    </td>
                </tr>
                ) : ( null ) }

                <tr>
                    <td style={{ color: textColor(inventory?.criticalChance, ascean[inventoryType]?.criticalChance) }}>
                    Crit Chance: {inventory?.criticalChance}%
                    </td>
                    <td style={{ color: textColor(ascean[inventoryType]?.criticalChance, inventory?.criticalChance) }}>
                    Crit Chance: {ascean[inventoryType]?.criticalChance}%
                    </td>
                </tr>

                <tr>
                    <td style={{ color: textColor(inventory?.criticalDamage, ascean[inventoryType]?.criticalDamage) }}>
                    Crit Damage: {inventory?.criticalDamage}x
                    </td>
                    <td style={{ color: textColor(ascean[inventoryType]?.criticalDamage, inventory?.criticalDamage) }}>
                    Crit Damage: {ascean[inventoryType]?.criticalDamage}x
                    </td>
                </tr>

                {/* {!story && (
                <tr>
                    <td style={{ color: textColor(ascean[inventoryType]?.dodge, inventory?.dodge) }}>
                    Dodge Timer: {inventory?.dodge}s
                    </td>
                    <td style={{ color: textColor(inventory?.dodge, ascean[inventoryType]?.dodge) }}>
                    Dodge Timer: {ascean[inventoryType]?.dodge}s
                    </td>
                </tr>)} */}

                <tr>
                    <td style={{ color: textColor(inventory?.roll, ascean[inventoryType]?.roll) }}>
                    Roll Chance: {inventory?.roll}%
                    </td>
                    <td style={{ color: textColor(ascean[inventoryType]?.roll, inventory?.roll) }}>
                    Roll Chance: {ascean[inventoryType]?.roll}%
                    </td>
                </tr>
                {inventory?.influences?.length > 0 || ascean[inventoryType]?.influences?.length > 0 ?
                <tr style={{ color: '#fdf6d8' }}>
                    <td>
                    { inventory?.influences?.length > 0 ? 
                        <>
                        Influence: {inventory?.influences} <br />
                        </>
                    : null }
                    </td>
                    <td>
                    { ascean[inventoryType]?.influences?.length > 0 ? 
                        <>
                        Influence: {ascean[inventoryType]?.influences} <br />
                        </>
                    : null }
                    </td>
                </tr>
                : null }
                <tr style={{ fontSize: "1em" }}>
                    <td style={getRarity}>{inventory?.rarity}</td>
                    <td style={{ color: getRarityColor(ascean[inventoryType]?.rarity)}}>
                        {ascean[inventoryType]?.rarity}
                    </td>
                </tr>
                </tbody>
            </table>
        );
    };

    function startSwap(e) {
        e.preventDefault();
        console.log(index, 'Starting Swap Index');
        setSwap({ ...swap, start: index });
    };

    function endSwap(e) {
        e.preventDefault();
        console.log(index, 'Ending Swap Index');
        setSwap({ ...swap, end: index });
    };

    // useEffect(() => {
    //     console.log(swap, 'Swap');
    //     if (swap.start !== -1 && swap.end !== -1 && swap.start !== swap.end) {
    //         console.log(swap, 'Swapping');

    //         let newInventory = [ ...pouch ];
    //         const temp = newInventory[swap.start];
    //         newInventory[swap.start] = newInventory[swap.end];
    //         newInventory[swap.end] = temp;

    //         EventEmitter.emit('refresh-inventory', newInventory);

    //         setSwap({ start: -1, end: -1 });
    //     };
    // }, [swap]);

    return (
        <>
        {/* <Modal show={forgeModalShow} onHide={() => setForgeModalShow(false)} centered id='modal-weapon' style={{ zIndex: 1, top: '-25%' }}>
            <Text style={{ color: "red", fontSize: "18px" }}>
                Do You Wish To Collapse Three {inventory?.name} into one of {GET_NEXT_RARITY[inventory?.rarity]} Quality for {GET_FORGE_COST[inventory?.rarity]} Gold?
            </Text>
            <Text>
                <TouchableOpacity style={{ color: 'gold', fontWeight: 600, fontSize: "24px" }} onPress={() => handleUpgradeItem()}>{GET_FORGE_COST[inventory?.rarity]} Gold Forge 
                </TouchableOpacity>    
                <Text style={{ color: "gold", fontSize: "24px", fontWeight: 600 }}>
                (3) <img src={inventory?.imgUrl} alt={inventory?.name} style={getCurrentItemStyle} /> {'=>'} <img src={inventory?.imgUrl} alt={inventory?.name} style={getNewItemStyle} />
                </Text>
            </Text>
        </Modal> */}
        { removeModalShow && (
            <Modal animationType="fade" transparent={true}  visible={removeModalShow} onRequestClose={() => setRemoveModalShow(false)} style={[{ zIndex: 1 }, styles.center]}>
                <View style={[styles.border, styles.popover, { maxHeight: orientation === 'landscape' ? '60%' : '50%', maxWidth: orientation === 'landscape' ? '35%' : '70%' }]}>
                <TouchableOpacity style={[styles.stdInput, styles.corner, { color: "fdf6d8" }]} onPress={() => setRemoveModalShow(false)}>
                    <Text>X</Text>
                </TouchableOpacity>
                <View style={[{ height: '100%', marginTop: 10 }, styles.center, styles.wrap]}>
                    <Text style={[styles.gold, styles.center]}>
                        Do You Wish To Remove and Destroy Your {inventory?.name}? 
                        {'\n'}{'\n'}
                        <Text><img src={inventory?.imgUrl} alt={inventory?.name} /></Text>
                        {'\n'}{'\n'}
                    </Text>
                    <Text>
                        <TouchableOpacity style={[styles.center, styles.wrap]} onPress={() => handleRemoveItem()}>
                            <Text style={{ color: 'red', fontWeight: 600 }}>Yes, I Wish To Remove and Destroy {inventory?.name}</Text>
                        </TouchableOpacity>    
                    </Text>
                </View>   
                </View>
            </Modal> 
        ) }

        { compare ? (
            <>
            { inventoryType === 'weaponOne' ? (
                <Text style={[styles.center, { marginTop: 3 }]}>
                <select value={weaponCompared} onChange={(e) => setWeaponCompared(e.target.value)} style={{ margin: 5 }}>
                    <option value={inventoryType}>{ascean[inventoryType].name}</option>
                    <option value={inventoryTypeTwo}>{ascean[inventoryTypeTwo].name}</option>
                    <option value={inventoryTypeThree}>{ascean[inventoryTypeThree].name}</option>
                </select>{'\n'}
                { createTable(weaponCompared) }
                </Text>
            ) : inventoryType === 'ringOne' ? (
                <Text style={[styles.center, { marginTop: 3 }]}>
                <select value={ringCompared} onChange={(e) => setRingCompared(e.target.value)} style={{ margin: 5 }}>
                    <option value={inventoryType}>{ascean[inventoryType].name}</option>
                    <option value={inventoryRingType}>{ascean[inventoryRingType].name}</option>
                </select>
                { createTable(ringCompared) }
                </Text>
            ) : <Text style={[styles.center, { marginTop: 3 }]}>{createTable(inventoryType)}</Text> } 
                <View style={{ width: "100%", textAlign: "center", marginTop: 3 }}>
                { canEquip(ascean?.level, inventory?.rarity) ? (
                    <Text style={styles.center}>
                    <select style={{ margin: 5 }} value={
                        inventoryType === 'weaponOne' ? editState.weaponOne?._id : inventoryType === 'shield' ? editState.shield._id : inventoryType === 'helmet' ? 
                        editState.helmet._id : inventoryType === 'chest' ? editState.chest._id : inventoryType === 'legs' ? 
                        editState.legs._id : inventoryType === 'amulet' ? editState.amulet._id : inventoryType === 'ringOne' ? 
                        editState.ringOne._id : inventoryType === 'trinket' ? editState.trinket._id : ''} onChange={handleInventory}>
                            <option value={(editState)[inventoryType]?._id}>{(editState)[inventoryType]?.name} [Selected]</option>
                            <option value={ascean[inventoryType]?._id}>{ascean[inventoryType]?.name} [Equipped]</option>
                            <option value={inventory?._id}>{inventory?.name} [Viewing]</option>
                    </select>
                    { inventory?.grip && inventory?.type ? (
                        <Text style={styles.center}>{'\n'}
                        <select value={editState.weaponTwo._id} onChange={handleInventoryW2} style={{ margin: 5 }}>
                            <option value={(editState)[inventoryTypeTwo]?._id}>{(editState)[inventoryTypeTwo]?.name} [Selected]</option>
                            <option value={ascean[inventoryTypeTwo]?._id}>{ascean[inventoryTypeTwo]?.name} [Equipped]</option>
                            <option value={inventory?._id}>{inventory?.name} [Viewing]</option>
                        </select>{'\n'}
                        <select value={editState.weaponThree._id} onChange={handleInventoryW3} style={{ margin: 5 }}>
                            <option value={(editState)[inventoryTypeThree]?._id}>{(editState)[inventoryTypeThree]?.name} [Selected]</option>
                            <option value={ascean[inventoryTypeThree]?._id}>{ascean[inventoryTypeThree]?.name} [Equipped]</option>
                            <option value={inventory?._id}>{inventory?.name} [Viewing]</option>
                        </select>
                        </Text>
                    ) : ( null ) }
                    { inventoryType === 'ringOne' ? (
                        <Text style={styles.center}> {'\n'}
                        <select value={editState.ringTwo._id} onChange={handleInventoryR2} style={{ margin: 5 }}>
                            <option value={(editState)[inventoryRingType]?._id}>{(editState)[inventoryRingType]?.name} [Selected]</option>
                            <option value={ascean[inventoryRingType]?._id}>{ascean[inventoryRingType]?.name} [Equipped]</option>
                            <option value={inventory?._id}>{inventory?.name} [Viewing]</option>
                        </select>
                        </Text>
                    ) : ( null ) }
                    {'\n'}
                    </Text>
                ) : ( 
                    <Text style={{ color: "gold", fontSize: "1em" }}>
                        Unforuntaely, {inventory?.name} requires you to be level {equipLevel(inventory?.rarity)} to equip.
                        {'\n'}{'\n'}    
                    </Text>
                ) }
                { canEquip(ascean?.level, inventory?.rarity) ? (
                    <> 
                        <TouchableOpacity style={{ marginTop: 20, marginLeft: 10, marginBottom: 5 }} onPress={() => setRemoveModalShow(true)}>
                            <Text style={{ color: 'red' }}>Remove</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: '-7.5%', marginLeft: 200, marginBottom: 5 }} onPress={() => handleEquipmentSwap()}>
                            <Text style={{ color: 'green' }}>Equip</Text>
                        </TouchableOpacity> 
                    </>
                ) : ( 
                    <TouchableOpacity style={styles.center} onPress={() => setRemoveModalShow(true)}>
                        <Text style={{ color: 'red' }}>Remove</Text>
                    </TouchableOpacity>
                ) }
                </View>
            </>
        ) : ( 
                <>
                { setHighlighted ? (
                <GestureDetector key={index} gesture={Gesture.Race(onDrag, onDoubleTap)}>

                    <Pressable style={[styles.storyInventory, getItemStyle(inventory?.rarity), { transform: [{ scale: scaleImage.scale > 48 && scaleImage.id === inventory?._id && highlighted && highlighted?.item && highlighted?.item._id === inventory?._id ? 1.15 : 1 }] }, containerStyle] }
                        // onPressOut={(e) => endSwap(e)} onLongPress={(e) => startSwap(e)} 
                        onPress={() => setHighlighted({ item: inventory, comparing: true })}
                    >
                        <img src={inventory?.imgUrl} alt={inventory?.name} />
                    </Pressable>
                </GestureDetector>
                ) : (
                    <Pressable style={[styles.storyInventory, getItemStyle(inventory?.rarity)]} 
                    onPress={() => setHighlighted({ item: inventory, comparing: true })}>
                        <img src={inventory?.imgUrl} alt={inventory?.name} />
                    </Pressable>
                )}
                </>
            // <TouchableOpacity style={[getItemStyle(inventory?.rarity)]} 
            //     onPress={() => setHighlighted({ item: inventory, comparing: true })}>
            //     <img src={inventory?.imgUrl} alt={inventory?.name} />
            // </TouchableOpacity>
            // <Draggable draggableId={inventory?._id} index={index} key={inventory?._id}>
            //     {(provided, snapshot) => (
            //             <View ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            //         { setHighlighted ? (
            //             <View style={snapshot.isDragging ? GET_DRAGGING_STYLE : [styles.storyInventory, getItemStyle(inventory?.rarity)]} 
            //             onPress={() => setHighlighted({ item: inventory, comparing: true })}>
            //                 <img src={inventory?.imgUrl} alt={inventory?.name} />
            //             </View>
            //         ) : (
            //             <TouchableOpacity style={snapshot.isDragging ? GET_DRAGGING_STYLE : [styles.storyInventory, getItemStyle(inventory?.rarity)]} 
            //             onPress={() => setHighlighted({ item: inventory, comparing: true })}>
            //                 <img src={inventory?.imgUrl} alt={inventory?.name} />
            //             </TouchableOpacity>
            //         )}
            //         </View>
            //     )}
            // </Draggable>
        ) }
        {/*  TODO:FIXME: Make it so the ItemModal pops up when you click on an item  */}
        {/* { blacksmith ? ( 
            <TouchableOpacity variant='outline' className='blacksmith-forge' onPress={() => setForgeModalShow(true)}>Forge</TouchableOpacity>
        ) : ( '' ) } */}
        {/* <Overlay target={targetRef} show={isLoading}>
            <div className='d-flex align-items-center justify-content-center' style={{ position: 'fixed', top: '-25%', left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.65)', zIndex: 99999 }}>
                <h1 style={{ color: 'gold', fontVariant: 'small-caps', textAlign: 'center', fontSize: 36 + 'px', textShadow: '1px 1px 1px goldenrod', fontWeight: 600 }}>
                    {loadingContent}
                </h1>
            </div>
        </Overlay> */}
        </>
    );
};

export default Inventory;