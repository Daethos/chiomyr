import { Modal, Text, TouchableHighlight, View } from "react-native"
import { styles } from "../styles"
import { getRarityColor } from "../utility/styling"
import { useDeviceOrientation } from '@react-native-community/hooks';

function attrSplitter(string, value) {
    return <Text>{string}: <Text style={styles.gold}>+{value} </Text></Text>
};

export default function ItemModal({ item, show, setShow, stalwart, caerenic }) {
    const orientation = useDeviceOrientation();
    return (
        <Modal animationType="fade" transparent={true} visible={show} onRequestClose={() => setShow(!show)}>
            <TouchableHighlight onPress={() => setShow(!show)} style={[styles.border, styles.popover, { maxHeight: orientation === 'landscape' ? '70%' : '50%' }]}>
            <View>
                <Text style={[styles.header, styles.creatureHeadingH1, styles.gold]}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    <img src={item.imgUrl} />
                </Text>
                <Text>~{'\n'}</Text>
                <Text style={[styles.basicText, styles.taper]}>
                { item?.name === 'Empty Weapon Slot' || item?.name === 'Empty Shield Slot' || item?.name === 'Empty Amulet Slot' || item?.name === 'Empty Ring Slot' || item?.name === 'Empty Trinket Slot' ? ( '' ) : 
                <>
                    { item?.type && item?.grip ? ( <>
                        {item?.type} [{item?.grip}] <Text>{'\n'}</Text>
                        {item?.attackType} [{item?.damageType?.[0]}{item?.damageType?.[1] ? ' / ' + item.damageType[1] : '' }{item?.damageType?.[2] ? ' / ' + item?.damageType?.[2] : '' }] <Text>{'\n'}</Text><Text>{'\n'}</Text>
                    </> ) : item?.type ? ( <>{item.type} <Text>{'\n'}</Text></> ) : ( '' ) }
                    { item?.constitution > 0 ? attrSplitter('CON', item?.constitution) : '' }
                    { item?.strength > 0 ? attrSplitter('STR', item?.strength) : '' }
                    { item?.agility > 0 ? attrSplitter('AGI', item?.agility) : '' }
                    { item?.achre > 0 ? attrSplitter('ACH', item?.achre) : '' }
                    { item?.caeren > 0 ? attrSplitter('CAER', item?.caeren) : '' }
                    { item?.kyosir > 0 ? attrSplitter('KYO', item?.kyosir) : '' }<Text>{'\n'}</Text>
                    Damage: <Text style={styles.gold}>{item?.physicalDamage}</Text> Phys | <Text style={styles.gold}>{item?.magicalDamage}</Text> Magi <Text>{'\n'}</Text>
                    { item?.physicalResistance || item?.magicalResistance ? ( <>
                        Defense: <Text style={styles.gold}>{item?.physicalResistance}</Text> Phys | <Text style={styles.gold}>{item?.magicalResistance}</Text> Magi <Text>{'\n'}</Text>
                    </> ) : ( '' ) }
                    { item?.physicalPenetration || item?.magicalPenetration ? ( <>
                        Penetration: <Text style={styles.gold}>{item?.physicalPenetration}</Text> Phys | <Text style={styles.gold}>{item?.magicalPenetration}</Text> Magi <Text>{'\n'}</Text>
                    </> ) : ( '' ) }
                    Crit Chance: <Text style={styles.gold}>{item?.criticalChance}%</Text> <Text>{'\n'}</Text>
                    Crit Damage: <Text style={styles.gold}>{item?.criticalDamage}x</Text> <Text>{'\n'}</Text>
                    Roll Chance: <Text style={styles.gold}>{item?.roll}%</Text> <Text>{'\n'}</Text>
                    { item?.influences && item?.influences?.length > 0 ? ( <>
                        Influence: <Text style={styles.gold}>{item?.influences?.[0]}</Text><Text>{'\n'}</Text>
                    </> ) : ( '' ) }
                    <Text style={{ color: getRarityColor(item?.rarity) }}>
                        {item?.rarity}
                    </Text>
                    { stalwart && (
                        <Text style={[styles.basicText, styles.gold]}>
                            Stalwart - You are engaged in combat with your shield raised, adding it to your passive defense. 
                            You receive 50% less poise damage. 
                            You receive 10% less damage. 
                            You cannot dodge or roll.
                        </Text>
                    ) } 
                    { caerenic && (
                        <Text style={[styles.basicText, styles.gold]}>
                            Caerenic - You attempt to harnass your caer with your achre, increasing your damage by 15%. 
                            You move 15% faster. 
                            You receive 25% more damage. 
                        </Text>
                    ) }
                </> }</Text>
                <Text style={[styles.basicText, styles.gold, styles.taper]}>{item.gameplay}</Text>
            </View>
            </TouchableHighlight>
        </Modal>
    );
};