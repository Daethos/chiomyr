import { Image, Text, TextInput, Pressable } from "react-native";
import { styles } from "../styles";
import { useEffect, useState } from "react";
import Origin from "./Origin";
import { requireOrigin } from "../utility/ascean";
import Faith, { faithState } from "./Faith";
import Attributes from "./Attributes";
import Mastery from "./Mastery";
import Preference from "./Preference";
import Review from "./Review";
import Sex from "./Sex";

const SCREENS = {
    CHARACTER: 'CHARACTER',
    ATTRIBUTES: 'ATTRIBUTES',
    FAITH: 'FAITH',
    MASTERY: 'MASTERY',
    ORIGIN: 'ORIGIN',
    PREFERENCE: 'PREFERENCE',
    SEX: 'SEX',
    COMPLETE: 'COMPLETE'
};

function BackForth({ left, right, setScreen }) {
    return (
        <>
            { left && <Pressable onPress={() => setScreen(left.screen)} style={styles.bottomLeftCorner}>
                <Text style={[styles.basicText, styles.ph4]}>Back ({left.text})</Text>
            </Pressable> }
            { right && <Pressable onPress={() => setScreen(right.screen)} style={styles.bottomRightCorner}>
                <Text style={[styles.basicText, styles.ph4]}>Next ({right.text})</Text>
            </Pressable> }
        </>
    )
}

export default function AsceanBuilder({ createCharacter }) {
    const [screen, setScreen] = useState(SCREENS.COMPLETE);
    const [asceanPic, setAsceanPic] = useState(require('../assets/images/Ashtre-Man.jpg'));
    const [newAscean, setNewAscean] = useState({
        name: 'Garris Ashenus',
        description: "Merchant-Knight of the Firelands",
        origin: "Fyers",
        sex: 'Man',
        faith: 'Adherent',
        mastery: 'achre',
        preference: 'Plate-Mail',
        constitution: 12, // 12
        strength: 10, // 10
        agility: 12, // 12
        achre: 16, // 16
        caeren: 10, // 10
        kyosir: 13, // 13
        hardcore: false,
    });

    useEffect(() => {
        const newPic = requireOrigin(newAscean.origin, newAscean.sex);
        setAsceanPic(newPic);
    }, [newAscean.origin, newAscean.sex]);

    useEffect(() => {
        console.log('screen:', screen);
    }, [screen])
    
    return (
        <Text style={[styles.statBlock, styles.statBlockWide]}>
            {newAscean.name !== '' && (
                <>
                    <Text style={[styles.creatureHeadingH1, styles.headerH1]}>{newAscean.name}</Text>
                    ~{'\n'}
                    <Text style={styles.creatureHeadingH2}>{newAscean.description}</Text>
                    ~{'\n'}
                    ~{'\n'}
                    <Image source={asceanPic} style={styles.originPic} />
                </>
            )}
            { screen === SCREENS.CHARACTER ? (
                <>
                    <Text style={[styles.header, styles.headerH1]}>Character</Text>
                    <Text style={styles.creatureHeadingH1}>Name</Text>
                    ~{'\n'}
                    <TextInput style={[styles.border, styles.basicText]} placeholder="Ascean" value={newAscean.name} onChangeText={(text) => setNewAscean({...newAscean, name: text})} />
                    ~{'\n'}
                    <Text style={styles.creatureHeadingH2}>Description</Text>
                    ~{'\n'}
                    <TextInput style={[styles.border, styles.basicText]} placeholder="Vying to be the va'Esai in the upcoming Ascea" value={newAscean.description} onChangeText={(text) => setNewAscean({...newAscean, description: text})} />
                    ~{'\n'}
                    <BackForth left={null} right={{ screen: SCREENS.SEX, text: 'Sex' }} setScreen={setScreen} />
                </>
            ) : screen === SCREENS.SEX ? (
                <>
                    <Sex newAscean={newAscean} setNewAscean={setNewAscean} />
                    <BackForth left={{ screen: SCREENS.CHARACTER, text: 'Name' }} right={{ screen: SCREENS.ORIGIN, text: 'Origin' }} setScreen={setScreen} />
                </>
            ) : screen === SCREENS.ORIGIN ? (
                <>
                    <Origin newAscean={newAscean} setNewAscean={setNewAscean} />
                    <BackForth left={{ screen: SCREENS.SEX, text: 'Sex' }} right={{ screen: SCREENS.FAITH, text: 'Faith' }} setScreen={setScreen} />
                </>
            ) : screen === SCREENS.FAITH ? (
                <>
                    <Faith newAscean={newAscean} setNewAscean={setNewAscean} />
                    <BackForth left={{ screen: SCREENS.ORIGIN, text: 'Origin' }} right={{ screen: SCREENS.MASTERY, text: 'Mastery' }} setScreen={setScreen} />
                </>
            ) : screen === SCREENS.MASTERY ? (
                <>
                    <Mastery newAscean={newAscean} setNewAscean={setNewAscean} />
                    <BackForth left={{ screen: SCREENS.FAITH, text: 'Faith' }} right={{ screen: SCREENS.ATTRIBUTES, text: 'Stats' }} setScreen={setScreen} />
                </>
            ) : screen === SCREENS.ATTRIBUTES ? (
                <>
                    <Attributes newAscean={newAscean} setNewAscean={setNewAscean} />
                    <BackForth left={{ screen: SCREENS.MASTERY, text: 'Mastery' }} right={{ screen: SCREENS.PREFERENCE, text: 'Armor' }} setScreen={setScreen} />
                </>
            ) : screen === SCREENS.PREFERENCE ? (
                <>
                    <Preference newAscean={newAscean} setNewAscean={setNewAscean} />
                    <BackForth left={{ screen: SCREENS.ATTRIBUTES, text: 'Stats' }} right={{ screen: SCREENS.COMPLETE, text: 'Create' }} setScreen={setScreen} />
                </>
            ) : screen === SCREENS.COMPLETE ? (
                <>
                    <Review newAscean={newAscean} asceanPic={asceanPic} /> 
                    <BackForth left={{ screen: SCREENS.PREFERENCE, text: 'Armor' }} right={null} setScreen={setScreen} />
                    <Pressable onPress={(e) => createCharacter(e, newAscean)} style={styles.bottomRightCorner}>
                        <Text style={[styles.basicText, styles.ph4]}>Create</Text>
                    </Pressable>
                </>
            ) : ( null ) }
        </Text>
    );
};