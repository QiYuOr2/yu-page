class YuStorage {
  storage: Storage;
  constructor(storage: Storage) {
    this.storage = storage;
  }

  get(key: string) {
    const raw = this.storage.getItem(key)!;
    try {
      return JSON.parse(raw);
    } catch (error) {
      return raw;
    }
  }

  set<T>(key: string, val: T) {
    this.storage.setItem(key, typeof val === 'object' ? JSON.stringify(val) : String(val));
  }
}

export const local = new YuStorage(localStorage);
