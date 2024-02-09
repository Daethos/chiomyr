import Phaser from 'phaser';

export default class Joystick extends Phaser.GameObjects.Container {

    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.scene.add.existing(this);

        this.joystick = this.scene.plugins.get('rexVirtualJoystick').add(scene, {
            x: 80,
            y: window.innerHeight - 80,
            radius: 50,
            base: this.scene.add.circle(0, 0, 50, 0x000000),
            thumb: this.scene.add.circle(0, 0, 25, 0xfdf6d8),
            dir: '8dir',
            // forceMin: 0,
            // enable: true
        });

        // this.add(this.joystick);
        this.setInteractive();
        console.log(this.joystick, this.joystick.force, this.joystick.forceX, this.joystick.forceY, 'Joystick');
    };

    createCursorKeys() {
        return this.joystick.createCursorKeys();
    };

    isDown() {
        console.log(this.joystick,  'Joystick')
    };
};