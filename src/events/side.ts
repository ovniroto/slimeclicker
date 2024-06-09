import Side from "../modules/side";
const side = new Side();

$('body').on('click', '.side-subhead li', (event) => { side.show(event) });