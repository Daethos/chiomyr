import { useEffect, useRef, useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import gameManager from "./Game";
import EventEmitter from "../phaser/EventEmitter";
import { initCombat } from "../stores/combat";
import { initGame } from '../stores/game';
import { asceanCompiler } from '../utility/ascean';
import { getInventory } from '../assets/db/db';

// import CombatMouseSettings from '../../../seyr/src/game/ui/CombatMouseSettings';
// import CombatUI from '../../../seyr/src/game/ui/CombatUI';
// import EnemyUI from '../../../seyr/src/game/ui/EnemyUI';
// import PhaserCombatText from '../../../seyr/src/game/ui/PhaserCombatText';
// import SmallHud from '../../../seyr/src/game/ui/SmallHud';
// import StoryAscean, { viewCycleMap } from '../../../seyr/src/game/ui/StoryAscean';
// import StoryTutorial from '../../../seyr/src/game/ui/StoryTutorial';
// import useGameSounds from '../../../seyr/src/components/GameCompiler/Sounds'; 
// import * as eqpAPI from '../../../seyr/src/utils/equipmentApi';
// import { Equipment } from '../../../seyr/src/components/GameCompiler/GameStore';
// import { CombatData } from '../../../seyr/src/components/GameCompiler/CombatStore';
// import { LootDropUI } from '../../../seyr/src/game/ui/LootDropUI';
// import { StoryDialog } from '../../../seyr/src/game/ui/StoryDialog';
// import { clearNpc, getCombatTimerFetch, setClearGame, setToggleDamaged } from '../../../seyr/src/game/reducers/combatState';
// import { setShowDialog, setMerchantEquipment, setShowLoot, setGameTimer, setStaminaPercentage, setAsceanViews, setShowPlayer, setDialogTag, setPauseState, setCurrentGame, setScrollEnabled, setCurrentNodeIndex, setStealth } from '../../../seyr/src/game/reducers/game';
import { fetchEnemy } from '../utility/enemy';
import { styles } from '../styles';
import CombatUI from '../ui/CombatUI';
// import { setPhaserGameChange } from '../../../seyr/src/game/reducers/phaserState';


function usePhaserEvent(event, callback) {
    useEffect(() => {
        EventEmitter.on(event, callback);
        return() => EventEmitter.off(event, callback);
    }, [event, callback]);
};

function useKeyEvent(event, callback) {
    useEffect(() => {
        const listener = (event) => callback(event);
        window.addEventListener(event, listener);
        return () => window.removeEventListener(event, listener);
    }, [event, callback]);
};

const HostScene = ({ ascean }) => {
    const gameRef = useRef(null); 
    const [combat, setCombat] = useState(initCombat);
    const [gameState, setGameState] = useState(initGame);
    const [stamina, setStamina] = useState(0);
    const [staminaPercentage, setStaminaPercentage] = useState(100);

    // const stamina = useSelector((state) => combat.playerAttributes.stamina);
    // const assets = useSelector((state: any) => state.phaser.assets);
    // const combatState = useSelector((state: any) => state.combat);
    // const phaser = useSelector((state: any) => state.phaser);
    // const { playDeath, playReligion, playCounter, playRoll, playPierce, playSlash, playBlunt, playDaethic, playWild, playEarth, playFire, playBow, playFrost, playLightning, playSorcery, playWind } = useGameSounds(game.soundEffectVolume);

    // useEffect(() => { 
    //     createGame();
    // }, [asceanID]);

    useEffect(() => {
        createGame();
    }, []);

    useEffect(() => {
        updateCombatListener(combat);
    }, [combat]); 
    
    const createGame = async () => {
        const inventory = await getInventory(ascean._id);
        const res = asceanCompiler(ascean);
        setCombat({
            ...combat,
            player: res.ascean,
            playerHealth: res.ascean.health.max,
            newPlayerHealth: res.ascean.health.current,
            weapons: [res.combatWeaponOne, res.combatWeaponTwo, res.combatWeaponThree],
            weaponOne: res.combatWeaponOne,
            weaponTwo: res.combatWeaponTwo,
            weaponThree: res.combatWeaponThree,
            playerAttributes: res.attributes,
            playerDefense: res.defense,
            playerDamageType: res.combatWeaponOne.damageType[0]
        });
        setGameState({
            ...gameState,
            ascean: {
                ...ascean,
                inventory: inventory,
            }
        });
        gameRef.current = gameManager.createGame(ascean._id);
    };

    function destroyGame() {
        const game = gameRef?.current;
        if (!game) return;
        console.log(game, 'Game')
        const scene = game?.scene?.getScene('Play');
        for (let i = 0; i < scene.enemies.length; i++) {
            scene.enemies[i].cleanUp();
        };
        for (let i = 0; i < scene.npcs.length; i++) {
            scene.npcs[i].cleanUp();
        };
        scene.player.cleanUp();
        scene.cleanUp();
        while (game.firstChild) {
            game.removeChild(game.firstChild);
        };
        game.destroy(true);
        gameRef.current = null;
    };

    const restartGame = async () => {
        try {

            // dispatch(setPhaserGameChange(false));
            // dispatch(setCurrentGame(false)); 
            // dispatch(setClearGame());
            // dispatch(setShowPlayer(!game.showPlayer));
            
            destroyGame();

            // dispatch(setPhaserGameChange(true));

            setTimeout(() => {
                createGame();
            }, 500)
        } catch (err) {
            console.log(err.message, 'Error Restarting Game');
        };
    };

 
    // const clearNPC = async () => {
    //     if (game.merchantEquipment.length > 0) {
    //         await deleteEquipment(game.merchantEquipment);
            // dispatch(setMerchantEquipment([])); 
        // };
        // dispatch(clearNpc()); 
        // dispatch(setCurrentNodeIndex(0));
    // };

    // async function soundEffects(sfx) {
    //     try {
    //         const soundEffectMap = {
    //             Spooky: playDaethic,
    //             Righteous: playDaethic,
    //             Wild: playWild,
    //             Earth: playEarth,
    //             Fire: playFire,
    //             Frost: playFrost,
    //             Lightning: playLightning,
    //             Sorcery: playSorcery,
    //             Wind: playWind,
    //             Pierce: (weapon) => (weapon.type === "Bow" || weapon.type === "Greatbow") ? playBow() : playPierce(),
    //             Slash: playSlash,
    //             Blunt: playBlunt,
    //         };
    //         if (sfx.computerDamaged) {
    //             const { playerDamageType } = sfx;
    //             const soundEffectFn = soundEffectMap[playerDamageType];
    //             if (soundEffectFn) soundEffectFn(sfx.weapons[0]);
    //         };
    //         if (sfx.playerDamaged) {
    //             const { computerDamageType } = sfx;
    //             const soundEffectFn = soundEffectMap[computerDamageType];
    //             if (soundEffectFn) soundEffectFn(sfx.computerWeapons[0]);
    //         };
    //         if (sfx.religiousSuccess === true) playReligion();
    //         if (sfx.rollSuccess === true || sfx.computerRollSuccess === true) playRoll();
    //         if (sfx.counterSuccess === true || sfx.computerCounterSuccess === true) playCounter();
    //         if (sfx.playerWin) playReligion();
    //         if (sfx.computerWin) playDeath();
    //         // dispatch(setToggleDamaged(false));
    //     } catch (err) {
    //         console.log(err.message, 'Error Setting Sound Effects');
    //     };
    // };

    const gameHud = (e) => {
        e.preventDefault();
        // if (e.shiftKey && (e.key === 'c' || e.key === 'C')) dispatch(setShowDialog(!game.showDialog)); // (e.key === 'v' || e.key === 'V')
        // if (!e.shiftKey && (e.key === 'c' || e.key === 'C')) dispatch(setShowPlayer(!game.showPlayer));
        if (e.key === 'x' || e.key === 'X') {
            const nextView = viewCycleMap[gameState.asceanViews];
            // if (nextView) dispatch(setAsceanViews(nextView));
        };
        if (e.key === ' ' || e.keyCode === 32) togglePause();
        // if (e.key === '`') dispatch(setScrollEnabled(!gameState.scrollEnabled));
    }; 
    const togglePause = () => {
        const pause = () => gameRef.current.scene.getScene('Play').pause();
        const resume = () => gameRef.current.scene.getScene('Play').resume();
        if (!gameState.pauseState) { pause(); } else { resume(); };
        // dispatch(setPauseState(!gameState.pauseState));
    }; 

    // const deleteEquipment = async (eqp) => await eqpAPI.deleteEquipment(eqp);
    // const interactingLoot = async (e) => dispatch(setShowLoot(e)); 
    const launchGame = async (e) => {
        // dispatch(setCurrentGame(e));
        // if (!gameState.currentGame) dispatch(setCurrentGame(e));
        setGameState({...gameState, currentGame: e});
    };
    const sendAscean = async () => EventEmitter.emit('get-ascean', combat.player);
    const sendCombatData = async () => EventEmitter.emit('get-combat-data', combat);
    // // const sendDispatch = async () => EventEmitter.emit('get-dispatch', dispatch);
    const sendEnemyData = async () => EventEmitter.emit('get-enemy', combat.computer);
    const sendGameData = async () => EventEmitter.emit('get-game-data', gameState);
    // const sendPhaserData = async () => EventEmitter.emit('get-phaser-data', phaser);
    // const showDialog = async (e) => dispatch(setDialogTag(e));
    const updateCombatListener = (data) => EventEmitter.emit('update-combat-data', data); // Was Async
    
    const updateCombatTimer = (e) => setCombat({...combat, combatTimer: e}); 
    const updateStamina = (e) => setStaminaPercentage(staminaPercentage - e <= 0 ? 0 : gameState.staminaPercentage - e);

    function useStamina(percent) {
        useEffect(() => { 
            if (percent < 100) {
                const timer = setTimeout(() => {
                    // dispatch(setStaminaPercentage(percent + (stamina / 100)));
                    const newStamina = Math.round(((percent + (stamina / 100)) / 100) * stamina);
                    setStamina({ current: newStamina, max: stamina });
                    EventEmitter.emit('updated-stamina', newStamina);
                }, 200 - stamina);
                return () => clearTimeout(timer);
            };
        }, [percent]);
    };
    function useTimer(timer, pause, ref, game) {
        useEffect(() => {
            if (!ref || !game) return;
            if (!pause) {
                const timeout = setTimeout(() => {
                    dispatch(setGameTimer(timer + 1));
                }, 1000);
                return () => clearTimeout(timeout);
            };
        }, [timer, pause, ref, game]);
    };


    // useKeyEvent('keydown', gameHud); 
    // usePhaserEvent('clear-npc', clearNPC);
    usePhaserEvent('fetch-enemy', fetchEnemy);
    // usePhaserEvent('fetch-npc', fetchNpc);
    // usePhaserEvent('request-dispatch', sendDispatch);

    usePhaserEvent('request-ascean', sendAscean);
    usePhaserEvent('request-enemy', sendEnemyData);
    usePhaserEvent('request-combat-data', sendCombatData);
    usePhaserEvent('request-game-data', sendGameData); 
    
    // usePhaserEvent('show-dialog', showDialog);
    // usePhaserEvent('interacting-loot', interactingLoot);
    usePhaserEvent('launch-game', launchGame);
    // usePhaserEvent('stealth', (e) => dispatch(setStealth(e)));
    usePhaserEvent('update-stamina', updateStamina);
    usePhaserEvent('update-combat-timer', updateCombatTimer);
    // usePhaserEvent('update-sound', soundEffects);


    useStamina(staminaPercentage);
    useTimer(gameState.gameTimer, gameState.pauseState, gameRef.current, gameState.currentGame); // gameRef.current
 
    return (
        <SafeAreaView style={styles.storyGame}>
            { gameState.currentGame && gameRef.current && ( 
                <> 
                {/* <SmallHud ascean={gameState.player} dialogTag={gameState.dialogTag} />
                { gameState.scrollEnabled && (
                    <CombatMouseSettings damageType={combatState.weapons[0].damage_type} weapons={combatState.weapons.filter((weapon) => weapon?.name !== 'Empty Weapon Slot')} />
                ) } */}
                { gameState.showPlayer ? (  
                    <StoryAscean ascean={gameState.player} asceanViews={gameState.asceanViews} restartGame={restartGame} />
                ) : ( 
                    <div style={{ position: "absolute", zIndex: 1 }}>
                        <CombatUI state={combatState} staminaPercentage={gameState.staminaPercentage} pauseState={gameState.pauseState} />
                        {/* { combatState.combatEngaged && (
                            <div style={{ position: "absolute", top: "420px", left: "250px", zIndex: 0 }}>
                                <PhaserCombatText />
                            </div>
                        ) } 
                        { combatState.computer && (
                            <EnemyUI pauseState={gameState.pauseState} />
                        ) } */}
                    </div>
                ) }
                {/* { gameState.showDialog && gameState.dialogTag && (   
                    <StoryDialog state={combatState} deleteEquipment={deleteEquipment} />
                ) }
                { gameState?.lootDrops.length > 0 && gameState?.showLoot && (
                    <LootDropUI gameState={gameState} />   
                ) }
                { gameState.tutorial && ( 
                    // // <StoryTutorial tutorial={gameState.tutorial} dispatch={dispatch} player={gameState.player}  /> 
                ) } */}
                </> 
            ) }
            <div id='story-game' ref={gameRef}></div>
        </SafeAreaView>
    );
};

export default HostScene;