export default class Globals {

    /**
     * Number beautifier. Convert large numbers to text.
     *
     * Example: 134.391 duodecillion
     *
     * More units: https://googology.fandom.com/wiki/-illion
     *
     * @param {number} number
     * @return {string} String
     * @memberof Globals
     */
    public numberBeautifier(number: number): string {

        if(!number) return '0';

        let lang: any = window.gameOptions.language;
        let langStrings: any = window.gameLanguage.general;

        let stringUnits = [

            // 1-10
            "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion", "decillion",

            // 11-19
            "undecillion", "duodecillion", "tredecillion", "quattuordecillion", "quindecillion", "sexdecillion", "septendecillion", "octodecillion", "novemdecillion",

            // 20-29
            "vigintillion", "unvigintillion", "duovigintillion", "tresvigintillion", "quattuorvigintillion", "quinquavigintillion", "sesvigintillion", "septemvigintillion", "octovigintillion", "novemvigintillion",

            // 30-39
            "trigintillion", "untrigintillion", "duotrigintillion", "trestrigintillion", "quattuortrigintillion", "quinquatrigintillion", "sestrigintillion", "septentrigintillion", "octotrigintillion", "noventrigintillion",

            // 40-49
            "quadragintillion", "unquadragintillion", "duoquadragintillion", "tresquadragintillion", "quattuorquadragintillion", "quinquaquadragintillion", "sesquadragintillion", "sepquadragintillion", "octoquadragintillion", "novemquadragintillion"

        ];

        let initNum = number;
        let highNumber: boolean = false;
        let bigNumber: number = 1000;
        let index: number = -1;
        let unit: any;

        if(number >= bigNumber) {
            highNumber = true;
            while(number >= bigNumber) { bigNumber *= 1000; index++; }
            number /= (bigNumber / 1000);
            if(lang !== 'english') { unit = ' ' + langStrings['NUM_'+stringUnits[index].toUpperCase()]; } else { unit = ' ' + stringUnits[index]; }
            if(index >= stringUnits.length) return 'Infinity';
        }

        let resultNumber = number.toLocaleString().replace(",", ".");

        if(initNum < 1000000) return resultNumber;
        return resultNumber + unit;

    }

    /**
     * Check if the time is within 24 hours
     *
     * @param {number} time
     * @returns {boolean} Boolean
     * @memberof Globals
     */
    public within24hours(time: number): boolean {
        const then = new Date(time);
        const now = new Date();
        const msBetweenDates = Math.abs(then.getTime() - now.getTime());
        const hoursBetweenDates = Math.round(msBetweenDates / (60 * 60 * 1000));
        if(hoursBetweenDates <= 24) return true;
        return false;
    }

    /**
     * Random number between two numbers
     *
     * @param {number} min Minimum number
     * @param {number} max Maximum number
     * @memberof Globals
     */
    public randomNumberBetween(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Generate random number
     *
     * @param {number} length
     * @returns {number} Number
     * @memberof Global
     */
    public randomNumber(length: number): number {
        let result: string = '';
        let characters       = '123456789';
        let charactersLength = characters.length;
        for(let i = 0; i < length; i++) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return parseInt(result);
    }

    /**
     * Generate random id
     *
     * @param {number} length
     * @returns {String} String
     * @memberof Global
     */
    public randomId(length: number): string {
        var chars = '';
        var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for(var i=0;i<length;i++) {
            chars += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return chars;
    }

    /**
     * Show actual year on topbar copyright
     *
     * @memberof Globals
     */
    public showYear(): void {
        $('#year').html(`${new Date().getFullYear()}`);
    }

    /**
     * Generate timestamp in milliseconds
     *
     * @return {number} Timestamp milliseconds
     * @memberof Globals
     */
    public timestamp(): number {
        let timestamp = new Date().getTime();
        return timestamp;
    }

    /**
     * Get JSON file and parse content
     *
     * @param {string} file
     * @return {*} object
     * @memberof Globals
     */
    public getJSON(file: string): any {
        let request = new XMLHttpRequest();
        request.open("GET", file, false);
        request.send(null);
        return JSON.parse(request.responseText);
    }

    /**
     * Get URL and parse content
     *
     * @param {string} url
     * @return {*} object
     * @memberof Globals
     */
     public getURL(url: string): any {
        return new Promise(function(resolve, reject) {
            let request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            request.onreadystatechange = function() {
                if(request.readyState == 4) {
                   if(request.status == 200) resolve(JSON.parse(request.responseText));
                   else resolve("Error loading page");
                }
            };
            if(request.status == 0) return;
            request.send(null);
        });
    }

    /**
     * Extract numbers from string
     *
     * @param {string} text
     * @return {string} string
     * @memberof Globals
     */
    public extractNumbers(text: string): string {
        var match: any = text.match(/(\d+)/);
        return match[0];
    }

    /**
     * Generate random text
     *
     * @param {number} length
     * @return {string} String
     * @memberof Globals
     */
    public randomText(length: number): string {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for(var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    /**
     * Reload page
     *
     * @param {number} time
     * @memberof Globals
     */
    public reloadPage(time: number = 1): void {
        setTimeout(() => { window.location.reload(); }, time);
    }

    /**
     * Fix decimals
     *
     * @param {number} value
     * @return {number} Number
     * @memberof Globals
     */
    public fixDecimals(value: number): number {
        let result: number;
        let integer = Math.round(value);
        let length = integer.toString().length;
        result = length > 5 ? parseFloat(value.toFixed(2)) : parseFloat(value.toFixed(1));
        return result;
    }

    /**
     * Check if is new day
     *
     * @param {number} time
     * @return {*} Boolean
     * @memberof Globals
     */
    public isNewDay(time: number): boolean {
        var now = new Date().setHours(0, 0, 0, 0);
        var old = new Date(time).setHours(0, 0, 0, 0);
        return now !== old ? true : false;
    }

    /**
     * Timestamp formatter
     *
     * @param {number} time
     * @return {string} String
     * @memberof Globals
     */
    public dateFormat(type: string, time: number): string|undefined {
        let date = new Date(time);
        let day = date.getDate(); // getDay show day of the week (Sunday, Monday...) then use getDate to get day number ¯\_(ツ)_/¯
        let month = date.getMonth() + 1; // getMonth show month between 0 and 11 then add 1 to correct month
        let year = date.getFullYear();
        let hours = ("0" + date.getHours()).slice(-2);
        let minutes = ("0" + date.getMinutes()).slice(-2);
        if(type == 'full') { return `${day}/${month}/${year} ${hours}:${minutes}`; } else
        if(type == 'date') { return `${day}/${month}/${year}`; } else
        if(type == 'save') { return `${day}.${month}.${year}`; } else
        if(type == 'time') { return `${hours}:${minutes}`; }
    }

    /**
     * Check RegExp
     *
     * @param {string} string
     * @param {string} regexp
     * @return {Array} Array
     * @memberof Globals
     */
    public checkRegExp(string: string, regexp: any): Array<any> {
        let check = regexp.test(string);
        let result: any = string.match(regexp);
        if(result) if(result.length > 1) result = result[1];
        return [ check, result ];
    }

    /**
     * Random name generator
     *
     * @return {string} String
     * @memberof Globals
     */
    public randomNameGenerator(): string {

        let firstName: Array<string>, lastName: Array<string>;

        firstName = ["Lethal", "Pipo", "Lily", "Pingu", "Sunnda", "Rage", "Darmen", "Sicola", "Illo", "Gato", "Tortugo", "Noguel", "Mirlo", "Filip", "Cangu"]
        lastName = ["Psycho", "Pixelado", "Perro", "Pacheco", "Waifu", "Fatale", "Panda", "Crack", "Duff", "Little", "Rox", "Mamma", "Picasi", "Lyas", "Porretas"]

        let first = Math.floor(Math.random() * firstName.length);
        let last = Math.floor(Math.random() * lastName.length);

        return firstName[first] + ' ' + lastName[last];

    }

    /**
     * Percen calculator
     *
     * @param {number} value
     * @param {number} max
     * @return {*}
     * @memberof Globals
     */
    public percent(value: number, max: number): number {
        if(max == 0 || max < 0) return 0;
        return Math.round((100 * value) / max);
    }

    /**
     * Lang time for time ago
     *
     * @param {string} string
     * @param {boolean} isPlural
     * @return {string} String
     * @memberof Globals
     */
    public langTime(string: string, isPlural: boolean): any {
        let lang = window.gameOptions.language;
        if(lang == 'spanish') {
            if(string == 'year') return isPlural == true ? 'años' : 'año';
            if(string == 'month') return isPlural == true ? 'meses' : 'mes';
            if(string == 'week') return isPlural == true ? 'semanas' : 'semana';
            if(string == 'day') return isPlural == true ? 'días' : 'día';
            if(string == 'hour') return isPlural == true ? 'horas' : 'hora';
            if(string == 'minute') return isPlural == true ? 'minutos' : 'minuto';
            if(string == 'second') return isPlural == true ? 'segundos' : 'segundo';
        } else {
            if(string == 'year') return isPlural == true ? 'years' : 'year';
            if(string == 'month') return isPlural == true ? 'months' : 'month';
            if(string == 'week') return isPlural == true ? 'weeks' : 'week';
            if(string == 'day') return isPlural == true ? 'days' : 'day';
            if(string == 'hour') return isPlural == true ? 'hours' : 'hour';
            if(string == 'minute') return isPlural == true ? 'minutes' : 'minute';
            if(string == 'second') return isPlural == true ? 'seconds' : 'second';
        }
    }

    /**
     * Relative time
     *
     * @param {number} time
     * @return {*} {string}
     * @memberof Global
     */
    public relativeTime(time: number): any {

        let result: any;
        let now = Math.floor(new Date().getTime() / 1000);
        let lang = window.gameOptions.language;
        let timeSeconds = Math.floor(time / 1000);
        let difference = timeSeconds - now;
        let newTime = Math.abs(difference);

        // Seconds
        let oneY = 31557600;
        let oneMo = 2592000;
        let oneW = 604800;
        let oneD = 86400;
        let oneH = 3600;
        let oneM = 60;
        let oneS = 1;

        // Define times
        let y = Math.floor(newTime / oneY);
        let mo = Math.floor(newTime / oneMo);
        let w = Math.floor(newTime / oneW);
        let d = Math.floor(newTime / oneD);
        let h = Math.floor(newTime / oneH);
        let m = Math.floor(newTime / oneM);
        let s = Math.floor(newTime / oneS);

        if(y > 1) result = y > 1 ? y + ' ' + this.langTime('year', true) : y + ' ' + this.langTime('year', false);
        else if(mo > 1) result = mo > 1 ? mo + ' ' + this.langTime('month', true) : mo + ' ' + this.langTime('month', false);
        else if(w > 1) result = w > 1 ? w + ' ' + this.langTime('week', true) : w + ' ' + this.langTime('week', false);
        else if(d > 1) result = d > 1 ? d + ' ' + this.langTime('day', true) : d + ' ' + this.langTime('day', false);
        else if(h > 1) result = h > 1 ? h + ' ' + this.langTime('hour', true) : h + ' ' + this.langTime('hour', false);
        else if(m > 1) result = m > 1 ? m + ' ' + this.langTime('minute', true) : m + ' ' + this.langTime('minute', false);
        else if(s > 1) result = s > 1 ? s + ' ' + this.langTime('second', true) : s + ' ' + this.langTime('second', false);

        if(timeSeconds < now) return lang == 'spanish' ? 'hace ' + result : result + ' ago';
        else if(timeSeconds > now) return lang == 'spanish' ? 'en ' + result : 'in ' + result;

    }

    /**
     * Full relative time
     *
     * @param {number} time
     * @return {string} String
     * @memberof Global
     */
    public fullRelativeTime(time: number): string {

        let result: any;
        let now = Math.floor(new Date().getTime() / 1000);
        let lang = window.gameOptions.language;
        let timeSeconds = Math.floor(time / 1000);
        let difference = timeSeconds - now;
        let newTime = Math.abs(difference);

        // Seconds
        let oneY = 31557600;
        let oneMo = 2592000;
        let oneW = 604800;
        let oneD = 86400;
        let oneH = 3600;
        let oneM = 60;

        // Define times
        let y = Math.floor(newTime / oneY);
        let mo = Math.floor((newTime % oneY) / oneMo);
        let w = Math.floor((newTime % oneMo) / oneW);
        let d = Math.floor((newTime % oneW) / oneD);
        let h = Math.floor((newTime % oneD) / oneH);
        let m = Math.floor((newTime % oneH) / oneM);
        let s = Math.floor(newTime % oneM);

        let yDisplay = y > 1 ? this.langTime('year', true) : this.langTime('year', false);
        let moDisplay = mo > 1 ? this.langTime('month', true) : this.langTime('month', false);
        let wDisplay = w > 1 ? this.langTime('week', true) : this.langTime('week', false);
        let dDisplay = d > 1 ? this.langTime('day', true) : this.langTime('day', false);
        let hDisplay = h > 1 ? this.langTime('hour', true) : this.langTime('hour', false);
        let mDisplay = m > 1 ? this.langTime('minute', true) : this.langTime('minute', false);
        let sDisplay = s > 1 ? this.langTime('second', true) : this.langTime('second', false);

        let justNow = lang == 'spanish' ? 'ahora' : 'now';
        if(s <= 0) return justNow;

        if(y > 0) result = `${y} ${yDisplay}, ${mo} ${moDisplay}, ${w} ${wDisplay}, ${d} ${dDisplay}, ${h} ${hDisplay}, ${m} ${mDisplay}, ${s} ${sDisplay}`;
        else if(mo > 0) result = `${mo} ${moDisplay}, ${w} ${wDisplay}, ${d} ${dDisplay}, ${h} ${hDisplay}, ${m} ${mDisplay}, ${s} ${sDisplay}`;
        else if(w > 0) result = `${w} ${wDisplay}, ${d} ${dDisplay}, ${h} ${hDisplay}, ${m} ${mDisplay}, ${s} ${sDisplay}`;
        else if(d > 0) result = `${d} ${dDisplay}, ${h} ${hDisplay}, ${m} ${mDisplay}, ${s} ${sDisplay}`;
        else if(h > 0) result = `${h} ${hDisplay}, ${m} ${mDisplay}, ${s} ${sDisplay}`;
        else if(m > 0) result = `${m} ${mDisplay}, ${s} ${sDisplay}`;
        else if(s > 0) result = `${s} ${sDisplay}`;

        let timeAgo = lang == 'spanish' ? 'hace ' + result : result + ' ago';
        return timeAgo;

    }

    /**
     * Convert seconds to human display
     *
     * @param {number} seconds
     * @return {*}
     * @memberof Globals
     */
    public timePlayed(seconds: number): any {

        let h = Math.floor(seconds / 3600);
        let m = Math.floor(seconds % 3600 / 60);
        let s = Math.floor(seconds % 3600 % 60);

        let hDisplay: string, mDisplay: string, sDisplay: string;
        let lang = window.gameOptions.language;

        let justStarted = lang == 'spanish' ? 'Acabas de empezar!' : 'You just started!';
        if(seconds == 0) return justStarted;

        hDisplay = h > 1 ? this.langTime('hour', true) : this.langTime('hour', false);
        mDisplay = m > 1 ? this.langTime('minute', true) : this.langTime('minute', false);
        sDisplay = s > 1 ? this.langTime('second', true) : this.langTime('second', false);

        if(h > 0) return `${h} ${hDisplay}, ${m} ${mDisplay}, ${s} ${sDisplay}`;
        if(m > 0) return `${m} ${mDisplay}, ${s} ${sDisplay}`;
        if(s > 0) return `${s} ${sDisplay}`;
    }

    /**
     * Check if running in Electron
     *
     * @return {*}
     * @memberof Globals
     */
    isElectron(): boolean {
        if(typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) return true;
        return false;
    }

}