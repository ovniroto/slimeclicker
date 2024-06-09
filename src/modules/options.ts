import Storage from "./storage";
import Language from "./language";
import Globals from "../utils/globals";

const globals = new Globals();
const storage = new Storage();
const lang = new Language();

/**
 * Game options
 *
 * @class Options
 */
export default class Options {

    /**
     * Set default game options
     *
     * @public
     * @memberof Options
     */
    public default(): Promise<boolean> {
        return new Promise(function(resolve, reject) {

            // Set default game options
            window.gameOptions = {
                language: 'english',
                savetime: 59351,
                closealert: true,
                confetti: true,
                sound: {
                    volume: 0.5,
                    play: {
                        bigbutton: true,
                        particles: true,
                        monsters: true
                    }
                }
            }

            // Save options to local storage
            storage.set('gameOptions', window.gameOptions);
            resolve(true);

        });
    }

    /**
     * Load options
     *
     * @memberof Options
     */
    public load(): void {
        this.apply('language', window.gameOptions.language);
        this.apply('volume', window.gameOptions.sound.volume);
        this.apply('close-alert', window.gameOptions.closealert);
        this.apply('confetti', window.gameOptions.confetti);
    }

    /**
     * Change option
     *
     * @param {string} option
     * @param {*} value
     * @memberof Options
     */
    public change(option: string, value?: any): void {

        if(option == 'language') {
            window.gameOptions.language = value;
            $("#lang-selected").html(lang.string("LANG_" + value.toUpperCase()));
            $("#languages .option").removeClass('active');
            $(`#languages [data-lang='${value}']`).removeClass('default').addClass('active');
            storage.set('gameOptions', window.gameOptions);
        } else

        if(option == 'volume') {
            window.gameOptions.sound.volume = value;
            let percent = globals.percent(value, 1);
            $("#options .game-volume .percent").html(`${percent}%`);
            storage.set('gameOptions', window.gameOptions);
        } else

        if(option == 'close-alert') {
            window.gameOptions.closealert = !window.gameOptions.closealert;
            if(window.gameOptions.closealert) { $("#close-alert").addClass("active"); } else { $("#close-alert").removeClass("active"); }
            storage.set('gameOptions', window.gameOptions);
        } else

        if(option == 'confetti') {
            window.gameOptions.confetti = !window.gameOptions.confetti;
            if(window.gameOptions.confetti) { $("#confetti").addClass("active"); } else { $("#confetti").removeClass("active"); }
            storage.set('gameOptions', window.gameOptions);
        }

    }

    /**
     * Change option
     *
     * @param {string} option
     * @param {*} value
     * @memberof Options
     */
    public apply(option: string, value: any): void {

        if(option == 'language') {
            $("#lang-selected").html(lang.string("LANG_" + value.toUpperCase()));
            $("#languages .option").removeClass('active');
            $(`#languages [data-lang='${value}']`).removeClass('default').addClass('active');
        } else

        if(option == 'volume') {
            let percent = globals.percent(value, 1);
            $("#options .game-volume .percent").html(`${percent}%`);
            $("#options #volume").val(value);
        } else

        if(option == 'close-alert') {
            if(value) { $("#close-alert").addClass("active"); }
        } else

        if(option == 'confetti') {
            if(value) { $("#confetti").addClass("active"); }
        }

    }

}