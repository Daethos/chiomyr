import Phaser from 'phaser';
import arrowPNG from '../assets/gui/arrow_effect.png';
import arrowJSON from '../assets/gui/arrow_effect_atlas.json';
import arrowAnim from '../assets/gui/arrow_anim.json';
import earthPNG from '../assets/gui/earth_effect.png';
import earthJSON from '../assets/gui/earth_json.json';
import earthAnim from '../assets/gui/earth_anim.json';
import firePNG from '../assets/gui/fire_effect.png';
import fireJSON from '../assets/gui/fire_json.json';
import fireAnim from '../assets/gui/fire_anim.json';
import frostPNG from '../assets/gui/frost_effect.png';
import frostJSON from '../assets/gui/frost_json.json';
import frostAnim from '../assets/gui/frost_anim.json';
import lightningPNG from '../assets/gui/lightning_effect.png';
import lightningJSON from '../assets/gui/lightning_json.json';
import lightningAnim from '../assets/gui/lightning_anim.json';
import wildPNG from '../assets/gui/wild_effect.png';
import wildJSON from '../assets/gui/wild_json.json';
import wildAnim from '../assets/gui/wild_anim.json';
import windPNG from '../assets/gui/wind_effect.png';
import windJSON from '../assets/gui/wind_json.json';
import windAnim from '../assets/gui/wind_anim.json';
import sorceryPNG from '../assets/gui/sorcery_effect.png';
import sorceryJSON from '../assets/gui/sorcery_json.json';
import sorceryAnim from '../assets/gui/sorcery_anim.json';
import righteousPNG from '../assets/gui/righteous_effect.png';
import righteousJSON from '../assets/gui/righteous_json.json';
import righteousAnim from '../assets/gui/righteous_anim.json';
import spookyPNG from '../assets/gui/spooky_effect.png';
import spookyJSON from '../assets/gui/spooky_json.json';
import spookyAnim from '../assets/gui/spooky_anim.json';
import { v4 as uuidv4 } from 'uuid';

class Particle {
    constructor(scene, action, key, player) {
        const id = uuidv4();
        this.scene = scene;
        this.id = id;
        this.action = action;
        this.effect = this.spriteMaker(this.scene, player, key + '_effect'); 
        this.key = key + '_effect';
        this.target = this.setTarget(player);
        this.success = false;
        this.timer = this.setTimer(action, id);
        this.triggered = false;
        this.velocity = this.setVelocity(action);

        const { Bodies } = Phaser.Physics.Matter.Matter;
        const effectSensor = Bodies.circle(player.x, player.y, 6, { isSensor: true, label: `effectSensor-${id}`}); 
        this.effect.setExistingBody(effectSensor); 
        scene.add.existing(this.effect);
        this.sensorListener(player, this, effectSensor);
    };

    sensorListener(player, effect, sensor) {
        this.scene.matterCollision.addOnCollideStart({
            objectA: [sensor],
            callback: (other) => {
                if (other.gameObjectB && player.particleEffect && other.gameObjectB.name === 'enemy' && !other.gameObjectB.isDefeated && player.name === 'player') {
                    player.attackedTarget = other.gameObjectB;
                    player.particleEffect.success = true;
                    if (this.scene.state.action !== effect.action) {
                        this.scene.combatMachine.input('action', effect.action);
                    };
                };
                if (other.gameObjectB && player.particleEffect && other.gameObjectB.name === 'player' && player.name === 'enemy') {
                    if (player.isCurrentTarget && this.scene.state.computerAction !== effect.action) {
                        this.scene.combatMachine.input('computerAction', effect.action, player.enemyID);
                    };
                    player.particleEffect.success = true;
                };
            },
            context: this.scene,
        });
    };

    setTarget(player) {
        if (player.name === 'enemy') {
            const target = new Phaser.Math.Vector2(player.attacking.body.position.x, player.attacking.body.position.y);
            const direction = target.subtract(player.position);
            return direction;
        } else {
            const target = new Phaser.Math.Vector2(this.scene.input.activePointer.worldX, this.scene.input.activePointer.worldY);
            const direction = target.subtract(player.position);
            return direction;
        };
    };

    setTimer(action, id) {
        const time = { attack: 1500, counter: 1000, posture: 1250, roll: 1250 };
        this.scene.time.addEvent({
            delay: time[action],
            callback: () => {
                this.scene.particleManager.removeEffect(id);
            },
            callbackScope: this.scene,
            loop: false,
        })
    };

    setVelocity(action) {
        const velocity = { attack: 7.5, counter: 9, posture: 6, roll: 6 };
        return velocity[action];
    };

    spriteMaker(scene, player, key) {
        return new Phaser.Physics.Matter.Sprite(scene.matter.world, player.x, player.y, key).setScale(0.3).setOrigin(0.5, 0.5).setDepth(player.depth + 1).setVisible(false);    
    };
};

export default class ParticleManager extends Phaser.Scene { 
    static preload(scene) {
        // scene.load.image('arrow_effect', process.env.PUBLIC_URL + '/images/arrow_effect.png');
        scene.load.atlas('arrow_effect', '../assets/gui/arrow_effect.png', '../assets/gui/arrow_effect_atlas.json');
        scene.load.animation('arrow_anim', '../assets/gui/arrow_anim.json');    
        scene.load.atlas('earth_effect', '../assets/gui/earth_effect.png', '../assets/gui/earth_json.json');
        scene.load.animation('earth_anim', '../assets/gui/earth_anim.json');
        scene.load.atlas('fire_effect', '../assets/gui/fire_effect.png', '../assets/gui/fire_json.json');
        scene.load.animation('fire_anim', '../assets/gui/fire_anim.json');
        scene.load.atlas('frost_effect', '../assets/gui/frost_effect.png', '../assets/gui/frost_json.json');
        scene.load.animation('frost_anim', '../assets/gui/frost_anim.json');
        scene.load.atlas('lightning_effect', '../assets/gui/lightning_effect.png', '../assets/gui/lightning_json.json');
        scene.load.animation('lightning_anim', '../assets/gui/lightning_anim.json');
        scene.load.atlas('wind_effect', '../assets/gui/wind_effect.png', '../assets/gui/wind_json.json');
        scene.load.animation('wind_anim', '../assets/gui/wind_anim.json');
        scene.load.atlas('wild_effect', '../assets/gui/wild_effect.png', '../assets/gui/wild_json.json');
        scene.load.animation('wild_anim', '../assets/gui/wild_anim.json');
        scene.load.atlas('sorcery_effect', '../assets/gui/sorcery_effect.png', '../assets/gui/sorcery_json.json');
        scene.load.animation('sorcery_anim', '../assets/gui/sorcery_anim.json');
        scene.load.atlas('righteous_effect', '../assets/gui/righteous_effect.png', '../assets/gui/righteous_json.json');
        scene.load.animation('righteous_anim', '../assets/gui/righteous_anim.json');
        scene.load.atlas('spooky_effect', '../assets/gui/spooky_effect.png', '../assets/gui/spooky_json.json');
        scene.load.animation('spooky_anim', '../assets/gui/spooky_anim.json');
    };

    constructor(scene) {
        super(scene.matter.world, 0, 0, 'particle_effects');
        this.scene = scene; 
        this.particles = []; 
    };  

    addEffect(action, player, key) {
        const newParticle = new Particle(this.scene, action, key, player); 
        this.particles.push(newParticle);
        return newParticle;
    };

    getEffect(id) {
        return this.particles.find(particle => particle.id === id);
    };

    removeEffect(id) {
        this.stopEffect(id);
        let particle = this.particles.find(particle => particle.id === id);
        if (particle) {
            particle.effect.destroy();
            this.particles = this.particles.filter(particle => particle.id !== id);
        };
    };

    startEffect(player, id) {
        let particle = this.particles.find(particle => particle.id === id);
        if (particle) {
            const direction = player.flipX ? -1 : 1;
            particle.effect.play(particle.key, true);
            particle.setVelocity(7 * direction, 0);
        };
    };

    stopEffect(id) {
        let particle = this.particles.find(particle => particle.id === id);
        if (particle) {
            particle.effect.setVisible(false);
            particle.effect.stop();
        };
    };

    update(player) { 
        if (!player.particleEffect) return;
        if (!player.particleEffect.effect.visible) player.particleEffect.effect.setVisible(true); 
        if (!player.flipX && !player.particleEffect.effect.flipX) player.particleEffect.effect.flipX = true;
        if (player.particleEffect && player.particleEffect.effect && this.particles.find((particle) => particle.id === player.particleEffect.id)) {
            if (player.name === 'player' && player.particleEffect.action === 'roll') return;
            player.particleEffect.effect.play(player.particleEffect.key, true);
            const target = player.particleEffect.target;
            target.normalize();
            player.particleEffect.effect.setVelocity(player.particleEffect.velocity * target.x, target.y * player.particleEffect.velocity);
        };
    };
};