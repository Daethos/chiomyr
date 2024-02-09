// @refresh reset
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import AsceanBuilder from './components/AsceanBuilder';
import { getAsceans, populate } from './assets/db/db';
import { requireOrigin } from './utility/ascean';
import { createAscean } from './models/ascean';
import AsceanImageCard from './components/AsceanImageCard';
import { useDeviceOrientation, useImageDimensions } from '@react-native-community/hooks';
import HostScene from './scenes/HostScene';

export default function App() {
    const [gameRunning, setGameRunning] = useState(false);
    const [ascean, setAscean] = useState(null);
    const [asceans, setAsceans] = useState([]);
    const [attributes, setAttributes] = useState({});
    const [highlight, setHighlight] = useState('');
    const [characterCreated, setCharacterCreated] = useState(true);
    const [newCharacter, setNewCharacter] = useState(true);
    const [asceanPic, setAsceanPic] = useState(null);

    // console.log(useDeviceOrientation(), window.innerHeight, window.innerWidth, 'Device Orientation and Image Dimensions');
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
                setAsceans(res);
                setHighlight(res[0]._id);
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
            ) : newCharacter ? ( <>
                <AsceanBuilder createCharacter={createCharacter} /> 
                <Pressable onPress={() => toggle()} style={[styles.stdInput, styles.corner]}>
                    <Text style={styles.basicText}>Back</Text>
                </Pressable>     
            </>
            ) : asceans.length > 0 ? (
               <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}} style={styles.scrollView}>
                {asceans.map((asc, idx) => { 
                    const newPic = requireOrigin(asc.origin, asc.sex);
                    return <View key={idx} style={[styles.border, { width: '85%', marginTop: '1em' }]}>
                        {ascean ? ( <>
                            <Text style={[styles.header, styles.creatureHeadingH1]}>{asc.name}</Text>
                            <Pressable onPress={() => populateAscean(asc)} style={[styles.stdInput, styles.border]}>
                                <Text style={styles.basicText}>Select {asc.name}</Text>
                            </Pressable>
                        </> ) : ( <>
                            <Text style={[styles.header, styles.creatureHeadingH1]}>{asc.name}</Text>
                            <Text style={[styles.creatureHeadingH2, asc.description.toString().length > 45 ? styles.wrap : {}]}>{asc.description}</Text>
                            <Text>~{'\n'}</Text>
                            <Image source={newPic} style={styles.originPic} />
                            <Text style={styles.gold}>Level: {asc.level}</Text>
                            <Text style={[styles.gold]}>Experience: {asc.experience}</Text>
                            <Pressable onPress={() => populateAscean(asc)} style={[styles.stdInput, styles.border]}>
                                <Text style={styles.basicText}>Select {asc.name}</Text>
                            </Pressable>
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
                    <AsceanImageCard ascean={ascean} />
                    <Text>~{'\n'}~{'\n'}</Text>
                    <Pressable onPress={() => toggle()} style={[styles.stdInput, styles.bottomLeftCorner, { backgroundColor: 'red' }]}>
                        <Text style={styles.basicText}>Delete!!</Text>
                    </Pressable>
                    <Pressable onPress={() => startGame()} style={[styles.stdInput, styles.bottomRightCorner, { backgroundColor: 'green' }]}>
                        <Text style={styles.basicText}>Enter Game</Text>
                    </Pressable>
                </View> : null}
                { asceans.length < 3 ? (
                <Pressable onPress={() => toggle()} style={[styles.stdInput, styles.corner]}>
                    <Text style={styles.basicText}>Create Character</Text>
                </Pressable>
                ) : null }
                </ScrollView> ) : <>
                <Text style={styles.header} onPress={() => console.log('Clicked the Text')}>The Ascean</Text>
                    <Pressable onPress={() => toggle()} style={styles.stdInput}>
                    <Text style={styles.basicText}>Create Character</Text>
                </Pressable> 
            </> }
        </SafeAreaView>
    );
};