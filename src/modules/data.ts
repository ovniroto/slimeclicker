import Storage from "./storage";
import Globals from "../utils/globals";
import Logger from "./logger";

const storage = new Storage();
const globals = new Globals();
const log = new Logger();

export default class Data {

    /**
     * Set default game data
     *
     * @public
     * @memberof Data
     */
    public default(): Promise<boolean> {
        return new Promise(function(resolve, reject) {

            let timeNow = globals.timestamp();

            // Game data
            window.gameData = {
                id: globals.randomNumber(10),
                version: window.gameInfo.version,
                player: globals.randomNameGenerator(),
                startDate: timeNow,
                saveDate: timeNow,
                lastPlayed: timeNow,
                timePlayed: 0,
                streak: 1,
                universe: 0,
                money: { total: 50000, generated: 0 },
                slimeActiveIndex: 0,
                slimes: [
                    {
                        id: 'flabber',
                        unlocked: true,
                        active: true,
                        discovered: timeNow,
                        blorbs: {
                            total: 0,
                            persecond: 0,
                            universe: 0,
                            generated: 0
                        }
                    }
                ],
                drops: { clicked: 0, multiplier: 0 },
                click: { total: 0, power: 1 },
                purchases: { machines: [], places: [], upgrades: [] },
                achievements: { special: [], normal: [], hard: [] }
            }

            // Live data
            window.gameLive = { blorbs: 0, money: 0 }

            // Save data
            storage.set('gameData', window.gameData);
            storage.set('gameLive', window.gameLive);

            resolve(true);

        });

    }


    /**
     * Check data version
     *
     * @param {*} data
     * @return {Promise<boolean>} Promise
     * @memberof Data
     */
    public checkVersion(data: any): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if(window.gameInfo.version !== data.version) {
                log.info(`This version of the game save is old!`);
                this.convert(data).then(() => resolve(true));
            } else {
                resolve(true);
            }
        });
    }

    /**
     * Convert old game data to new data
     *
     * @private
     * @param {*} data
     * @memberof Data
     */
    private convert(data: any): Promise<boolean> {
        return new Promise((resolve, reject) => {

            log.info(`Converting data from ${data.version} to ${window.gameInfo.version}`);

            // Update version
            data.version = window.gameInfo.version;

            // Add default data from x.x.x
            // data.x = 0;

            // Add default data from x.x.x
            // data.z = 1;
            // data.y = 2;

            // Store new game data
            storage.set('gameData', data);

            resolve(true);

        });
    }

    /**
     * Load JSON data one time
     *
     * @memberof Data
     */
    public loadJSON() {

        // Game updates
        window.gameUpdates = globals.getJSON(`assets/updates/${window.gameOptions.language}.json`);

        // Game buildings
        window.gameShop = {
            places: globals.getJSON(`assets/shop/places.json`),
            machines: globals.getJSON(`assets/shop/machines.json`),
            upgrades: globals.getJSON(`assets/shop/upgrades.json`),
            blorbs: globals.getJSON(`assets/shop/blorbs.json`),
        }

        // Game achievements
        window.gameAchievements = {
            special: globals.getJSON(`assets/achievements/special.json`),
            normal: globals.getJSON(`assets/achievements/normal.json`),
            hard: globals.getJSON(`assets/achievements/hard.json`)
        }

        // Game language
        window.gameLanguage = {
            achievements: globals.getJSON(`assets/langs/${window.gameOptions.language}/achievements.json`),
            places: globals.getJSON(`assets/langs/${window.gameOptions.language}/places.json`),
            machines: globals.getJSON(`assets/langs/${window.gameOptions.language}/machines.json`),
            general: globals.getJSON(`assets/langs/${window.gameOptions.language}/general.json`),
            upgrades: globals.getJSON(`assets/langs/${window.gameOptions.language}/upgrades.json`),
            blorbs: globals.getJSON(`assets/langs/${window.gameOptions.language}/blorbs.json`),
        }

    }

    /**
     * Change data
     *
     * @param {string} data
     * @param {*} value
     * @memberof Options
     */
    public change(data: string, value?: any): void {
        if(value == '' || value == undefined || value == null) return;
        if(data == 'playername') {
            window.gameData.player = value;
            $('#player-name').html(window.gameData.player);
            $('input#player-name').val(window.gameData.player);
        }
    }

    /**
     * Check if have played in the last 24 hours to increase connection streak
     *
     * @memberof Data
     */
    public streak() {
        let lastPlayed = window.gameData.lastPlayed;
        let streak = window.gameData.streak;
        let within24 = globals.within24hours(lastPlayed);
        let newDay = globals.isNewDay(lastPlayed);
        if(newDay) {
            window.gameData.lastPlayed = globals.timestamp();
            if(within24) {
                window.gameData.streak = streak + 1;
            } else {
                window.gameData.streak = 0;
            }
        }
    }

}