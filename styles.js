import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: '#fdf6d8',
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Cinzel-Regular',
        borderBlockColor: '#fdf6d8',
        borderBlockWidth: '0.15em',
        borderColor: '#fdf6d8',
        borderWidth: '0.15em',
        borderRadius: '0.25em',
    },
    storyGame: {
        width: '100%',
        height: '100%',
    },
    combatUiWeapon: {
        position: 'absolute',
        top: 12.5,
        left: 260,
        borderBlockColor: 'purple',
        borderBlockWidth: '0.15em',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        transform: 'scale(1.25)'
    },
    playerCombatUi: {
        position: 'absolute',
        top: 0,
        left: 0, 
    },
    storyName: {
        position: 'absolute',
        top: 1,
        left: 30,
        fontFamily: 'Cinzel-Regular',
        textAlign: 'center', 
        fontSize: '1em',
        fontWeight: 600,
        color: 'gold',
        width: 150,
        textShadowColor: 'black',
        textShadowOffset: { width: 0.5, height: 0.5 },
    },
    stamina: { 
        color: '#fdf6d8',
        fontFamily: 'Cinzel-Regular',
        fontSize: '1em', 
        textShadowColor: 'purple',
        textShadowOffset: { width: 0.5, height: 0.5 },
        fontWeight: 700, 
        zIndex: 1, 
    },
    staminaBubble: {
        position: 'absolute',
        top: 5,
        left: 202.5, 
        width: 50, 
        height: 50, 
        borderRadius: 50, 
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        borderBlockColor: 'purple', 
        borderBlockWidth: '0.25em', 
        borderBlockStyle: 'solid'
    },    
    staminaPortrait: {
        position: 'absolute',
        top: 1,
        left: 202.5,
        color: 'black',
        fontFamily: 'Cinzel-Regular',
        fontSize: '1.25em',
        fontWeight: 700, 
        zIndex: 1,     
        borderRadius: 50,
        overflow: 'hidden',
        height: 50,
        width: 50,
    }, 
    storyPortrait: {
        fontFamily: 'Cinzel-Regular',
        fontSize: '1em',
        color: '#fdf6d8',
        textShadowColor: 'purple',
        textShadowOffset: { width: 0.5, height: 0.5 },
        fontWeight: 700,
        zIndex: 1,
    },
    storyHealthBar: {
        position: 'absolute',
        top: 25,
        left: 17.5, 
        width: 170, 
        height: 25, 
        borderRadius: 25, 
        overflow: 'hidden', 
        borderBlockColor: 'purple', 
        borderBlockWidth: '0.15em', 
        borderBlockStyle: 'solid'    
    },
    storyHealthbarBorder: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 165,
        transform: 'scale(1.25)',
        zIndex: 1,
    },
    storyMenuHeading: {
        position: 'absolute',
        top: 3,
        left: 10,
        // right: 15,
        fontFamily: 'Cinzel-Regular',
        textAlign: 'center',
        fontWeight: 600,
        color: '#fdf6d8',
        backgroundColor: 'black',
        padding: '0.35em',
        borderRightWidth: '0.15em',
        borderLeftWidth: '0.15em',
        borderBottomWidth: '0.15em',
        borderTopWidth: '0.15em',
        borderTopColor: '#fdf6d8',
        borderRightColor: '#fdf6d8',
        borderLeftColor: '#fdf6d8',
        borderBottomColor: '#fdf6d8',
    },
    storySetting: {
        position: "absolute", 
        top: 5,

        // left: 450, 
        left: "75%", 
        width: "20%", 
        backgroundColor: "black", 
        color: "#fdf6d8", 
        borderColor: "#fdf6d8", 
        textAlign: "center", 
        // paddingRight: '0.5rem', 
        borderRadius: 25
    },
    storySaveInventory: {
        position: 'absolute',
        fontFamily: 'Cinzel-Regular',
        textAlign: 'center',
        top: 10,
        right: 5,
        fontWeight: 600,
        color: 'gold',
        borderRightWidth: '0.1em',
        borderLeftWidth: '0.1em',
        borderBottomWidth: '0.1em',
        borderTopWidth: '0.1em',
        borderTopColor: 'gold',
        borderRightColor: 'gold',
        borderLeftColor: 'gold',
        borderBottomColor: 'gold',
        zIndex: 1,
        textShadowColor: 'black',
    },
    storySaveInventoryOuter: {

    },    
    storyBlock: {
        position: 'fixed',
        left: 50,
        top: 25,
        backgroundColor: '#000000',
        height: '90%',
        width: '27%',
        overflow: 'scroll',
        borderRightColor: 'gold',
        borderRightWidth: '0.15em',
        borderBottomColor: 'gold',
        borderBottomWidth: '0.15em',
        borderTopColor: 'gold',
        borderTopWidth: '0.15em',
        borderLeftColor: 'gold',
        borderLeftWidth: '0.15em',
        zIndex: 1,

    },
    storyWindows: {
        position: "fixed", 
        transform: 'scale(0.9, 0.7)', 
        top: '-25%',
        left: '-7.5%', 
    },
    storyWindow: {
        position: 'absolute',
        fontFamily: 'Cinzel-Regular',
        color: '#fdf6d8',
        fontSize: '1em',
        fontWeight: 700,
        textAlign: 'center',
        backgroundColor: '#000000',
        // padding: '0.5em',
        height: '80vh',
        width: '32%',
        borderRightColor: 'gold',
        borderRightWidth: '0.15em',
        borderBottomColor: 'gold',
        borderBottomWidth: '0.15em',
        borderTopColor: 'gold',
        borderTopWidth: '0.15em',
        borderLeftColor: 'gold',
        borderLeftWidth: '0.15em',
        overflow: 'scroll',
    },
    cardBorder: {
        marginLeft: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        // marginLeft: '1em',
    },
    cardButton: {
        color: '#fdf6d8',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
    },
    imageCardGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        width: '80%',
        margin: 'auto',
        padding: '1em',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageCardLeft: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        borderLeftColor: '#fdf6d8',
        borderLeftWidth: '0.1em',
        borderRightColor: '#fdf6d8',
        borderRightWidth: '0.1em',
    },
    imageCardMiddle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        borderRightColor: '#fdf6d8',
        borderRightWidth: '0.1em',
    },
    imageCardRight: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        borderRightColor: '#fdf6d8',
        borderRightWidth: '0.1em',
    },
    deityPic: {
        width: 75,
        height: 75,
        borderRadius: '50%',
        border: '0.1em solid #fdf6d8',
        margin: 'auto',
        cursor: 'pointer'
    },
    originPic: {
        display: 'block',
        width: 50,
        height: 50,
        borderRadius: '50%',
        border: '0.1em solid #fdf6d8',
        margin: 'auto',
        cursor: 'pointer'
    },
    originBonus: {
        color: 'gold',
        fontWeight: 500,
    },
    builder: {
        border: '0.25em soild #fdf6d8',
        width: '90%',
        margin: 'auto',
    },
    asceanName: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 'auto',
        width: '100%',
        height: '100%',
    },
    center: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    border: {
        border: '0.1em solid #fdf6d8',
        borderRadius: '0.25em',
        padding: '0.25em',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.5em',
        width: '80%',
        margin: 'auto',
    },
    flexible: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    basicText: {
        color: '#fdf6d8',
        fontSize: '0.75em',
        margin: 'auto',
    }, 
    gold: {
        color: '#ffd700'
    },
    highlight: {
        backgroundColor: '#000000',
        borderRadius: '0.25em',
        margin: '0.5em'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.5em',
        marginBottom: '0.5em',
        color: '#fdf6d8',
        fontFamily: 'Cinzel-Regular',
        fontSize: '1.15em',
        fontWeight: 600,
        borderBottomColor: '#fdf6d8',
        borderBottomWidth: '0.1em',
    },
    headerH1: {
        fontFamily: 'Cinzel-Bold',
        fontSize: '1.5em',
        color: 'gold',
        lineHeight: '1.2em',
        margin: 'auto',
        letterSpacing: '1px',
        fontWeight: 'bold',
        borderBottomColor: '#5a0043',
    },
    popover: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        width: '65%',
        maxHeight: '50%',
        overflow: 'scroll',
        zIndex: 1,
        // padding: '0.5em',
        backgroundColor: '#000000',
        border: '0.1em solid #fdf6d8',
        borderRadius: '0.5em',
        boxShadow: '0 0 0.5em 0.25em #000000',
    },
    right: {
        position: 'absolute',
        right: '0',
    },
    scrollView: {
        width: '100%',
        height: '100%',
        margin: 'auto',
        overflow: 'scroll',
    },
    select: {
        backgroundColor: '#000000',
        color: '#fdf6d8',
        border: '0.1em solid #fdf6d8',
        borderRadius: '0.25em',
        padding: '0.5em',
        fontSize: '1em',
        margin: '0.5em',
    },
    superscript: {
        fontSize: '0.35em',
        verticalAlign: 'super',
        border: 'none'
    },
    taper: {
        width: '85%',
        textAlign: 'center',
        margin: 'auto',
    },
    title: {
        fontFamily: 'Cinzel-Bold',
        fontSize: '1em',
        color: '#fdf6d8',
        backgroundColor: 'black',
        // border: 'none',
        borderBottomColor: '#fdf6d8',
        borderBottomWidth: '0.075em',
        borderEndEndRadius: '0.5em',
        top: 2,
        left: 4,
    },
    wrap: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '85%',
        textAlign: 'center',
        margin: 'auto',
    },
    ph4: {
        fontSize: '1.25em',
    },
    statBlock: { 
        textAlign: 'center', 
        width: '25%', 
        height: '95%',
        minWidth: '280px', 
        borderRadius: '1em',
        margin: '0',
        paddingTop: '0.5em',
        paddingBottom: '1em',
        boxShadow: '0 0 1.5em purple', 
        flexGrow: 1,
    },
    statBlockWide: { 
        width: '90%',
        minWidth: '280px', 
        margin: '0', 
        textAlign: 'center',
    },
    sectionLeft: { display: 'inline-block', verticalAlign: 'top', width: '48%', textAlign: 'left', marginRight: '1.5%', },
    sectionRight: { display: 'inline-block', verticalAlign: 'top', width: '48%', textAlign: 'left', marginRight: '1.5%', },
    orangeBorderBottom: { width: '95%', borderRadius: '25%' },
    taperedRule: {
        display: 'block',
        width: '100%',
        height: '0.5em',
        border: 'none',
        color: '#5a0043',
        fill: '#5a0043',
        stroke: '#5a0043',
    },
    creatureHeadingH1: {
        fontFamily: 'Cinzel-Regular',
        fontSize: '1.35em',
        color: 'gold',
        lineHeight: '1.2em',
        margin: 'auto',
        letterSpacing: '1px',
        fontVariant: 'small-caps',
        fontWeight: 'bold',
    },
    creatureHeadingH2: {
        fontWeight: 'normal',
        color: '#fdf6d8',
        fontStyle: 'italic',
        fontSize: '1em',
        lineHeight: '1.2em',
        marginBottom: '0.15em',
        margin: 'auto',
    },
    abilitiesDiv: {
        display: 'inline-block',
        verticalAlign: 'middle',
        width: '30%',
        minWidth: '50px', 
        fontSize: '0.75em',
        lineHeight: '1em',
    },
    abilitiesH4: {
        color: '#5a0043',
        marginTop: '0.15em',
        marginBottom: '0.05em',
        fontSize: '1.25em',
        lineHeight: '1.2em',
        textTransform: 'uppercase',
    },
    abilitiesP: {
        color: '#fdf6d8',
        marginBottom: '0.1em',
        lineHeight: '1.2em',
    },
    propertyBlock: {
        fontStyle: 'italic',
        fontWeight: 700,
        padding: '0.25em',
    },
    actionsH3: {
        borderBottomColor: '#5a0043',
        borderBottomWidth: '0.1em',
        color: '#5a0043',
        fontSize: '21px',
        fontVariant: 'small-caps',
        fontWeight: 'normal',
        letterSpacing: '1px',
        marginTop: '0.25em',
        paddingBottom: '0.15em',
        textIndent: '0.1em',
    },
    actions: {
        marginBottom: '0.25em',
    },
    stdButton: {
        backgroundColor: 'transparent',
        color: '#fdf6d8',
        border: '0.1em solid #fdf6d8',
        borderRadius: '0.25em',
        padding: '0.5em',
        fontSize: '1em',
        margin: '0.5em',
    },
    stdInput: {
        backgroundColor: '#000000',
        color: '#fdf6d8',
        border: '0.1em solid #fdf6d8',
        borderRadius: '0.25em',
        padding: '0.5em',
        fontSize: '1em',
        margin: '0.5em',
    },
    gtrInput: {
        backgroundColor: 'transparent',
        color: 'gold',
        border: '0.125em solid gold',
        borderRadius: '0.5em',
        padding: '0.5em',
        fontSize: '1.5em',
        margin: '0.5em',
    },
    borderless: {
        border: 'none',
    },
    bottomLeftCorner: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#5a0043',
        color: '#fdf6d8',
        fontSize: '1em',
        padding: '0.5em',
        borderRadius: '0.5em',
    },
    bottomRightCorner: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#5a0043',
        color: '#fdf6d8',
        fontSize: '1em',
        padding: '0.5em',
        borderRadius: '0.5em',
    },
    corner: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#5a0043',
        color: '#fdf6d8',
        fontSize: '1em',
        padding: '0.5em',
        borderRadius: '0.5em',
    },
    topLeftCorner: {
        position: 'absolute',
        top: 0,
        left: 0,
    },    
    stdLabel: {
        position: 'absolute',
        display: 'inline-block',
        color: '#fdf6d8',
        fontSize: '1em',
        margin: '1em',
    },
});