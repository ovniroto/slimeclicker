import Game from "../modules/game";
import Options from "../modules/options";
import Saves from "../modules/saves";
import Globals from "../utils/globals";
import Sounds from "../modules/sounds";
import Achievements from "../modules/achievements";

const save = new Saves();
const game = new Game();
const options = new Options();
const globals = new Globals();
const sound = new Sounds();
const achievement = new Achievements();

// Sound buttons
$('body').on('click', '.game-button', () => { sound.play('btn-option'); });
$('body').on('click', '.btn-close-modal', () => { sound.play('btn-option'); });
$('body').on('change', '#options #volume', () => { sound.play('btn-option'); });

// Change language
$('body').on('click', '#languages .game-button', (event) => {
    let language = event.target.attributes[1].value;
    if(language == window.gameOptions.language) return;
    $('#language-modal').modal('hide');
    options.change('language', language);
    globals.reloadPage(100);
});

// Confirm new game
$('body').on('click', '#confirm-newgame', () => {
    $('#newgame-modal').modal('hide');
    game.restart();
});

// Save local game data
$('body').on('click', '#options #save', () => { save.localGameData(); achievement.unlock('gamesaved', 'special'); });

// Export save
$('body').on('click', '#options #export-save', () => { save.create(); });

// Import save
$('body').on('change', '#import-save', (event) => { save.load(event); });

/* Volume */
$('body').on('input change', '#options #volume', (event) => { options.change('volume', $(event.target).val()); });

/* Close alert */
$('body').on('click', '#options #close-alert', () => { options.change('close-alert'); });

/* Confetti alert */
$('body').on('click', '#options #confetti', () => { options.change('confetti'); });