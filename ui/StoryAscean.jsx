// import AsceanImageCard from '../../components/AsceanImageCard/AsceanImageCard';
import AsceanImageCard from '../components/AsceanImageCard';
import AttributeModal, { AttributeCompiler } from '../utility/attributes';
import ItemModal from '../components/ItemModal';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import { Combat } from '../stores/combat';

// import StoryHealthBar from './StoryHealthBar';
// import LevelUpModal from '../../components/GameCompiler/LevelUpModal';
// import ExperienceBar from '../../components/GameCompiler/ExperienceBar';
import { useEffect, useState } from 'react';
// import PhaserInventoryBag from './PhaserInventoryBag';
import statPng from '../../game/images/newStats.png';
// import Inventory from '../../components/GameCompiler/Inventory';
// import Firewater from '../../components/GameCompiler/Firewater';
// import { getOnlyInventoryFetch, setShakeDuration, setShakeIntensity, setTutorialContent, setVibrationTime, setVolume } from '../reducers/gameState';
// import { Equipment, Player } from '../../components/GameCompiler/GameStore';
// import { CombatSettings, GeneralSettings, InventorySettings, TacticSettings, ControlSettings } from '../../components/GameCompiler/SettingConcerns';

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


const StoryAscean = ({ ascean, asceanViews, restartGame, asceanState, gameState, combatState }) => {
    // const dispatch = useDispatch();
    // const asceanState = useSelector((state) => state.game.asceanState);
    // const gameState = useSelector((state) => state.game);
    // const state = useSelector((state) => state.combat) as Combat;
    const [savingInventory, setSavingInventory] = useState(false);
    const [currentSetting, setCurrentSetting] = useState<string>('Control');
    const [currentCharacter, setCurrentCharacter] = useState('Statistics');
    const [playerTraitWrapper, setPlayerTraitWrapper] = useState<any>({});
    const [dragAndDropInventory, setDragAndDropInventory] = useState(ascean.inventory);
    const [highlighted, setHighlighted] = useState({ item: null, comparing: false });
    const [show, setShow] = useState(false);

    // useEffect(() => {
    //     playerTraits();
    // }, [ascean]);

    // useEffect(() => {
    //     if (ascean.tutorial.firstInventory && ascean.inventory.length && asceanViews === 'Inventory') dispatch(setTutorialContent('firstInventory'));
    // }, [ascean.tutorial, asceanViews, dispatch]);

    // useEffect(() => {
    //     setDragAndDropInventory(ascean.inventory);
    //     checkHighlight();
    // }, [ascean.inventory]);

    const checkHighlight = () => {
        if (highlighted?.item) {
            const item = ascean.inventory.find((item) => item?._id === highlighted?.item?._id);
            if (!item) setHighlighted({ item: null, comparing: false });
        };
    };

    const saveInventory = async (inventory) => {
        try {
            setSavingInventory(true);
            const flattenedInventory = inventory.map((item) => item?._id);
            const data = { ascean: ascean._id, inventory: flattenedInventory };
            // await asceanAPI.saveAsceanInventory(data);
            // dispatch(getOnlyInventoryFetch(ascean._id));
            setSavingInventory(false);
        } catch (err) {
            console.log(err, "Error Saving Inventory");
        };
    };

    const playerTraits = async () => {
        console.log('playerTraits')
    //     const fetchTrait = async (trait: string) => {
    //         switch (trait) {
    //             case "Arbituous":
    //                 return {
    //                     name: "Arbituous",
    //                     traitOneName: "Luckout",
    //                     traitOneDescription: "Convince the enemy through rhetoric to cease hostility.",
    //                     traitTwoName: "Persuasion",
    //                     traitTwoDescription: "Use knowledge of Ley Law to deter enemies from aggression."
    //                 };
    //             case "Astral":
    //                 return {
    //                     name: "Astral",
    //                     traitOneName: "Impermanence",
    //                     traitOneDescription: "Perform combat maneuvers that are impossible to follow, and thus impossible to counter.",
    //                     traitTwoName: "Pursuit",
    //                     traitTwoDescription: "Force encounters, even with enemies that would normally avoid you."
    //                 };
    //             case "Cambiren":
    //                 return {
    //                     name: "Cambiren",
    //                     traitOneName: "Caerenicism",
    //                     traitOneDescription: "Your caer doubles up on attacks.",
    //                     traitTwoName: "Mini-Game",
    //                     traitTwoDescription: "You can disarm and evoke your enemy's caer into a battle of its own."
    //                 };
    //             case "Chiomic":
    //                 return {
    //                     name: "Choimic",
    //                     traitOneName: "Luckout",
    //                     traitOneDescription: "Invoke the Ancient Chiomyr, reducing the enemy to a broken mind of mockery.",
    //                     traitTwoName: "Persuasion",
    //                     traitTwoDescription: "Cause bouts of confusion and disorientation in the enemy."
    //                 };
    //             case "Fyeran":
    //                 return {
    //                     name: "Fyeran",
    //                     traitOneName: "Persuasion",
    //                     traitOneDescription: "You can convince those who see this world with peculiarity.",
    //                     traitTwoName: "Seer",
    //                     traitTwoDescription: "Your next attack is Fyers."
    //                 };
    //             case "Kyn'gian":
    //                 return {
    //                     name: "Kyn'gian",
    //                     traitOneName: "Avoidance",
    //                     traitOneDescription: "You can avoid most encounters.",
    //                     traitTwoName: "Endurance",
    //                     traitTwoDescription: "You are able to recover your health over time."
    //                 };
    //             case "Kyr'naic":
    //                 return {
    //                     name: "Kyr'naic",
    //                     traitOneName: "Luckout",
    //                     traitOneDescription: "Convince the enemy to acquiesce, giving their life to the Aenservaesai.",
    //                     traitTwoName: "Persuasion",
    //                     traitTwoDescription: "Cause the enemy to embrace the hush and tendril."
    //                 };
    //             case "Ilian":
    //                 return {
    //                     name: "Ilian",
    //                     traitOneName: "Heroism",
    //                     traitOneDescription: "You exude a nature that touches others inexplicably.",
    //                     traitTwoName: "Persuasion",
    //                     traitTwoDescription: "The weight of your words can sway the minds of others."
    //                 };
    //             case "Lilosian":
    //                 return {
    //                     name: "Lilosian",
    //                     traitOneName: "Luckout",
    //                     traitOneDescription: "Convince the enemy to profess their follies and willow.",
    //                     traitTwoName: "Persuasion",
    //                     traitTwoDescription: "Speak to your enemy's faith and stay their hand."
    //                 };
    //             case "Ma'anreic":
    //                 return {
    //                     name: "Ma'anreic",
    //                     traitOneName: "Negation",
    //                     traitOneDescription: "You can negate the armor of your enemy.",
    //                     traitTwoName: "Thievery",
    //                     traitTwoDescription: "You can steal items from anyone and anywhere."
    //                 };
    //             case "Sedyrist":
    //                 return {
    //                     name: "Sedyrist",
    //                     traitOneName: "Investigative",
    //                     traitOneDescription: "You have a knack for piecing together peculiarities.",
    //                     traitTwoName: "Tinkerer",
    //                     traitTwoDescription: "You can deconstruct and reconstruct armor and weapons."
    //                 };
    //             case "Se'van":
    //                 return {
    //                     name: "Se'van",
    //                     traitOneName: "Berserk",
    //                     traitOneDescription: "Your attacks grow stronger for each successive form of damage received.",
    //                     traitTwoName: "Mini-Game",
    //                     traitTwoDescription: "Grip your enemy in a vice of your own design."
    //                 };
    //             case "Shaorahi":
    //                 return {
    //                     name: "Shaorahi",
    //                     traitOneName: "Conviction",
    //                     traitOneDescription: "Your attacks grow stronger the more you realize them.",
    //                     traitTwoName: "Persuasion",
    //                     traitTwoDescription: "You can put the enemy in awe of your power, and have them cease their assault."
    //                 };
    //             case "Shrygeian":
    //                 return {
    //                     name: "Shrygeian",
    //                     traitOneName: "Knavery",
    //                     traitOneDescription: "Your explorations are amusing.",
    //                     traitTwoName: "Mini-Game",
    //                     traitTwoDescription: "You can duel the enemy."
    //                 };
    //             case "Tshaeral":
    //                 return {
    //                     name: "Tshaeral",
    //                     traitOneName: "Mini-Game",
    //                     traitOneDescription: "Your caer is imbued with tshaeral desire, a hunger to devour the world.",
    //                     traitTwoName: "Persuasion",
    //                     traitTwoDescription: "Your nature has a way of wilting the caer of your enemies."
    //                 };
    //             default: 
    //                 return {};
    //         };
    //     };
    //     setPlayerTraitWrapper({
    //         'primary': await fetchTrait(gameState.traits.primary.name),
    //         'secondary': await fetchTrait(gameState.traits.secondary.name),
    //         'tertiary': await fetchTrait(gameState.traits.tertiary.name)
    //     });
    };

    const saveGameSettings = async () => {
        try {
            const settings = {
                mapMode: gameState.mapMode,
                joystickSpeed: gameState.joystickSpeed,
                soundEffectVolume: gameState.soundEffectVolume,
                timeLeft: gameState.timeLeft,
                moveTimer: gameState.moveTimer,
                shake: gameState.shake,
                canvasPosition: gameState.canvasPosition,
                canvasHeight: gameState.canvasHeight,
                canvasWidth: gameState.canvasWidth,
                vibrationTime: gameState.vibrationTime,
            };
            // await settingsAPI.updateSettings(settings);
        } catch (err) {
            console.log(err, "Error Saving Game Settings");
        };
    };

    // const handleShakeDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setShakeDuration(parseFloat(e.target.value)));
    // const handleShakeIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setShakeIntensity(parseFloat(e.target.value)));
    // const handleVibrationChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setVibrationTime(parseFloat(e.target.value)));
    // const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setVolume(parseFloat(e.target.value)));
    const handleSettingChange = (e) => setCurrentSetting(e.target.value); 
    const handleCharacterChange = (e) => setCurrentCharacter(e.target.value);

    // const createCharacterInfo = (character: string) => {
    //     switch (character) {
    //         case CHARACTERS.STATISTICS:
    //             const highestDeity = Object.entries(ascean?.statistics?.combat?.deities as { [key: string]: number }).reduce((a, b) => a?.[1] > b?.[1] ? a : b);
    //             const highestPrayer = Object.entries(ascean?.statistics?.combat?.prayers as { [key: string]: number }).reduce((a, b) => a?.[1] > b?.[1] ? a : b);
    //             let highestMastery = Object.entries(ascean?.statistics?.mastery as { [key: string]: number }).reduce((a, b) => a[1] > b[1] ? a : b);
    //             if (highestMastery?.[1] === 0) highestMastery = [ascean?.mastery, 0];
    //             return (
    //                 <>
    //                     <Text style={{ textShadowColor: 'purple' }}>Attacks</Text>
    //                     Magical: <Text style={styles.gold}>{ascean?.statistics?.combat?.attacks?.magical}</Text>{'\n'}
    //                     Physical: <Text style={styles.gold}>{ascean?.statistics?.combat?.attacks?.physical}</Text>{'\n'}
    //                     Highest Damage: <Text style={styles.gold}>{Math.round(ascean?.statistics?.combat?.attacks?.total)}</Text>{'\n'}{'\n'}
    //                     <Text style={{ textShadowColor: 'purple' }}>Combat</Text>
    //                     Mastery: <Text style={styles.gold}>{highestMastery[0].charAt(0).toUpperCase() + highestMastery[0].slice(1)} - {highestMastery[1]}</Text>{'\n'}
    //                     Wins / Losses: <Text style={styles.gold}>{ascean?.statistics?.combat?.wins} / {ascean?.statistics?.combat?.losses}</Text>{'\n'}{'\n'}
    //                     <Text style={{ textShadowColor: 'purple' }}>Prayers</Text>
    //                     Consumed / Invoked: <Text style={styles.gold}>{ascean?.statistics?.combat?.actions?.consumes} / {ascean?.statistics?.combat?.actions?.prayers} </Text>{'\n'}
    //                     Highest Prayer: <Text style={styles.gold}>{highestPrayer[0].charAt(0).toUpperCase() + highestPrayer[0].slice(1)} - {highestPrayer[1]}</Text>{'\n'}
    //                     Favored Deity: <Text style={styles.gold}>{highestDeity[0]}</Text>{'\n'}
    //                     Blessings: <Text style={styles.gold}>{highestDeity[1]}</Text>
    //                 </>
    //             );
    //         case CHARACTERS.TRAITS:
    //             return (
    //                 <>
    //                 <Text style={{ textShadowColor: 'purple' }}>{playerTraitWrapper?.primary?.name}</Text>
    //                     <Text>{playerTraitWrapper?.primary?.traitOneName} - {playerTraitWrapper?.primary?.traitOneDescription}</Text>
    //                     <Text>{playerTraitWrapper?.primary?.traitTwoName} - {playerTraitWrapper?.primary?.traitTwoDescription}</Text>
    //                 <Text style={{ textShadowColor: 'purple' }}>{playerTraitWrapper?.secondary?.name}</Text>
    //                     <Text>{playerTraitWrapper?.secondary?.traitOneName} - {playerTraitWrapper?.secondary?.traitOneDescription}</Text>
    //                     <Text>{playerTraitWrapper?.secondary?.traitTwoName} - {playerTraitWrapper?.secondary?.traitTwoDescription}</Text>
    //                 <Text style={{ textShadowColor: 'purple' }}>{playerTraitWrapper?.tertiary?.name}</Text>
    //                     <Text>{playerTraitWrapper?.tertiary?.traitOneName} - {playerTraitWrapper?.tertiary?.traitOneDescription}</Text>
    //                     <Text>{playerTraitWrapper?.tertiary?.traitTwoName} - {playerTraitWrapper?.tertiary?.traitTwoDescription}</Text>
    //                 </>
    //             );
    //         default:
    //             return ('');
    //     };
    // };

    const createSettingInfo = (setting) => {
        console.log(setting, "createSettingInfo");
    //     switch (setting) {
    //         case SETTINGS.ACTIONS:
    //             return (
    //                 <CombatSettings /> 
    //             );
    //         case SETTINGS.INVENTORY:
    //             return (
    //                 <InventorySettings />
    //             );
    //         case SETTINGS.GENERAL:
    //             return (
    //                 <GeneralSettings />
    //             );
    //         case SETTINGS.TACTICS:
    //             return (
    //                 <TacticSettings />
    //             );
    //         case SETTINGS.CONTROL:
    //             return (
    //                 <ControlSettings />
    //             );
    //         default:
    //             return ('');
    //     };
    };


    return (
        <View style={{ zIndex: 1 }}>
        <img src ={statPng} alt="Player Portrait" style={{ position: "absolute" }} />
        { asceanViews === VIEWS.CHARACTER ? (
            <>
            <Text style={styles.storyMenuHeading}>
            Character
            </Text>
            <select value={currentCharacter} onChange={handleCharacterChange} style={{ position: "absolute", width: "25%", left: "67.5%", top: "11%", background: "black", color: "#fdf6d8", borderColor: "#fdf6d8", textAlign: "center", paddingRight: '0.75rem' }}>
                <option value="Statistics">Statistics</option>
                <option value="Traits">Traits</option> 
            </select>
            </>
        ) : asceanViews === VIEWS.INVENTORY ? (
            <>
            <Text style={styles.storyMenuHeading}>
            Inventory
            </Text> 
            {/* <Firewater /> */}
            <div style={styles.storySaveInventoryOuter}>
                <TouchableOpacity onPress={() => saveInventory(dragAndDropInventory)} style={styles.storySaveInventory}>
                { savingInventory ? ( 
                    <ActivityIndicator style={styles.center} size='large' color='#0000FF' /> 
                ) : ( 
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 512 512">
                        <path d="M29.438 59.375c-3.948.032-7.903.093-11.875.188 4.333 2.772 8.685 5.483 13.062 8.124C126.162 123.92 230.69 151.4 340.5 180.594c.022.006.04.025.063.03.02.006.043-.004.062 0 1.87.498 3.72 1.003 5.594 1.5l.155-.53c.947.078 1.91.125 2.875.125 4.26 0 8.34-.767 12.125-2.19l-12.5 46.595 18.063 4.813L383 170.968c25.828 1.312 50.508 6.867 74.28 15.845-1.065 11.948 2.73 21.82 9.814 23.718 8.71 2.335 19.136-8.313 23.28-23.78 1.27-4.742 1.78-9.366 1.657-13.594l.345-1.28c-.136-.008-.27-.025-.406-.032-.56-8.924-4.116-15.77-9.876-17.313-6.808-1.823-14.666 4.304-19.75 14.44-25.275-3.725-49.624-10.894-72.47-23.69l16.345-60.968-18.033-4.843-12.093 45.155c-3.24-3.908-7.318-7.1-11.938-9.313l.094-.374C250.12 83.98 144.89 58.446 29.437 59.374zm161.25 44.25c55.52-.002 105.272 12.492 159.656 27.03 8.536.55 15.094 7.463 15.094 16.157 0 9.06-7.127 16.22-16.188 16.22-2.4 0-4.653-.5-6.688-1.407-56.172-15.04-109.352-27.786-157.406-57.97 1.85-.027 3.694-.03 5.53-.03zm-46.22 164.25v20.344H55.532c15.996 38.806 51.258 65.428 88.94 74.28v32.97h58.56c-12.115 30.534-33.527 55.682-58.5 77.592h-25.436v18.72h284.344v-18.72H376c-28.728-21.894-50.024-47.016-61.594-77.593h63.656V366.31c19.75-6.995 39.5-19.54 59.25-36.718-19.806-17.518-39.235-27.25-59.25-31.938v-29.78H144.47z"></path>
                    </svg>
                ) }
                </TouchableOpacity>
            </div>
            </>
        ) : asceanViews === VIEWS.SETTINGS ? (
            <>
            <Text style={styles.storyMenuHeading}>
                Settings
            </Text>
            <select value={currentSetting} onChange={handleSettingChange} style={{ position: "absolute", width: "25%", left: "67.5%", top: "11%", background: "black", color: "#fdf6d8", borderColor: "#fdf6d8", textAlign: "center", paddingRight: '0.75rem' }}>
                <option value="Actions">Actions</option> 
                <option value="Control">Control</option>
                <option value="General">General</option>
                <option value="Inventory">Inventory</option>
                <option value="Tactics">Tactics</option>
            </select>
            </>
        ) : ( '' ) }
        <View style={styles.storyBlock}>
            <View style={styles.storyAscean}> 
                {/* { ascean.experience === ascean.level * 1000 ? (
                    <LevelUpModal asceanState={asceanState} />
                ) : ( '' ) }  */}
                <Text style={{ textAlign: 'center', color: "#fdf6d8", width: '96%' }}>
                    {combatState.player.name}
                </Text>
                <View style={{ marginBottom: "15%" }}>
                    {/* <StoryHealthBar totalPlayerHealth={combatState.playerHealth} newPlayerHealth={combatState.newPlayerHealth} /> */}
                </View>
                <AsceanImageCard ascean={ascean} />
                {/* <ExperienceBar totalExperience={ascean.level * 1000} currentExperience={ascean.experience} /> */}
            </View>
        </View>
        <View style={styles.storyWindowTwo}>
            { asceanViews === VIEWS.CHARACTER ? (
                <View>
                    <img src={combatState.player.imgUrl} style={styles.originPic} />
                    <Text style={[styles.gold, styles.creatureHeadingH2]}>{combatState.player.description}</Text>
                    <View style={styles.propertyBlock}>
                        Level: <Text style={{ color: "gold" }}>{combatState.player.level}</Text>{'\n'}
                        {ascean.currency?.silver ? <>Silver: <Text style={{ color: "gold" }}>{ascean.currency.silver}</Text> Gold: <Text style={{ color: "gold" }}>{ascean.currency.gold} {'\n'}</Text></> : '' }
                        Mastery: <Text style={{ color: "gold" }}>{combatState.player.mastery}</Text>{'\n'}
                        Magical Defense: <Text style={{ color: "gold" }}>{combatState.playerDefense.magicalDefenseModifier}% / [{combatState.playerDefense.magicalPosture}%]</Text>{'\n'}
                        Physical Defense: <Text style={{ color: "gold" }}>{combatState.playerDefense.physicalDefenseModifier}% / [{combatState.playerDefense.physicalPosture}%]</Text>{'\n'}
                        Initiative: <Text style={{ color: "gold" }}>{combatState.playerAttributes.initiative}</Text>
                    </View>
                    <AttributeCompiler ascean={combatState.player} />
                </View>
            ) : asceanViews === VIEWS.INVENTORY ? (
                <>
                <Text style={styles.basicText}>Views - Inventory</Text>
                {/* { highlighted.comparing && (
                    <Inventory bag={ascean.inventory} inventory={highlighted.item} ascean={ascean} index={0} compare={true} />
                ) } */}
                </> 
            ) : asceanViews === VIEWS.SETTINGS ? (
                <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
                    <Text style={{ color: 'gold', marginLeft: 'auto' }}>
                        Gameplay Controls
                    <TouchableOpacity onPress={saveGameSettings} style={{ position: 'absolute' }}>
                        <Text style={styles.gold}>Save</Text>
                    </TouchableOpacity>
                    </Text>
                    {'\n'}
                    {/* <h6>
                        <span style={{ float: "left" }}></span>
                        Screenshake Duration ({gameState.shake.duration})
                        <span style={{ float: "right" }}></span>
                    </h6>
                    <Form.Range value={gameState.shake.duration} onChange={handleShakeDurationChange} min={0} max={1000} step={50} />{'\n'}

                    <h6>
                        <span style={{ float: "left" }}></span>
                        Screenshake Intensity ({gameState.shake.intensity})
                        <span style={{ float: "right" }}></span>
                    </h6>
                    <Form.Range value={gameState.shake.intensity} onChange={handleShakeIntensityChange} min={0} max={5} step={0.25} />{'\n'}

                    <h6>
                        <span style={{ float: "left" }}></span>
                        Sound Volume ({gameState.soundEffectVolume})
                        <span style={{ float: "right" }}></span>
                    </h6>
                    <Form.Range value={gameState.soundEffectVolume} onChange={handleVolumeChange} min={0} max={1} step={0.1} />{'\n'}

                    <h6>
                        <span style={{ float: "left" }}></span>
                        Vibration Time ({gameState.vibrationTime})
                        <span style={{ float: "right" }}></span>
                    </h6>
                    <Form.Range value={gameState.vibrationTime} onChange={handleVibrationChange} min={0} max={1000} step={50} />{'\n'}{'\n'}
                    <TouchableOpacity style={{ position: 'absolute', marginLeft: '5%' }} onPress={() => setShow(true)}>Reset Scene</TouchableOpacity> */}
                    {/* <Modal show={show} onHide={() => setShow(false)} style={{ top: '-25%', zIndex: 9999 }} centered>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ color: 'red' }}>Reset Scene</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Text>Are you sure you want to reset the scene?</Text>
                        </Modal.Body>
                        <Modal.Footer>
                            <TouchableOpacity style={{ color: 'gold' }} onPress={() => setShow(false)}>No</TouchableOpacity>
                            <TouchableOpacity style={{ color: 'red' }} onPress={() => restartGame()}>Yes</TouchableOpacity>
                        </Modal.Footer>
                    </Modal> */}
                    {/* <TouchableOpacity style={[styles.stdInput, { marginTop: '80%' }]} onPress={returnHome}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                    </svg> Return Home</TouchableOpacity> */}
                </View>
            ) : ( '' ) }
        </View>
        <View style={styles.storyWindowThree}>
            { asceanViews === VIEWS.CHARACTER ? (
                <Text style={{ maxHeight: "100%" }}> 
                    Character View
                    {/* {createCharacterInfo(currentCharacter)} */}
                </Text>
            ) : asceanViews === VIEWS.INVENTORY ? (
                <Text style={styles.basicText}>Views - Inventory</Text>
                // <PhaserInventoryBag setDragAndDropInventory={setDragAndDropInventory} dragAndDropInventory={dragAndDropInventory} highlighted={highlighted} setHighlighted={setHighlighted} /> 
            ) : asceanViews === VIEWS.SETTINGS ? (
                // <div className='p-2' style={{ overflowY: "scroll", scrollbarWidth: "none", height: "100%" }}>{createSettingInfo(currentSetting)}</div>
                <Text style={styles.basicText}>Views - Settings</Text>
            ) : ( '' ) }
        </View>
        </View>
    );
};

export default StoryAscean;