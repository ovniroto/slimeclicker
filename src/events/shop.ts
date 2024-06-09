import Shop from "../modules/shop";
const shop = new Shop();

$('body').on('click', '#game-buildings .item', (event) => { shop.buy(event); });