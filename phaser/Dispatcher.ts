import { KVI } from "./CombatMachine";
// import { getCombatStateUpdate, getEnemyActionFetch, getInitiateFetch, getPlayerActionFetch, getHealthFetch } from "../reducers/combatState";
// import { StatusEffect } from "../../components/GameCompiler/StatusEffects";

function weaponAction(combatData: KVI): void {
    // dispatch(getInitiateFetch({ combatData, type: 'Weapon' }));
};

function instantAction(combatData: string): void {
    // dispatch(getInitiateFetch({ combatData, type: 'Instant' }));
};

function prayerAction(combatData: any[]): void {
    // dispatch(getInitiateFetch({ combatData, type: 'Prayer' }));
};

function playerAction(data: any): void {
    // dispatch(getPlayerActionFetch(data));
};

function enemyAction(data: any): void {
    // dispatch(getEnemyActionFetch(data));
};

function actionInput({ key, value }: { key: string, value: string | number | boolean }): void {
    // dispatch(getCombatStateUpdate({ key, value }));
};

function tshaeralAction(): void {
    // dispatch(getInitiateFetch({ combatData: '', type: 'Tshaeral' }));
};

function healthAction(data: KVI): void {
    // dispatch(getHealthFetch({ key: data.key, value: data.value }));
};

export { weaponAction, instantAction, prayerAction, playerAction, enemyAction, actionInput, tshaeralAction, healthAction };