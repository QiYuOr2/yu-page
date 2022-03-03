/**
 * CookieDriver.ts cookie驱动
 * @description 使其支持对cookie的操作
 */

export const cookieDriver = new (class CookieDriver implements globalThis.Storage {
  [name: string]: any;

  length: number = 0;

  get raw() {
    return document.cookie;
  }

  clear(): void {
    this.length = 0;
    document.cookie = '';
  }
  getItem(key: string): string | null {
    let start = this.raw.indexOf(key + '=');
    let end;
    if (start !== -1) {
      start = start + String(key).length + 1;
      end = this.raw.indexOf(';', start);
      if (end === -1) {
        end = this.raw.length;
      }
      return decodeURIComponent(this.raw.substring(start, end));
    }
    return null;
  }
  key(index: number): string | null {
    throw new Error('Method not implemented.');
  }
  removeItem(key: string): void {
    if (this.length > 0) {
      let start = this.raw.indexOf(key + '=');
      let end;
      if (start !== -1) {
        let valueStart = start + String(key).length + 1;
        end = this.raw.indexOf(';', valueStart);
        if (end === -1) {
          const subString = this.raw.substring(start, end);
          this.raw.replace(subString, '');
          this.length--;
        }
      }
    }
  }
  setItem(key: string, value: string) {
    this.length++;
    document.cookie = `${key}=${encodeURIComponent(value)};max-age=${31525459200};path=/`;
  }
})();
