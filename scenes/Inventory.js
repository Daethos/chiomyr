import EventEmitter from "../phaser/EventEmitter";

export default class Inventory {
    constructor() {
        this.maxColumns = 5;
        this.maxRows = 6;
        this.selected = 0;
        this.observers = [];
        this.items = {};
        this.fetch();
    };

    fetch = () => {
        EventEmitter.once('get-inventory', this.refresh);
        EventEmitter.emit('request-inventory');
    };

    refresh = (inventory) => {
        inventory.forEach(item => {
            this.addItem(item);
        });
    };

    subscribe(fn) {
        this.observers.push(fn);
    };
    unsubscribe(fn) {
        this.observers = this.observers.filter(subscriber => subscriber !== fn);
    };

    broadcast() {
        this.observers.forEach(subscriber => subscriber());
    };

    addItem(item) {
        let existingKey = Object.keys(this.items).find(key => this.items[key]._id === item._id);
        if (!existingKey) {
            console.log('adding item to inventory');
            for (let i = 0; i < this.maxColumns * this.maxRows; i++) {
                let existingItem = this.items[i];
                if (!existingItem) {
                    this.items[i] = item;
                    break;
                };
            };
        };
        this.broadcast();
    };

    removeItem(id) {
        let existingKey = Object.keys(this.items).find(key => this.items[key]._id === id);
        if (existingKey) {
            delete this.items[existingKey];
        };
        this.broadcast();
    };

    getItem(index) {
        return this.items[index];
    };

    moveItem(start, end) {
        if (start === end) return; // || this.items[end]
        if (this.items[end]) {
            console.log('swapping items')
            let temp = this.items[end];
            this.items[end] = this.items[start];
            this.items[start] = temp;
        } else {
            console.log('moving item to new slot')
            this.items[end] = this.items[start];
            delete this.items[start];
        };
        this.broadcast();
    };

    get selectedItem() {
        return this.items[this.selected];
    };
};