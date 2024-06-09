import Sounds from "./sounds";

const sound = new Sounds();
var actualSide: string | undefined;

export default class Side {

    /**
     * Show page
     *
     * @memberof Side
     */
    public show(event: any): void {

        let side = $(event.target).attr("data-side");

        if(side == actualSide) return;

        $('#side .side-container').removeClass('active');
        $(`#side #${side}`).addClass('active');

        $('.side-subhead li').removeClass('active');
        $(`.side-subhead li[data-side="${side}"]`).addClass('active');

        actualSide = side;

        sound.play('btn-page-open');

    }

}