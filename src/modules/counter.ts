import Globals from "../utils/globals";

const globals = new Globals();

var animation: any;
var blorbsInterval: any;
var counterInterval: any;
var spsInterval: any;
var generatedBlorbsInterval: any;

export default class Counter {

    /**
     * Add blorbs
     *
     * @param {number} time
     * @memberof Counter
     */
    public addBlorbs(time: number): void {

        let slimeIndex = window.gameData.slimeActiveIndex;

        let blorbsPerSecond =  window.gameData.slimes[slimeIndex].blorbs.persecond;
        let totalBlorbs = window.gameData.slimes[slimeIndex].blorbs.total;
        let newTotalBlorbs = totalBlorbs + blorbsPerSecond;

        window.gameData.slimes[slimeIndex].blorbs.total = newTotalBlorbs;

        this.live(totalBlorbs, newTotalBlorbs, time, false);

    }

    /**
     * Generated blorbs
     *
     * @memberof Counter
     */
    public generatedBlorbs(): void {

        let slimeIndex = window.gameData.slimeActiveIndex;

        let blorbsPerSecond =  window.gameData.slimes[slimeIndex].blorbs.persecond;
        let totalGeneratedBlorbs = window.gameData.slimes[slimeIndex].blorbs.generated;
        let totalUniverseBlorbs = window.gameData.slimes[slimeIndex].blorbs.universe;
        let newTotalGeneratedBlorbs = totalGeneratedBlorbs + blorbsPerSecond;
        let newUniverseBlorbs = totalUniverseBlorbs + blorbsPerSecond;

        window.gameData.slimes[slimeIndex].blorbs.generated = newTotalGeneratedBlorbs;
        window.gameData.slimes[slimeIndex].blorbs.universe = newUniverseBlorbs;

    }

    /**
     * Live counter (requestAnimationFrame)
     *
     * @param {number} old
     * @param {number} newest
     * @param {number} time
     * @memberof Counter
     */
    public live(old: number, newest: number, time: number, extra: boolean): void {
        if(animation) window.cancelAnimationFrame(animation);
        let startTimestamp: number;
        const refresh = (timestamp: number) => {
            if(!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / time, 1);
            let liveNumber = Math.floor(progress * (newest - old) + old);
            window.gameLive.blorbs = liveNumber;
            if(progress < 1) { animation = window.requestAnimationFrame(refresh); }
        }
        animation = window.requestAnimationFrame(refresh);
        if(extra) setTimeout(() => { this.timer(); }, time);
    }

    /**
     * Stop blorbs timer interval
     *
     * @memberof Counter
     */
    public stopBlorbsTimer(): void {
        if(blorbsInterval) clearInterval(blorbsInterval);
    }

    /**
     * Update blorbs per second
     *
     * @memberof Counter
     */
    public spsUpdate(): void {
        /*let slime = window.gameData.slime;
        $('#clicker .bps').html(`${globals.fixDecimals(window.gameData.blorbs[slime].persecond)}`);*/
    }

    /**
     * Update blorbs counter
     *
     * @memberof Counter
     */
    public counterUpdate(): void {
        $('#clicker .counter').html(`${globals.numberBeautifier(window.gameLive.blorbs)}`);
    }

    /**
     * Timers
     *
     * @memberof Counter
     */
    public timer(): void {

        if(blorbsInterval) clearInterval(blorbsInterval);
        if(counterInterval) clearInterval(counterInterval);
        if(spsInterval) clearInterval(spsInterval);
        if(generatedBlorbsInterval) clearInterval(generatedBlorbsInterval);

        this.addBlorbs(1000);
        this.generatedBlorbs();

        blorbsInterval = setInterval(() => { this.addBlorbs(1000); }, 1000);
        counterInterval = setInterval(() => { this.counterUpdate(); }, 30);
        spsInterval = setInterval(() => { this.spsUpdate(); }, 100);
        generatedBlorbsInterval = setInterval(() => { this.generatedBlorbs(); }, 1000);

    }

}