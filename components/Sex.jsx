import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

export default function Sex({ newAscean, setNewAscean }) {
    return (
        <Text style={styles.center}>
            <Text style={[styles.header, styles.headerH1]}>Sex</Text>
            <TouchableOpacity style={[styles.border, styles.stdInput, styles.borderless, styles.gold]}>
                <Text onPress={() => setNewAscean({...newAscean, sex: 'Man'})}>Man</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.border, styles.stdInput, styles.borderless, styles.gold]}>
                <Text onPress={() => setNewAscean({...newAscean, sex: 'Woman'})}>Woman</Text>
            </TouchableOpacity>
            <Text>~{'\n'}~{'\n'}</Text>
            <Text style={[styles.creatureHeadingH2, styles.wrap]}>
                Men and women differ in these lands in ways that affect your physical and unnatural acumen. Such destined traits can be overcome with effort, however. The world notices, as well.
            </Text>
            <Text>~{'\n'}</Text>
            <Text style={[styles.gold, styles.center]}>
                This choice affects affects both aesthetics and gameplay.
            </Text>
        </Text>
    );
};