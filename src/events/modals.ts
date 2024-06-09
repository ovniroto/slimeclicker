/* Modasls */

// New game modal
$('body').on('click', '#options #newgame', () => {
    $('#newgame-modal').modal('show');
});

// Language modal
$('body').on('click', '#options #language', () => {
    $('#language-modal').modal('show');
});

// Player name modal
$('body').on('click', '#clicker .title', () => {
    $('#playername-modal').modal('show');
});