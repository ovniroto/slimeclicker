import Achievements from "../modules/achievements";
import Saves from "../modules/saves";

const save = new Saves();
const achievement = new Achievements();

// Show alert on close
$(window).on('beforeunload', function() {
    if(window.gameOptions.closealert) return '';
});

// Save game with CTRL+S shortcut
$(window).on('keydown', (event) => {
    if(event.ctrlKey) {
        event.preventDefault();
        if(event.code == "KeyS") {
            save.localGameData();
            achievement.unlock('gamesaved', 'special');
        }
    }
});