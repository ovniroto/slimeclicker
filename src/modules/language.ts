import Globals from "../utils/globals";

const globals = new Globals();

/**
 * Language of the game
 *
 * @class Language
 */
export default class Language {

    /**
     * Language string
     *
     * @return {*} Language string
     * @memberof Language
     */
    public string(string: string): any {
        let langStrings: any = window.gameLanguage.general;
        return langStrings[string];
    }

    /**
     * Load page language
     *
     * @memberof Language
     */
    public load(): void {
        let string: any;
        let langStrings: any = window.gameLanguage.general;
        for(string in langStrings) {
            let find = new RegExp('{{' + string + '}}', 'g');
            document.body.innerHTML = document.body.innerHTML.replace(find, langStrings[string]);
        }
    }

}