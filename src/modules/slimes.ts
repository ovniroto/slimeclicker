export default class Slimes {

    /**
     * Get active slime
     *
     * @memberof Side
     */
    public getActive(): Array<boolean|object|undefined> {

        let active: any;

        const slimeActive = window.gameData.slimes.find((slime: any) => { if(slime.active === true) { active = slime; return true; } });

        if(slimeActive) return [ true, active ]
        return [ false, undefined ]

    }

}