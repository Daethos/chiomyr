export interface Combat {
    player: any;
    action: string;
    playerAction: string;
    counterGuess: string;
    playerBlessing: string;
    prayerSacrifice: string;
    prayerSacrificeName: string,
    playerHealth: number;
    newPlayerHealth: number;
    
    weapons: any[];

    weaponOne: any;
    weaponTwo: any;
    weaponThree: any;

    playerEffects: any[];
    playerDamageType: string;
    playerDefense: any;
    playerAttributes: any;
    playerDefenseDefault: any;
    realizedPlayerDamage: number;
    playerDamaged: boolean;
    enemyPrayerConsumed: boolean;

    playerStartDescription: string;
    playerSpecialDescription: string;
    playerActionDescription: string;
    playerInfluenceDescription: string;
    playerInfluenceDescriptionTwo: string;
    playerDeathDescription: string;

    criticalSuccess: boolean;
    counterSuccess: boolean;
    dualWielding: boolean;
    glancingBlow: boolean;
    religiousSuccess: boolean;
    rollSuccess: boolean;
    playerWin: boolean;

    computer: any;
    computerAction: string;
    computerCounterGuess: string;
    computerBlessing: string;
    computerHealth: number;
    newComputerHealth: number;

    computerWeapons: any[];
    
    computerWeaponOne: object;
    computerWeaponTwo: object;
    computerWeaponThree: object;
    
    computerEffects: any[];
    computerDamageType: string;
    computerDefense: object;
    computerAttributes: object;
    computerDefenseDefault: object;
    potentialComputerDamage: number;
    realizedComputerDamage: number;
    computerDamaged: boolean;

    attackWeight: number;
    counterWeight: number;
    dodgeWeight: number;
    postureWeight: number;
    rollWeight: number;
    counterAttackWeight: number;
    counterCounterWeight: number;
    counterDodgeWeight: number;
    counterPostureWeight: number;
    counterRollWeight: number;

    computerStartDescription: string;
    computerSpecialDescription: string;
    computerActionDescription: string;
    computerInfluenceDescription: string;
    computerInfluenceDescriptionTwo: string;
    computerDeathDescription: string;

    computerCriticalSuccess: boolean;
    computerCounterSuccess: boolean;
    computerDualWielding: boolean;
    computerGlancingBlow: boolean;
    computerReligiousSuccess: boolean;
    computerRollSuccess: boolean;
    computerWin: boolean;

    combatInitiated: boolean;
    actionStatus: boolean;
    gameIsLive: boolean;
    combatEngaged: boolean;
    instantStatus: boolean;

    combatRound: number;
    sessionRound: number;

    // actionData: [];
    // typeAttackData: [];
    // typeDamageData: [];
    // totalDamageData: number;
    // prayerData: string[];
    // deityData: [];

    weather: string;
    phaser: boolean;
    isStalwart: boolean; // +15% Defense, Cannot Dodge, Roll
    isCaerenic: boolean; // +15% Attack, -15% Defense
    enemyID: string;
    combatTimer: number;
    soundEffects: boolean;

    // isEnemy: boolean;
    // npcType: string;
    // isAggressive: boolean;
    // startedAggressive: boolean;
};

export const initCombat: Combat = {

    player: {},
    action: '',
    playerAction: '',
    counterGuess: '',
    playerBlessing: '',
    prayerSacrifice: '',
    prayerSacrificeName: '',
    playerHealth: 0,
    newPlayerHealth: 0,
    
    weapons: [],

    weaponOne: {},
    weaponTwo: {},
    weaponThree: {},

    playerEffects: [],
    playerDamageType: '',
    playerDefense: {},
    playerAttributes: {},
    playerDefenseDefault: {},
    realizedPlayerDamage: 0,
    playerDamaged: false,
    enemyPrayerConsumed: false,

    playerStartDescription: '',
    playerSpecialDescription: '',
    playerActionDescription: '',
    playerInfluenceDescription: '',
    playerInfluenceDescriptionTwo: '',
    playerDeathDescription: '',

    criticalSuccess: false,
    counterSuccess: false,
    dualWielding: false,
    glancingBlow: false,
    religiousSuccess: false,
    rollSuccess: false,
    playerWin: false,

    computer: null,
    computerAction: '',
    computerCounterGuess: '',
    computerBlessing: '',
    computerHealth: 0,
    newComputerHealth: 0,

    computerWeapons: [],
    
    computerWeaponOne: {},
    computerWeaponTwo: {},
    computerWeaponThree: {},
    
    computerEffects: [],
    computerDamageType: '',
    computerDefense: {},
    computerAttributes: {},
    computerDefenseDefault: {},
    potentialComputerDamage: 0,
    realizedComputerDamage: 0,
    computerDamaged: false,

    attackWeight: 0,
    counterWeight: 0,
    dodgeWeight: 0,
    postureWeight: 0,
    rollWeight: 0,
    counterAttackWeight: 0,
    counterCounterWeight: 0,
    counterDodgeWeight: 0,
    counterPostureWeight: 0,
    counterRollWeight: 0,

    computerStartDescription: '',
    computerSpecialDescription: '',
    computerActionDescription: '',
    computerInfluenceDescription: '',
    computerInfluenceDescriptionTwo: '',
    computerDeathDescription: '',

    computerCriticalSuccess: false,
    computerCounterSuccess: false,
    computerDualWielding: false,
    computerGlancingBlow: false,
    computerReligiousSuccess: false,
    computerRollSuccess: false,
    computerWin: false,

    combatInitiated: false,
    actionStatus: false,
    gameIsLive: false,
    combatEngaged: false,
    instantStatus: false,

    combatRound: 0,
    sessionRound: 0,

    weather: '',
    phaser: false,
    isStalwart: false, // +15% Defense, Cannot Dodge, Roll
    isCaerenic: false, // +15% Attack, -15% Defense
    enemyID: '',
    combatTimer: 0,
    soundEffects: false,

};