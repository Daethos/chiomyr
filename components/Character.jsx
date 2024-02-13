import { Text, TextInput } from 'react-native';
import { styles } from '../styles';
import { useDeviceOrientation } from '@react-native-community/hooks';

export default function Character({ newAscean, setNewAscean }) {
    const orientation = useDeviceOrientation();
    return (
        <Text style={styles.center}>
            <Text style={[styles.header, styles.headerH1]}>Character</Text>
            <Text style={styles.creatureHeadingH1}>Name</Text>
            <Text>~{'\n'}</Text>
            <TextInput style={[{ width: '70%', height: orientation === 'portrait' ? '10%' : '20%' }, styles.border, styles.basicText]} placeholder="Ascean" value={newAscean.name} onChangeText={(text) => setNewAscean({...newAscean, name: text})} />
            <Text>~{'\n'}~{'\n'}</Text>
            <Text style={styles.creatureHeadingH2}>Description</Text>
            <Text>~{'\n'}</Text>
            <TextInput style={[{ width: '70%', height: orientation === 'portrait' ? '10%' : '20%' }, styles.border, styles.basicText]} placeholder="Vying to be the va'Esai in the upcoming Ascea" value={newAscean.description} onChangeText={(text) => setNewAscean({...newAscean, description: text})} />
            <Text>~{'\n'}</Text>
        </Text>
    );
};