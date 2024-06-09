import Globals from "../utils/globals";

const globals = new Globals();

const sounds: any = {

    "notification": new Audio('./assets/sounds/notification.ogg'),

    "achievement": new Audio('./assets/sounds/achievement.ogg'),

    "btn-option": new Audio('./assets/sounds/option.ogg'),

    "btn-page-open": new Audio('./assets/sounds/page-open.ogg'),
    "btn-page-close": new Audio('./assets/sounds/page-close.ogg'),

    "click1": new Audio('./assets/sounds/click1.ogg'),
    "click2": new Audio('./assets/sounds/click2.ogg'),
    "click3": new Audio('./assets/sounds/click3.ogg'),
    "click4": new Audio('./assets/sounds/click4.ogg'),
    "click5": new Audio('./assets/sounds/click5.ogg'),
    "click6": new Audio('./assets/sounds/click6.ogg'),
    "click7": new Audio('./assets/sounds/click7.ogg'),

}

export default class Sounds {

    /**
     * Play sound
     *
     * @param {string} name
     * @memberof Particles
     */
    public play(name: string): void {
        this.stop(name);
        sounds[name].volume = window.gameOptions.sound.volume;
        sounds[name].play();
    }

    /**
     * Stop sound
     *
     * @param {string} name
     */
    public stop(name: string): void {
        sounds[name].pause();
        sounds[name].currentTime = 0;
    }

    /**
     * Random click sounds
     *
     * @memberof Sounds
     */
    public click() {
        let randomNum = globals.randomNumberBetween(1, 7);
        if(randomNum) return this.play(`click${randomNum}`);
        this.play(`click1`);
    }

}