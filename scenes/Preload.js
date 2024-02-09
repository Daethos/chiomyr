import Phaser from "phaser";
import ascean_test from '../assets/gui/ascean_test.json';
import Entity from "../entities/Entity";
import NewText from '../phaser/NewText' 
import ParticleManager from "../phaser/ParticleManager";
// import Treasure from '../matter/Treasure';
import { sanitize } from "../stores/phaser";

export default class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload', active: false });
        this.centerX = window.innerWidth / 2;
        this.centerY = window.innerHeight / 2;
        this.width = this.centerX * 1.5;
        this.height = 36;
        this.ascean = {};
        this.enemy = {};
        this.state = {};
        this.game = {};
    };

    init() {};

    preload() {
        this.bg = this.add.graphics({ x: 0, y: 0 });
        this.bg.fillStyle('0x000000', 1);
        this.bg.fillRect(0, 0, window.innerWidth, window.innerHeight);
        ParticleManager.preload(this);
        Entity.preload(this);
        // Treasure.preload(this);
        
        this.load.tilemapTiledJSON('ascean_test', ascean_test);
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true); 
        this.load.plugin('rexglowfilterpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexglowfilterpipelineplugin.min.js', true);

        this.load.audio('background', '../assets/sounds/background.mp3');
        this.load.audio('caerenic', '../assets/sounds/caerenic.wav');
        this.load.audio('stalwart', '../assets/sounds/stalwart.mp3');
        this.load.audio('stealth', '../assets/sounds/stealth.mp3');
        this.load.audio('prayer', '../assets/sounds/religious.mp3');

        this.assets = sanitize();

        this.assets.forEach((asset) => {
            this.load.image(asset.sprite, asset.imgUrl, { frameWidth: 32, frameHeight: 32 });
        });
        
        this.load.image('target', '../assets/gui/target_1.png');
        this.load.image('AncientForestMain', '../assets/gui/AncientForestMainLev.png');
        this.load.image('AncientForestDecorative', '../assets/gui/AncientForestDecorative.png');
        this.load.image('Camp_Graves', '../assets/gui/Camp_Graves.png');
        this.createLoadingBar();

    };

    create() {
        console.log('How about here?');
        this.time.addEvent({
            delay: 500,
            callback: () => { 
                this.scene.start('Menu', {}); 
                this.progress.destroy();
                this.border.destroy();
                this.title.destroy();
                this.txt_progress.destroy();
                this.txt_file.destroy();

            },
            callbackScope: this
        }); 
    };

    createLoadingBar() {
        this.title = new NewText(
            this,
            this.centerX,
            this.centerY / 2,
            'Loading Game',
            'preload',
            0.5
        );

        this.txt_progress = new NewText(
            this,
            this.centerX,
            this.centerY - 5,
            'Loading...',
            'preload',
            { x: 0.5, y: 1 }
        );
        this.txt_file = new NewText(
            this,
            this.centerX,
            this.centerY + 175,
            '',
            'play',
            { x: 0.5, y: 1 }
        );
        let x = this.centerX - (this.width / 2);
        let y = this.centerY + 75;
        this.progress = this.add.graphics({ x: x, y: y });
        this.border = this.add.graphics({ x: x, y: y });
        this.borderBorder = this.add.graphics({ x: x, y: y });
        this.load.on('progress', this.onProgress, this);
        this.load.on('fileprogress', this.onFileProgress, this);
    };

    onProgress(val) {
        this.progress.clear();
        this.progress.fillStyle('0xFDF6D8', 1);
        this.progress.fillRect(0, 0, this.width * val, this.height);
        
        this.border.clear();
        this.border.lineStyle(4, '0x000000', 1);
        this.border.strokeRect(0, 0, this.width * val, this.height, 2);
        
        this.borderBorder.clear();
        this.borderBorder.lineStyle(4, '0xFDF6D8', 1);
        this.borderBorder.strokeRect(0, 0, this.width, this.height, 2);
        
        this.txt_progress.setText(Math.round(val * 100) + '%');
    };

    onFileProgress(file) {
        this.txt_file.setText(`Loading: ${file.key}`);
    }; 
};