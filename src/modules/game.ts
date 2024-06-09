import Logger from './logger';
import Storage from './storage';
import Debug from './debug';
import Counter from './counter';
import Money from './money';
import Options from './options';
import Globals from '../utils/globals';
import Language from './language';
import Data from './data';
import Stats from './stats';
import Saves from './saves';
import Updates from './updates';
import Achievements from './achievements';
import Patreon from './patreon';
import Notifications from './notifications';
import Shop from './shop';

const log = new Logger();
const storage = new Storage();
const globals = new Globals();
const debug = new Debug();
const counter = new Counter();
const money = new Money();
const options = new Options()
const lang = new Language();
const data = new Data();
const stats = new Stats();
const saves = new Saves();
const updates = new Updates();
const achievements = new Achievements();
const notifications = new Notifications();
const patreon = new Patreon();
const shop = new Shop();

var timePlayedInterval: any;

export default class Game {

    /**
     * Load all systems
     *
     * @memberof Game
     */
    public load(): void {

        // Set game info
        let data = globals.getJSON('./assets/game.json');
        window.gameInfo = {
            version: data.version,
            saveName: data.saveName,
            debug: data.debug,
            console: {
                title: data.console.title,
                description: data.console.description
            }
        }

        // Browser console game info
        log.game(window.gameInfo.console.title);
        log.game(window.gameInfo.console.description);

        // Start game
        this.start();

        // TESSSSSSSSSTTTTTTTTTTTTTTTTT

        // Patreon test get patrons
        patreon.getPatrons().then((res: any) => console.log('Patreon Members: ' + res));

        // Electron test
        if(globals.isElectron()) { storage.removeAll(); console.log('Electron Mode!'); }

    }

    /**
     * Start game
     *
     * @memberof Game
     */
    public start(): void {

        this.loadData().then(() => {

            // Load JSON Files
            data.loadJSON();

            // Load
            lang.load();
            options.load();
            achievements.load();
            stats.load();
            updates.load();
            shop.load();
            debug.load();

            // Timers
            this.timer();
            counter.timer();
            money.timer();
            achievements.timer();
            notifications.timer();
            saves.timer();
            stats.timer();

            // Others
            data.streak();

        }).then(() => this.startComplete());
    }

    /**
     * New click
     *
     * @memberof Clicker
     */
    public click(): void {

        let activeSlime = window.gameData.slimes.findIndex(slime => slime.active === true);
        let totalBlorbsNow = window.gameData.slimes[activeSlime].blorbs.total;

        window.gameData.slimes[activeSlime].blorbs.total = window.gameData.slimes[activeSlime].blorbs.total + window.gameData.click.power;
        window.gameData.slimes[activeSlime].blorbs.generated = window.gameData.slimes[activeSlime].blorbs.generated + window.gameData.click.power;
        window.gameData.slimes[activeSlime].blorbs.universe = window.gameData.slimes[activeSlime].blorbs.universe + window.gameData.click.power;
        window.gameData.click.total = window.gameData.click.total + 1;

        counter.live(totalBlorbsNow, window.gameData.slimes[activeSlime].blorbs.total, window.gameData.click.power, true);

    }

    /**
     * Restart game
     *
     * @memberof Game
     */
    public restart(): void {

        log.info('Restarting game...');

        window.gameData.slimes.find((slime: any) => {
            if(slime.active === true) {
                counter.live(slime.blorbs.total, 0, 1000, false);
                counter.stopBlorbsTimer();
            }
        });

        setTimeout(() => {
            data.default();
            globals.reloadPage(300);
        }, 1000);

    }

    /**
     * Load game data and options
     *
     * @public
     * @memberof Game
     */
    public loadData(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let gameData = storage.get('gameData');
            let gameOptions = storage.get('gameOptions');
            if(!gameData && !gameOptions) { data.default().then(() => options.default().then(() => resolve(true))); return; }
            data.checkVersion(gameData).then(() => {

                window.gameData = gameData;
                window.gameOptions = gameOptions;

                window.gameData.slimes.find((slime: any) => {
                    if(slime.active === true) {
                        counter.live(slime.blorbs.total, 0, 1000, false);
                        window.gameLive = { blorbs: slime.blorbs.total, money: window.gameData.money.total };
                    }
                });

                resolve(true);
            });
        });
    }

    /**
     * Show game
     *
     * @private
     * @memberof Game
     */
    private startComplete() {

        // Player name
        $("#player-name").html(window.gameData.player);
        $("input#player-name").html(window.gameData.player);

        // Show game
        $("#game").show();

        // Disable loading page
        $("#loading").css("background", "rgb(23 23 25 / 0%)");
        setTimeout(() => { $("#loading").css("opacity", "0"); }, 500);
        setTimeout(() => { $("#loading").hide(); }, 1000);
    }

    /**
     * Timer for game data
     *
     * @private
     * @memberof Game
     */
    private timer() {

        // Clear intervals
        if(timePlayedInterval) clearInterval(timePlayedInterval);

        // Time Played Interval
        timePlayedInterval = setInterval(() => { this.timePlayed(); }, 1000);

    }

    /**
     * Time played in seconds
     *
     * @private
     * @memberof Game
     */
    private timePlayed() {
        window.gameData.timePlayed = window.gameData.timePlayed + 1;
    }

}

// Mod support
window.Game = new Game();