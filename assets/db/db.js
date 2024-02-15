import { Asceans } from './ascean';
import { Weapons } from './weaponry';
import { Amulets, Rings, Trinkets } from './jewelry';
import { Helmets, Chests, Legs, Shields } from './equipment';
import PseudoBase from './pseudo';
let db = new PseudoBase('db');

const EQUIPMENT = 'Equipment';
const ASCEANS = 'Asceans';

export const getAsceans = async () => {
    return await db.collection(ASCEANS).get();
};
export const getAscean = async (id) => await db.collection(ASCEANS).doc({ _id: id }).get();

export const addAscean = async (ascean) => await db.collection(ASCEANS).add(ascean);
export const updateAscean = async (ascean) => await db.collection(ASCEANS).doc({ _id: ascean._id }).update(ascean);
export const deleteAscean = async (id) => await db.collection(ASCEANS).doc({ _id: id }).delete();

export const getInventory = async (id) => {
    const ascean = await db.collection(ASCEANS).doc({ _id: id }).get();
    const inventory = ascean.inventory;
    if (!inventory) return [];
    const populated = Promise.all(inventory.map(async (item) => {
        const equipment = await db.collection(EQUIPMENT).doc({ _id: item }).get();
        return equipment;
    }));
    return populated;
};

export const getInventoryIds = async (id) => {
    const ascean = await db.collection(ASCEANS).doc({ _id: id }).get();
    return ascean.inventory;
};

export const populate = async (ascean) => {
    const weaponOne = await db.collection(EQUIPMENT).doc({ _id: ascean.weaponOne }).get();
    const weaponTwo = await db.collection(EQUIPMENT).doc({ _id: ascean.weaponTwo }).get();
    const weaponThree = await db.collection(EQUIPMENT).doc({ _id: ascean.weaponThree }).get();
    const shield = await db.collection(EQUIPMENT).doc({ _id: ascean.shield }).get();
    const helmet = await db.collection(EQUIPMENT).doc({ _id: ascean.helmet }).get();
    const chest = await db.collection(EQUIPMENT).doc({ _id: ascean.chest }).get();
    const legs = await db.collection(EQUIPMENT).doc({ _id: ascean.legs }).get();
    const ringOne = await db.collection(EQUIPMENT).doc({ _id: ascean.ringOne }).get();
    const ringTwo = await db.collection(EQUIPMENT).doc({ _id: ascean.ringTwo }).get();
    const amulet = await db.collection(EQUIPMENT).doc({ _id: ascean.amulet }).get();
    const trinket = await db.collection(EQUIPMENT).doc({ _id: ascean.trinket }).get();

    const populated = Promise.all([weaponOne, weaponTwo, weaponThree, shield, helmet, chest, legs, ringOne, ringTwo, amulet, trinket]).then((values) => {
        return {
            ...ascean,
            weaponOne: values[0],
            weaponTwo: values[1],
            weaponThree: values[2],
            shield: values[3],
            helmet: values[4],
            chest: values[5],
            legs: values[6],
            ringOne: values[7],
            ringTwo: values[8],
            amulet: values[9],
            trinket: values[10],
        };
    });
    return populated;
};

export function populateEnemy(enemy) {
    const weaponOne = Weapons.find(weapon => weapon.name === enemy.weaponOne.name && weapon.rarity === enemy.weaponOne.rarity);
    const weaponTwo = Weapons.find(weapon => weapon.name === enemy.weaponTwo.name && weapon.rarity === enemy.weaponTwo.rarity);
    const weaponThree = Weapons.find(weapon => weapon.name === enemy.weaponThree.name && weapon.rarity === enemy.weaponThree.rarity);
    const shield = Shields.find(shield => shield.name === enemy.shield.name && shield.rarity === enemy.shield.rarity);
    const helmet = Helmets.find(helmet => helmet.name === enemy.helmet.name && helmet.rarity === enemy.helmet.rarity);
    const chest = Chests.find(chest => chest.name === enemy.chest.name && chest.rarity === enemy.chest.rarity);
    const legs = Legs.find(leg => leg.name === enemy.legs.name && leg.rarity === enemy.legs.rarity);
    const ringOne = Rings.find(ring => ring.name === enemy.ringOne.name && ring.rarity === enemy.ringOne.rarity);
    const ringTwo = Rings.find(ring => ring.name === enemy.ringTwo.name && ring.rarity === enemy.ringTwo.rarity);
    const amulet = Amulets.find(amulet => amulet.name === enemy.amulet.name && amulet.rarity === enemy.amulet.rarity);
    const trinket = Trinkets.find(trinket => trinket.name === enemy.trinket.name && trinket.rarity === enemy.trinket.rarity);

    return {
        ...enemy,
        weaponOne: weaponOne,
        weaponTwo: weaponTwo,
        weaponThree: weaponThree,
        shield: shield,
        helmet: helmet,
        chest: chest,
        legs: legs,
        ringOne: ringOne,
        ringTwo: ringTwo,
        amulet: amulet,
        trinket: trinket,
    };
};

export function randomEnemy() {
    // const random = Math.floor(Math.random() * Asceans.length) - 1 || 0;
    return Asceans[0];
};

export function indexEquipment() {
    const weapons = Weapons.filter(weapon => weapon.rarity === 'Common');
    const amulets = Amulets.filter(amulet => amulet.rarity === 'Common');
    const rings = Rings.filter(ring => ring.rarity === 'Common');
    const trinkets = Trinkets.filter(trinket => trinket.rarity === 'Common');
    const helmets = Helmets.filter(helmet => helmet.rarity === 'Common' || helmet.rarity === 'Default');
    const chests = Chests.filter(chest => chest.rarity === 'Common' || chest.rarity === 'Default');
    const legs = Legs.filter(leg => leg.rarity === 'Common' || leg.rarity === 'Default');
    const shields = Shields.filter(shield => shield.rarity === 'Common');
    const equipment = [...weapons, ...amulets, ...rings, ...trinkets, ...helmets, ...chests, ...legs, ...shields];
    return equipment;
};
export const addEquipment = async (equipment) => await db.collection(EQUIPMENT).add(equipment);
export const getEquipment = async (id) => await db.collection(EQUIPMENT).doc({ _id: id }).get();
export const getEquipmentByName = async (name) => await db.collection(EQUIPMENT).doc({ name: name }).get();
export const getEquipmentByRarity = async (rarity) => await db.collection(EQUIPMENT).doc({ rarity: rarity }).get();