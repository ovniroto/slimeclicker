import Globals from "../utils/globals";
import Notifications from "./notifications";
import Storage from "./storage";
import Tooltips from "./tooltips";
import Confetti from "./confetti";
import Sounds from "./sounds";
import Shop from "./shop";

const globals = new Globals();
const notifications = new Notifications();
const storage = new Storage();
const tooltips = new Tooltips();
const confetti = new Confetti();
const sounds = new Sounds();
const shop = new Shop();

export default class Achievements {

    /**
     * Load achievements
     *
     * @memberof Achievements
     */
    public load(): void {

        let achievements: any = window.gameData.achievements;
        let gameAchievements = window.gameAchievements;

        // Special achievements

        let specials: string = '';
        gameAchievements.special.forEach((achievement: any) => { specials += this.show(achievement, 'special'); });

        let specialsOwned = achievements.special.length;
        let specialsTotal = gameAchievements.special.length;
        let specialsPercent = globals.percent(specialsOwned, specialsTotal);
        $("#achievements #special #percent").html(`${specialsOwned} / ${specialsTotal}<span>${specialsPercent}%</span>`);
        $("#achievements #special #list").html(specials);

        // Normal achievements

        let normals: string = '';
        gameAchievements.normal.forEach((achievement: any) => { normals += this.show(achievement, 'normal'); });

        let normalsOwned = achievements.normal.length;
        let normalsTotal = gameAchievements.normal.length;
        let normalsPercent = globals.percent(normalsOwned, normalsTotal);
        $("#achievements #normal #percent").html(`${normalsOwned} / ${normalsTotal}<span>${normalsPercent}%</span>`);
        $("#achievements #normal #list").html(normals);

        // Hard achievements

        let hards: string = '';
        gameAchievements.hard.forEach((achievement: any) => { hards += this.show(achievement, 'hard'); });

        let hardsOwned = achievements.hard.length;
        let hardsTotal = gameAchievements.hard.length;
        let hardsPercent = globals.percent(hardsOwned, hardsTotal);
        $("#achievements #hard #percent").html(`${hardsOwned} / ${hardsTotal}<span>${hardsPercent}%</span>`);
        $("#achievements #hard #list").html(hards);

        // Tooltip event handler

        $(function() {
            $('[data-bs-toggle="tooltip"]').tooltip({
                delay: { 'show': 0, 'hide': 0 },
                container : 'body',
                html: true
            });
        });

    }

    /**
     *
     *
     * @param {*} achievement
     * @param {string} type
     * @return {String} Achievement HTML
     * @memberof Achievements
     */
    private show(achievement: any, type: string): string {

        let langStrings: any = window.gameLanguage.general;
        let achievsLangStrings: any = window.gameLanguage.achievements;

        let id: string = achievement.id;
        let title: string = '???';
        let typeLang = type.toUpperCase();
        let category: string = langStrings[`TOOLTIP_ACHIEVEMENT_${typeLang}`];
        let description: string = '???';
        let icon: string = `icon ${type}-unknown`;
        let time: any = '';

        // Achievement owned
        let achievementFound = this.find(id, type);
        if(achievementFound[0]) {
            icon = `icon ${id} active`;
            title = achievsLangStrings[id].name;
            description = achievsLangStrings[id].description;
            time = globals.dateFormat('full', achievementFound[1].unlocked);
        }

        let tooltip = tooltips.create('top', title, category, description, icon, time);
        return `<div class="achievement ${type} ${icon}" id="achiev-${id}" ${tooltip}></div>`;
    }

    /**
     * Unlock achievements
     *
     * @param {string} name
     * @param {string} type
     * @memberof Achievements
     */
    public unlock(name: string, type: string): void {

        if(this.find(name, type)[0]) return;

        let time = globals.timestamp();
        let achievement = name;
        let achievements: any = window.gameData.achievements;
        let achievsLangStrings: any = window.gameLanguage.achievements;

        // Register achievement
        achievements[type].push({ "id": achievement, "unlocked": time });
        window.gameData.achievements = achievements;
        storage.set('gameData', window.gameData);

        // Notification
        notifications.create('achievement', { title: achievsLangStrings[achievement]['name'], icon: achievement });

        // Reload achievement page
        this.load();

        // Achievement sound
        sounds.play('achievement');

        // Confetti
        confetti.create('achievement');

        // Remove tooltips
        $(".tooltip").remove();

    }

    /**
     * Find achievement
     *
     * @param {string} id
     * @param {string} type
     * @return {*} Array
     * @memberof Achievements
     */
    public find(id: string, type: string): any {
        let achievement: any, achievements: any = window.gameData.achievements;
        if(type == 'special') {
            const specialFound = achievements.special.find((obj: any) => { if(obj.id == id) { achievement = obj; return true; } });
            if(specialFound) return [ true, achievement ]
            return [ false, undefined ]
        } else
        if(type == 'normal') {
            const normalFound = achievements.normal.find((obj: any) => { if(obj.id == id) { achievement = obj; return true; } });
            if(normalFound) return [ true, achievement ]
            return [ false, undefined ]
        } else
        if(type == 'hard') {
            const hardFound = achievements.hard.find((obj: any) => { if(obj.id == id) { achievement = obj; return true; } });
            if(hardFound) return [ true, achievement ]
            return [ false, undefined ]
        }
    }

    /**
     * Achievement checker
     *
     * @memberof Achievements
     */
    public check() {

        let gameAchievements = window.gameAchievements;

        // Normal achievements
        gameAchievements.normal.forEach((achievement: any) => {
            let unlock = this.checkRequirements(achievement, 'normal');
            if(unlock) this.unlock(achievement.id, 'normal');
        });

        // Special achievements
        gameAchievements.special.forEach((achievement: any) => {
            let unlock = this.checkRequirements(achievement, 'special');
            if(unlock) this.unlock(achievement.id, 'special');
        });

        // Hard achievements
        gameAchievements.hard.forEach((achievement: any) => {
            let unlock = this.checkRequirements(achievement, 'hard');
            if(unlock) this.unlock(achievement.id, 'hard');
        });

    }

    /**
     * Timer for achievement check
     *
     * @memberof Achievements
     */
    public timer() {
        setInterval(() => { this.check(); }, 1000);
    }

    /**
     * Check achievement requirements
     *
     * @param {*} achievement
     * @return {boolean} Boolean
     * @memberof Achievements
     */
    public checkRequirements(achievement: any, type: string): boolean {

        let id: string = achievement.id;
        let reqType: string = achievement.type;
        let required: string = achievement.required;
        let unlocked: boolean = this.find(id, type)[0];
        let unlock: boolean = false;

        if(unlocked) return false;

        // Streaks
        if(reqType == 'streak-count') {
            if(window.gameData.streak >= parseInt(required)) unlock = true;
        } else

        // Machines
        if(reqType == 'machine-count') {
            let machine = achievement.machine;
            let machineFound = shop.findItem('machine', machine)[0];
            if(machineFound) {
                let machineCount = shop.findItem('machine', machine)[1].owned;
                if(machineCount >= parseInt(required)) unlock = true;
            }
        } else

        // Total Machines
        if(reqType == 'total-machines') {
            let total: number = 0;
            let purchases: any = window.gameData.purchases;
            purchases.machines.forEach((machine: any) => { total = total + machine.owned; });
            if(total >= parseInt(required)) unlock = true;
        }

        return unlock;

    }

}

// Mod support
window.Achievements = new Achievements();