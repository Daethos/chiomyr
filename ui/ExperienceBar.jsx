import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles';


export default function ExperienceBar({ totalExperience, currentExperience }) {
    const [experiencePercentage, setExperiencePercentage] = useState(0);

    useEffect(() => {
        const newPercentage = Math.round((currentExperience/totalExperience) * 100);
        setExperiencePercentage(newPercentage);
    }, [currentExperience, totalExperience]);

    return ( 
        <View style={[styles.healthbar, styles.center]}>
            <Text style={[styles.storyPortrait, styles.center, { color: '#fdf6d8' }]}>{`${Math.round(currentExperience)} / ${totalExperience} [${experiencePercentage}%]`}</Text>
            <View style={[{ position: 'absolute', bottom: 0, left: 0, top: 0 }, 
                { width: `${experiencePercentage}%`, backgroundColor: 'gold' }]}></View>
        </View>
    );
};