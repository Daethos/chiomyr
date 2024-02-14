import { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import ItemModal from '../components/ItemModal';
import { getRarityColor, itemStyle } from '../utility/styling';
// import playerHealthbar from '../assets/gui/player-healthbar.png';
// import playerPortrait from '../assets/gui/player-portrait.png';
import { Combat } from '../stores/combat';
// import PhaserEffects from './PhaserEffects';
import EventEmitter from '../phaser/EventEmitter';

const CombatUI = ({ state, staminaPercentage, pauseState, stamina, stealth, gameState, setGameState }) => {
    const [show, setShow] = useState(false);
    // const dispatch = useDispatch();
    // const stealth = useSelector((state: any) => state.game.stealth);
    // const stamina = useSelector((state: any) => state.combat.playerAttributes.stamina);
    const [playerHealthPercentage, setPlayerHealthPercentage] = useState(0);

    useEffect(() => {
        console.log(state.newPlayerHealth, state.playerHealth, 'New Player Health and Player Health in CombatUI')
        setPlayerHealthPercentage(Math.round((state.newPlayerHealth/state.playerHealth) * 100));
    }, [state.newPlayerHealth, state.playerHealth]); 

    useEffect(() => {
        console.log(state.weapons, 'Weapons in CombatUI')
    }, [state.weapons]);

    function showPlayer() {
        setGameState({ ...gameState, showPlayer: !gameState.showPlayer });
    };

    // useEffect(() => {
    //     let instantTimer;
    //     if (state.instantStatus) {
    //         instantTimer = setTimeout(() => dispatch(setInstantStatus(false)), 30000);
    //     } else if (!state.combatEngaged) {
    //         dispatch(setInstantStatus(false));
    //     };
    //     return () => clearTimeout(instantTimer);
    // }, [state.instantStatus, dispatch, state.combatEngaged]);

    // const disengage = () => EventEmitter.emit('disengage');

    // const getItemRarityStyle = (rarity) => {
    //     return {
    //         border: '0.15em solid ' + getBorderStyle(rarity),
    //         background: 'black',
    //         boxShadow: '0 0 2em ' + getBorderStyle(rarity),
    //         borderRadius: '0 0 50% 50% / 50% 50% 50% 50%', // Custom border radius values
    //     };
    // };

    // id={state.playerDamaged ? 'flicker' : ''} id={state.isCaerenic ? 'phaser-caerenic' : ''}

    return (
        <View style={[styles.playerCombatUi]} > 
            {/* <CombatModals state={state} />  */}
            <Text onPress={showPlayer} style={styles.storyName}>{state.player.name}</Text>
            <View style={[styles.storyHealthBar, styles.center]}>
                <Text style={styles.storyPortrait}>{`${Math.round(state.newPlayerHealth)} / ${state.playerHealth} [${playerHealthPercentage}%]`}</Text>
                <View style={[{ position: 'absolute', bottom: 0, left: 0, top: 0 }, 
                { width: `${playerHealthPercentage}%`, backgroundColor: stealth ? 'darkgrey' : 'black' }]}></View>
            </View>
            <Image source={require('../assets/gui/player-healthbar.png')} alt="Health Bar" style={[styles.storyHealthbarBorder]} />
                
            <View style={[styles.staminaBubble]}>
                <Image source={require('../assets/gui/player-portrait.png')} alt="Player Portrait" style={styles.staminaPortrait} />
                <Text style={styles.stamina}>{Math.round((staminaPercentage * stamina / 100))}</Text>
                <View style={[{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#008000' }, { height: `${staminaPercentage}%` }]}></View>
            </View>
            <TouchableOpacity onPress={() => setShow(!show)} style={[itemStyle(state.weapons[0].rarity), styles.combatUiWeapon]}>
                <img src={state.weapons[0].imgUrl} />
            </TouchableOpacity>
            {/* <View style={styles.combatUiWeapon}> 
            </View> */}
            { show && (
                <ItemModal item={state.weapons[0]} show={show} setShow={setShow} stalwart={state.isStalwart} caerenic={state.isCaerenic} />
            )}
            {/* <div className='stalwart'>
            { state.isStalwart && (
                <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(state.player.shield, true)}>
                    <img src={state.player.shield.imgURL} id='phaser-pulse' className="m-1 eqp-popover spec" alt={state.player.shield.name} style={getItemRarityStyle(state.player.shield.rarity)} />
                </OverlayTrigger>
            ) }
            </div> */}
            {/* { state.playerEffects.length > 0 && (
                <div className='combat-effects' style={{ zIndex: 2 }}>
                    {state.playerEffects.map((effect: any, index: number) => {
                        return ( <PhaserEffects state={state} effect={effect} pauseState={pauseState} key={index} /> )
                    })}
                </div>
            ) }  */}
            {/* <div className='disengage'>
                {stealth && state.computer ? <Button variant='' style={{ color: '#fdf6d8', fontSize: '12px' }} onClick={disengage}>Disengage</Button> : ''}
            </div> */}
        </View> 
    );
};

export default CombatUI;