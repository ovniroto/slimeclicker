import Sounds from "../modules/sounds";

const sound = new Sounds();

var actualPage: string | undefined;

export default class Pages {

    /**
     * Show page
     *
     * @memberof Pages
     */
    public show(event: any): void {

        let page = $(event.target).attr("data-page");

        if(page == actualPage) return;

        $('.game-page').removeClass('active');
        $(`#${page}`).addClass('active');

        $('.game-head li').removeClass('active');
        $(`.game-head li[data-page="${page}"]`).addClass('active');

        actualPage = page;

        sound.play('btn-page-open');

    }

}