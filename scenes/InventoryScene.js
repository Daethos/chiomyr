import Phaser from 'phaser';

export default class InventoryScene extends Phaser.Scene {
    constructor() {
        super('InventoryScene');
        this.rows = 1;
        this.gridSpacing = 48;
        this.inventorySlots = [];
        this.margin = 8;
        this.uiScale = 0.15;
        this._tileSize = 32;
        this.xOffset = window.innerWidth / 1.5;
        this.yOffset = window.innerHeight / 7.65;
    };

    init(data) {
        let { scene } = data;
        this.scene = scene;
        this.inventory = scene.player.inventory;
        this.maxColumns = this.inventory.maxColumns;
        this.maxRows = this.inventory.maxRows;
        this.inventory.subscribe(() => this.refresh())
    };

    inventoryImage = (item) => {
        return item.imgUrl.split('/')[3].split('.')[0];
    };

    get tileSize() {
        return this._tileSize * this.uiScale;
    };

    destroyInventorySlot(inventorySlot) {
        if (inventorySlot.item) inventorySlot.item.destroy();
        if (inventorySlot.background) inventorySlot.background.destroy();
        inventorySlot.destroy();
    };

    refresh() { 
        console.log('refreshing inventory')
        this.inventorySlots.forEach(s => this.destroyInventorySlot(s));
        this.inventorySlots = [];

        for (let i = 0; i < this.maxColumns * this.maxRows; i++) {
            let item = this.inventory.getItem(i);
            let x = this.margin + this.tileSize / 2 + (i % this.maxColumns) * (this.tileSize + this.gridSpacing);
            let y = this.margin + this.tileSize / 2 + Math.floor(i / this.maxColumns) * (this.tileSize + this.gridSpacing);
            x += this.xOffset;
            y += this.yOffset;
            let inventorySlot = this.add.sprite(x, y, 'target');
            inventorySlot.setScale(this.uiScale);
            // let inventorySlot = this.add.graphics();
            // inventorySlot.fillStyle(0x000000, 1);
            // inventorySlot.slice(x, y, 24, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), true);
            // inventorySlot.fillPath();
            inventorySlot.depth = -3;
            inventorySlot.background = this.add.graphics();
            inventorySlot.background.fillStyle(0x000000, 1);
            inventorySlot.background.slice(x, y, 24, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), true);
            inventorySlot.background.fillPath();
            inventorySlot.background.depth = -2;
            inventorySlot.setInteractive();
            // inventorySlot.on('pointerdown', pointer => {
            //     console.log(`Clicked: ${i}`);
            //     this.inventory.selected = i;
            //     this.updateSelected();
            // });
            inventorySlot.on('pointerover', pointer => {
                console.log(`Pointer Over: ${i}`);
                this.hoverIndex = i;
            });
            if (item) {
                // Dragging
                // this.input.setDraggable(inventorySlot);
                console.log('item refresh inventoryScene');
                inventorySlot.border = this.add.graphics();
                inventorySlot.border.lineStyle(2, 0xffff00, 1);
                inventorySlot.border.slice(x, y, 24, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), true);
                inventorySlot.border.strokePath();
                inventorySlot.border.depth = -3;

                inventorySlot.item = this.add.sprite(inventorySlot.x, inventorySlot.y - this.tileSize / 12, this.inventoryImage(item));
                inventorySlot.item.depth = 3;
                // Dragging
                inventorySlot.item.setInteractive();
                this.input.setDraggable(inventorySlot.item);
            };
            this.inventorySlots.push(inventorySlot);
        };
        this.updateSelected();
    };

    updateSelected() {
        for (let i = 0; i < this.maxColumns; i++) {
            this.inventorySlots[i].tint = this.inventory.selected === i ? 0xffff00 : 0xffffff
        };
    };

    create() { 
        // Selection Wheel
        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            if (this.scene.isActive('CraftingScene')) return;
            this.inventory.selected = Math.max(0, this.inventory.selected + (deltaY > 0 ? 1 : -1)) % this.maxColumns;
            this.updateSelected();
        })

        this.input.keyboard.on('keydown-I', () => {
            this.rows = this.rows === 1 ? this.maxRows : 1;
            this.refresh();
        });

        // Dragging
        this.input.setTopOnly(false);
        this.input.on('dragstart', () => {
            console.log('Drag Starting', this.startIndex,this.hoverIndex);
            this.startIndex = this.hoverIndex;
            // this.inventorySlots[this.startIndex].quantityText.destroy();
        });
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY; 
        });
        this.input.on('dragend', () => {
            this.inventory.moveItem(this.startIndex, this.hoverIndex);
            this.refresh();
        });
        this.refresh();
    };
};