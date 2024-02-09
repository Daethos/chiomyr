// ================================== HELPER FUNCTIONS =================================== \\
const attributeCompiler = (ascean, rarities) => {
    let newAttributes = {};
    let itemRarity = {
        helmCon: ascean.helmet.constitution * rarities.helmet,
        helmStr: ascean.helmet.strength * rarities.helmet,
        helmAgi: ascean.helmet.agility * rarities.helmet,
        helmAch: ascean.helmet.achre * rarities.helmet,
        helmCae: ascean.helmet.caeren * rarities.helmet,
        helmKyo: ascean.helmet.kyosir * rarities.helmet,
        chestCon: ascean.chest.constitution * rarities.chest,
        chestStr: ascean.chest.strength * rarities.chest,
        chestAgi: ascean.chest.agility * rarities.chest,
        chestAch: ascean.chest.achre * rarities.chest,
        chestCae: ascean.chest.caeren * rarities.chest,
        chestKyo: ascean.chest.kyosir * rarities.chest,
        legsCon: ascean.legs.constitution * rarities.legs,
        legsStr: ascean.legs.strength * rarities.legs,
        legsAgi: ascean.legs.agility * rarities.legs,
        legsAch: ascean.legs.achre * rarities.legs,
        legsCae: ascean.legs.caeren * rarities.legs,
        legsKyo: ascean.legs.kyosir * rarities.legs,
        ringOneCon: ascean.ringOne.constitution * rarities.ringOne,
        ringOneStr: ascean.ringOne.strength * rarities.ringOne,
        ringOneAgi: ascean.ringOne.agility * rarities.ringOne,
        ringOneAch: ascean.ringOne.achre * rarities.ringOne,
        ringOneCae: ascean.ringOne.caeren * rarities.ringOne,
        ringOneKyo: ascean.ringOne.kyosir * rarities.ringOne,
        ringTwoCon: ascean.ringTwo.constitution * rarities.ringTwo,
        ringTwoStr: ascean.ringTwo.strength * rarities.ringTwo,
        ringTwoAgi: ascean.ringTwo.agility * rarities.ringTwo,
        ringTwoAch: ascean.ringTwo.achre * rarities.ringTwo,
        ringTwoCae: ascean.ringTwo.caeren * rarities.ringTwo,
        ringTwoKyo: ascean.ringTwo.kyosir * rarities.ringTwo,
        amuletCon: ascean.amulet.constitution * rarities.amulet,
        amuletStr: ascean.amulet.strength * rarities.amulet,
        amuletAgi: ascean.amulet.agility * rarities.amulet,
        amuletAch: ascean.amulet.achre * rarities.amulet,
        amuletCae: ascean.amulet.caeren * rarities.amulet,
        amuletKyo: ascean.amulet.kyosir * rarities.amulet,
        shieldCon: ascean.shield.constitution * rarities.shield,
        shieldStr: ascean.shield.strength * rarities.shield,
        shieldAgi: ascean.shield.agility * rarities.shield,
        shieldAch: ascean.shield.achre * rarities.shield,
        shieldCae: ascean.shield.caeren * rarities.shield,
        shieldKyo: ascean.shield.kyosir * rarities.shield,
        trinketCon: ascean.trinket.constitution * rarities.trinket,
        trinketStr: ascean.trinket.strength * rarities.trinket,
        trinketAgi: ascean.trinket.agility * rarities.trinket,
        trinketAch: ascean.trinket.achre * rarities.trinket,
        trinketCae: ascean.trinket.caeren * rarities.trinket,
        trinketKyo: ascean.trinket.kyosir * rarities.trinket,
    };
        
    newAttributes.rawConstitution =  Math.round((ascean.constitution + (ascean?.origin === "Notheo" || ascean?.origin === 'Nothos' ? 2 : 0)) * (ascean?.mastery === 'Constitution' ? 1.1 : 1));
    newAttributes.rawStrength =  Math.round(((ascean?.strength + (ascean?.origin === 'Sedyreal' || ascean?.origin === 'Ashtre' ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) + (ascean?.sex === 'Man' ? 2 : 0)) * (ascean?.mastery === 'Strength' ? 1.15 : 1));
    newAttributes.rawAgility =  Math.round(((ascean?.agility + (ascean?.origin === "Quor'eite" || ascean?.origin === 'Ashtre' ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0))) * (ascean?.mastery === 'Agility' ? 1.15 : 1));
    newAttributes.rawAchre =  Math.round(((ascean?.achre + (ascean?.origin === 'Notheo' || ascean?.origin === 'Fyers' ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) + (ascean?.sex === 'Man' ? 2 : 0)) * (ascean?.mastery === 'Achre' ? 1.15 : 1));
    newAttributes.rawCaeren =  Math.round(((ascean?.caeren + (ascean?.origin === 'Nothos' || ascean?.origin === 'Sedyreal' ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) + (ascean?.sex === 'Woman' ? 2 : 0)) * (ascean?.mastery === 'Caeren' ? 1.15 : 1));
    newAttributes.rawKyosir =  Math.round(((ascean?.kyosir + (ascean?.origin === "Fyers" || ascean?.origin === "Quor'eite" ? 2 : 0) + (ascean?.origin === "Li'ivi" ? 1 : 0)) + (ascean?.sex === 'Woman' ? 2 : 0)) * (ascean.mastery === 'Kyosir' ? 1.15 : 1));

    // // Total Attributes
    newAttributes.totalStrength = newAttributes.rawStrength + itemRarity.shieldStr + itemRarity.helmStr + itemRarity.chestStr + itemRarity.legsStr + itemRarity.ringOneStr + itemRarity.ringTwoStr + itemRarity.amuletStr + itemRarity.trinketStr;
    newAttributes.totalAgility = newAttributes.rawAgility + itemRarity.shieldAgi + itemRarity.helmAgi + itemRarity.chestAgi + itemRarity.legsAgi + itemRarity.ringOneAgi + itemRarity.ringTwoAgi + itemRarity.amuletAgi + itemRarity.trinketAgi;
    newAttributes.totalConstitution = newAttributes.rawConstitution + itemRarity.shieldCon + itemRarity.helmCon + itemRarity.chestCon + itemRarity.legsCon + itemRarity.ringOneCon + itemRarity.ringTwoCon + itemRarity.amuletCon + itemRarity.trinketCon;
    newAttributes.totalAchre = newAttributes.rawAchre + itemRarity.shieldAch + itemRarity.helmAch + itemRarity.chestAch + itemRarity.legsAch + itemRarity.ringOneAch + itemRarity.ringTwoAch + itemRarity.amuletAch + itemRarity.trinketAch;
    newAttributes.totalCaeren = newAttributes.rawCaeren + itemRarity.shieldCae + itemRarity.helmCae + itemRarity.chestCae + itemRarity.legsCae + itemRarity.ringOneCae + itemRarity.ringTwoCae + itemRarity.amuletCae + itemRarity.trinketCae;
    newAttributes.totalKyosir = newAttributes.rawKyosir + itemRarity.shieldKyo + itemRarity.helmKyo + itemRarity.chestKyo + itemRarity.legsKyo + itemRarity.ringOneKyo + itemRarity.ringTwoKyo + itemRarity.amuletKyo + itemRarity.trinketKyo;
    
    newAttributes.totalStrength = Math.round(newAttributes.totalStrength);
    newAttributes.totalAgility = Math.round(newAttributes.totalAgility);
    newAttributes.totalConstitution = Math.round(newAttributes.totalConstitution);
    newAttributes.totalAchre = Math.round(newAttributes.totalAchre);
    newAttributes.totalCaeren = Math.round(newAttributes.totalCaeren);
    newAttributes.totalKyosir = Math.round(newAttributes.totalKyosir);

    // Attribute Modifier
    newAttributes.strengthMod =  Math.floor((newAttributes.totalStrength - 10) / 2);
    newAttributes.agilityMod =  Math.floor((newAttributes.totalAgility - 10) / 2);
    newAttributes.constitutionMod =  Math.floor((newAttributes.totalConstitution - 10) / 2);
    newAttributes.achreMod =  Math.floor((newAttributes.totalAchre - 10) / 2);
    newAttributes.caerenMod =  Math.floor((newAttributes.totalCaeren - 10) / 2);
    newAttributes.kyosirMod =  Math.floor((newAttributes.totalKyosir - 10) / 2);
    
    // Equipment Attributes
    newAttributes.equipStrength = newAttributes.totalStrength - newAttributes.rawStrength;
    newAttributes.equipConstitution = newAttributes.totalConstitution - newAttributes.rawConstitution;
    newAttributes.equipAgility = newAttributes.totalAgility - newAttributes.rawAgility;
    newAttributes.equipAchre = newAttributes.totalAchre - newAttributes.rawAchre;
    newAttributes.equipCaeren = newAttributes.totalCaeren - newAttributes.rawCaeren;
    newAttributes.equipKyosir = newAttributes.totalKyosir - newAttributes.rawKyosir;

    newAttributes.healthTotal = 15 + ((newAttributes.totalConstitution * ascean.level) + ((newAttributes.constitutionMod + Math.round((newAttributes.caerenMod + newAttributes.strengthMod) / 4)) * ascean.level));
    newAttributes.initiative = 10 + ((newAttributes.agilityMod + newAttributes.achreMod) / 2);
    newAttributes.stamina = 100 + (newAttributes.constitutionMod + newAttributes.agilityMod + newAttributes.caerenMod) / 2;
    newAttributes.grace = 100 + (newAttributes.strengthMod + newAttributes.achreMod + newAttributes.kyosirMod) / 2; // Future Idea Maybe

    return newAttributes;
};
  
function originCompiler(weapon, ascean) {
    switch (ascean.origin) {
        case "Ashtre":
            weapon.criticalChance += 3;
            weapon.physicalDamage *= 1.03;
            weapon.criticalDamage *= 1.03;
            break;
        case "Fyers":
            weapon.magicalPenetration += 3;
            weapon.physicalPenetration += 3;
            weapon.roll += 3;
            break;
        case "Li'ivi":
            weapon.magicalPenetration += 1;
            weapon.physicalPenetration += 1;
            weapon.magicalDamage *= 1.01;
            weapon.physicalDamage *= 1.01;
            weapon.criticalChance += 1;
            weapon.criticalDamage *= 1.01;
            weapon.dodge -= 1;
            weapon.roll += 1;
            break;
        case "Notheo":
            weapon.physicalDamage *= 1.03;
            weapon.physicalPenetration += 3;
            break;
        case "Nothos":
            weapon.magicalPenetration += 3;
            weapon.magicalDamage *= 1.03;
            break;
        case "Quor'eite":
            weapon.dodge -= 3;
            weapon.roll += 3;
            weapon.criticalChance += 3;
            break;
        case "Sedyreal":
            weapon.criticalDamage *= 1.03;
            break;
    };
};

function gripCompiler(weapon, attributes, ascean) {
    let physicalMultiplier = 1;
    let magicalMultiplier = 1;

    if (weapon.attackType === 'Physical') {
        physicalMultiplier = 1.1;
        magicalMultiplier = 0.8;
    };

    if (weapon.attackType === 'Magic') {
        physicalMultiplier = 0.8;
        magicalMultiplier = 1.1;
    };

    if (weapon.grip === 'One Hand') {
        weapon.physicalDamage += ((((weapon.agility / 2)) + attributes.agilityMod) + ((weapon.strength / 8) + attributes.strengthMod / 3)) * physicalMultiplier;
        weapon.magicalDamage += ((weapon.achre / 2) + (weapon.caeren / 8) + attributes.achreMod + (attributes.caerenMod / 3)) * magicalMultiplier;

        weapon.physicalDamage *= 1 + ((((weapon.agility / 2)) + attributes.agilityMod) + ((weapon.strength / 8) + attributes.strengthMod / 3)) / (100 + (20 / ascean.level));
        weapon.magicalDamage *= 1 + ((weapon.achre / 2) + (weapon.caeren / 8) + attributes.achreMod + (attributes.caerenMod / 3)) / (100 + (20 / ascean.level));
    };
    if (weapon.type === 'Bow') {
        weapon.physicalDamage += ((weapon.agility / 2) + attributes.agilityMod + (weapon.strength / 8) + (attributes.strengthMod / 3)) * physicalMultiplier;
        weapon.magicalDamage += ((weapon.achre / 2) + (weapon.caeren / 8) + attributes.achreMod + (attributes.caerenMod / 3)) * magicalMultiplier;

        weapon.physicalDamage *= 1 + ((((weapon.agility / 4)) + attributes.agilityMod) + ((weapon.strength / 12) + attributes.strengthMod)) / (100 + (20 / ascean.level));
        weapon.magicalDamage *= 1 + ((weapon.achre / 4) + (weapon.caeren / 12) + attributes.achreMod + (attributes.caerenMod / 3)) / (100 + (20 / ascean.level));
    }  
    if (weapon.grip === 'Two Hand' && weapon.type !== 'Bow') {
        weapon.physicalDamage += ((weapon.strength / 2) + attributes.strengthMod + (weapon.agility / 8) + (attributes.agilityMod / 3)) * physicalMultiplier;
        weapon.magicalDamage += ((weapon.achre / 8) + (weapon.caeren / 2) + (attributes.achreMod / 3) + (attributes.caerenMod)) * magicalMultiplier;

        weapon.physicalDamage *= 1 + ((weapon.strength / 2) + attributes.strengthMod + (weapon.agility / 8) + (attributes.agilityMod / 3)) / (100 + (20 / ascean.level));
        weapon.magicalDamage *= 1 + (((weapon.achre / 8) + (weapon.caeren / 2) + (attributes.achreMod / 3)) + attributes.caerenMod) / (100 + (20 / ascean.level));
    };
};

function penetrationCompiler(weapon, attributes, combatStats) { 
    weapon.magicalPenetration += Math.round(combatStats.penetrationMagical + attributes.kyosirMod + (weapon.kyosir / 2));
    weapon.physicalPenetration += Math.round(combatStats.penetrationPhysical + attributes.kyosirMod + (weapon.kyosir / 2));
};

function critCompiler(weapon, attributes, combatStats) { 
    if (weapon.attackType === 'Physical') {
        weapon.criticalChance += combatStats.criticalChance + attributes.agilityMod + (weapon.agility / 2);
        weapon.criticalDamage += (combatStats.criticalDamage / 10) + ((attributes.constitutionMod + attributes.strengthMod + ((weapon.strength) / 2)) / 50);
    } else {
        weapon.criticalChance += combatStats.criticalChance + attributes.achreMod + (weapon.achre / 2);
        weapon.criticalDamage += (combatStats.criticalDamage / 10) + ((attributes.constitutionMod + attributes.caerenMod + ((weapon.caeren) / 2)) / 50);
    };
    // weapon.criticalChance += combatStats.criticalChance + ((attributes.agilityMod + attributes.achreMod + ((weapon.agility + weapon.achre) / 2)) / 3);
    // weapon.criticalDamage += (combatStats.criticalDamage / 10) + ((attributes.constitutionMod + attributes.strengthMod + attributes.caerenMod + ((weapon.strength + weapon.caeren) / 2)) / 50);
    weapon.criticalChance = Math.round(weapon.criticalChance * 100) / 100;
    weapon.criticalDamage = Math.round(weapon.criticalDamage * 100) / 100;
};

function faithCompiler(weapon, ascean) { 
    if (ascean.faith === 'adherent') {
        if (weapon.damageType?.[0] === 'Earth' || weapon.damageType?.[0] === 'Wild' || weapon.damageType?.[0] === 'Fire' || weapon.damageType?.[0] === 'Frost' || weapon.damageType?.[0] === 'Lightning' || weapon.damageType?.[0] === 'Wind' || weapon.damageType?.[0] === 'Sorcery') {
            weapon.magicalDamage *= 1.075;
            weapon.criticalChance += 3;
        };
        if (weapon.type === 'Bow' || weapon.type === 'Greataxe' || weapon.type === 'Greatmace' || weapon.type === 'Greatbow') {
            weapon.physicalDamage *= 1.075;
        };
        if (weapon.type === 'Greatsword' || weapon.type === 'Polearm') {
            weapon.physicalDamage *= 1.05;
            weapon.magicalDamage *= 1.05;
        };
        if (weapon.type === 'Axe' || weapon.type === 'Mace' || weapon.type === 'Curved Sword' || weapon.type === 'Dagger' || weapon.type === 'Long Sword') {
            weapon.physicalDamage *= 1.05;
            weapon.criticalChance += 3;
        };
        if (weapon.grip === 'Two Hand') {
            weapon.physicalDamage *= 1.05;
            weapon.magicalDamage *= 1.05;
            weapon.criticalChance += 3
        };
        weapon.criticalChance *= 1.075;
        weapon.roll += 3;
    }
    if (ascean.faith === 'devoted') {
        if (weapon.damageType?.[0] === 'Wild' || weapon.damageType?.[0] === 'Righteous' || weapon.damageType?.[0] === 'Spooky' || weapon.damageType?.[0] === 'Sorcery') {
            weapon.physicalDamage *= 1.075;
            weapon.magicalDamage *= 1.075;
            weapon.criticalDamage *= 1.025;
        };
        if (weapon.type === 'Short Sword' || weapon.type === 'Long Sword' || weapon.type === 'Curved Sword' || weapon.type === 'Dagger' || weapon.type === 'Scythe' || weapon.type === 'Polearm') {
            weapon.physicalDamage *= 1.05;
            weapon.magicalDamage *= 1.05;
            weapon.criticalDamage *= 1.05;
        };
        if (weapon.grip === 'One Hand' || weapon.type === 'Bow' || weapon.type === 'Greatbow') {
            weapon.physicalDamage *= 1.05;
            weapon.magicalDamage *= 1.05;
            weapon.criticalDamage *= 1.05;
        };
        weapon.criticalDamage *= 1.075;
        weapon.dodge -= 3;
    };
    weapon.criticalChance = Math.round(weapon.criticalChance * 100) / 100;
    weapon.criticalDamage = Math.round(weapon.criticalDamage * 100) / 100;
};

// =============================== COMPILER FUNCTIONS ================================== \\

const weaponCompiler = (weapon, ascean, attributes, combatStats, rarity) => { 
    const weaponOne = {
        name: weapon.name,
        type: weapon.type,
        rarity: weapon.rarity,
        grip: weapon.grip,
        attackType: weapon.attackType,
        damageType: weapon.damageType,
        physicalDamage: (weapon.physicalDamage * rarity),
        magicalDamage: (weapon.magicalDamage * rarity),
        physicalPenetration: (weapon.physicalPenetration * rarity),
        magicalPenetration: (weapon.magicalPenetration * rarity),
        criticalChance: (weapon.criticalChance * rarity),
        criticalDamage: (weapon.criticalDamage),
        dodge: (weapon.dodge),
        roll: (weapon.roll * rarity),
        constitution: (weapon.constitution * rarity),
        strength: (weapon.strength * rarity),
        agility: (weapon.agility * rarity),
        achre: (weapon.achre * rarity),
        caeren: (weapon.caeren * rarity),
        kyosir: (weapon.kyosir * rarity),
        influences: weapon.influences,
        imgUrl: weapon.imgUrl,
        _id: weapon._id,
    };
    originCompiler(weaponOne, ascean);
    gripCompiler(weaponOne, attributes, ascean);
    penetrationCompiler(weaponOne, attributes, combatStats);
    critCompiler(weaponOne, attributes, combatStats);
    faithCompiler(weaponOne, ascean);
    weaponOne.dodge += (60 + (combatStats.dodgeCombat));
    weaponOne.roll += combatStats.rollCombat;
    weaponOne.physicalDamage = Math.round(weaponOne.physicalDamage * combatStats.damagePhysical);
    weaponOne.magicalDamage = Math.round(weaponOne.magicalDamage * combatStats.damageMagical);
    return weaponOne;
};

const defenseCompiler = (ascean, attributes, combatStats, rarities) => { 
    const defense = {
        physicalDefenseModifier: 
            Math.round((ascean.helmet.physicalResistance * rarities.helmet) + (ascean.chest.physicalResistance * rarities.chest) + (ascean.legs.physicalResistance * rarities.legs) + 
            (ascean.ringOne.physicalResistance * rarities.ringOne) + (ascean.ringTwo.physicalResistance * rarities.ringTwo) + (ascean.amulet.physicalResistance * rarities.amulet) + (ascean.trinket.physicalResistance * rarities.trinket) 
            + Math.round(((attributes.constitutionMod + attributes.strengthMod + attributes.kyosirMod) / 12)) + combatStats.originPhysDef), // Need to create these in the backend as well
        
        magicalDefenseModifier: 
            Math.round((ascean.helmet.magicalResistance * rarities.helmet) + (ascean.chest.magicalResistance * rarities.chest) + (ascean.legs.magicalResistance * rarities.legs) + 
           (ascean.ringOne.magicalResistance * rarities.ringOne) + (ascean.ringTwo.magicalResistance * rarities.ringTwo) + (ascean.amulet.magicalResistance * rarities.amulet) + (ascean.trinket.magicalResistance * rarities.trinket) 
            + Math.round(((attributes.constitutionMod + attributes.caerenMod + attributes.kyosirMod) / 12)) + combatStats.originMagDef),

        physicalPosture: combatStats.defensePhysical + Math.round(ascean.shield.physicalResistance * rarities.shield),
        magicalPosture: combatStats.defenseMagical + Math.round(ascean.shield.magicalResistance * rarities.shield),
    };
    return defense;
};

const coefficientCompiler = (ascean, item) => {
    let coefficient = 0;
    switch (item.rarity) {
        case 'Common':
            coefficient = ascean.level / 4;
            break;
        case 'Uncommon':
            coefficient = ascean.level / 8;
            break;
        case 'Rare':
            coefficient = 1;
            // coefficient = ascean.level / 12;
            break;
        case 'Epic':
            coefficient = 1;
            // coefficient = ascean.level / 16;
            break;
        case 'Legendary':
            coefficient = 1;
            break;
    };
    if (coefficient > 1) {
        if (coefficient > 3) {
            coefficient = 2;
        } else if (coefficient > 2) {
            coefficient = 1.5;
        } else {
            coefficient = 1;
        };
    };
    return coefficient;
};

function rarityCompiler(ascean) {
    let rarities = {};
    try {
        const helmetCoefficient = coefficientCompiler(ascean, ascean.helmet);
        const chestCoefficient = coefficientCompiler(ascean, ascean.chest);
        const legsCoefficient = coefficientCompiler(ascean, ascean.legs);
        const ringOneCoefficient = coefficientCompiler(ascean, ascean.ringOne);
        const ringTwoCoefficient = coefficientCompiler(ascean, ascean.ringTwo);
        const amuletCoefficient = coefficientCompiler(ascean, ascean.amulet);
        const trinketCoefficient = coefficientCompiler(ascean, ascean.trinket);
        const shieldCoefficient = coefficientCompiler(ascean, ascean.shield);
        const weaponOneCoefficient = coefficientCompiler(ascean, ascean.weaponOne);
        const weaponTwoCoefficient = coefficientCompiler(ascean, ascean.weaponTwo);
        const weaponThreeCoefficient = coefficientCompiler(ascean, ascean.weaponThree);
        rarities = {
            helmet: helmetCoefficient,
            chest: chestCoefficient,
            legs: legsCoefficient,
            ringOne: ringOneCoefficient,
            ringTwo: ringTwoCoefficient,
            amulet: amuletCoefficient,
            trinket: trinketCoefficient,
            shield: shieldCoefficient,
            weaponOne: weaponOneCoefficient,
            weaponTwo: weaponTwoCoefficient,
            weaponThree: weaponThreeCoefficient,
        };
        return rarities;
    } catch (err) {
        console.log(err, 'Rarity Compiler Error');
    };
};

// ================================== CONTROLLER - SERVICE ================================= \\

const asceanCompiler = (ascean) => {
    try {
        const rarities = rarityCompiler(ascean);
        const attributes = attributeCompiler(ascean, rarities);
        const physicalDamageModifier = ascean.helmet.physicalDamage * ascean.chest.physicalDamage * ascean.legs.physicalDamage * ascean.ringOne.physicalDamage * ascean.ringTwo.physicalDamage * ascean.amulet.physicalDamage * ascean.trinket.physicalDamage;
        const magicalDamageModifier = ascean.helmet.magicalDamage * ascean.chest.magicalDamage * ascean.legs.magicalDamage * ascean.ringOne.magicalDamage * ascean.ringTwo.magicalDamage * ascean.amulet.magicalDamage * ascean.trinket.magicalDamage;
        const critChanceModifier = (ascean.helmet.criticalChance * rarities.helmet) + (ascean.chest.criticalChance * rarities.chest) + (ascean.legs.criticalChance * rarities.legs) + 
            (ascean.ringOne.criticalChance * rarities.ringOne) + (ascean.ringTwo.criticalChance * rarities.ringTwo) + (ascean.amulet.criticalChance * rarities.amulet) + (ascean.trinket.criticalChance * rarities.trinket);
        const critDamageModifier = (ascean.helmet.criticalDamage * rarities.helmet) * (ascean.chest.criticalDamage * rarities.chest) * (ascean.legs.criticalDamage * rarities.legs) * 
            (ascean.ringOne.criticalDamage * rarities.ringOne) * (ascean.ringTwo.criticalDamage * rarities.ringTwo) * (ascean.amulet.criticalDamage * rarities.amulet) * (ascean.trinket.criticalDamage * rarities.trinket);
        const dodgeModifier = Math.round((ascean.shield.dodge * rarities.shield) + (ascean.helmet.dodge * rarities.helmet) + (ascean.chest.dodge * rarities.chest) + (ascean.legs.dodge * rarities.legs) + 
            (ascean.ringOne.dodge * rarities.ringOne) + (ascean.ringTwo.dodge * rarities.ringTwo) + (ascean.amulet.dodge * rarities.amulet) + (ascean.trinket.dodge * rarities.trinket) - Math.round(((attributes.agilityMod + attributes.achreMod) / 4))); // Was 3
        const rollModifier = Math.round((ascean.shield.roll * rarities.shield) + (ascean.helmet.roll * rarities.helmet) + (ascean.chest.roll * rarities.chest) + (ascean.legs.roll * rarities.legs) + 
            (ascean.ringOne.roll * rarities.ringOne) + (ascean.ringTwo.roll * rarities.ringTwo) + (ascean.amulet.roll * rarities.amulet) + (ascean.trinket.roll * rarities.trinket) + 
            Math.round(((attributes.agilityMod + attributes.achreMod) / 4))); // Was 3
        const originPhysPenMod = (ascean.origin === 'Fyers' || ascean.origin === 'Notheo' ? 3 : 0)
        const originMagPenMod = (ascean.origin === 'Fyers' || ascean.origin === 'Nothos' ? 3 : 0)
        const physicalPenetration = (ascean.ringOne.physicalPenetration * rarities.ringOne) + (ascean.ringTwo.physicalPenetration * rarities.ringTwo) + (ascean.amulet.physicalPenetration * rarities.amulet) + (ascean.trinket.physicalPenetration * rarities.trinket) + originPhysPenMod;
        const magicalPenetration = (ascean.ringOne.magicalPenetration * rarities.ringOne) + (ascean.ringTwo.magicalPenetration * rarities.ringTwo) + (ascean.amulet.magicalPenetration * rarities.amulet) + (ascean.trinket.magicalPenetration * rarities.trinket) + originMagPenMod;
        const originPhysDefMod = (ascean.origin === 'Sedyreal' || ascean.origin === 'Nothos' ? 3 : 0);
        const originMagDefMod = (ascean.origin === 'Sedyreal' || ascean.origin === 'Notheo' ? 3 : 0);
        const physicalDefenseModifier = Math.round((ascean.helmet.physicalResistance * rarities.helmet) + (ascean.chest.physicalResistance * rarities.chest) + (ascean.legs.physicalResistance * rarities.legs) + 
            (ascean.ringOne.physicalResistance * rarities.ringOne) + (ascean.ringTwo.physicalResistance * rarities.ringTwo) + (ascean.amulet.physicalResistance * rarities.amulet) + (ascean.trinket.physicalResistance * rarities.trinket) + 
            Math.round(((attributes.constitutionMod + attributes.strengthMod + attributes.kyosirMod) / 8)) + originPhysDefMod);
        const magicalDefenseModifier = Math.round((ascean.helmet.magicalResistance * rarities.helmet) + (ascean.chest.magicalResistance * rarities.chest) + (ascean.legs.magicalResistance * rarities.legs) + 
            (ascean.ringOne.magicalResistance * rarities.ringOne) + (ascean.ringTwo.magicalResistance * rarities.ringTwo) + (ascean.amulet.magicalResistance * rarities.amulet) + (ascean.trinket.magicalResistance * rarities.trinket) + 
            Math.round(((attributes.constitutionMod + attributes.caerenMod + attributes.kyosirMod) / 8)) + originMagDefMod);
    
        const combatStats = {
            combatAttributes: attributes,
            damagePhysical: physicalDamageModifier,
            damageMagical: magicalDamageModifier,
            criticalChance: critChanceModifier,
            criticalDamage: critDamageModifier,
            dodgeCombat: dodgeModifier,
            rollCombat: rollModifier,
            penetrationPhysical: physicalPenetration,
            penetrationMagical: magicalPenetration,
            defensePhysical: physicalDefenseModifier,
            defenseMagical: magicalDefenseModifier,
            originPhysDef: originPhysDefMod,
            originMagDef: originMagDefMod
        };

        const combatWeaponOne = weaponCompiler(ascean.weaponOne, ascean, attributes, combatStats, rarities.weaponOne);
        const combatWeaponTwo = weaponCompiler(ascean.weaponTwo, ascean, attributes, combatStats, rarities.weaponTwo);
        const combatWeaponThree = weaponCompiler(ascean.weaponThree, ascean, attributes, combatStats, rarities.weaponThree);
        const defense = defenseCompiler(ascean, attributes, combatStats, rarities);
        return { ascean, attributes, combatWeaponOne, combatWeaponTwo, combatWeaponThree, defense };
    } catch (err) {
        console.log(err, 'Ascean Compiler Error');
    };
};

function requireOrigin(origin, sex) {
    switch (sex) {
        case 'Man':
            switch (origin) {
                case 'Ashtre':
                    return require('../assets/images/Ashtre-Man.jpg');
                case 'Fyers':
                    return require('../assets/images/Fyers-Man.jpg');
                case 'Li\'ivi':
                    return require('../assets/images/Li\'ivi-Man.jpg');
                case 'Notheo':
                    return require('../assets/images/Notheo-Man.jpg');
                case  'Nothos':
                    return require('../assets/images/Nothos-Man.jpg');
                case 'Quor\'eite':
                    return require('../assets/images/Quor\'eite-Man.jpg');
                case 'Sedyreal':
                    return require('../assets/images/Sedyreal-Man.jpg');
                default:
                    break;
            };
        case 'Woman':
            switch (origin) {
                case 'Ashtre':
                    return require('../assets/images/Ashtre-Woman.jpg');
                case 'Fyers':
                    return require('../assets/images/Fyers-Woman.jpg');
                case 'Li\'ivi':
                    return require('../assets/images/Li\'ivi-Woman.jpg');
                case 'Notheo':
                    return require('../assets/images/Notheo-Woman.jpg');
                case  'Nothos':
                    return require('../assets/images/Nothos-Woman.jpg');
                case 'Quor\'eite':
                    return require('../assets/images/Quor\'eite-Woman.jpg');
                case 'Sedyreal':
                    return require('../assets/images/Sedyreal-Woman.jpg');
                default:
                    break;
            };
        default:
            return require('../assets/images/Ashtre-Man.jpg');
    };
};

export { asceanCompiler, requireOrigin };