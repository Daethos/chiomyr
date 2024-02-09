import { Asceans } from "../assets/db/ascean";
import { Shields, Helmets, Legs, Chests } from "../assets/db/equipment";
import { Weapons } from "../assets/db/weaponry";
import Equipment, { defaultMutate, mutate } from "./equipment";
import { v4 as uuidv4 } from 'uuid';
import { addAscean } from "../assets/db/db";
import { Amulets, Rings, Trinkets } from "../assets/db/jewelry";

export default class Ascean {
    public _id: string;
    public origin: string;
    public sex: string;
    public mastery: string;
    public level: number;
    public experience: number;
    public faith: string;
    public inventory: any[];
    public currency: { silver: number; gold: number; };
    public firewater: { current: number; max: number; };
    public health: { current: number; max: number; };
    public name: string;
    public description: string;
    public constitution: number;
    public strength: number;
    public agility: number;
    public achre: number;
    public caeren: number;
    public kyosir: number;
    public imgUrl: string;
    public helmet: Equipment;
    public chest: Equipment;
    public legs: Equipment;
    public weaponOne: Equipment;
    public weaponTwo: Equipment;
    public weaponThree: Equipment;
    public shield: Equipment;
    public amulet: Equipment;
    public ringOne: Equipment;
    public ringTwo: Equipment;
    public trinket: Equipment;

    constructor(ascean: Ascean) {
        this._id = ascean._id;
        this.experience = ascean.experience;
        this.faith = ascean.faith;
        this.inventory = ascean.inventory;
        this.level = ascean.level;
        this.mastery = ascean.mastery;
        this.sex = ascean.sex;
        this.origin = ascean.origin;
        this.currency = { silver: ascean?.currency.silver, gold: 0 };
        this.firewater = { current: ascean?.firewater?.current || 5, max: ascean?.firewater?.max || 5 };
        this.health = { current: ascean?.health?.current || 0, max: ascean?.health?.max || 0 };
        this.level = ascean.level || 1;
        this.inventory = ascean.inventory || [];
        this.name = ascean.name;
        this.description = ascean.description;
        this.constitution = ascean.constitution;
        this.strength = ascean.strength;
        this.agility = ascean.agility;
        this.achre = ascean.achre;
        this.caeren = ascean.caeren;
        this.kyosir = ascean.kyosir;
        this.imgUrl = ascean.imgUrl;
        this.helmet = ascean.helmet;
        this.chest = ascean.chest;
        this.legs = ascean.legs;
        this.weaponOne = ascean.weaponOne;
        this.weaponTwo = ascean.weaponTwo;
        this.weaponThree = ascean.weaponThree;
        this.shield = ascean.shield;
        this.amulet = ascean.amulet;
        this.ringOne = ascean.ringOne;
        this.ringTwo = ascean.ringTwo;
        this.trinket = ascean.trinket;
    };
            
    public findById(id: String): Ascean | undefined {
        return Asceans.find(ascean => ascean._id === id);
    };
    public setExperience(value: number): number {
        return this.experience = value;
    };
    public setLevel(value: number): number {
        return this.level = value;
    };
    public setFirewater(value: {current: number, max: number}): {current: number, max: number} {
        return this.firewater = value;
    };
    public swapEquipment(equipIn: Equipment, equipOut: Equipment): any {
        switch (equipOut._id) {
            case this.helmet._id:
                this.helmet = equipIn;
            case this.chest._id:
                this.chest = equipIn;
            case this.legs._id:
                this.legs = equipIn;
            case this.weaponOne._id:
                this.weaponOne = equipIn;
            case this.weaponTwo._id:
                this.weaponTwo = equipIn;
            case this.weaponThree._id:
                this.weaponThree = equipIn;
            case this.shield._id:
                this.shield = equipIn;
            case this.amulet._id:
                this.amulet = equipIn;
            case this.ringOne._id:
                this.ringOne = equipIn;
            case this.ringTwo._id:
                this.ringTwo = equipIn;
            case this.trinket._id:
                this.trinket = equipIn;
            default:
                break;
        };
        this.inventory.filter(item => item._id !== equipIn._id);
        this.inventory.push(equipOut);
    };
    public setCurrency(value: {silver: number, gold: number}): {silver: number, gold: number} {
        return this.currency = value;
    };
    public setHealth(value: {current: number, max: number}): {current: number, max: number} {
        return this.health = value;
    };
    public getImgUrl(): string {
        return this.imgUrl;
    };

};
async function createAscean(data: any): Promise<Ascean> {
    const pref = data.preference;
    const faith = data.faith;
    console.log('Preference: ', pref, 'Faith: ', faith)
    switch (pref) {
        case 'Plate-Mail':
            data.helmet = Helmets.find(item => item.name === 'Plate Helm (Starter)');
            data.chest = Chests.find(item => item.name === 'Plate Cuirass (Starter)');
            data.legs = Legs.find(item => item.name === 'Plate Greaves (Starter)');
            data.shield = Shields.find(item => item.name === 'Pavise' && item.rarity === 'Common');
            break;
        case 'Chain-Mail':
            data.helmet = Helmets.find(item => item.name === 'Chain Helm (Starter)');
            data.chest = Chests.find(item => item.name === 'Chain Armor (Starter)');
            data.legs = Legs.find(item => item.name === 'Chain Greaves (Starter)');
            data.shield = Shields.find(item => item.name === 'Scutum' && item.rarity === 'Common');
            break;
        case 'Leather-Mail':
            data.helmet = Helmets.find(item => item.name === 'Leather Helm (Starter)');
            data.chest = Chests.find(item => item.name === 'Leather Brigandine (Starter)');
            data.legs = Legs.find(item => item.name === 'Leather Sandals (Starter)');
            data.shield = Shields.find(item => item.name === 'Heater' && item.rarity === 'Common');
            break;
        case 'Leather-Cloth':
            data.helmet = Helmets.find(item => item.name === 'Cloth Helm (Starter)');
            data.chest = Chests.find(item => item.name === 'Cloth Robes (Starter)');
            data.legs = Legs.find(item => item.name === 'Cloth Skirt (Starter)');
            data.shield = Shields.find(item => item.name === 'Parma' && item.rarity === 'Common');
            break;
        default:
            break;
    };

    const strength = parseInt(data.strength);
    const agility = parseInt(data.agility);
    const achre = parseInt(data.achre);
    const caeren = parseInt(data.caeren);
    const physical = strength + agility;
    const magical = achre + caeren;

    if (faith === 'Adherent') {
        if (physical > magical) {
            if (strength > agility) {
                data.weaponOne = 'War Hammer';
                data.weaponTwo = 'Sunshatter';
            } else if (strength < agility) {
                data.weaponOne = 'Longsword';
                data.weaponTwo = 'Sevashyr';
            } else {
                data.weaponOne = 'Claymore';
                data.weaponTwo = 'Longbow';
            };
        } else {
            if (achre > caeren) {
                data.weaponOne = 'Astral Spear';
                data.weaponTwo = "Quor'eite Crush";
            } else if (achre < caeren) {
                data.weaponOne = 'Ashfyre';
                data.weaponTwo = 'Nyrolean Wave';
            } else {
                data.weaponOne = 'Wildstrike';
                data.weaponTwo = 'Nightmare';
            };
        };
    } else {
        if (physical > magical) {
            if (strength > agility) {
                data.weaponOne = 'Daethic Halberd';
                data.weaponTwo = 'Hush of Daethos';
            } else if (strength < agility) {
                data.weaponOne = 'Hush';
                data.weaponTwo = 'Daethic Bow';
            } else {
                data.weaponOne = 'Daethic Halberd';
                data.weaponTwo = 'Daethic Bow';
            };   
        } else {
            if (achre > caeren) {
                data.weaponOne = 'Tendril';
                data.weaponTwo = 'Daethos Bow';
            } else if (achre < caeren) {
                data.weaponOne = 'Hush of Daethos';
                data.weaponTwo = 'Tendril of Daethos';
            } else {
                data.weaponOne = 'Blessed Dagger';
                data.weaponTwo = 'Cursed Dagger';
            };
        };
    };

    console.log('Gear: ', data.helmet, data.chest, data.legs, data.shield);
    console.log('Weapons: ', data.weaponOne, data.weaponTwo);
    const weaponOne = Weapons.find(item => (item.name === data.weaponOne && item.rarity === 'Common'));
    const weaponTwo = Weapons.find(item => (item.name === data.weaponTwo && item.rarity === 'Common'));
    const helmet = data.helmet;
    const chest = data.chest;
    const legs = data.legs;
    const shield = data.shield;

    const weaponThree = Weapons.find(item => item._id === 'ews_001');
    const ringOne = Rings.find(ring => ring._id === 'ers_001');
    const ringTwo = Rings.find(ring => ring._id === 'ers_001');
    const amulet = Amulets.find(amulet => amulet._id === 'eas_001');
    const trinket = Trinkets.find(trinket => trinket._id === 'ets_001');

    console.log(weaponOne, weaponTwo, 'Weapons chosen');

    // await mutate([weaponOne, weaponTwo, shield] as any[], 'Common');
    // await defaultMutate([weaponThree, helmet, chest, legs, ringOne, ringTwo, amulet, trinket] as any[]);

    await mutate([weaponOne, weaponTwo, shield, weaponThree, helmet, chest, legs, ringOne, ringTwo, amulet, trinket] as any[], 'Common'),
    // async function mutator() {
    //     Promise.all([
    //         // defaultMutate([weaponThree, helmet, chest, legs, ringOne, ringTwo, amulet, trinket] as any[])
    //     ]);
    // };
    // await mutator();

    console.log(weaponThree, 'What are you weapon three?')

    const ascean = new Ascean({
        ...data,
        _id: uuidv4(),
        weaponOne: weaponOne?._id,
        weaponTwo: weaponTwo?._id,
        weaponThree: weaponThree?._id,
        shield: shield?._id,
        helmet: helmet?._id,
        chest: chest?._id,
        legs: legs?._id,
        ringOne: ringOne?._id,
        ringTwo: ringTwo?._id,
        amulet: amulet?._id,
        trinket: trinket?._id,
        currency: {
            silver: data.kyosir * 3,
            gold: 0
        },
        experience: 0,
        imgUrl: `/src/assets/images/${data.origin}-${data.sex}.jpg`
    });
    const res = await addAscean(ascean);
    console.log(res, 'Added Ascean to Database');
    return ascean;
};

export { createAscean };