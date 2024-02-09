import { Pressable, Text } from 'react-native';
import { styles } from '../styles';

export default function Sex({ newAscean, setNewAscean }) {
    return (
        <>
            <Text style={[styles.header, styles.headerH1]}>Sex</Text>
            <Pressable onPress={() => setNewAscean({...newAscean, sex: 'Man'})} style={[styles.border, styles.stdInput]}>
                <Text>Man</Text>
            </Pressable>
            <Pressable onPress={() => setNewAscean({...newAscean, sex: 'Woman'})} style={[styles.border, styles.stdInput]}>
                <Text>Woman</Text>
            </Pressable>
            ~{'\n'}
            ~{'\n'}
            <Text style={[styles.creatureHeadingH2, styles.wrap]}>
                Men and women differ in these lands in ways that affect your physical and unnatural acumen. Such destined traits can be overcome with effort, however. The world notices, as well.
            </Text>
            ~{'\n'}
            ~{'\n'}
            <Text style={[styles.gold, styles.wrap]}>
                This choice affects affects both aesthetics and gameplay.
            </Text>
        </>
    );
};