import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";

export const faithState = [{
    name: 'Ancients',
    origin: "The Ancients were figures of fantastic might existing before historical recording of time, commanding worshipers of all peoples of this world. These godlike beings interacted with humans at their leisure, whether distantly ala Achreo of the Wild, or heavily involved in the daily lives of their worshipersers: Ilios of the Sun, and Ma'anre of the Moon. Some time a thousand years past, a great war between the Ancients--heavily involing humans broke out and wiped out the majority of both. It's unknown at this time who remains, and in what form they may be existing.",
    quote: "A tendril swirls soothing about your senses, \n It's sweetness teasing as hush soon possesses.",
    worshipers: 'Adherent',
    character: 'Adherence holds fyers to true form, and may invoke this comfort.',
    iconography: require('../assets/images/achreo-rising.png')
}, {
    name: 'Daethos',
    origin: "Founded by Laetrois Ath'Shaorah, mythic general during the War of the Ancients. Of unknown origin, Laetrois and his army of soliders descended from obscure lands in the nothren'eas, seen as a force entering in the later stages of the war against both armies led by Ilios and Ma'anre, respectively. Seen as saving humanity, the death of the general during the aftermath of the war led to his faithful companion, the Good Lorian to establish the Seyr in the City of Lor, later codifying the oratory nature of its principles in the Daethica.",
    quote: "Writhing, it warps to wrap round you, seething, \n Forms of shade simmer to dance upon your being",
    worshipers: 'Devoted',
    character: "To be Daethic is to become Atshaer Ascean, the Shaorahi, Laetrois Ath'Shaorah.",
    iconography: require('../assets/images/daethos-forming.png')
}, {
    name: 'None',
    origin: 'You have no faith and seek other means to hold yourself together. This does not absolve you of any supernatural machinations, though your aim elsewhere may lead toward a wholly new glory.',
    quote: "And yet perchance you seek to twist adherence in its seams, \n To taste its achre burning at the resin of your dreams.",
    worshipers: 'Nothing',
    character: 'This does not absolve you of any supernatural machinations, though your aim elsewhere may lead toward a wholly new glory.',
    iconography: require('../assets/images/godHand.png')
}];

function FaithCard({ faith, deity, setDeity, show, setShow }) {
    function toggle() {
        setShow(faith.name === deity.name && show === true ? false : true);
        setDeity(faith);
    };

    return (
        <TouchableOpacity style={[styles.border, styles.stdInput, styles.borderless]}>
            <Text onPress={() => toggle()}>{faith.name}</Text>
        </TouchableOpacity>
    );
};

export default function Faith({ newAscean, setNewAscean }) {
    const [show, setShow] = useState(true);
    const [deity, setDeity] = useState(faithState.find((faith) => faith.worshipers === newAscean.faith));
    useEffect(() => {
        setNewAscean({...newAscean, faith: deity.worshipers});
    }, [deity]);
    return (
        <Text style={styles.center}>
            <Text style={[styles.header, styles.headerH1]}>Faith</Text>
            {faithState.map((faith, index) => <FaithCard key={index} deity={deity} faith={faith} setDeity={setDeity} show={show} setShow={setShow} />)}
            <Text>~{'\n'}</Text>
            { show && <View style={[styles.border, styles.borderless]}>
                <Text style={[styles.header, styles.headerH1]}>{deity.name}</Text>
                <Text>~{'\n'}</Text>
                <Image source={deity.iconography} style={styles.deityPic} />
                <Text>~{'\n'}</Text>
                <Text style={[styles.basicText, styles.gold, styles.taper]}>{deity.origin}</Text>
                <Text>~{'\n'}</Text>
                <Text style={[styles.creatureHeadingH2]}>{deity.quote}</Text>
            </View> }
        </Text>
    );
};