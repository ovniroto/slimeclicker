export default class Animations {

    /**
     * Animate big button
     *
     * @param {*} event JQuery event
     * @memberof Animations
     */
    public bigButton(event: any): void {

        if(event.type == 'mousedown') {
            $(".clicker .big-button").css("transform", "scale(1)");
        }

        if(event.type == 'mouseup') {
            $(".clicker .big-button").css("transform", "scale(1.05)");
        }

        if(event.type == 'mouseenter') {
            $(".clicker .big-button").css("transform", "scale(1.05)");
        }

        if(event.type == 'mouseleave') {
            $(".clicker .big-button").css("transform", "scale(1)");
        }

    }

}