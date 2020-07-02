const storage = window.sessionStorage;

export default {
  setItem(key: string, value: string): void {
    storage.setItem(key, value);
  },

  getItem(key: string): string | null {
    return storage.getItem(key);
  },

  removeItem(key: string): void {
    storage.removeItem(key);
  },
};
