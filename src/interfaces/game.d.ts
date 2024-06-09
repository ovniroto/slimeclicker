interface Window {
    gameInfo: {
        version: string,
        debug: boolean,
        saveName: string,
        console: {
            title: string,
            description: string
        }
    },
    gameLanguage: {
        achievements: object,
        general: object,
        machines: object,
        places: object,
        upgrades: object,
        blorbs: object
    },
    gameData: {
        id: number,
        version: string,
        player: string,
        startDate: number,
        saveDate: number,
        timePlayed: number,
        lastPlayed: number,
        streak: number,
        universe: number,
        money: {
            total: number,
            generated: number
        },
        slimeActiveIndex: number,
        slimes: Slimes[],
        drops: {
            clicked: number,
            multiplier: number
        },
        click: {
            total: number,
            power: number
        },
        purchases: object,
        achievements: {
            special: Array<object>,
            normal: Array<object>,
            hard: Array<object>
        }
    },
    gameOptions: {
        language: string,
        savetime: number,
        closealert: boolean,
        confetti: boolean,
        sound: {
            volume: number,
            play: {
                bigbutton: boolean,
                particles: boolean,
                monsters: boolean
            }
        }
    },
    gameSaves: Array<string>,
    gameUpdates: object,
    gameShop: {
        places: object,
        machines: object,
        upgrades: object,
        blorbs: object
    },
    gameAchievements: {
        special: Array<object>,
        normal: Array<object>,
        hard: Array<object>
    },
    gameLive: {
        blorbs: number,
        money: number
    }
}