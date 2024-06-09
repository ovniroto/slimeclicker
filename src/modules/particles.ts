import Globals from "../utils/globals";
import Storage from "./storage";

const globals = new Globals();
const storage = new Storage();

export default class Particles {

    /**
     * New particle
     *
     * @param {*} event
     * @memberof Particles
     */
    public plus(event: any): void {

        let clickPower = window.gameData.click.power;
        let timestamp = parseInt(event.timeStamp);
        let leftRandomizer = globals.randomNumberBetween(0, 15);

        // Append new div to shop "+X" particle on click the big button
        $(`#clicker .particles`).append(`<div class="plus-particle" id="plus${timestamp}" style="top:${event.pageY - 65}px; left:${event.pageX - leftRandomizer}px;">+${clickPower}</div>`);

        // Delete div after 2 seconds
        setTimeout(() => { $(`#plus${timestamp}`).remove(); }, 2000);

    }

}