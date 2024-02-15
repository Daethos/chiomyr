// @refresh reset
import { Image, TouchableOpacity, SafeAreaView, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import AsceanBuilder from './components/AsceanBuilder';
import { getAscean, getAsceans, populate, updateAscean } from './assets/db/db';
import { requireOrigin } from './utility/ascean';
import { createAscean } from './models/ascean';
import { getOneRandom } from './models/equipment';
import AsceanImageCard from './components/AsceanImageCard';
import { AttributeCompiler } from './utility/attributes';
import HostScene from './scenes/HostScene';

export const SCREENS = {
    'CHARACTER': {
        KEY: 'CHARACTER',
        TEXT: 'Name',
        PREV: null,
        NEXT: 'ORIGIN'
    },
    'ORIGIN': {
        KEY: 'ORIGIN',
        TEXT: 'Origin',
        PREV: 'CHARACTER',
        NEXT: 'FAITH'
    },
    'FAITH': {
        KEY: 'FAITH',
        TEXT: 'Faith',
        PREV: 'ORIGIN',
        NEXT: 'ATTRIBUTES'
    },
    'ATTRIBUTES': {
        KEY: 'ATTRIBUTES',
        TEXT: 'Stats',
        PREV: 'FAITH',
        NEXT: 'PREFERENCE'
    },
    'PREFERENCE': {
        KEY: 'PREFERENCE',
        TEXT: 'Mastery',
        PREV: 'ATTRIBUTES',
        NEXT: 'COMPLETE'
    },
    'COMPLETE': {
        KEY: 'COMPLETE',
        TEXT: 'Create',
        PREV: 'PREFERENCE',
        NEXT: null
    }
};

function BackForth({ id, left, right, setScreen, createCharacter, newAscean }) {
    return (
        <>
            { left?.screen && <TouchableOpacity onPress={() => setScreen(left.screen)} style={[styles.stdInput, styles.bottomLeftCorner]}>
                <Text style={[styles.basicText]}>Back ({left.text})</Text>
            </TouchableOpacity> }
            { right?.screen && <TouchableOpacity onPress={() => setScreen(right.screen)} style={[styles.stdInput, styles.bottomRightCorner]}>
                <Text style={[styles.basicText]}>Next ({right.text})</Text>
            </TouchableOpacity> }
            { id === SCREENS.COMPLETE.KEY && (
                <TouchableOpacity onPress={(e) => createCharacter(e, newAscean)} style={[styles.stdInput, styles.bottomRightCorner]}>
                    <Text style={[styles.basicText]}>Create {newAscean?.name?.split(' ')[0]}</Text>
                </TouchableOpacity>
            ) }
        </>
    );
};

export default function App() {
    const [gameRunning, setGameRunning] = useState(false);
    const [newCharacter, setNewCharacter] = useState(true);
    const [characterCreated, setCharacterCreated] = useState(true);
    const [ascean, setAscean] = useState(null);
    const [asceans, setAsceans] = useState([]);
    const [asceanPic, setAsceanPic] = useState(null);
    const [screen, setScreen] = useState(SCREENS.COMPLETE.KEY);
    const [newAscean, setNewAscean] = useState({
        name: 'Garris Ashenus',
        description: "Merchant-Knight of the Firelands",
        origin: "Fyers",
        sex: 'Man',
        faith: 'Adherent',
        mastery: 'achre',
        preference: 'Plate-Mail',
        constitution: 12, // 12 || 12
        strength: 10, // 10 || 12
        agility: 12, // 12 || 12
        achre: 16, // 16 || 10
        caeren: 10, // 10 || 16
        kyosir: 13, // 13 || 11
        hardcore: false,
    });

    const toggle = () => {
        setNewCharacter(!newCharacter);
    };

    useEffect(() => {
        fetchAscean();
        setNewCharacter(false);
    }, [characterCreated]);

    useEffect(() => {
        if (ascean) {
            const newPic = requireOrigin(ascean.origin, ascean.sex);
            setAsceanPic(newPic);
        };
    }, [ascean]);

    async function fetchAscean() {
        try {
            setCharacterCreated(false);
            const res = await getAsceans();
            if (res.length) {
                await populateAscean(res[0]);
                setAsceans(res);
                setNewCharacter(false);
            } else {
                console.warn('No Asceans found:', res);
            };
        } catch (err) {
            console.error(err);
        };
    };

    function createCharacter(e, character) {
        e.preventDefault();
        async function create() {
            const res = await createAscean(character);
            if (res) {
                setCharacterCreated(true);
            } else {
                console.warn('No Ascean created:', res);
            };
        };
        create();
    };

    async function freeInventory(asc) {
        console.log('Getting some free Equipment for my Inventory, level: ', asc.level, '... from the Ascean: ', asc.name, '...');
        try {
            const equipment = await getOneRandom(asc.level);
            console.log('Equipment:', equipment);
            if (equipment.length === 0) throw new Error('No Equipment found');
            let dbAscean = await getAscean(asc._id);    
            if (dbAscean === undefined) throw new Error('No Ascean found');
            dbAscean.inventory.push(equipment[0]._id);
            
            const res = await updateAscean(dbAscean);
            console.log('Updated Ascean:', res);            
        } catch (err) {
            throw new Error(err);
        };
    };

    async function populateAscean(asc) {
        try {
            const res = await populate(asc);
            if (res !== undefined) {
                if (ascean && res?._id !== ascean._id) {
                    setAscean(res);
                } else if (!ascean && res) {
                    setAscean(res);
                } else { // Closing the same ascean
                    setAscean(null);
                    console.warn('No Ascean found:', res);
                };
            } else {
                console.warn('No Ascean found:', res);
            };
        } catch (err) {
            console.error(err);
        };
    };

    function startGame() {
        setGameRunning(true);
        console.log('Game started with', ascean.name);
    };

    return (
        <SafeAreaView style={styles.container}>
        { gameRunning ? (
                <HostScene ascean={ascean} />            
        ) : newCharacter === true ? ( <>
                <AsceanBuilder screen={screen} newAscean={newAscean} setNewAscean={setNewAscean} />
                {/* <Text style={[styles.topLeftCorner, styles.title]}>The Ascean <Text style={styles.superscript}>TM</Text></Text>  */}
                <TouchableOpacity onPress={() => toggle()} style={[styles.stdInput, styles.corner]}>
                    <Text style={styles.basicText}>Back</Text>
                </TouchableOpacity>     
                <BackForth id={SCREENS[screen]?.KEY} left={{ screen: SCREENS[screen]?.PREV, text: SCREENS[SCREENS[screen]?.PREV]?.TEXT }} right={{ screen: SCREENS[screen]?.NEXT, text: SCREENS[SCREENS[screen]?.NEXT]?.TEXT }} 
                    setScreen={setScreen} createCharacter={createCharacter} newAscean={newAscean} />
        </> ) : asceans.length > 0 ? (
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center'}} style={styles.scrollView}>
                {asceans.map((asc, idx) => { 
                    const newPic = requireOrigin(asc.origin, asc.sex);
                    return <View key={idx} style={[styles.border, { width: '85%', marginTop: '1em' }]}>
                        { ascean ? ( <>
                            <Text style={[styles.header, styles.creatureHeadingH1]}>{asc.name}</Text>
                            <TouchableOpacity onPress={() => populateAscean(asc)} style={[styles.stdInput, styles.border]}>
                                <Text style={styles.basicText}>Select {asc.name}</Text>
                            </TouchableOpacity>
                        </> ) : ( <>
                            <Text style={[styles.header, styles.creatureHeadingH1]}>{asc.name}</Text>
                            <Text style={[styles.creatureHeadingH2, asc.description.toString().length > 45 ? styles.wrap : {}]}>{asc.description}</Text>
                            <Text>~{'\n'}</Text>
                            <Image source={newPic} style={styles.originPic} />
                            <Text style={styles.gold}>Level: {asc.level}</Text>
                            <Text style={[styles.gold]}>Experience: {asc.experience}</Text>
                            <TouchableOpacity onPress={() => populateAscean(asc)} style={[styles.stdInput, styles.border]}>
                                <Text style={styles.basicText}>Select {asc.name}</Text>
                            </TouchableOpacity>
                        </> )}
                    </View> 
                })}
                {ascean ? <View style={[styles.border, { width: '85%', overflow: 'scroll' }]}>
                    <Text style={[styles.header, styles.creatureHeadingH1]}>{ascean.name}</Text>
                    <Text style={[styles.creatureHeadingH2, ascean.description.toString().length > 45 ? styles.wrap : {}]}>{ascean.description}</Text>
                    <Text>~{'\n'}</Text>
                    <Image source={asceanPic} style={styles.originPic} />
                    <Text>~{'\n'}</Text>
                    <Text style={[styles.basicText, styles.gold]}>Level: {ascean.level}</Text>
                    <Text style={[styles.basicText, styles.gold]}>Experience: {ascean.experience}</Text>
                    <Text>~{'\n'}</Text>
                    <AttributeCompiler ascean={ascean} />
                    <AsceanImageCard ascean={ascean} weaponOne={ascean.weaponOne} weaponTwo={ascean.weaponTwo} weaponThree={ascean.weaponThree} />
                    <Text>~{'\n'}~{'\n'}</Text>
                    <TouchableOpacity onPress={() => freeInventory(ascean)} style={[styles.stdInput, styles.corner, { backgroundColor: 'blue' }]}>
                        <Text style={styles.basicText}>Get Equipment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggle()} style={[styles.stdInput, styles.bottomLeftCorner, { backgroundColor: 'red' }]}>
                        <Text style={styles.basicText}>Delete!!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => startGame()} style={[styles.stdInput, styles.bottomRightCorner, { backgroundColor: 'green' }]}>
                        <Text style={styles.basicText}>Enter Game</Text>
                    </TouchableOpacity>
                </View> : null}
                { asceans.length < 3 ? (
                <>
                    {/* <Text style={[styles.topLeftCorner, styles.title]}>The Ascean <Text style={styles.superscript}>TM</Text></Text>      */}
                    {/* <ActivityIndicator style={styles.topLeftCorner} size="large" color="#0000ff" /> */}
                    <TouchableOpacity onPress={() => toggle()} style={[styles.stdInput, styles.corner]}>
                        <Text style={styles.basicText}>Create Character</Text>
                    </TouchableOpacity>
                </>
                ) : null }
            </ScrollView> 
        ) : ( <>
            <Text style={styles.header}>The Ascean</Text>
            <TouchableOpacity onPress={() => toggle()} style={styles.stdInput}>
                <Text style={styles.basicText}>Create Character</Text>
            </TouchableOpacity> 
        </> ) }
        </SafeAreaView>
    );
};