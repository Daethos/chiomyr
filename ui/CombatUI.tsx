import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import ItemModal from '../components/ItemModal';
import { getRarityColor } from '../utility/styling';
import playerHealthbar from '../assets/gui/player-healthbar.png';
import playerPortrait from '../assets/gui/player-portrait.png';
import { Combat } from '../stores/combat';
// import PhaserEffects from './PhaserEffects';
import EventEmitter from '../phaser/EventEmitter';

interface CombatUIProps {
    state: Combat;
    staminaPercentage: number;
    pauseState: boolean;    
    stamina: number;
    stealth: boolean;
};

const CombatUI = ({ state, staminaPercentage, pauseState, stamina, stealth }: CombatUIProps) => {
    const [show, setShow] = useState(false);
    // const dispatch = useDispatch();
    // const stealth = useSelector((state: any) => state.game.stealth);
    // const stamina = useSelector((state: any) => state.combat.playerAttributes.stamina);
    const [playerHealthPercentage, setPlayerHealthPercentage] = useState<number>(0);

    useEffect(() => {
        setPlayerHealthPercentage(Math.round((state.newPlayerHealth/state.playerHealth) * 100));
    }, [state.newPlayerHealth, state.playerHealth]); 

    // useEffect(() => {
    //     let instantTimer: ReturnType<typeof setTimeout>;
    //     if (state.instantStatus) {
    //         instantTimer = setTimeout(() => dispatch(setInstantStatus(false)), 30000);
    //     } else if (!state.combatEngaged) {
    //         dispatch(setInstantStatus(false));
    //     };
    //     return () => clearTimeout(instantTimer);
    // }, [state.instantStatus, dispatch, state.combatEngaged]);

    // const disengage = () => EventEmitter.emit('disengage');

    // const getItemRarityStyle = (rarity: string) => {
    //     return {
    //         border: '0.15em solid ' + getBorderStyle(rarity),
    //         background: 'black',
    //         boxShadow: '0 0 2em ' + getBorderStyle(rarity),
    //         borderRadius: '0 0 50% 50% / 50% 50% 50% 50%', // Custom border radius values
    //     };
    // };

    return (
        <div style={[styles.playerCombatUi]} id={state.playerDamaged ? 'flicker' : ''}> 
            {/* <CombatModals state={state} />  */}
            <img src={playerHealthbar} alt="Health Bar" style={{ position: "absolute", width: '150px', height: '40px' }} />
            <p style={styles.storyName}>{state.player.name}</p>
            {/* <ProgressBar variant={stealth ? "dark" : "info"} now={playerHealthPercentage} className='story-health-bar' /> */}
            <p className='story-portrait'>{`${Math.round(state.newPlayerHealth)} / ${state.playerHealth} [${playerHealthPercentage}%]`}</p>
            <img src ={playerPortrait} alt="Player Portrait" className='player-portrait' />
            {/* <ProgressBar variant="success" now={staminaPercentage} className='story-stamina-bubble'  /> */}
            <Text style={styles.stamina}>{Math.round((staminaPercentage / 100) * stamina)}</Text>

            <View id={state.isCaerenic ? 'phaser-caerenic' : ''} style={styles.combatUiWeapon}> 
                <ItemModal item={state.weapons[0]} show={show} setShow={setShow} stalwart={false} caerenic={state.isCaerenic} />
                {/* <ItemPopover item={state.weapons[0]} prayer={state.playerBlessing} caerenic={state.isCaerenic} /> */}
            </View>
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
        </div> 
    );
};

export default CombatUI;