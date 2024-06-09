import Pages from "../modules/pages";
const pages = new Pages();

// Achievements, information, updates...
$('body').on('click', '.game-head li', (event) => { pages.show(event) });

// Shop, money
$('body').on('click', '.side-head li', (event) => { pages.show(event) });

// Machines, slimes, quests
$('body').on('click', '.side-buttons li', (event) => { pages.show(event) });