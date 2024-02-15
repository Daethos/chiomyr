import { useEffect, useState, useRef } from 'react';

import { Modal, Text, TouchableOpacity, View } from 'react-native';
import ItemModal from '../components/ItemModal';
// import useGameSounds from './Sounds';
// import { getAsceanAndInventoryFetch, getOnlyInventoryFetch, setCurrency } from '../../game/reducers/gameState';
import { checkPlayerTrait, checkTraits } from './PlayerTraits';
import { styles } from '../styles';
// import { Draggable } from 'react-beautiful-dnd'

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

const Inventory = ({ ascean, index, inventory, pouch, blacksmith = false, compare = false, setHighlighted, highlighted }) => {
    // const { playEquip, playUnequip } = useGameSounds(0.3);
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
    const [ringCompared, setRingCompared] = useState(null)
    
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

    function handleInventory(equipment) {
        let type = '';
        type = `new_${inventoryType}`;
        console.log(type, '<- What is the type?');
        console.log(equipment.target.value, '<- What is the equipment?');
        setEditState({
            ...editState,
            [inventoryType]: equipment.target.value === ascean[inventoryType]._id ? ascean[inventoryType] : inventory,
            [type]: equipment.target.value,
        });
    };

    function handleInventoryW2(equipment) {
        setEditState({
            ...editState,
            [inventoryTypeTwo]: equipment.target.value === ascean[inventoryTypeTwo]._id ? ascean.weaponTwo : inventory,
            newWeaponOne: '',
            newWeaponTwo: equipment.target.value,
            newWeaponThree: '',
        });
    };

    function handleInventoryW3(equipment) {
        setEditState({
            ...editState,
            [inventoryTypeThree]: equipment.target.value === ascean[inventoryTypeThree]._id ? ascean.weaponThree : inventory,
            newWeaponOne: '',
            newWeaponTwo: '',
            newWeaponThree: equipment.target.value,
        });
    };

    function handleInventoryR2(equipment) {
        setEditState({
            ...editState,
            [inventoryRingType]: equipment.target.value === ascean[inventoryRingType]._id ? ascean.ringTwo : inventory,
            newRingOne: '',
            newRingTwo: equipment.target.value,
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
            // await asceanAPI.removeItem(data);
            setInventoryModalShow(false);
            setRemoveModalShow(false);
            setLoadingContent('');
            setIsLoading(false);
            // playUnequip();
            
            // dispatch(getOnlyInventoryFetch(ascean._id));
            
        } catch (err) {
            console.log(err.message, '<- This is the error in handleRemoveItem');
        };
    };

    async function handleEquipmentSwap(newAscean) {
        try {
            setIsLoading(true);
            setLoadingContent(`Equipping ${inventory?.name} of ${inventory?.rarity} quality.`);

            // await asceanAPI.equipmentSwap(newAscean);

            setEditState({
                ...editState,
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
            });
            setInventoryModalShow(false);
            setIsLoading(false);
            setLoadingContent('');
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
        
    const inventoryPopover = (
        <Modal className="text-info">
            <Text id="popover-header-inv">{inventory?.name} <Text id="popover-image"><img src={inventory?.imgUrl} /></Text></Text>
            <Text id="popover-body-inv">
                { inventory?.grip && inventory?.type ? (
                    <>
                    {inventory?.type} [{inventory?.grip}] {'\n'}
                    {inventory?.attack_type} [{inventory?.damage_type?.[0]}{inventory?.damage_type?.[1] ? ' / ' + inventory?.damage_type[1] : ( '' ) }{inventory?.damage_type?.[2] ? ' / ' + inventory?.damage_type[2] : ( '' ) }]  {'\n'}
                    </>
                ) : inventory?.type ? ( <>{inventory?.type} {'\n'}</> ) : ( '' ) }
                {inventory?.constitution > 0 ? 'Con: +' + inventory?.constitution + ' ' : ''}
                {inventory?.strength > 0 ? 'Str: +' + inventory?.strength + ' ' : ''}
                {inventory?.agility > 0 ? 'Agi: +' + inventory?.agility + ' ' : ''}
                {inventory?.achre > 0 ? 'Ach: +' + inventory?.achre + ' ' : ''}
                {inventory?.caeren > 0 ? 'Caer: +' + inventory?.caeren + ' ' : ''}
                {inventory?.kyosir > 0 ? 'Kyo: +' + inventory?.kyosir + ' ' : ''}{'\n'}
                Damage: {inventory?.physical_damage} Phys | {inventory?.magical_damage} Magi {'\n'}
                { inventory?.physical_resistance || inventory?.magical_resistance ? ( <>
                    Defense: {inventory?.physical_resistance} Phys | {inventory?.magical_resistance} Magi {'\n'}
                </> ) : ( '' ) }
                { inventory?.physical_penetration || inventory?.magical_penetration ? ( <>
                    Penetration: {inventory?.physical_penetration} Phys | {inventory?.magical_penetration} Magi {'\n'}
                </> ) : ( '' ) }
                Critical Chance: {inventory?.critical_chance}% {'\n'}
                Critical Damage: {inventory?.critical_damage}x {'\n'}
                Dodge Timer: {inventory?.dodge}s {'\n'}
                Roll Chance: {inventory?.roll}% {'\n'}
                { inventory?.influences?.length > 0 ? ( <>
                    Influence: {inventory?.influences} {'\n'}
                </> ) : ( '' ) }
                {'\n'}
                <Text style={{ color: getRarityColor(inventory?.rarity), fontSize: "16px", float: 'left', textShadow: "0.5px 0.5px 0.5px black", fontWeight: 700 }}>
                    {inventory?.rarity}
                </Text>
                {/* { blacksmith ? ( '' ) : (
                    <TouchableOpacity variant='outline' style={{ float: 'right', color: 'blue', marginTop: '-3%', marginRight: -8 + '%', textShadow: "0.5px 0.5px 0.5px black", fontWeight: 700 }} onPress={() => setInventoryModalShow(!inventoryModalShow)}>Inspect</TouchableOpacity>
                ) } */}
                {'\n'}
            </Text>
        </Modal>
    );

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
        if (highlighted && highlighted?.item && highlighted?.item._id === inventory?._id) {
            return '#820303';
        } else {
            return 'transparent';
        };
    };

    const getItemStyle = (rarity) => {
        return {
            // margin: blacksmith ? '0 2% 10% 2%' : '5% 0 0 15%',
            background: getBackgroundStyle(),
            border: getBorderStyle(rarity),
            display: "inline-flex",
            
        };
    };

    const getCurrentItemStyle = {
        margin: blacksmith ? '0 2% 0 2%' : '0 0 0 0',
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
            <table>
            <tbody>
                <tr style={{ fontSize: "16px", color: 'gold' }}>
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
                        {inventory?.type} [{inventory?.grip}] <br />
                        {inventory?.attack_type} [{inventory?.damage_type?.[0]}{inventory?.damage_type?.[1] ? ' / ' + inventory?.damage_type[1] : '' }{inventory?.damage_type?.[2] ? ' / ' + inventory?.damage_type[2] : '' }]  <br />
                        </>
                    : inventory?.type ? 
                        <>{inventory?.type} <br /></> 
                    : null }  
                    </td>
                    <td style={{ color: 'goldenrod' }}>
                    { ascean[inventoryType]?.grip && ascean[inventoryType]?.type ?
                        <>
                        {ascean[inventoryType]?.type} [{ascean[inventoryType]?.grip}] <br />
                        {ascean[inventoryType]?.attack_type} [{ascean[inventoryType]?.damage_type?.[0]}{ascean[inventoryType]?.damage_type?.[1] ? ' / ' + ascean[inventoryType]?.damage_type[1] : null }{ascean[inventoryType]?.damage_type?.[2] ? ' / ' + ascean[inventoryType]?.damage_type[2] : null }]  <br />
                        </>
                    : ascean[inventoryType]?.type ? 
                        <>{ascean[inventoryType]?.type} <br /></> 
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

                { (inventory?.physical_damage && inventory?.grip) || (inventory?.magical_damage && inventory?.grip) ? (
                <tr style={{ color: '#fdf6d8' }}>
                    <td style={{ color: textColor((inventory?.physical_damage + inventory?.magical_damage), (ascean[inventoryType]?.physical_damage + ascean[inventoryType]?.magical_damage)) }}>
                    Damage: {inventory?.physical_damage} Phys | {inventory?.magical_damage} Magi
                    </td>
                    <td style={{ color: textColor((ascean[inventoryType]?.physical_damage + ascean[inventoryType]?.magical_damage), (inventory?.physical_damage + inventory?.magical_damage)) }}>
                    Damage: {ascean[inventoryType]?.physical_damage} Phys | {ascean[inventoryType]?.magical_damage} Magi
                    </td>
                </tr>
                ) : ( null ) }
                { inventory?.physical_resistance > 0 || ascean[inventoryType]?.physical_resistance > 0 || inventory?.magical_resistance > 0 || ascean[inventoryType]?.magical_resistance ? 
                <tr>
                    <td style={{ color: textColor((inventory?.physical_resistance + inventory?.magical_resistance), (ascean[inventoryType]?.physical_resistance + ascean[inventoryType]?.magical_resistance)) }}>
                    { inventory?.physical_resistance || inventory?.magical_resistance ?
                        <>
                        Defense: {inventory?.physical_resistance} Phys | {inventory?.magical_resistance} Magi
                        </>
                    : 'Defense: 0 Phys | 0 Magi' }
                    </td>
                    <td style={{ color: textColor((ascean[inventoryType]?.physical_resistance + ascean[inventoryType]?.magical_resistance), (inventory?.physical_resistance + inventory?.magical_resistance)) }}>
                    { ascean[inventoryType]?.physical_resistance || ascean[inventoryType]?.magical_resistance ?
                        <>
                        Defense: {ascean[inventoryType]?.physical_resistance} Phys | {ascean[inventoryType]?.magical_resistance} Magi 
                        </>
                    : 'Defense: 0 Phys | 0 Magi' }
                    </td>
                </tr>
                : ( null ) }
                {inventory?.magical_penetration > 0 || ascean[inventoryType]?.magical_penetration > 0 || inventory?.physical_penetration > 0 || ascean[inventoryType]?.physical_penetration > 0 ? (
                <tr>
                    <td style={{ color: textColor((inventory?.physical_penetration + inventory?.magical_penetration), (ascean[inventoryType]?.physical_penetration + ascean[inventoryType]?.magical_penetration)) }}>
                    { inventory?.physical_penetration || inventory?.magical_penetration ? (
                        <>
                        Penetration: {inventory?.physical_penetration} Phys | {inventory?.magical_penetration} Magi 
                        </>
                    ) : 'Penetration: 0 Phys | 0 Magi' }
                    </td>
                    <td style={{ color: textColor((ascean[inventoryType]?.physical_penetration + ascean[inventoryType]?.magical_penetration), (inventory?.physical_penetration + inventory?.magical_penetration)) }}>
                    { ascean[inventoryType]?.physical_penetration || ascean[inventoryType]?.magical_penetration ? (
                        <>
                        Penetration: {ascean[inventoryType]?.physical_penetration} Phys | {ascean[inventoryType]?.magical_penetration} Magi
                        </>
                    ) : 'Penetration: 0 Phys | 0 Magi' }
                    </td>
                </tr>
                ) : ( null ) }

                <tr>
                    <td style={{ color: textColor(inventory?.critical_chance, ascean[inventoryType]?.critical_chance) }}>
                    Crit Chance: {inventory?.critical_chance}%
                    </td>
                    <td style={{ color: textColor(ascean[inventoryType]?.critical_chance, inventory?.critical_chance) }}>
                    Crit Chance: {ascean[inventoryType]?.critical_chance}%
                    </td>
                </tr>

                <tr>
                    <td style={{ color: textColor(inventory?.critical_damage, ascean[inventoryType]?.critical_damage) }}>
                    Crit Damage: {inventory?.critical_damage}x
                    </td>
                    <td style={{ color: textColor(ascean[inventoryType]?.critical_damage, inventory?.critical_damage) }}>
                    Crit Damage: {ascean[inventoryType]?.critical_damage}x
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
        {/* <Modal show={removeModalShow} onHide={() => setRemoveModalShow(false)} centered id='modal-weapon' style={{ zIndex: 1, top: '-25%' }}>
            <Text>
                Do You Wish To Remove and Destroy Your {inventory?.name}? <span><img src={inventory?.imgUrl} alt={inventory?.name} /></span>
            </Text>
            <Text>
                <TouchableOpacity  style={{ color: 'red', fontWeight: 600 }} onPress={() => handleRemoveItem()}>Destroy</TouchableOpacity>    
            </Text>
        </Modal> */}
        {/* <Modal visible={inventoryModalShow} onRequestClose={() => setInventoryModalShow(false)}style={{ marginTop: '30%', overflow: 'scroll', maxHeight: '90vh', zIndex: 1 }}>
            <TouchableOpacity style={{ color: 'red', fontWeight: 600 }} onPress={() => setInventoryModalShow(false)}>
            <View style={{ height: '100%' }}>

            <Text style={{ color: 'blueviolet', fontSize: "1.25em" }}>
                Do You Wish To Change Your {editState[inventoryType]?.name} to {inventory?.name}?
            </Text>

            <Text>
                <table>
                    <tbody>
                        <tr style={{ fontSize: "1.25em", color: 'gold' }}>
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
                                {inventory?.type} [{inventory?.grip}] <br />
                                {inventory?.attack_type} [{inventory?.damage_type?.[0]}{inventory?.damage_type?.[1] ? ' / ' + inventory?.damage_type[1] : '' }{inventory?.damage_type?.[2] ? ' / ' + inventory?.damage_type[2] : '' }]  <br />
                                </>
                            : inventory?.type ? 
                                <>{inventory?.type} <br /></> 
                            : '' }  
                            </td>
                            <td style={{ color: 'goldenrod' }}>
                            { ascean[inventoryType]?.grip && ascean[inventoryType]?.type ?
                                <>
                                {ascean[inventoryType]?.type} [{ascean[inventoryType]?.grip}] <br />
                                {ascean[inventoryType]?.attack_type} [{ascean[inventoryType]?.damage_type?.[0]}{ascean[inventoryType]?.damage_type?.[1] ? ' / ' + ascean[inventoryType]?.damage_type[1] : '' }{ascean[inventoryType]?.damage_type?.[2] ? ' / ' + ascean[inventoryType]?.damage_type[2] : '' }]  <br />
                                </>
                            : ascean[inventoryType]?.type ? 
                                <>{ascean[inventoryType]?.type} <br /></> 
                            : '' }
                            </td>
                        </tr>
                        <tr style={{ color: '#fdf6d8' }}>
                            <td style={{ color: textColor((inventory?.constitution + inventory?.strength + inventory?.agility + inventory?.achre + inventory?.caeren + inventory?.kyosir), 
                                (ascean[inventoryType]?.constitution + ascean[inventoryType]?.strength + ascean[inventoryType]?.agility + ascean[inventoryType]?.achre + ascean[inventoryType]?.caeren + ascean[inventoryType]?.kyosir)) }}>
                                {inventory?.constitution > 0 ? 'Con: +' + inventory?.constitution + ' ' : ''}
                                {inventory?.strength > 0 ? 'Str: +' + inventory?.strength + ' ' : ''}
                                {inventory?.agility > 0 ? 'Agi: +' + inventory?.agility + ' ' : ''}
                                {inventory?.achre > 0 ? 'Ach: +' + inventory?.achre + ' ' : ''}
                                {inventory?.caeren > 0 ? 'Caer: +' + inventory?.caeren + ' ' : ''}
                                {inventory?.kyosir > 0 ? 'Kyo: +' + inventory?.kyosir + ' ' : ''}
                            </td>

                            <td style={{ color: textColor((ascean[inventoryType]?.constitution + ascean[inventoryType]?.strength + ascean[inventoryType]?.agility + ascean[inventoryType]?.achre + ascean[inventoryType]?.caeren + ascean[inventoryType]?.kyosir), 
                                (inventory?.constitution + inventory?.strength + inventory?.agility + inventory?.achre + inventory?.caeren + inventory?.kyosir)) }}>
                                {ascean[inventoryType]?.constitution > 0 ? 'Con: +' + ascean[inventoryType]?.constitution + ' ' : ''}
                                {ascean[inventoryType]?.strength > 0 ? 'Str: +' + ascean[inventoryType]?.strength + ' ' : ''}
                                {ascean[inventoryType]?.agility > 0 ? 'Agi: +' + ascean[inventoryType]?.agility + ' ' : ''}
                                {ascean[inventoryType]?.achre > 0 ? 'Ach: +' + ascean[inventoryType]?.achre + ' ' : ''}
                                {ascean[inventoryType]?.caeren > 0 ? 'Caer: +' + ascean[inventoryType]?.caeren + ' ' : ''}
                                {ascean[inventoryType]?.kyosir > 0 ? 'Kyo: +' + ascean[inventoryType]?.kyosir + ' ' : ''}
                            </td>
                        </tr>

                        { (inventory?.physical_damage && inventory?.grip) || (inventory?.magical_damage && inventory?.grip) ?  
                        <tr style={{ color: '#fdf6d8' }}>
                            <td style={{ color: textColor((inventory?.physical_damage + inventory?.magical_damage), (ascean[inventoryType]?.physical_damage + ascean[inventoryType]?.magical_damage)) }}>
                            Damage: {inventory?.physical_damage} Phys | {inventory?.magical_damage} Magi
                            </td>
                            <td style={{ color: textColor((ascean[inventoryType]?.physical_damage + ascean[inventoryType]?.magical_damage), (inventory?.physical_damage + inventory?.magical_damage)) }}>
                            Damage: {ascean[inventoryType]?.physical_damage} Phys | {ascean[inventoryType]?.magical_damage} Magi
                            </td>
                        </tr>
                        : '' }
                        { inventory?.physical_resistance > 0 || ascean[inventoryType]?.physical_resistance > 0 || inventory?.magical_resistance > 0 || ascean[inventoryType]?.magical_resistance ? 
                        <tr>
                            <td style={{ color: textColor((inventory?.physical_resistance + inventory?.magical_resistance), (ascean[inventoryType]?.physical_resistance + ascean[inventoryType]?.magical_resistance)) }}>
                            { inventory?.physical_resistance || inventory?.magical_resistance ?
                                <>
                                Defense: {inventory?.physical_resistance} Phys | {inventory?.magical_resistance} Magi
                                </>
                            : 'Defense: 0 Phys | 0 Magi' }
                            </td>
                            <td style={{ color: textColor((ascean[inventoryType]?.physical_resistance + ascean[inventoryType]?.magical_resistance), (inventory?.physical_resistance + inventory?.magical_resistance)) }}>
                            { ascean[inventoryType]?.physical_resistance || ascean[inventoryType]?.magical_resistance ?
                                <>
                                Defense: {ascean[inventoryType]?.physical_resistance} Phys | {ascean[inventoryType]?.magical_resistance} Magi 
                                </>
                            : 'Defense: 0 Phys | 0 Magi' }
                            </td>
                        </tr>
                        : '' }
                        {inventory?.magical_penetration > 0 || ascean[inventoryType]?.magical_penetration > 0 || inventory?.physical_penetration > 0 || ascean[inventoryType]?.physical_penetration > 0 ? 
                        <tr>
                            <td style={{ color: textColor((inventory?.physical_penetration + inventory?.magical_penetration), (ascean[inventoryType]?.physical_penetration + ascean[inventoryType]?.magical_penetration)) }}>
                            { inventory?.physical_penetration || inventory?.magical_penetration ?
                                <>
                                Penetration: {inventory?.physical_penetration} Phys | {inventory?.magical_penetration} Magi 
                                </>
                            : 'Penetration: 0 Phys | 0 Magi' }
                            </td>
                            <td style={{ color: textColor((ascean[inventoryType]?.physical_penetration + ascean[inventoryType]?.magical_penetration), (inventory?.physical_penetration + inventory?.magical_penetration)) }}>
                            { ascean[inventoryType]?.physical_penetration || ascean[inventoryType]?.magical_penetration ?
                                <>
                                Penetration: {ascean[inventoryType]?.physical_penetration} Phys | {ascean[inventoryType]?.magical_penetration} Magi
                                </>
                            : 'Penetration: 0 Phys | 0 Magi' }
                            </td>
                        </tr>
                        : '' }

                        <tr>
                            <td style={{ color: textColor(inventory?.critical_chance, ascean[inventoryType]?.critical_chance) }}>
                            Crit Chance: {inventory?.critical_chance}%
                            </td>
                            <td style={{ color: textColor(ascean[inventoryType]?.critical_chance, inventory?.critical_chance) }}>
                            Crit Chance: {ascean[inventoryType]?.critical_chance}%
                            </td>
                        </tr>

                        <tr>
                            <td style={{ color: textColor(inventory?.critical_damage, ascean[inventoryType]?.critical_damage) }}>
                            Crit Damage: {inventory?.critical_damage}x
                            </td>
                            <td style={{ color: textColor(ascean[inventoryType]?.critical_damage, inventory?.critical_damage) }}>
                            Crit Damage: {ascean[inventoryType]?.critical_damage}x
                            </td>
                        </tr>

                        <tr >
                            <td style={{ color: textColor(ascean[inventoryType]?.dodge, inventory?.dodge) }}>
                            Dodge Timer: {inventory?.dodge}s
                            </td>
                            <td style={{ color: textColor(inventory?.dodge, ascean[inventoryType]?.dodge) }}>
                            Dodge Timer: {ascean[inventoryType]?.dodge}s
                            </td>
                        </tr>

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
                            : '' }
                            </td>
                            <td>
                            { ascean[inventoryType]?.influences?.length > 0 ? 
                                <>
                                Influence: {ascean[inventoryType]?.influences} <br />
                                </>
                            : '' }
                            </td>
                        </tr>
                        : ''}
                        <tr style={{ fontSize: "16px" }}>
                            <td style={getRarity}>{inventory?.rarity}</td>
                            <td style={{ color: getRarityColor(ascean[inventoryType]?.rarity) }}>
                                {ascean[inventoryType]?.rarity}
                            </td>
                        </tr>
                    </tbody>
                </table>
            <Text>{'\n'}</Text>
            { canEquip(ascean?.level, inventory?.rarity) ? ( <>
                <select value={ inventoryType === 'weaponOne' ? editState.weaponOne?._id : inventoryType === 'shield' ? editState.shield._id : inventoryType === 'helmet' ? 
                    editState.helmet._id : inventoryType === 'chest' ? editState.chest._id : inventoryType === 'legs' ? editState.legs._id : inventoryType === 'amulet' ? editState.amulet._id : inventoryType === 'ringOne' ? 
                    editState.ringOne._id : inventoryType === 'trinket' ? editState.trinket._id : ( '' ) } onChange={handleInventory}>
                        <option value={(editState)[inventoryType]?._id}>{(editState)[inventoryType]?.name} [Selected]</option>
                        <option value={ascean[inventoryType]?._id}>{ascean[inventoryType]?.name} [Equipped]</option>
                        <option value={inventory?._id}>{inventory?.name} [Viewing]</option>
                </select>
                { inventory?.grip && inventory?.type ? ( <>
                    <Text>{'\n'}</Text>
                    <select value={editState.weaponTwo._id} onChange={handleInventoryW2}>
                        <option value={(editState)[inventoryTypeTwo]?._id}>{(editState)[inventoryTypeTwo]?.name} [Selected]</option>
                        <option value={ascean[inventoryTypeTwo]?._id}>{ascean[inventoryTypeTwo]?.name} [Equipped]</option>
                        <option value={inventory?._id}>{inventory?.name} [Viewing]</option>
                    </select><Text>{'\n'}</Text>
                    <select value={editState.weaponThree._id} onChange={handleInventoryW3}>
                        <option value={(editState)[inventoryTypeThree]?._id}>{(editState)[inventoryTypeThree]?.name} [Selected]</option>
                        <option value={ascean[inventoryTypeThree]?._id}>{ascean[inventoryTypeThree]?.name} [Equipped]</option>
                        <option value={inventory?._id}>{inventory?.name} [Viewing]</option>
                    </select>
                </> ) : ( '' ) }
                { inventoryType === 'ringOne' ? (
                    <>
                    <Text>{'\n'}</Text>
                    <select value={editState.ringTwo._id} onChange={handleInventoryR2}>
                        <option value={(editState)[inventoryRingType]?._id}>{(editState)[inventoryRingType]?.name} [Selected]</option>
                        <option value={ascean[inventoryRingType]?._id}>{ascean[inventoryRingType]?.name} [Equipped]</option>
                        <option value={inventory?._id}>{inventory?.name} [Viewing]</option>
                    </select>
                    </>
                ) : ( '' ) }
                <Text>{'\n'}</Text>
            </> ) : ( 
                <View>
                    <Text style={{ color: "gold", fontSize: "20px" }}>
                        Unforuntaely, {inventory?.name} requires you to be level {equipLevel(inventory?.rarity)} to equip.
                    </Text>
                    <Text>{'\n'}</Text><Text>{'\n'}</Text>    
                </View>
            ) }
            { canEquip(ascean?.level, inventory?.rarity) ? (
                <> 
                <TouchableOpacity onPress={() => handleEquipmentSwap(editState)}>
                    <Text style={{ color: 'green', fontWeight: 600 }}>Equip</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={{ color: 'red', fontWeight: 600 }} onPress={() => setRemoveModalShow(true)}>
                    <Text style={{ color: 'red', fontWeight: 600 }}>Remove</Text>
                </TouchableOpacity>
                </>
            ) : ( 
                <TouchableOpacity onPress={() => setRemoveModalShow(true)}>
                    <Text style={{ color: 'red', fontWeight: 600 }}>Remove</Text>
                </TouchableOpacity>
            ) }
            <TouchableOpacity onPress={() => setInventoryModalShow(false)}>
                <Text style={{ color: 'blue', fontWeight: 600 }}>Close</Text>
            </TouchableOpacity>
            </Text>

            </View>
            </TouchableOpacity>
        </Modal> */}

        { compare ? (
            <>
            { inventoryType === 'weaponOne' ? (
                <Text>
                <select value={weaponCompared} onChange={(e) => setWeaponCompared(e.target.value)} className='story-dropdown'>
                    <option value={inventoryType}>{ascean[inventoryType].name}</option>
                    <option value={inventoryTypeTwo}>{ascean[inventoryTypeTwo].name}</option>
                    <option value={inventoryTypeThree}>{ascean[inventoryTypeThree].name}</option>
                </select>
                { createTable(weaponCompared) }
                </Text>
            ) : inventoryType === 'ringOne' ? (
                <Text>
                <select value={ringCompared} onChange={(e) => setRingCompared(e.target.value)} className='story-dropdown'>
                    <option value={inventoryType}>{ascean[inventoryType].name}</option>
                    <option value={inventoryRingType}>{ascean[inventoryRingType].name}</option>
                </select>
                { createTable(ringCompared) }
                </Text>
            ) : createTable(inventoryType) } 
                <View style={{ width: "100%", textAlign: "center" }} className='mt-3'>
                { canEquip(ascean?.level, inventory?.rarity) ? (
                    <Text>
                    <select className='story-dropdown' value={
                        inventoryType === 'weaponOne' ? editState.weaponOne?._id : inventoryType === 'shield' ? editState.shield._id : inventoryType === 'helmet' ? 
                        editState.helmet._id : inventoryType === 'chest' ? editState.chest._id : inventoryType === 'legs' ? 
                        editState.legs._id : inventoryType === 'amulet' ? editState.amulet._id : inventoryType === 'ringOne' ? 
                        editState.ringOne._id : inventoryType === 'trinket' ? editState.trinket._id : ''} onChange={handleInventory}>
                            <option value={(editState)[inventoryType]?._id}>{(editState)[inventoryType]?.name} [Selected]</option>
                            <option value={ascean[inventoryType]?._id}>{ascean[inventoryType]?.name} [Equipped]</option>
                            <option value={inventory?._id}>{inventory?.name} [Viewing]</option>
                    </select>
                    { inventory?.grip && inventory?.type ? (
                        <>{'\n'}
                        <select value={editState.weaponTwo._id} onChange={handleInventoryW2} className='story-dropdown'>
                            <option value={(editState)[inventoryTypeTwo]?._id}>{(editState)[inventoryTypeTwo]?.name} [Selected]</option>
                            <option value={ascean[inventoryTypeTwo]?._id}>{ascean[inventoryTypeTwo]?.name} [Equipped]</option>
                            <option value={inventory?._id}>{inventory?.name} [Viewing]</option>
                        </select>{'\n'}
                        <select value={editState.weaponThree._id} onChange={handleInventoryW3} className='story-dropdown'>
                            <option value={(editState)[inventoryTypeThree]?._id}>{(editState)[inventoryTypeThree]?.name} [Selected]</option>
                            <option value={ascean[inventoryTypeThree]?._id}>{ascean[inventoryTypeThree]?.name} [Equipped]</option>
                            <option value={inventory?._id}>{inventory?.name} [Viewing]</option>
                        </select>
                        </>
                    ) : ( null ) }
                    { inventoryType === 'ringOne' ? (
                        <Text> {'\n'}
                        <select value={editState.ringTwo._id} onChange={handleInventoryR2} className='story-dropdown'>
                            <option value={(editState)[inventoryRingType]?._id}>{(editState)[inventoryRingType]?.name} [Selected]</option>
                            <option value={ascean[inventoryRingType]?._id}>{ascean[inventoryRingType]?.name} [Equipped]</option>
                            <option value={inventory?._id}>{inventory?.name} [Viewing]</option>
                        </select>
                        </Text>
                    ) : ( null ) }
                    {'\n'}
                    </Text>
                ) : ( 
                    <Text style={{ color: "gold", fontSize: "16px" }}>
                        Unforuntaely, {inventory?.name} requires you to be level {equipLevel(inventory?.rarity)} to equip.
                        {'\n'}{'\n'}    
                    </Text>
                ) }
                { canEquip(ascean?.level, inventory?.rarity) ? (
                    <> 
                    <TouchableOpacity variant='outline' className='' style={{ float: 'left', color: 'green', fontWeight: 600 }} onPress={() => handleEquipmentSwap(editState)}>
                        <Text style={{ color: 'green', fontWeight: 600 }}>Equip</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity variant='outline' style={{ color: 'red', fontWeight: 600, float: "right" }} onPress={() => setRemoveModalShow(true)}>
                        <Text style={{ color: 'red', fontWeight: 600 }}>Remove</Text>
                    </TouchableOpacity>
                    </>
                ) : ( 
                    <TouchableOpacity variant='outline' style={{ color: 'red', fontWeight: 600, textAlign: "center" }} onPress={() => setRemoveModalShow(true)}>
                        <Text style={{ color: 'red', fontWeight: 600 }}>Remove</Text>
                    </TouchableOpacity>
                ) }
                </View>
            </>
        ) : ( 
            <TouchableOpacity style={[getItemStyle(inventory?.rarity)]} 
                onPress={() => setHighlighted({ item: inventory, comparing: true })}>
                <img src={inventory?.imgUrl} alt={inventory?.name} />
            </TouchableOpacity>
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