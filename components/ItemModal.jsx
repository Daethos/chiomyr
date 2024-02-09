import { Modal, Text, TouchableHighlight, View } from "react-native"
import { styles } from "../styles"
import { getRarityColor } from "../utility/styling"

function attrSplitter(string, value) {
    return <Text>{string}: <Text style={styles.gold}>+{value} </Text></Text>
};

export default function ItemModal({ item, show, setShow, stalwart, caerenic }) {
    return (
        <Modal animationType="fade" transparent={true} visible={show} onRequestClose={() => setShow(!show)}>
            <TouchableHighlight onPress={() => setShow(!show)} style={[styles.border, styles.popover]}>
            <View>
                <Text style={[styles.header, styles.creatureHeadingH1, styles.gold]}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    <img src={item.imgUrl} />
                </Text>
                <Text>~{'\n'}</Text>
                <Text style={[styles.basicText, styles.taper]}>
                { item?.name === 'Empty Weapon Slot' || item?.name === 'Empty Shield Slot' || item?.name === 'Empty Amulet Slot' || item?.name === 'Empty Ring Slot' || item?.name === 'Empty Trinket Slot' ? ( '' ) : 
                <>
                    { item?.type && item?.grip ? ( <>
                        {item?.type} [{item?.grip}] <br />
                        {item?.attackType} [{item?.damageType?.[0]}{item?.damageType?.[1] ? ' / ' + item.damageType[1] : '' }{item?.damageType?.[2] ? ' / ' + item?.damageType?.[2] : '' }] <br /><br />
                    </> ) : item?.type ? ( <>{item.type} <br /></> ) : ( '' ) }
                    { item?.constitution > 0 ? attrSplitter('CON', item?.constitution) : '' }
                    { item?.strength > 0 ? attrSplitter('STR', item?.strength) : '' }
                    { item?.agility > 0 ? attrSplitter('AGI', item?.agility) : '' }
                    { item?.achre > 0 ? attrSplitter('ACH', item?.achre) : '' }
                    { item?.caeren > 0 ? attrSplitter('CAER', item?.caeren) : '' }
                    { item?.kyosir > 0 ? attrSplitter('KYO', item?.kyosir) : '' }<br />
                    Damage: <Text style={styles.gold}>{item?.physicalDamage}</Text> Phys | <Text style={styles.gold}>{item?.magicalDamage}</Text> Magi <br />
                    { item?.physicalResistance || item?.magicalResistance ? ( <>
                        Defense: <Text style={styles.gold}>{item?.physicalResistance}</Text> Phys | <Text style={styles.gold}>{item?.magicalResistance}</Text> Magi <br />
                    </> ) : ( '' ) }
                    { item?.physicalPenetration || item?.magicalPenetration ? ( <>
                        Penetration: <Text style={styles.gold}>{item?.physicalPenetration}</Text> Phys | <Text style={styles.gold}>{item?.magicalPenetration}</Text> Magi <br />
                    </> ) : ( '' ) }
                    Crit Chance: <Text style={styles.gold}>{item?.criticalChance}%</Text> <br />
                    Crit Damage: <Text style={styles.gold}>{item?.criticalDamage}x</Text> <br />
                    Roll Chance: <Text style={styles.gold}>{item?.roll}%</Text> <br />
                    { item?.influences && item?.influences?.length > 0 ? ( <>
                        Influence: <Text style={styles.gold}>{item?.influences?.[0]}</Text><br />
                    </> ) : ( '' ) }
                    <p style={{ color: getRarityColor(item?.rarity) }}>
                        {item?.rarity}
                    </p>
                    { stalwart && (
                        <p class='basic-text gold'>
                            Stalwart - You are engaged in combat with your shield raised, adding it to your passive defense. 
                            You receive 50% less poise damage. 
                            You receive 10% less damage. 
                            You cannot dodge or roll.
                        </p>
                    ) } 
                    { caerenic && (
                        <p class='basic-text gold'>
                            Caerenic - You attempt to harnass your caer with your achre, increasing your damage by 15%. 
                            You move 15% faster. 
                            You receive 25% more damage. 
                        </p>
                    ) }
                </> }</Text>
                <Text style={[styles.basicText, styles.gold, styles.taper]}>{item.gameplay}</Text>
            </View>
            </TouchableHighlight>
        </Modal>
    );
};