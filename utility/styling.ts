const getRarityColor = (rarity: string) => {
    switch (rarity) {
        case 'Common':
            return 'white';
        case 'Uncommon':
            return 'green';
        case 'Rare':
            return 'blue';
        case 'Epic':
            return 'purple';
        case 'Legendary':
            return 'darkorange';
        default:
            return 'grey';
    };
};

const getShadowColor = (prayer: string) => {
    switch (prayer) {
        case 'Buff':
            return 'gold';
        case 'Damage':
            return 'red';
        case 'Debuff':
            return 'purple';
        case 'Heal':
            return 'green';
        default:
            return 'white';
    };
};

const borderColor = (prayer: string) => {
    switch (prayer) {
        case 'Buff': return 'gold';
        case 'Debuff': return 'purple';
        case 'Heal': return 'green';
        case 'Damage': return 'red';
        case 'Avarice' : return 'greenyellow';
        case 'Denial' : return '#0cf';
        case 'Silence' : return 'black';
        default: return 'white';
    };
};

export { getRarityColor, getShadowColor, borderColor }