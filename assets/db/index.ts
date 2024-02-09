import Equipment from "~/models/equipment";
import { Weapons } from "./weaponry";

try { window } catch (e) {
    console.log('IndexedDB not supported');
}

// const indexedDB =
//     window.indexedDB ||
//     (window as any).mozIndexedDB ||
//     (window as any).webkitIndexedDB ||
//     (window as any).msIndexedDB;


export const openDB = (dbName: string, version: number, store: string) => {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const indexedDB = window.indexedDB ||
        (window as any).mozIndexedDB ||
        (window as any).webkitIndexedDB ||
        (window as any).msIndexedDB || null;


        const request = indexedDB.open(dbName, version);
        request.onupgradeneeded = () => {
            const db = request.result;
            db.createObjectStore(store, { keyPath: '_id' });
        };
        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = () => {
            reject(request.error);
        };
    });
};

const eqReq = indexedDB.open('EquipmentDatabase', 1);

eqReq.onupgradeneeded = () => {
    const db = eqReq.result;
    const store = db.createObjectStore('Equipment', { keyPath: '_id' });

    store.createIndex('_id', ['name', '_', 'rarity'], { unique: true });
    store.createIndex('name', 'name', { unique: false });
    store.createIndex('rarity', 'rarity', { unique: false });
};

eqReq.onsuccess = () => {
    const db = eqReq.result;
    const transaction = db.transaction('Equipment', 'readwrite');

    const store = transaction.objectStore('Equipment');
    const index = store.index('_id');
    const nameIndex = store.index('name');
    const rarityIndex = store.index('rarity');

    Weapons.forEach((weapon: Equipment) => {
        store.put({ ...weapon, _id: `${weapon.name.toLowerCase().replace(/ /g, '_')}_${weapon.rarity?.toLowerCase()}`});
    });

    transaction.oncomplete = () => {
        console.log('All done adding Weapons with IDs!');
        db.close();
    };

    const randQuery = index.get('astral_spear_rare');
    randQuery.onsuccess = () => {
        console.log(randQuery.result);
    };

    const nameQuery = nameIndex.get('Wildstrike');
    nameQuery.onsuccess = () => {
        console.log(nameQuery.result);
    };

    const rarityQuery = rarityIndex.get('Common');
    rarityQuery.onsuccess = () => {
        console.log(rarityQuery.result);
    };
};

// TODO: Create Persistenct Database for:
// 1. Equipment
// 2. Asceans
// 3. Enemies
// 4. Settings 