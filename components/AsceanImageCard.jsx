import { useState } from 'react';
import { getRarityColor } from '../utility/styling';
import { Pressable, ScrollView, View } from 'react-native';
import { styles } from '../styles';
import ItemModal from './ItemModal';
import { AttributeCompiler } from '../utility/attributes';

export default function AsceanImageCard({ ascean, weaponOne, weaponTwo, weaponThree }) { 

    const [equipment, setEquipment] = useState(null);
    const [show, setShow] = useState(false);
    function itemStyle(rarity) {
        return {
            borderColor: getRarityColor(rarity),
            backgroundColor: 'black',
            boxShadow: '0.05em 0.05em 0.05em black',
            borderWidth: '0.15em',
            marginBottom: '0.5em',
        };
    };
    function info(item) {
        setEquipment(item);
        setShow(!show);
    };
    return (
        <ScrollView>
        <AttributeCompiler ascean={ascean} />
        <View style={styles.imageCardGrid}>
            <View style={styles.imageCardLeft}>
                <Pressable onPress={() =>info(weaponOne)} style={itemStyle(weaponOne.rarity)}>
                    <img src={weaponOne.imgUrl} />
                </Pressable>
                <Pressable onPress={() =>info(weaponTwo)} style={itemStyle(weaponTwo.rarity)}>
                    <img src={weaponTwo.imgUrl}  />
                </Pressable>
                <Pressable onPress={() =>info(weaponThree)} style={itemStyle(weaponThree.rarity)}>
                    <img src={weaponThree.imgUrl} />
                </Pressable>
                <Pressable onPress={() =>info(ascean.shield)} style={itemStyle(ascean.shield.rarity)}>
                    <img src={ascean.shield.imgUrl} />
                </Pressable>
            </View>
            <View style={styles.imageCardMiddle}>
                <Pressable onPress={() =>info(ascean.helmet)} style={itemStyle(ascean.helmet.rarity)}>
                    <img src={ascean.helmet.imgUrl} />
                </Pressable>
                <Pressable onPress={() =>info(ascean.chest)} style={itemStyle(ascean.chest.rarity)}>
                    <img src={ascean.chest.imgUrl} />
                </Pressable>
                <Pressable onPress={() =>info(ascean.legs)} style={itemStyle(ascean.legs.rarity)}>
                    <img src={ascean.legs.imgUrl} />
                </Pressable>
            </View>
            <View style={styles.imageCardRight}>
                <Pressable onPress={() =>info(ascean.amulet)} style={itemStyle(ascean.amulet.rarity)}>
                    <img src={ascean.amulet.imgUrl} />
                </Pressable>
                <Pressable onPress={() =>info(ascean.ringOne)} style={itemStyle(ascean.ringOne.rarity)}>
                    <img src={ascean.ringOne.imgUrl} />
                </Pressable>
                <Pressable onPress={() =>info(ascean.ringTwo)} style={itemStyle(ascean.ringTwo.rarity)}>
                    <img src={ascean.ringTwo.imgUrl} />
                </Pressable>
                <Pressable onPress={() =>info(ascean.trinket)} style={itemStyle(ascean.trinket.rarity)}>
                    <img src={ascean.trinket.imgUrl} />
                </Pressable>
            </View>
        </View>
        {show && (
            <ItemModal item={equipment} show={show} setShow={setShow} stalwart={false} caerenic={false} />
        )}
        </ScrollView>
    );
};