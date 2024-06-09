import Globals from "../utils/globals";
import Language from "./language";

const globals = new Globals();
const lang = new Language();

/**
 * Game stats
 *
 * @class Stats
 */
export default class Stats {

    /**
     * Load stats
     *
     * @memberof Options
     */
    public load(): void {

        let slimeIndex = window.gameData.slimeActiveIndex;

        // Player
        let player = window.gameData.player == 'unknown' ? lang.string(`${window.gameData.player.toUpperCase()}`) : window.gameData.player;
        $("#stats #player").html(`${player}`);

        // Game ID
        let id = window.gameData.id;
        $("#stats #id").html(`#${id}`);

        // started date
        let startDate = globals.fullRelativeTime(window.gameData.startDate);
        let startDateFull = globals.dateFormat('full', window.gameData.startDate);
        $("#stats #started").html(`${startDate} <span class="date">${startDateFull}</span>`);

        // Time played
        let timePlayed = globals.timePlayed(window.gameData.timePlayed);
        $("#stats #time-played").html(`${timePlayed}`);

        // Las save
        let lastSave = globals.fullRelativeTime(window.gameData.saveDate);
        $("#stats #last-save").html(`${lastSave}`);

        // Total clicks
        let totalClicks = globals.numberBeautifier(window.gameData.click.total);
        $("#stats #total-clicks").html(`${totalClicks}`);

        // Current blorbs
        let currentBlorbs = globals.numberBeautifier(window.gameData.slimes[slimeIndex].blorbs.total);
        $("#stats #current-blorbs").html(`${currentBlorbs}`);

        // Total blorbs generated
        let generatedBlorbs = globals.numberBeautifier(window.gameData.slimes[slimeIndex].blorbs.generated);
        $("#stats #generated-blorbs").html(`${generatedBlorbs}`);

        // Total universe blorbs generated
        let generatedUniverseBlorbs = globals.numberBeautifier(window.gameData.slimes[slimeIndex].blorbs.universe);
        $("#stats #generated-blorbs-universe").html(`${generatedUniverseBlorbs}`);

        // Machines purchased
        let machinesPurchased = this.machinesPurchased();
        $("#stats #machines-purchased").html(`${machinesPurchased}`);

    }

    /**
     * Machines purchased
     *
     * @private
     * @return {Number}
     * @memberof Stats
     */
    private machinesPurchased(): number {
        let total: number = 0;
        let purchases: any = window.gameData.purchases;
        purchases.machines.forEach((machine: any) => { total = total + machine.owned; });
        return total;
    }

    /**
     * Stats update
     *
     * @memberof Stats
     */
    public timer() {
        setInterval(() => { this.load(); }, 8237);
    }

}