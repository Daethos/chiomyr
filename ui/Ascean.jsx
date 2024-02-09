import { createEffect, createSignal } from "solid-js";

export const viewCycleMap = {
    Character: 'Inventory',
    Inventory: 'Settings',
    Settings: 'Character'
};
const CHARACTERS = {
    STATISTICS: 'Statistics',
    TRAITS: 'Traits',
};
const VIEWS = {
    CHARACTER: 'Character',
    INVENTORY: 'Inventory',
    SETTINGS: 'Settings',
};
const SETTINGS = {
    ACTIONS: 'Actions',
    CONTROL: 'Control',
    INVENTORY: 'Inventory',
    GENERAL: 'General',
    TACTICS: 'Tactics',
};

export default function Ascean({ ascean, combat, game, views, restart }) {
    const [saveInventory, setSaveInventory] = createSignal(false);
    const [settingView, setSettingView] = createSignal('Control');
    const [characterView, setCharacterView] = createSignal('Statistics');


    return (
        <div>

        </div>
    );
};