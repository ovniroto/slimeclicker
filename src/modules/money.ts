var animation: any;
var moneyInterval: any;

export default class Money {

    /**
     * Live money (requestAnimationFrame)
     *
     * @param {number} old
     * @param {number} newest
     * @param {number} time
     * @memberof Money
     */
    public live(old: number, newest: number, time: number, extra: boolean): void {
        if(animation) window.cancelAnimationFrame(animation);
        let startTimestamp: number;
        const refresh = (timestamp: number) => {
            if(!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / time, 1);
            let liveNumber = Math.floor(progress * (newest - old) + old);
            window.gameLive.money = liveNumber;
            if(progress < 1) { animation = window.requestAnimationFrame(refresh); }
        }
        animation = window.requestAnimationFrame(refresh);
    }

    /**
     * Update money
     *
     * @memberof Money
     */
    public moneyUpdate(): void {
        $('#side #money').html(`${window.gameLive.money}`);
    }

    /**
     * Timers
     *
     * @memberof Counter
     */
     public timer(): void {
        if(moneyInterval) clearInterval(moneyInterval);
        moneyInterval = setInterval(() => { this.moneyUpdate(); }, 30);
    }

    /**
     * Deduct from money
     *
     * @param {number} amount
     * @memberof Shop
     */
    public deduct(amount: number): void {
        window.gameData.money.total = window.gameData.money.total - amount;
    }

    /**
     * Check if can affrod
     *
     * @param {number} money
     * @return {boolean} Boolean
     * @memberof Shop
     */
    public afford(money: number): boolean {
        let moneyTotal = window.gameData.money.total;
        let afford = (moneyTotal >= money) ? true : false;
        return afford;
    }

}

// Mod support
window.Money = new Money();