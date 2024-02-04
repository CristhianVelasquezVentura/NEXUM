export abstract class StorageBase implements Storage {
  protected constructor(protected readonly _api: Storage) {
  }

  get length(): number{
   return this._api.length
  }

  clear(): void {
    this._api.clear();
  }

  getItem<T>(key: string): T | null {


    const data = this._api.getItem(key);
    return data !== null ? JSON.parse(data) as T : null;
  }

  key(index: number): string | null {
    return this._api.key(index);
  }

  removeItem(key: string): void {
    this._api.removeItem(key);
  }

  setItem(key: string, value: unknown): void {
    const data = JSON.stringify(value)
    this._api.setItem(key, data);
  }

}
