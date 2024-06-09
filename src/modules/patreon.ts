import Globals from '../utils/globals';
import ExtraBase64 from '../utils/extrabase64';

const eb64 = new ExtraBase64();
const globals = new Globals();

const hash1 = 'xmcMmy6Mle30ZlKQ1deP8VwaHR0lkOeT3nyfOQqxSzbFGdhARwi8LfcHM6Ly93d3cucGF0cmVvbi5jb20vYXBpL29hdXRoMi9hcGkvY3';
const hash2 = 'VycmVudF91c2VyL2NhbXBhaWducz9yZXNwb25zZV90eXBlPWNvZGUmYWNjZXNzX3Rva2VuPW1DTUNoNjBMbnRoU3ZZWlFXdDJ3M1RENTRwa05YSld2QWFmOGJ5bFVSb1E=';

export default class Patreon {

    /**
     * Get patrons count
     *
     * @memberof Particles
     */
    async getPatrons(): Promise<any> {
        let result: any;
        let patreon = globals.getURL(eb64.decode(hash1 + hash2));
        await patreon.then((res: any) => result = res.data[0].attributes.patron_count);
        return result;
    }

}