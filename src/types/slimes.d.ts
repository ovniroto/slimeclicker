type Slimes = {
    id: string,
    unlocked: boolean,
    active: boolean,
    discovered: number,
    blorbs: {
        total: number,
        persecond: number,
        universe: number,
        generated: number
    }
}