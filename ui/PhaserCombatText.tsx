// import { Text, TextInput } from 'react-native';
// import messageWindow from '../assets/gui/message_window.png';
// import { styles } from '../styles';

// export default function PhaserCombatText({ state }) {
//     const text = () => {
//         let result = "";
//         if (state.playerStartDescription) result += state.playerStartDescription + "\n";
//         if (state.computerStartDescription) result += state.computerStartDescription + "\n";
//         if (state.playerSpecialDescription) result += state.playerSpecialDescription + "\n";
//         if (state.computerSpecialDescription) result += state.computerSpecialDescription + "\n";
//         if (state.playerActionDescription) result += state.playerActionDescription + "\n";
//         if (state.computerActionDescription) result += state.computerActionDescription + "\n";
//         if (state.playerInfluenceDescription) result += state.playerInfluenceDescription + "\n";
//         if (state.playerInfluenceDescriptionTwo) result += state.playerInfluenceDescriptionTwo + "\n";
//         if (state.computerInfluenceDescription) result += state.computerInfluenceDescription + "\n";
//         if (state.computerInfluenceDescriptionTwo) result += state.computerInfluenceDescriptionTwo + "\n";
//         if (state.playerDeathDescription) result += state.playerDeathDescription + "\n";
//         if (state.computerDeathDescription) result += state.computerDeathDescription + "\n";
//         if (state.combatTimer) result += `Combat Timer: ${state.combatTimer} \n`;
//         return result;
//     };
//     return (
//         <Text style={styles.center}>
//             <TextInput 
//                 id='story-console' 
//                 value={text()}
//                 readOnly>
//             </TextInput>
//             <img src={messageWindow} alt="message window" style={{ position: 'absolute', top: '10%' }} />
//         </Text>
//     );
// };
