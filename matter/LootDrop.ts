import Phaser from "phaser";
import EventEmitter from "../phaser/EventEmitter";
import Play, { Bodies } from "../scenes/Play";

export default class LootDrop extends Phaser.Physics.Matter.Image {  
    private _id: string;
    private drop: any;

    constructor(data: { scene: Play, enemyID: string, drop: any }) {
        let { scene, enemyID, drop } = data;
        const texture = imgURL(drop.imgURL);
        const enemy = scene.enemies?.find((e) => e.enemyID === enemyID);
        super (scene.matter.world, enemy.body.position.x - 16, enemy.body.position.y + 16, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.setScale(0.5);
        this._id = drop._id;
        this.drop = drop;
        this.setupCollider();
        this.setupListener();
    }; 

    cleanUp() {
        EventEmitter.off('destroy-lootdrop', this.destroyLootDrop);
    };

    private setupCollider = (): void => {
        const circleCollider = Bodies.circle(this.x, this.y, 12, {
          isSensor: false,
          label: "lootdropCollider",
        });
        this.setExistingBody(circleCollider);
        this.setStatic(true);
    };


    private setupListener = () => EventEmitter.on('destroy-lootdrop', this.destroyLootDrop);
    
    private destroyLootDrop = (e: any): void => {
        if (e === this._id) {
            this.cleanUp();
            this.destroy();
        };
    }; 
};

const imgURL = (url: string): string => {
    return url.split('/')[2].split('.')[0];
};