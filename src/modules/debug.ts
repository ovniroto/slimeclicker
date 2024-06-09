import Logger from "./logger";

const log = new Logger();
const debug = true;

export default class Debug {

    /**
     * Debug all storage data
     *
     * @memberof Debug
     */
     public load(): void {
        if(!debug) return;
        this.getAllData();
    }

    /**
     * Get all data
     *
     * @private
     * @memberof Debug
     */
    private getAllData(): void {
        if(!window.gameData) return;
        log.debug(`Game Data:`);
        console.log(window.gameData);
        log.debug(`Game Options:`);
        console.log(window.gameOptions);
    }

}