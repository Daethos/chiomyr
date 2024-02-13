import { Image, Text } from "react-native";
import { styles } from "../styles";

export default function Preview({ asceanPic, newAscean }) {
    return (
        <>
            {newAscean.name !== '' && (
                <>
                    <Text style={[styles.creatureHeadingH1, styles.headerH1]}>{newAscean.name}</Text>
                    <Text style={styles.creatureHeadingH2}>{newAscean.description}</Text>
                    <Text>~{'\n'}</Text>    
                    <Image source={asceanPic} style={styles.originPic} />
                </>
            )}
        </>
    );
};