import Globals from "./globals";

const globals = new Globals();
const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

export default class ExtraBase64 {

    /**
     * Encode string to base64
     *
     * @param {string} input
     * @return {*}
     * @memberof Base64
     */
    encode(input: string): string {
        var string = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = this.utf8Decode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            string = string + keys.charAt(enc1) + keys.charAt(enc2) + keys.charAt(enc3) + keys.charAt(enc4);
        }
        let a = globals.randomText(23);
        let b = globals.randomText(27);
        string = a + string.slice(0, 4) + b + string.slice(4 + Math.abs(0));
        return string;
    }

    /**
     * Decode base64 to string
     *
     * @param {string} input
     * @return {*}
     * @memberof Base64
     */
    decode(input: string): string {
        var string = "";
        var index = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.substring(23);
        index = input.slice(0, 4);
        input = input.slice(4);
        input = input.substring(27);
        input = index + input;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = keys.indexOf(input.charAt(i++));
            enc2 = keys.indexOf(input.charAt(i++));
            enc3 = keys.indexOf(input.charAt(i++));
            enc4 = keys.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            string = string + String.fromCharCode(chr1);
            if(enc3 != 64) {
                string = string + String.fromCharCode(chr2);
            }
            if(enc4 != 64) {
                string = string + String.fromCharCode(chr3);
            }
        }
        string = this.utf8Decode(string);
        return string;
    }

    /**
     * UTF8 Encoder
     *
     * @param {string} input
     * @return {*}
     * @memberof Base64
     */
    utf8Encode(input: string): string {
        input = input.replace(/\r\n/g, "\n");
        var string = "";
        for(var n = 0; n < input.length; n++) {
            var c = input.charCodeAt(n);
            if(c < 128) {
                string += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                string += String.fromCharCode((c >> 6) | 192);
                string += String.fromCharCode((c & 63) | 128);
            } else {
                string += String.fromCharCode((c >> 12) | 224);
                string += String.fromCharCode(((c >> 6) & 63) | 128);
                string += String.fromCharCode((c & 63) | 128);
            }

        }
        return string;
    }

    /**
     * UTF8 Decoder
     *
     * @param {string} input
     * @return {*}
     * @memberof Base64
     */
    utf8Decode(input: string): string {
        var c1, c2, c3;
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while(i < input.length) {
            c = input.charCodeAt(i);
            if(c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = input.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = input.charCodeAt(i + 1);
                c3 = input.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }

}