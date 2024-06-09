import Game from "../modules/game";
import Particles from "../modules/particles";
import Animations from "../modules/animations";
import Sounds from "../modules/sounds";

const game = new Game();
const particle = new Particles();
const animation = new Animations();
const sound = new Sounds();

$('body').on('click', '#clicker .click-me', (event) => { game.click(); particle.plus(event); animation.bigButton(event); });
$('body').on('mousedown', '#clicker .click-me', (event) => { animation.bigButton(event); sound.click(); });
$('body').on('mouseup', '#clicker .click-me', (event) => { animation.bigButton(event); sound.click(); });
$('body').on('mouseenter', '#clicker .click-me', (event) => { animation.bigButton(event); });
$('body').on('mouseleave', '#clicker .click-me', (event) => { animation.bigButton(event); });