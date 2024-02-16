import Phaser from 'phaser';
import Player from '../entities/Player';
import Enemy from '../entities/Enemy';
import NPC from '../entities/NPC';
import Joystick from '../phaser/Joystick';
import NewText from '../phaser/NewText';
import stick from '../assets/gui/stick.png';
import base from '../assets/gui/base.png';
import ParticleManager from '../phaser/ParticleManager';
import LootDrop from '../matter/LootDrop';
import EventEmitter from '../phaser/EventEmitter';
import CombatMachine from '../phaser/CombatMachine';
import ActionButtons from '../phaser/ActionButtons';

export const { Bodies } = Phaser.Physics.Matter.Matter;

export default class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'Play', active: false });
        this.centerX = window.innerWidth / 2;
        this.centerY = window.innerHeight / 2;
    };
    
    init() {
        this.ascean = {};
        this.state = {};
        this.gameState = {};
        this.inventory = [];

        EventEmitter.once('get-ascean', this.asceanOn);
        EventEmitter.once('get-combat-data', this.stateOn);
        EventEmitter.once('get-game-data', this.gameStateOn);

        EventEmitter.emit('request-ascean');
        EventEmitter.emit('request-combat-data');
        EventEmitter.emit('request-game-data');
        this.enemy = {};
        this.npcs = [];
        this.combat = false;
        this.focus = {}; 
        this.enemies = [];
        this.particleManager = {};

        this.baseSprite = this.add.sprite(0, 0, base);
        this.thumbSprite = this.add.sprite(0, 0, stick);

        this.combatMachine = null;
        this.map = null;
        this.minimap = null;
        this.navMesh = null;

        this.combatTime = 0;
        this.combatTimer = null;
        this.lootDrops = [];
    }; 

    asceanOn = (e) => this.ascean = e;
    gameStateOn = (e) => this.gameState = e;
    stateOn = (e) => this.state = e;
    
    create() { 
        this.input.setDefaultCursor('../assets/images/cursor.png), pointer'); 
        
        // ================== Ascean Test Map ================== \\
        const map = this.make.tilemap({ key: 'ascean_test' });
        this.map = map;
        const camps = map.addTilesetImage('Camp_Graves', 'Camp_Graves', 32, 32, 0, 0);
        const decorations = map.addTilesetImage('AncientForestDecorative', 'AncientForestDecorative', 32, 32, 0, 0);
        const tileSet = map.addTilesetImage('AncientForestMain', 'AncientForestMain', 32, 32, 0, 0);
        const layer0 = map.createLayer('Tile Layer 0 - Base', tileSet, 0, 0);
        const layer1 = map.createLayer('Tile Layer 1 - Top', tileSet, 0, 0);
        const layerC = map.createLayer('Tile Layer - Construction', tileSet, 0, 0);
        const layer2 = map.createLayer('Tile Layer 2 - Flowers', decorations, 0, 0);
        const layer3 = map.createLayer('Tile Layer 3 - Plants', decorations, 0, 0);
        const layer4 = map.createLayer('Tile Layer 4 - Primes', decorations, 0, 0);
        const layer5 = map.createLayer('Tile Layer 5 - Snags', decorations, 0, 0);
        const layer6 = map.createLayer('Tile Layer 6 - Camps', camps, 0, 0);
        layer0.setCollisionByProperty({ collides: true });
        layer1.setCollisionByProperty({ collides: true });
        layerC.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(layer0);
        this.matter.world.convertTilemapLayer(layer1);
        this.matter.world.convertTilemapLayer(layerC);
        // this.matter.world.convertTilemapLayer(layer2);
        // this.matter.world.convertTilemapLayer(layer3);
        // this.matter.world.convertTilemapLayer(layer4);
        // this.matter.world.convertTilemapLayer(layer5); 
        // this.matter.world.createDebugGraphic(); 

        const objectLayer = map.getObjectLayer('navmesh');
        const navMesh = this.navMeshPlugin.buildMeshFromTiled("navmesh", objectLayer, 32);
        this.navMesh = navMesh;
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        this.navMesh.enableDebug(debugGraphics); 
        this.matter.world.setBounds(0, 0, 4096, 4096); // Top Down

        this.player = new Player({ scene: this, x: 200, y: 200, texture: 'player_actions', frame: 'player_idle_0' });
        this.map.getObjectLayer('Enemies').objects.forEach(enemy => this.enemies.push(new Enemy({ scene: this, x: enemy.x, y: enemy.y, texture: 'player_actions', frame: 'player_idle_0' })));
        this.map.getObjectLayer('Npcs').objects.forEach(npc => this.npcs.push(new NPC({ scene: this, x: npc.x, y: npc.y, texture: 'player_actions', frame: 'player_idle_0' })));


        // ====================== Combat Machine ====================== \\

        this.combatMachine = new CombatMachine(this);
        this.particleManager = new ParticleManager(this);

        // ====================== Input Keys ====================== \\

        this.player.inputKeys = {
            up: this.input.keyboard.addKeys('W,UP'),
            down: this.input.keyboard.addKeys('S,DOWN'),
            left: this.input.keyboard.addKeys('A,LEFT'),
            right: this.input.keyboard.addKeys('D,RIGHT'),
            attack: this.input.keyboard.addKeys('ONE'),
            counter: this.input.keyboard.addKeys('FIVE'),
            dodge: this.input.keyboard.addKeys('FOUR'),
            posture: this.input.keyboard.addKeys('TWO'),
            roll: this.input.keyboard.addKeys('THREE'), 
            hurt: this.input.keyboard.addKeys('H'),
            consume: this.input.keyboard.addKeys('F'),
            pray: this.input.keyboard.addKeys('R'),
            strafe: this.input.keyboard.addKeys('E,Q'),
            shift: this.input.keyboard.addKeys('SHIFT'),
            firewater: this.input.keyboard.addKeys('T'),
            target: this.input.keyboard.addKeys('TAB'),
            snare: this.input.keyboard.addKeys('V'),
            stalwart: this.input.keyboard.addKeys('G'),
        }; 

        // ================= Joystick ================= \\

        // var joystick = this.plugins.get('rexVirtualJoystick').add(this,  {
        //     x: 60,
        //     y: window.innerHeight - 60,
        //     radius: 50,
        //     base: this.add.circle(0, 0, 50, 0xfdf6d8),
        //     thumb: this.add.circle(0, 0, 25, 0x000000),
        //     dir: '8dir',
        //     // forceMin: 16,
        //     // enable: true
        // }).on('update', this.handleJoystickUpdate, this);
        // this.joystick = joystick;
        // this.handleJoystickUpdate();

        // this.joystick = new Joystick(this, 100, window.innerHeight - 100, 50);

        this.target = this.add.sprite(0, 0, "target").setScale(0.15).setVisible(false);
        this.actionBar = new ActionButtons(this);

        // ====================== Camera ====================== \\
          
        let camera = this.cameras.main;
        camera.zoom = 1;
        camera.startFollow(this.player);
        camera.setLerp(0.1, 0.1);
        camera.setBounds(0, 0, 4096, 4096);
        const darkOverlay = this.add.graphics();
        darkOverlay.fillStyle(0x000000, 0.35); // Black with 50% opacity
        darkOverlay.fillRect(0, 0, 4096, 4096);


        // =========================== Lighting =========================== \\

        this.lights.enable();
        this.playerLight = this.add.pointlight(this.player.x, this.player.y, 0xDAA520, 200, 0.0675, 0.0675); // 0xFFD700 || 0xFDF6D8 || 0xDAA520

        // =========================== Listeners =========================== \\

        // this.createWelcome(); 
        this.stateListener(); 
        this.staminaListener();
        this.enemyLootDropListener();
        this.enemyStateListener();

        // =========================== Music =========================== \\
        this.music = this.sound.add('background', { volume: this.gameState.soundEffectVolume, loop: true });
        this.music.play();

        // =========================== FPS =========================== \\

        this.fpsText = this.add.text(window.innerWidth / 2 - 32, window.innerHeight / 1.05, 'FPS: ', { font: '16px Cinzel', fill: '#fdf6d8' });
        this.fpsText.setScrollFactor(0);

        // =========================== Inventory =========================== \\

        // this.inventoryFetch();
        // this.inventoryUpdate();
        // this.scene.launch('InventoryScene', { scene: this });
    };

    // inventoryFetch = () => {
    //     EventEmitter.once('get-inventory', this.inventoryOn);
    //     EventEmitter.emit('request-inventory');
    // };

    inventoryOn = (inventory) => {
        this.inventory = inventory;
        this.player.inventory.refresh(inventory);
    };

    inventoryScene = (inventory) => {
        if (this.scene.isActive('InventoryScene')) {
            console.log('Inventory Scene is active', inventory)
            this.scene.stop('InventoryScene');
        } else {
            console.log('Inventory Scene is not active', inventory)
            this.scene.launch('InventoryScene', { scene: this });
            this.player.inventory.refresh(inventory);
        };
    };
    inventoryUpdate = () => EventEmitter.on('update-inventory', this.inventoryScene);

    handleJoystickUpdate() {
        var cursorKeys = this.joystick.createCursorKeys();
        for (let name in cursorKeys) {
           console.log(name,  'Name of Cursor Key')
            if (cursorKeys[name].isDown) {
                console.log(name, 'IS DOWN')
                if (name === 'up') this.player.setVelocityY(-1.5);
                if (name === 'down') this.player.setVelocityY(1.5);
                if (name === 'left') this.player.setVelocityX(-1.5);
                if (name === 'right') this.player.setVelocityX(1.5);
            };
        };
    }

    // ================== Combat ================== \\

    getEnemy(id) {
        return this.enemies.find(enemy => enemy.enemyID === id);
    };


    // ================== Listeners ================== \\

    cleanUp() {
        EventEmitter.off('enemyLootDrop', this.enemyDrops);
        EventEmitter.off('aggressive-enemy', this.enemyAggro);
    };

    enemyLootDropListener = () => EventEmitter.on('enemyLootDrop', this.enemyDrops);
    enemyDrops = (e) => e.drops.forEach(drop => this.lootDrops.push( new LootDrop({ scene: this, enemyID: e.enemyID, drop }) ));

    enemyStateListener = () => EventEmitter.on('aggressive-enemy', this.enemyAggro);
    enemyAggro = (e) => this.enemies.forEach(enemy => enemy.enemyID === e.id ? enemy.isAggressive = e.isAggressive : null);

    staminaListener = () => EventEmitter.on('updated-stamina', (e) => this.player.stamina = e); 
    stateListener = () => EventEmitter.on('update-combat-data', (e) => this.combat = e); 

    // ============================ Combat ============================ \\ 
    polymorph = (id) => {
        let enemy = this.enemies.find(enemy => enemy.enemyID === id);
        enemy.isPolymorphed = true;
    };
    root = () => {
        const { worldX, worldY } = this.input.activePointer;
        const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, worldX, worldY);
        const duration = 2 * distance;
        const rise = 0.5 * distance;
        const sensorRadius = 25;
        const sensorBounds = new Phaser.Geom.Circle(worldX, worldY, sensorRadius);

        const rootTween = this.add.tween({
            targets: this.target,
            props: {
                x: { from: this.player.x, to: worldX, duration: duration },
                y: { from: this.player.y, to: worldY, duration: duration }, 
                z: {
                    from: 0,
                    to: -rise,
                    duration: 0.5 * duration,
                    ease: 'Quad.easeOut',
                    yoyo: true
                },
                onStart: () => {
                    this.target.setVisible(true);
                },    
                onUpdate: (_tween, target, key, current) => {
                    if (key !== 'z') return;
                    target.y += current;
                }, 
            },
        });
        this.time.addEvent({
            delay: duration,
            callback: () => { 
                this.enemies.forEach(enemy => {
                    if (Phaser.Geom.Circle.ContainsPoint(sensorBounds, new Phaser.Geom.Point(enemy.x, enemy.y))) {
                        enemy.isRooted = true;
                    };
                });
            },
            callbackScope: this
        });
        this.time.addEvent({
            delay: 3000,
            callback: () => {
                this.target.setVisible(false);
                rootTween.destroy();
            },
            callbackScope: this
        });
    };
    snare = (id) => {
        let enemy = this.enemies.find(enemy => enemy.enemyID === id);
        enemy.isSnared = true;
    };
    stun = (id) => {
        let enemy = this.enemies.find(enemy => enemy.enemyID === id);
        console.log(`Enemy is stunned`)
        enemy.isBlindsided = true;
    };

    // ============================ Game ============================ \\
    
    checkPlayerSuccess = () => {
        if (!this.player.actionSuccess && (this.combat.action !== 'counter' && this.combat.action !== 'roll' && this.combat.action !== '')) this.combatMachine.input('action', '');
    };
    clearNAEnemy = () => {
        console.log('clearNAEnemy called')
        // this.dispatch(clearNonAggressiveEnemy()); 
    };
    clearNPC = () => EventEmitter.emit('clear-npc'); 
    combatEngaged = (bool) => {
        if (bool) { 
            this.combat = true; 
            this.actionBar.setVisible(true);
        } else { 
            this.combat = false; 
            this.actionBar.setVisible(false);
        };
        console.log(`Combat engaged: ${bool}`);
        // this.dispatch(getCombatFetch(bool));
    };
    drinkFlask = () => {
        console.log('drinkFlask called')
        // this.dispatch(getDrinkFirewaterFetch(this.combat.player._id));
    } 
    setupEnemy = (enemy) => {
        const data = { id: enemy.enemyID, game: enemy.ascean, enemy: enemy.combatStats, health: enemy.health, isAggressive: enemy.isAggressive, startedAggressive: enemy.startedAggressive, isDefeated: enemy.isDefeated, isTriumphant: enemy.isTriumphant };
        console.log(data, "setupEnemy data")    
        // this.dispatch(getEnemySetupFetch(data));
    };
    setupNPC = (npc) => {
        const data = { id: npc.id, game: npc.ascean, enemy: npc.combatStats, health: npc.health, type: npc.npcType };
        console.log(data, "setupNPC data")    
        // this.dispatch(getNpcSetupFetch(data));
    };
    showDialog = (dialog) => EventEmitter.emit('show-dialog', dialog);

    // ============================ Player ============================ \\

    caerenic = (bool) => {
        console.log('caerenic called:', bool);
        EventEmitter.emit('update-caerenic', bool);
        // this.dispatch(setCaerenic(bool));
    } ;
    stalwart = (bool) => {
        console.log('stalwart called:', bool);
        EventEmitter.emit('update-stalwart', bool);
        // this.dispatch(setStalwart(bool));
    } ;
    useStamina = (value) => EventEmitter.emit('update-stamina', value);

    createTextBorder(text) {
        const border = this.add.graphics();
        border.lineStyle(4, 0x2A0134, 1);
        border.strokeRect(
            text.x - text.width * text.originX - 2.5,
            text.y - text.height * text.originY - 2.5, 
            text.width + 5, 
            text.height + 5 
        );
          
        this.add.existing(border);
        return border;
    };   

    startCombatTimer = () => {
        this.combatTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (this.scene.isPaused()) return;
                this.combatTime += 1;
                EventEmitter.emit('update-combat-timer', this.combatTime);
            },
            callbackScope: this,
            loop: true
        });
    };

    stopCombatTimer = () => {
        this.combatTimer.destroy();
        this.combatTimer = null;
        this.combatTime = 0;
        EventEmitter.emit('update-combat-timer', this.combatTime);
    };

    // ================== Update ================== \\

    update() {
        this.player.update(); 
        // this.joystick.update();
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update();
        };
        for (let i = 0; i < this.npcs.length; i++) {
            this.npcs[i].update();
        }; 
        this.combatMachine.processor();

        this.playerLight.setPosition(this.player.x, this.player.y);
        this.fpsText.setText('FPS: ' + this.game.loop.actualFps.toFixed(2));
    };

    pause() {
        this.scene.pause();
        this.music.pause();
    };
    resume() {
        this.scene.resume();
        this.music.resume();
    };
};