import Data from '../modules/data';

const data = new Data();

// Confirm new player name
$('body').on('click', '#confirm-playername', () => {
    $('#playername-modal').modal('hide');
    let name = $('input#player-name').val();
    data.change('playername', name);
});