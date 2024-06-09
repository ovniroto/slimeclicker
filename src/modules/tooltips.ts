export default class Tooltips {

    /**
     * Create tooltip
     *
     * @memberof Tooltips
     */
    public create(placement: string = 'top', title: string, category: string = '', description: string, icon: string, time: string): any {

        let langStrings: any = window.gameLanguage.general;
        let unlocked: string = '';

        if(time) { unlocked = `<div class='unlocked'>${langStrings["TOOLTIP_ACHIEVEMENT_UNLOCKED"]} <span>${time}</span></div>`; }

        let html = `
        <div class='tooltip-block'>
            <div class='${icon}'></div>
            <div class='title'>${title}</div>
            <div class='subtitle'>${category}</div>
            <div class='description'>${description}</div>
            ${unlocked}
        </div>
        `;

        return ` data-bs-toggle="tooltip" data-bs-html="true" data-placement="${placement}" data-bs-custom-class="achievement-tooltip" title="${html}"`;
    }

}