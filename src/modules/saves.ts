import { saveAs } from 'file-saver';
import Storage from './storage';
import ExtraBase64 from '../utils/extrabase64';
import Globals from '../utils/globals';
import Notifications from './notifications';
import Language from './language';

const lang = new Language();
const notification = new Notifications();
const storage = new Storage();
const globals = new Globals();
const eb64 = new ExtraBase64();

export default class Saves {

    /**
     * Create new save
     *
     * @memberof Saves
     */
    public create(): void {
        let dataEncoded = eb64.encode(JSON.stringify(this.getGameData()));
        let fileType = 'text/plain;charset=utf-8';
        let fileName = `${window.gameInfo.saveName} ${window.gameInfo.version} (${globals.dateFormat('save', globals.timestamp())}).save`;
        let file = new File([dataEncoded], fileName, {type: fileType});
        saveAs(file);
    }

    /**
     * Load save
     *
     * @param {*} event
     * @memberof Saves
     */
    public load(event: any) {
        let input: any = event.target;
        let file = input.files[0];
        if(file == undefined) return;
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onloadend = () => {
            let data = JSON.parse(eb64.decode(`${reader.result}`));
            this.loadGameData(data).then(() => { globals.reloadPage(); });
        }
    }

    /**
     * Get all storage data
     *
     * @return {*}
     * @memberof Storage
     */
    public getGameData(): any {
        let gameData = storage.get('gameData');
        return gameData;
    }

    /**
     * Set all data
     *
     * @param {*} data
     * @memberof Storage
     */
    public loadGameData(data: any): Promise<boolean> {
        return new Promise(function(resolve, reject) {
            storage.set('gameData', data);
            resolve(true);
        });
    }

    /**
     * Save local data to storage
     *
     * @memberof Saves
     */
    public localGameData() {
        let gameData = window.gameData;
        window.gameData.saveDate = globals.timestamp();
        storage.set('gameData', gameData);
        notification.create('minimal', { title: `${lang.string('GAME_SAVED')}` }, 800);
    }

    /**
     * Timers
     *
     * @memberof Saves
     */
    public timer() {
        setInterval(() => { this.localGameData(); }, 59351);
    }

}

// Mod support
window.Saves = new Saves();