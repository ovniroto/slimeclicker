import Globals from "../utils/globals";
import Language from "./language";

const globals = new Globals();
const lang = new Language();

/**
 * Game updates
 *
 * @class Updates
 */
export default class Updates {

    /**
     * Load updates
     *
     * @memberof Options
     */
    public load(): void {
        let updates: any = window.gameUpdates;
        for(let i = 0; i < updates.length; i++) {
            let changes = '', current = '';
            for(let ii = 0; ii < updates[i].changes.length; ii++) { changes += `<li>${updates[i].changes[ii]}</li>`; }
            if(window.gameInfo.version == updates[i].version) { current = `<span class="current">${lang.string('CURRENT')}</span>`; }
            let html = `
            <div class="update-content">
                <div class="version">
                    ${lang.string('VERSION')}
                    <span class="number">${updates[i].version}</span>
                    ${current}
                </div>
                <div class="release"><span>${globals.dateFormat('full', updates[i].release)}</span> ${lang.string('RELEASED')} ${globals.relativeTime(updates[i].release)}</div>
                <div class="title">${updates[i].title}</div>
                <div class="description">${updates[i].description}</div>
                <div class="changes">
                    <div class="title">${lang.string('CHANGES')}</div>
                    <ul>
                        ${changes}
                    </ul>
                </div>
            </div>
            `;
            $("#updates #update-list").append(html);
        }
    }


}