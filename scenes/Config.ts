import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import GlowFilterPipelinePlugin from 'phaser3-rex-plugins/plugins/glowfilter2pipeline-plugin.js';
// @ts-ignore
import { PhaserNavMeshPlugin } from 'phaser-navmesh';
import Boot from './Boot';
import Preload from './Preload';
import Menu from './Menu';
import Play from './Play';
import InventoryScene from './InventoryScene';

let scenes: any[] = [];
scenes.push(Boot);
scenes.push(Preload);
scenes.push(Menu);
scenes.push(Play);
scenes.push(InventoryScene);


export const config = {
    type: Phaser.AUTO,
    parent: 'story-game',
    fullscreenTarget: 'story-game',
    // width: 960,
    // height: 640,
    scene: scenes,
    scale: { 
        // mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CENTER_BOTH,
        width: '100%',
        height: '99.5%',
     },
    physics: {
        default: 'matter',
        matter: {
            // debug: true,
            gravity: { y: 0 },
        }
    }, 
    plugins: {
        global: [
            {
                key: 'rexVirtualJoystick',
                plugin: VirtualJoystickPlugin,
                start: true
            },
            {
                key: 'rexGlowFilterPipeline',
                plugin: GlowFilterPipelinePlugin,
                start: true
            }
        ],
        scene: [
            {
                plugin: PhaserMatterCollisionPlugin,
                key: 'matterCollision',
                mapping: 'matterCollision'
            },
            {
                key: "PhaserNavMeshPlugin",
                plugin: PhaserNavMeshPlugin,
                mapping: "navMeshPlugin",
                start: true
            },
        ],
        src: [
            'VirtualJoysticks/plugin/src/Pad.js',
            'VirtualJoysticks/plugin/src/Stick.js',
            'VirtualJoysticks/plugin/src/Button.js',
            'VirtualJoysticks/plugin/src/DPad.js',
        ],
    }, 
};