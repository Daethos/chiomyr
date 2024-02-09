import Phaser from "phaser";

export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot', active: true });
    };
    
    init() {};
    
    preload() {};
    
    create() {
        this.scene.start('Preload', {});
    };
};