import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles';


export default function HealthBar({ totalPlayerHealth, newPlayerHealth }) {
    const [playerHealthPercentage, setPlayerHealthPercentage] = useState(0);

    useEffect(() => {
        const healthPercentage = Math.round((newPlayerHealth/totalPlayerHealth) * 100);
        setPlayerHealthPercentage(healthPercentage);
    }, [newPlayerHealth, totalPlayerHealth]);

    return ( 
        <View style={[styles.healthbar, styles.center]}>
            <Text style={[styles.storyPortrait, styles.center, { color: '#fdf6d8' }]}>{`${Math.round(newPlayerHealth)} / ${totalPlayerHealth} [${playerHealthPercentage}%]`}</Text>
            <View style={[{ position: 'absolute', bottom: 0, left: 0, top: 0 }, 
                { width: `${playerHealthPercentage}%`, backgroundColor: 'teal' }]}></View>
        </View>
    );
};