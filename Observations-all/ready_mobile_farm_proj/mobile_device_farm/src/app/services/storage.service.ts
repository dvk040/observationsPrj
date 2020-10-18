import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  /**
   * save data in LocalStorage
   * @param key
   * @param data
   */
  public addToLocalStorage(key, data) {
    if (typeof data == 'object') {
      data = JSON.stringify(data);
    }
    localStorage.setItem(key, data);
  }

  /**
   * Get saved data from LocalStorage
   * @param key
   */
  public getFromLocalStorage(key) {
    // Parse the string back to object.
    const data = localStorage.getItem(key);
    if (data) {
      return data;
    } else {
      return data;
    }
  }

  /**
   *Remove item from the local storage
   * @param key
   */
  public removeFromLocalStorage(key) {
    localStorage.removeItem(key);
  }

  /**
   * save data in sessionStorage
   * @param key
   * @param data
   */
  public addToSessionStorage(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Get saved data from sessionStorage
   * @param key
   */
  public getFromSessioStorage(key) {
    // Parse the string back to object.
    const data = sessionStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return data;
    }
  }

  /**
   * Remove item from the local storage
   * @param key
   */
  public removeFromSessionStorage(key) {
    sessionStorage.removeItem(key);
  }
}
