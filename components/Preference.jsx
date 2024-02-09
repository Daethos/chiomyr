import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles';

const preferenceState = [{ 
    name: 'Plate-Mail', description: 'Heavier armor inhibiting move speed, offset with higher absolute defense.' 
},{ 
    name: 'Chain-Mail', description: 'Malleable although heavy, and crediblly defensible against many weapons.' 
}, { 
    name: 'Leather-Mail', description: 'Light armor allowing for unrestricted move speed and unnatural protection.' 
}, { 
    name: 'Leather-Cloth', description: 'Little physical value translates into greater mobility and evasion.' 
}];
const PreferenceCard = ({ pref, preference, setPreference, show, setShow, newAscean, setNewAscean }) => {
    function toggle() {
        setShow(pref === preference.name && show === true ? false : true);
        setPreference(pref);
        setNewAscean({...newAscean, preference: pref.name});
    };

    return (
        <View style={[styles.stdInput, styles.borderless]}>
            <Text style={styles.basicText} onPress={() => toggle()}>{pref.name.charAt(0).toUpperCase() + pref.name.slice(1)}</Text>
        </View>
    );
};
export default function Preference({ newAscean, setNewAscean }) {
    const [show, setShow] = useState(true);
    const [preference, setPreference] = useState(preferenceState.find((pref) => pref.name === newAscean.preference));
    
    useEffect(() => {
        setPreference(preferenceState.find((pref) => pref.name === newAscean.preference));
    }, [newAscean.preference]);

    return (
        <>
            <Text style={[styles.header, styles.headerH1]}>Armor</Text>
            <Text>~{'\n'}</Text>
            {preferenceState.map((pref, idx) => <PreferenceCard key={idx} pref={pref} preference={preference} setPreference={setPreference} show={show} setShow={setShow} newAscean={newAscean} setNewAscean={setNewAscean} />)}
            { show && <View>
                <Text style={[styles.header, styles.creatureHeadingH1, styles.gold]}>{preference.name.charAt(0).toUpperCase() + preference.name.slice(1)}</Text>
                <Text style={[styles.basicText, styles.taper]}>{preference.description}</Text>
            </View> }
        </>
    );
}