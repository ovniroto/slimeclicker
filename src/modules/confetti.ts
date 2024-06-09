import confetti from "canvas-confetti";

export default class Confetti {

    /**
     * Create confetti
     *
     * @param {string} type
     * @memberof Confetti
     */
    public create(type: string): void {
        if(!window.gameOptions.confetti) return;
        if(type == 'achievement') {
            confetti({ particleCount: 100, origin: { y: 1.1 } });
        }
    }

}