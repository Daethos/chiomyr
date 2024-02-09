import { Image, Text } from "react-native";
import { styles } from "../styles";
import { faithState } from "./Faith";

export default function Review({ newAscean, asceanPic }) {
    console.log(newAscean.mastery)
    return (
        <>
            <Text style={[styles.header, styles.headerH1]}>Review Character</Text>
            <Text>~{'\n'}</Text>
            <Text style={[styles.creatureHeadingH2, styles.wrap]}>
                You are {newAscean.name}, a {newAscean.origin} {newAscean.sex === 'Man' ? 'male' : 'female'} of your homeland, recently matured and venturing to the Ascea. 
                By your own admission, you are a {newAscean.description}.
                The armor which keeps you safe is {newAscean.preference}--may you wear it well. Your mastery lies in {newAscean.mastery.charAt(0).toUpperCase() + newAscean.mastery.slice(1)}, 
                in a sense it's how you perceive this world. Your faith is {newAscean.faith}, the worship of {faithState.find(faith => faith.worshipers === newAscean.faith).name}. {faithState.find(faith => faith.worshipers === newAscean.faith).character} 
            </Text>
            <Text>~{'\n'}</Text>
            <Text>~{'\n'}</Text>
            <Image source={asceanPic} style={styles.deityPic} />
            <Text>~{'\n'}</Text>
            <Text>~{'\n'}</Text>
            <Text style={[styles.basicText, styles.creatureHeadingH2, (newAscean.mastery === 'constitution' ? styles.gold : {})]}>Constitution: {newAscean.constitution}</Text>
            <Text>~{'\n'}</Text>
            <Text style={[styles.basicText, styles.creatureHeadingH2, (newAscean.mastery === 'strength' ? styles.gold : {})]}>Strength: {newAscean.strength}</Text>
            <Text>~{'\n'}</Text>
            <Text style={[styles.basicText, styles.creatureHeadingH2, (newAscean.mastery === 'agility' ? styles.gold : {})]}>Agility: {newAscean.agility}</Text>
            <Text>~{'\n'}</Text>
            <Text style={[styles.basicText, styles.creatureHeadingH2, (newAscean.mastery === 'achre' ? styles.gold : {})]}>Achre: {newAscean.achre}</Text>
            <Text>~{'\n'}</Text>
            <Text style={[styles.basicText, styles.creatureHeadingH2, (newAscean.mastery === 'caeren' ? styles.gold : {})]}>Caeren: {newAscean.caeren}</Text>
            <Text>~{'\n'}</Text>
            <Text style={[styles.basicText, styles.creatureHeadingH2, (newAscean.mastery === 'kyosir' ? styles.gold : {})]}>Kyosir: {newAscean.kyosir}</Text>
        </>
    );
};