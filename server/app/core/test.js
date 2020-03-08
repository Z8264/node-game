
const Game = require('./Game');


const game = new Game();

game.sit(1, 1, '张');
game.sit(2, 2, '聂');

game.start();

game.roundStart();

game.roundAction();

game.say(1, 5, 5);
game.say(2, 6, 6);

/**
 * 质疑环节
 */
game.doubt(1);
// if (game.isAllAction()) {
//   game.roundEnd();

//   if (game.isOnlyOne()) {
//     game.over();
//   } else {
//     game.gameStart();
//   }
// }


console.log(game.info());
