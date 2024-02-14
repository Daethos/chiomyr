import { Modal, Text, TouchableHighlight, View } from 'react-native';
import { styles } from '../styles';
import { useEffect, useState } from 'react';
import { asceanCompiler } from './ascean';
import { useDeviceOrientation } from '@react-native-community/hooks';

export const attributes = [{
    name: 'constitution',
    title: "Of Lilos and Kyr'na, forever twined.",
    description: " The determination of several factors within combat is based on your Constitution. Overall your health is most weighted by your Constitution, in addition toward being able to augment higher thresholds of endurance, like the quality of your critical attacks and ability to absorb damage.",
    gameplay: "Governs Health, Defenses, Posturing, Crit Damage, and Stamina--its Mastery Pervasive"
}, {
    name: 'strength',
    title: "Of Tshaer and Se'vas, the nature of wrath.",
    description: "The physical power you possess, weighing heavily into your abliity to deal and receive physical damage with brutality.",
    gameplay: "Governs Crit Damage, Physical Damage, Defense, and all Posturing. Affects Dual-Wielding Two-Hand Weapons"
}, {
    name: 'agility',
    title: "Of Ahn've and Kyn'gi; of hunt and wind shear",
    description: "The physical clarity you possess, weighing heavily into your abliity to mitigate and perform physical damage with finesse.",
    gameplay: "Governs Phys Crit Chance, Phys Damage, Dodge, Roll, and Stamina. Affects Dual-Wielding One-Hand Weapons"
}, {
    name: 'achre',
    title: "Of Achreo, the Wild Ancient, capricious and curiuos.",
    description: `(/ɑːkər/): Synonymous with being an Arbiter, they are measured by the quality of their Achre: discernment, poise, sagacity, and existence above error.`,
    gameplay: "Governs Magi Crit Chance, Magi Damage, Dodge, Critical Posture, and Roll. Affects Dual-Wielding One-Hand Spells"
}, {
    name: 'caeren',
    title: "Of Cambire, the Ancient of Potential, lingering essence and manifestation.",
    description: "(/'sɛərən/): An idealized person or thing. A specter or phantom. Eidolon. \n\n The Caer (Informal, Colloquial): Synonymous to 'the will.'",
    gameplay: "Governs Crit Damage, Defense, Health, Magi Damage, and Stamina. Affects Dual-Wielding Two-Hand Spells"
}, {
    name: 'kyosir',
    title: "Of Ancients Otherwise.",
    description: "(/kaɪəsɪə(ɹ)/): Compulsion concocted through the golden veins of Kyrisos with bile and phlegm of Chiomyr. \n\n A charisma that warps those regardless of their caer, shearing their shields while capable of quelling their most quality strikes.",
    gameplay: "Governs Myriad Defense and Penetration--its Mastery Pervasive"
}];

export default function AttributeModal({ attribute, show, setShow }) {
    const orientation = useDeviceOrientation();
    return (
        <Modal animationType="fade" transparent={true} visible={show} onRequestClose={() => setShow(!show)}>
            <TouchableHighlight onPress={() => setShow(!show)} 
                style={[styles.border, styles.popover, 
                { maxWidth: orientation === 'landscape' ? '50%' : '70%', maxHeight: orientation === 'landscape' ? '75%' : '50%' }]}>
            <View>
                <Text style={[styles.header, styles.creatureHeadingH1, styles.gold]}>{attribute.name.charAt(0).toUpperCase() + attribute.name.slice(1)}</Text>
                <Text>~{'\n'}</Text>
                <Text style={[styles.creatureHeadingH2, styles.taper]}>{attribute.title}</Text>
                <Text>~{'\n'}</Text>
                <Text style={[styles.basicText, styles.taper]}>{attribute.description}</Text>
                <Text>~{'\n'}</Text>
                <Text style={[styles.basicText, styles.gold, styles.taper]}>{attribute.gameplay}</Text>
            </View>
            </TouchableHighlight>
        </Modal>
    );
};

export function AttributeCompiler({ ascean }) {
    const [abilities, setAbilities] = useState(null);
    const [attribute, setAttribute] = useState(attributes[0]);
    const [show, setShow] = useState(false);
    function toggle(attr) {
        setAttribute(attributes.find(a => a.name === attr));
        setShow(show => !show);
    };
    function compiler() {
        try {
            const res = asceanCompiler(ascean);
            setAbilities(res.attributes);
        } catch (err) {
            console.error(err);
        };
    };
    useEffect(() => {
        compiler();    
    }, [ascean]);
    return (
        <View style={styles.grid}>
            <View>
                <Text onPress={() => toggle('constitution')} style={styles.basicText}>Con</Text>
                <Text style={[styles.basicText, styles.gold]}>{abilities?.totalConstitution}</Text>
                {/* <Text style={[styles.basicText, styles.abilitiesP]}>({abilities?.rawConstitution} + {abilities?.equipConstitution})</Text> */}
            </View>
            <View>
                <Text onPress={() => toggle('strength')} style={styles.basicText}>Str</Text>
                <Text style={[styles.basicText, styles.gold]}>{abilities?.totalStrength}</Text>
                {/* <Text style={[styles.basicText, styles.abilitiesP]}>({abilities?.rawStrength} + {abilities?.equipStrength})</Text> */}
            </View>
            <View>
                <Text onPress={() => toggle('agility')} style={styles.basicText}>Agi</Text>
                <Text style={[styles.basicText, styles.gold]}>{abilities?.totalAgility}</Text>
                {/* <Text style={[styles.basicText, styles.abilitiesP]}>({abilities?.rawAgility} + {abilities?.equipAgility})</Text> */}
            </View>
            <View>
                <Text onPress={() => toggle('achre')} style={styles.basicText}>Ach</Text>
                <Text style={[styles.basicText, styles.gold]}>{abilities?.totalAchre}</Text>
                {/* <Text style={[styles.basicText, styles.abilitiesP]}>({abilities?.rawAchre} + {abilities?.equipAchre})</Text> */}
            </View>
            <View>
                <Text onPress={() => toggle('caeren')} style={styles.basicText}>Caer</Text>
                <Text style={[styles.basicText, styles.gold]}>{abilities?.totalCaeren}</Text>
                {/* <Text style={[styles.basicText, styles.abilitiesP]}>({abilities?.rawCaeren} + {abilities?.equipCaeren})</Text> */}
            </View>
            <View>
                <Text onPress={() => toggle('kyosir')} style={styles.basicText}>Kyo</Text>
                <Text style={[styles.basicText, styles.gold]}>{abilities?.totalKyosir}</Text>
                {/* <Text style={[styles.basicText, styles.abilitiesP]}>({abilities?.rawKyosir} + {abilities?.equipKyosir})</Text> */}
            </View>
            <AttributeModal attribute={attribute} show={show} setShow={setShow} />
        </View>
    );
};