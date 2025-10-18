export default class IDB {
  constructor(name, version, stores = {}) {
    this.name = name;
    this.version = version;
    this.stores = stores; // 例如: { audios: { keyPath: 'id' }, books: { autoIncrement: true } }
    this.db = null;
  }

  async open() {
    if (this.db) return this.db;
    this.db = await new Promise((resolve, reject) => {
      const request = indexedDB.open(this.name, this.version);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        for (const storeName in this.stores) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, this.stores[storeName]);
          }
        }
      };
    });
    return this.db;
  }

  async _withStore(storeName, mode, callback) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, mode);
      const store = tx.objectStore(storeName);
      const result = callback(store);
      tx.oncomplete = () => resolve(result);
      tx.onerror = () => reject(tx.error);
    });
  }

  // ===== 常用操作 =====

  async add(store, value, key) {
    return this._withStore(store, 'readwrite', s => s.add(value, key));
  }

  async put(store, value, key) {
    return this._withStore(store, 'readwrite', s => s.put(value, key));
  }

  async get(store, key) {
    return this._withStore(store, 'readonly', s =>
      new Promise((resolve, reject) => {
        const req = s.get(key);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      })
    );
  }

  async getAll(store) {
    return this._withStore(store, 'readonly', s =>
      new Promise((resolve, reject) => {
        const req = s.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      })
    );
  }

  async delete(store, key) {
    return this._withStore(store, 'readwrite', s => s.delete(key));
  }

  async clear(store) {
    return this._withStore(store, 'readwrite', s => s.clear());
  }

  async count(store) {
    return this._withStore(store, 'readonly', s =>
      new Promise((resolve, reject) => {
        const req = s.count();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      })
    );
  }

  async getAllKeys(store) {
    return this._withStore(store, 'readonly', s =>
      new Promise((resolve, reject) => {
        const req = s.getAllKeys();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      })
    );
  }

  async close() {
    if (this.db) this.db.close();
    this.db = null;
  }

  async deleteDB() {
    this.close();
    return new Promise((resolve, reject) => {
      const req = indexedDB.deleteDatabase(this.name);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
      req.onblocked = () => reject(new Error('Delete blocked by open connection'));
    });
  }
}

/*

下面我给你几个典型示例，展示如何 创建数据库、操作数据、读取、删除 等。

1️⃣ 初始化数据库
import { IDB } from './idb.js'; // 假设你的模块名为 idb.js

// 创建数据库实例
const db = new IDB('MyLibrary', 1, {
  audios: { keyPath: 'id' },
  books: { autoIncrement: true }
});

await db.open(); // 打开数据库，如果是新版本会创建 stores
console.log('数据库已打开');

2️⃣ 添加数据
// 向 audios store 添加一条记录
await db.add('audios', { id: 'track001', title: 'Song One', duration: 180 });

// 向 books store 添加一条记录（自增主键）
const bookId = await db.add('books', { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' });
console.log('新书 ID:', bookId);

3️⃣ 更新数据
// 修改 audios store 中某条记录
await db.put('audios', { id: 'track001', title: 'Song One (Remastered)', duration: 182 });

4️⃣ 查询数据
// 获取单条记录
const track = await db.get('audios', 'track001');
console.log('Track:', track);

// 获取所有记录
const allBooks = await db.getAll('books');
console.log('Books:', allBooks);

// 获取所有 key
const keys = await db.getAllKeys('audios');
console.log('Audio keys:', keys);

// 统计条数
const count = await db.count('books');
console.log('书本数量:', count);

5️⃣ 删除数据或清空 Store
// 删除单条记录
await db.delete('audios', 'track001');

// 清空整个 store
await db.clear('books');

6️⃣ 关闭或删除数据库
// 关闭数据库
await db.close();

// 删除数据库
await db.deleteDB();
console.log('数据库已删除');

7️⃣ 综合示例：增删查操作
(async () => {
  const db = new IDB('MyLibrary', 1, {
    audios: { keyPath: 'id' },
    books: { autoIncrement: true }
  });

  await db.open();

  // 添加记录
  await db.add('books', { title: '1984', author: 'George Orwell' });
  await db.add('books', { title: 'Brave New World', author: 'Aldous Huxley' });

  // 查询全部
  const books = await db.getAll('books');
  console.log('Books:', books);

  // 删除第一条
  await db.delete('books', books[0].id);

  // 查询全部
  const remaining = await db.getAll('books');
  console.log('Remaining books:', remaining);

  await db.close();
})();


✅ 总结：

await db.open() 打开数据库

add / put 写入数据

get / getAll / getAllKeys 查询数据

delete / clear 删除数据

close / deleteDB 管理数据库生命周期
*/