import { ScrollView } from "react-native";
import { styles } from "../styles";
import { useEffect, useState } from "react";
import Origin from "./Origin";
import { requireOrigin } from "../utility/ascean";
import Faith from "./Faith";
import Attributes from "./Attributes";
import Mastery from "./Mastery";
import Preference from "./Preference";
import Review from "./Review";
import Sex from "./Sex";
import Character from "./Character";
import Preview from "./Preview";
import { SCREENS } from "../App";

export default function AsceanBuilder({ screen, newAscean, setNewAscean }) {
    const [asceanPic, setAsceanPic] = useState(require('../assets/images/Ashtre-Man.jpg'));
    
    useEffect(() => {
        const newPic = requireOrigin(newAscean.origin, newAscean.sex);
        setAsceanPic(newPic);
    }, [newAscean.origin, newAscean.sex]);

    return (
    <ScrollView style={[styles.statBlock, styles.statBlockWide]} >
            <Preview newAscean={newAscean} asceanPic={asceanPic} />
            { screen === SCREENS.CHARACTER.KEY ? (
                <>
                    <Character newAscean={newAscean} setNewAscean={setNewAscean} />
                    <Sex newAscean={newAscean} setNewAscean={setNewAscean} />    
                </>
            ) : screen === SCREENS.ORIGIN.KEY ? (
                <Origin newAscean={newAscean} setNewAscean={setNewAscean} />
            ) : screen === SCREENS.FAITH.KEY ? (
                <Faith newAscean={newAscean} setNewAscean={setNewAscean} />
            ) : screen === SCREENS.ATTRIBUTES.KEY ? (
                <Attributes newAscean={newAscean} setNewAscean={setNewAscean} />
            ) : screen === SCREENS.PREFERENCE.KEY ? (
                <>
                    <Mastery newAscean={newAscean} setNewAscean={setNewAscean} />
                    <Preference newAscean={newAscean} setNewAscean={setNewAscean} />
                </>
            ) : screen === SCREENS.COMPLETE.KEY ? (
                <Review newAscean={newAscean} asceanPic={asceanPic} /> 
            ) : ( null ) }
        </ScrollView>
    );
};