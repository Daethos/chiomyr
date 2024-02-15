export interface Game {
    player: any;
    dialog: any;
    asceanViews: string;

    currentGame: boolean;
    gameTimer: number;
    gameChange: boolean;
    staminaPercentage: number;

    instantStatus: boolean;
    selectedPrayerIndex: number;
    selectedDamageTypeIndex: number;
    selectedWeaponIndex: number;
    selectedHighlight: string;
    scrollEnabled: boolean;

    showDialog: boolean;
    showInventory: boolean;
    showLoot: boolean;

    inventory: any[];
    lootDrops: any[];
    merchantEquipment: any[];
    showLootIds: any[];

    pauseState: boolean;
    shake: { duration: number; intensity: number; time: number; };
    joystickSpeed: number;
    soundEffectVolume: number;
};

export const initGame: Game = {
    player: {},
    dialog: {},
    asceanViews: 'Inventory',

    currentGame: false,
    gameTimer: 0,
    gameChange: false,
    staminaPercentage: 0,
    
    instantStatus: false,
    selectedPrayerIndex: 0,
    selectedDamageTypeIndex: 0,
    selectedWeaponIndex: 0,
    selectedHighlight: 'Weapon',
    scrollEnabled: false,

    showDialog: false,
    showInventory: false,
    showLoot: false,

    inventory: [],
    lootDrops: [],
    merchantEquipment: [],
    showLootIds: [],

    pauseState: false,
    shake: { duration: 0, intensity: 0, time: 0 },
    joystickSpeed: 0,
    soundEffectVolume: 0,
};