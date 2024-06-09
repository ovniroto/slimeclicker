import Logger from "./logger";

const log = new Logger();

export default class Storage {

    /**
     * Set or modify local storage data
     *
     * @param {string} key
     * @param {*} data
     * @memberof Storage
     */
    public set(key: string, data: any): void {
        if(typeof data === 'object' || Array.isArray(data)) {
            localStorage.setItem(key, JSON.stringify(data));
        } else {
            localStorage.setItem(key, data);
        }
    }

    /**
     * Get local storage data
     *
     * @param {string} key
     * @return {*}
     * @memberof Storage
     */
    public get(key: string): any {
        let data: any = localStorage.getItem(key);
        if(typeof data === 'string') {
            if(data.charAt(0) == '{' && data.slice(-1) == '}') return JSON.parse(data);
            return data;
        } else {
            log.error(`Data of storage '${key}' does not exist`);
        }
    }

    /**
     * Remove local storage data
     *
     * @param {string} key
     * @memberof Storage
     */
    public remove(key: string): void {
        localStorage.removeItem(key);
        log.debug(`Local storage for '${key}' has been removed`);
    }

    /**
     * Remove all local storage data
     *
     * @memberof Storage
     */
    public removeAll(): void {
        localStorage.clear();
        log.debug(`All local storage has been removed`);
    }

}

// Mod support
window.Storage = new Storage();