import Globals from "../utils/globals";

const globals = new Globals();

var notificationCount = 0;
var removeAllActive = false;

export default class Notifications {

    /**
     * Create new notification
     *
     * @memberof Notifications
     */
    public create(style: string, content: any, time?: number): void {

        let html = '';
        let id = globals.randomText(12);
        let langString: any = window.gameLanguage.general;

        if(style == 'minimal') {
            html = `
            <div class="notification-panel message" id="${id}">
                <div class="close"></div>
                <div class="title">${content.title}</div>
            </div>
            `;
        } else

        if(style == 'normal') {
            html = `
            <div class="notification-panel normal" id="${id}">
                <div class="close"></div>
                <div class="title">${content.title}</div>
                <div class="message">${content.message}</div>
            </div>
            `;
        } else

        if(style == 'achievement') {
            html = `
            <div class="notification-panel achievement" id="${id}">
                <div class="close"></div>
                <div class="icon ${content.icon}"></div>
                <div class="toptitle">${langString['ACHIEVEMENT_UNLOCKED']}</div>
                <div class="title">${content.title}</div>
            </div>
            `;
        }

        $("#notifications").append(html);

        notificationCount++;

        if(!time) return;

        setTimeout(() => { this.delete(id); }, time);

    }

    /**
     * Delete notification
     *
     * @param {string} id
     * @memberof Notifications
     */
    public delete(id: string) {
        $(`#${id}`).remove();
        notificationCount--;
    }

    /**
     * Delete notification
     *
     * @param {string} id
     * @memberof Notifications
     */
    public deleteAll() {
        $(`.notification-panel`).remove();
        notificationCount = 0;
    }

    /**
     * Check notifications amount
     *
     * @private
     * @memberof Notifications
     */
    private checkNotificationAmount(): void {
        if(notificationCount > 1) {
            if(removeAllActive) return;
            $("#notifications .close-all").addClass('active');
            removeAllActive = true;
        } else
        if(notificationCount <= 1) {
            if(!removeAllActive) return;
            $("#notifications .close-all").removeClass('active');
            removeAllActive = false;
        }
    }

    /**
     * Notification timer
     *
     * @memberof Notifications
     */
    public timer() {
        setInterval(() => { this.checkNotificationAmount(); }, 100);
    }

}