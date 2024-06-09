export default class Logger {

    /**
     * Game log system
     *
     * @memberof Logger
     */
     public game(text: string): void {
        console.log(`%c` + text, 'color: rgb(54, 218, 122); font-family: sans-serif; font-size: 11px; font-weight: bold;');
    }

    /**
     * Info log system
     *
     * @memberof Logger
     */
    public info(text: string): void {
        console.log(`%c[INFO] ` + text, 'color: rgb(255, 200, 49); font-family: sans-serif; font-size: 11px;');
    }

    /**
     * Debug log system
     *
     * @memberof Logger
     */
    public debug(text: string): void {
        console.log(`%c[DEBUG] ` + text, 'color: rgb(207, 49, 255); font-family: sans-serif; font-size: 11px;');
    }

    /**
     * Error log system
     *
     * @memberof Logger
     */
    public error(text: string): void {
        console.log(`%c[ERROR] ` + text, 'color: rgb(255, 49, 49); font-family: sans-serif; font-size: 11px;');
    }

}

// Mod support
window.Logger = new Logger();