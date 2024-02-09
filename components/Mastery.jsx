import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../styles";
import { attributes } from "../utility/attributes";

function MasteryCard({ attr, attribute, setAttribute, setHighlight, show, setShow, newAscean, setNewAscean }) {
    function toggle() {
        console.log(attr, 'Attr', )
        setShow(attr.name === attribute.name && show === true ? false : true);
        setAttribute(attr);
        setNewAscean({...newAscean, mastery: attr.name});
    };

    return (
        <View style={[styles.stdInput, styles.borderless]}>
            <Text style={styles.basicText} onPress={() => toggle()}>{attr.name.charAt(0).toUpperCase() + attr.name.slice(1)}</Text>
        </View>
    );
};

export default function Mastery({ newAscean, setNewAscean }) {
    const [show, setShow] = useState(true);
    const [attribute, setAttribute] = useState(attributes.find((attribute) => attribute.name === newAscean.mastery));

    useEffect(() => {
        setAttribute(attributes.find((attribute) => attribute.name === newAscean.mastery));
    }, [newAscean.mastery]);
    return (
        <>
            <Text style={[styles.header, styles.headerH1]}>Mastery</Text>
            <Text>~{'\n'}</Text>
            {attributes.map((attr, idx) => <MasteryCard key={idx} attr={attr} attribute={attribute} setAttribute={setAttribute} show={show} setShow={setShow} newAscean={newAscean} setNewAscean={setNewAscean} />)}
            { show && <View>
                <Text style={[styles.header, styles.creatureHeadingH1, styles.gold]}>{attribute.name.charAt(0).toUpperCase() + attribute.name.slice(1)}</Text>
                <Text>~{'\n'}</Text>
                <Text style={[styles.creatureHeadingH2, styles.taper]}>{attribute.title}</Text>
                <Text>~{'\n'}</Text>
                <Text style={[styles.basicText, styles.taper]}>{attribute.description}</Text>
                <Text>~{'\n'}</Text>
                <Text style={[styles.basicText, styles.gold, styles.taper]}>{attribute.gameplay}</Text>
            </View> }
        </>
    );
};