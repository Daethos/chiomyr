import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "../styles";
import AttributeModal, { attributes } from "../utility/attributes";

function AttributeCard({ attr, attribute, setAttribute, setHighlight, show, setShow, newAscean, setNewAscean, pool, setPool }) {
    function toggle() {
        setShow(attr.name === attribute.name && show === true ? false : true);
        setAttribute(attr);
        setHighlight(attr.name);
    };
    const handleChange = (event, name, value) => {
        event.preventDefault();
        setNewAscean({
            ...newAscean,
            [name]: Number(newAscean[name]) + value
        });
        setPool(pool + value);
    };
    const ceiling = (name) => {
        return pool < 25 && newAscean?.[name] < 18;
    };
    const floor = (name) => {
        return newAscean?.[name] > 8;
    };

    return (
        <>
        <View style={[styles.stdInput, styles.borderless]}>
            <Text style={[styles.basicText, styles.ph4]} onPress={() => toggle()}>{attr.name.charAt(0).toUpperCase() + attr.name.slice(1)}</Text>
        </View>
        <Text>~{'\n'}</Text>
        {/* <Text>~{'\n'}</Text> */}
        <View style={[styles.grid]}>
        <Pressable onPress={(e) => handleChange(e, attr.name, -1)} style={{ display: 'inline-block' }} disabled={!floor(attr.name)}><Text style={floor(attr.name) ? styles.stdInput : { display: 'none' }}>{floor(attr.name) ? '-' : ''}</Text></Pressable>
        <Text style={styles.gold}>{newAscean[attr.name]} ({Math.floor((newAscean[attr.name] - 10) / 2) > 0 ? '+' : ''}{Math.floor((newAscean[attr.name] - 10) / 2)})</Text>
        <Pressable onPress={(e) => handleChange(e, attr.name, 1)} style={{ display: ceiling(attr.name) ? 'inline-block' : 'none' }}><Text style={styles.stdInput}>+</Text></Pressable>
        </View>
        <Text>~{'\n'}</Text>
        </>
    );
};

export default function Attributes({ newAscean, setNewAscean }) {
    const [show, setShow] = useState(false);
    const [highlight, setHighlight] = useState('constitution');
    const [attribute, setAttribute] = useState(attributes.find((attribute) => attribute.name === highlight));
    const [pool, setPool] = useState(0);

    useEffect(() => {
        setPool(newAscean.strength + newAscean.agility + newAscean.constitution + newAscean.achre + newAscean.caeren + newAscean.kyosir - 48);
    }, [newAscean]);
    
    return (
        <>
            <Text style={[styles.header, styles.headerH1]}>
                Attributes
                <Text style={styles.gold}>Pool: {pool} / 25</Text>
            </Text>
            <Text>~{'\n'}</Text>
            {attributes.map((attr, idx) => <AttributeCard key={idx} attr={attr} attribute={attribute} setAttribute={setAttribute} setHighlight={setHighlight} show={show} setShow={setShow} newAscean={newAscean} setNewAscean={setNewAscean} pool={pool} setPool={setPool} />)}
            <AttributeModal attribute={attribute} show={show} setShow={setShow} />
        </>
    );
};