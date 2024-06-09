import Achievements from '../modules/achievements';

const achievements = new Achievements();

// Unlock question mark achievement
$('body').on('click', '#achievements #achiev-questionmark', () => {
    achievements.unlock('questionmark', 'special');
});

// Unlock question mark achievement
$('body').on('click', '#achievements #achiev-questionmark', () => {
    achievements.check();
});