import Globals from "../utils/globals";
import Money from "./money";

const globals = new Globals();
const money = new Money();

export default class Shop {

    /**
     * Load shop
     *
     * @memberof Shop
     */
    public load() {

        // Buy items
        this.loadBuyItems();

        // Sell items
        this.loadSellItems();
    }

    /**
     * Load buy items
     *
     * @memberof Shop
     */
    public loadBuyItems() {

        let upgrades: any = window.gameShop.upgrades;
        let upgradesLang: any = window.gameLanguage.upgrades;
        $(`#buy #upgrades`).html('');

        let machines: any = window.gameShop.machines;
        let machinesLang: any = window.gameLanguage.machines;
        $(`#buy #machines`).html('');

        // Upgrades
        for(var upgrade in upgrades) {

            $(`#buy #upgrades`).append(`
            <div class="shop item upgrade" data-id="${upgrade}" data-type="upgrade" data-amount="1">
                <div class="icon ${upgrades[upgrade].icon}"></div>
            </div>`);

            this.updateItem('upgrade', upgrade);

        }

        // Machines
        for(var machine in machines) {

            $(`#buy #machines`).append(`
            <div class="shop item" data-id="${machine}" data-type="machine" data-amount="1">
                <div class="icon ${machines[machine].icon}"></div>
                <div class="title">${machinesLang[machine].name}</div>
                <div class="price"><img src="${require('assets/images/icons/lin-mini.png')}">${globals.numberBeautifier(machines[machine].price)}</div>
                <div class="owned">0</div>
            </div>`);

            this.updateItem('machine', machine);

        }

    }

    /**
     * Load sell items
     *
     * @memberof Shop
     */
    public loadSellItems() {

    }

    /**
     * Update item
     *
     * @param {string} type
     * @param {string} item
     * @memberof Shop
     */
    public updateItem(type: string, item: string) {

        // Update machine
        if(type == 'machine') {

            let owned: number = 0;
            let machineFound: any = this.findItem(type, item);

            if(machineFound[0]) {
                owned = machineFound[1].owned;
                let price = this.itemPrice(type, item, parseInt(machineFound[1].owned) + 1);
                $(`[data-id="${item}"] .price`).html(`<img src="${require('assets/images/icons/lin-mini.png')}">${globals.numberBeautifier(price)}`);
            }

            $(`[data-id="${item}"] .owned`).html(`${owned}`);

        }

    }

    /**
     *
     *
     * @param {string} type
     * @param {string} item
     * @param {number} amount
     * @return {*}
     * @memberof Shop
     */
    public itemPrice(type: string, item: string, amount: number): any {

        // Machine price
        if(type == 'machine') {

            let machineList: any = window.gameShop.machines;
            let baseMachinePrice = machineList[item].price;
            let priceMultiplier = machineList[item].multiplier;

            var price = baseMachinePrice;
            for(var i = 1; i < amount; i++) {
                price = Math.round(price * priceMultiplier);
            }

            return price;
        }

    }

    /**
     * Find item purchase
     *
     * @param {string} type
     * @param {string} item
     * @return {*}
     * @memberof Shop
     */
    public findItem(type: string, item: string): any {

        // Find machine
        if(type == 'machine') {
            let machine: any, purchases: any = window.gameData.purchases;
            const machineFound = purchases.machines.find((obj: any) => { if(obj.id == item) { machine = obj; return true; } });
            if(machineFound) return [ true, machine ]
            return [ false, undefined ]
        }

    }

    /**
     * Buy item
     *
     * @param {*} event
     * @memberof Shop
     */
    public buy(event: any): void {

        let itemID = event.currentTarget.attributes[1].value;
        let itemType = event.currentTarget.attributes[2].value;
        let itemAmount = parseInt(event.currentTarget.attributes[3].value);

        if(itemType == 'machine') this.buyMachine(itemID, itemAmount);
        if(itemType == 'upgrade') this.buyUpgrade(itemID);

    }

    /**
     * Buy machine
     *
     * @param {string} itemID
     * @param {number} amount
     * @memberof Shop
     */
    public buyMachine(itemID: string, amount: number) {

        let machineFound = this.findItem('machine', itemID);
        if(!machineFound[0]) return this.firstBuy('machine', itemID, amount);

        let machine = machineFound[1];
        let blorbsPerSecond = machine.persecond;
        let machinesOwned = parseInt(machine.owned);
        let totalMachines = machinesOwned + amount;
        let priceForMachines = this.itemPrice('machine', itemID, totalMachines);

        if(!money.afford(priceForMachines)) return;

        let slimeIndex = window.gameData.slimeActiveIndex;

        window.gameData.slimes[slimeIndex].blorbs.persecond = window.gameData.slimes[slimeIndex].blorbs.persecond + blorbsPerSecond;

        // TODO: Hay que hacer una nueva función para vender blorbs y ganar dinero.
        // TODO: Al vender los blorbs hay que poner este código para que haga la animación.
        //let oldStuffCount = window.gameData.stuff.count;
        //let newStuffCount = oldStuffCount - price;
        //counter.live(oldStuffCount, newStuffCount, 250, true);

        this.modifyItem('machine', itemID, 'owned', totalMachines);
        this.updateItem('machine', itemID);

        money.deduct(priceForMachines);

    }

    /**
     * Buy upgrade
     *
     * @param {string} id
     * @memberof Shop
     */
    public buyUpgrade(id: string) {

    }

    /**
     * Sell item
     *
     * @param {*} event
     * @memberof Shop
     */
    public sell(event: any): void {

        let itemID = event.currentTarget.attributes[1].value;
        let itemType = event.currentTarget.attributes[2].value;
        let itemAmount = parseInt(event.currentTarget.attributes[3].value);

        if(itemType == 'blorb') this.sellBlorb(itemID, itemAmount);
        if(itemType == 'machine') this.sellMachine(itemID, itemAmount);

    }

    /**
     * Sell blorbs
     *
     * @param {string} id
     * @param {number} amount
     * @memberof Shop
     */
    sellBlorb(id: string, amount: number) {

    }

    /**
     * Sell machine
     *
     * @param {string} id
     * @param {number} amount
     * @memberof Shop
     */
    sellMachine(id: string, amount: number) {

    }

    /**
     * Restart shop
     *
     * @memberof Shop
     */
    public restartItems(): void {

        let machines: any = window.gameShop.machines;
        let upgrades: any = window.gameShop.upgrades;

        for(var machine in machines) {
            $(`[data-id="${machine}"] .price`).html(`${machines[machine].price}`);
            $(`[data-id="${machine}"] .owned`).html(`0`);
        }

        for(var upgrade in upgrades) {
            $(`[data-id="${upgrade}"] .price`).html(`${upgrades[upgrade].price}`);
            $(`[data-id="${upgrade}"] .owned`).html(`0`);
        }

    }

    /**
     * First power buy
     *
     * @param {string} itemID
     * @param {number} amount
     * @memberof Shop
     */
    public firstBuy(type: string, itemID: string, amount: number): void {

        // Machine
        if(type == 'machine') {

            let machineList: any = window.gameShop;
            let multiplier = machineList[itemID].multiplier;
            let persecond = parseFloat(machineList[itemID].persecond);

            let purchases: any = window.gameData.purchases;
            let price = this.itemPrice('machine', itemID, amount);

            if(!money.afford(price)) return;

            window.gameData.money.total = window.gameData.money.total - price;

            purchases.machines.push({ "id": itemID, "owned": amount, "persecond": persecond, "multiplier": multiplier });

            this.updateItem('machine', itemID);
            money.deduct(price);

        }

    }

    /**
     * Modify item
     *
     * @param {string} itemID
     * @param {string} element
     * @param {string} value
     * @memberof Machines
     */
    public modifyItem(type: string, itemID: string, element: string, value: any): void {

        let purchases: any = window.gameData.purchases;

        // Machine
        if(type == 'machine') {

            purchases.machines.find((obj: any) => {
                if(obj.id == itemID) {
                    if(element == 'owned') obj.owned = value;
                    if(element == 'multiplier') obj.multiplier = value;
                }
            });

            window.gameData.purchases = purchases;

        }

    }

}

// Mod support
window.Shop = new Shop();