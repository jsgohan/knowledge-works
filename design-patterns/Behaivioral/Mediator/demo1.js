/**
 * 中介者模式实现游戏，player对象的原型方法不负责具体的执行逻辑，操作转交给中介者对象playerDirector
 * 中介者playerDirectory可以有两种方式实现
 * 1. 利用发布-订阅模式。playerDirectory实现为订阅者，各player作为发布者，一旦player的状态发生改变，便推送消息给playerDirector，playerDirector处理消息后将反馈发送给其他player
 * 2. 在playerDirector中开放一些接收消息的接口，各player可以直接调用该接口来给playerDirector发送消息，player只需传递一个参数给playerDirector，这个参数的目的是使playerDirector可以识别发送者
 */
var playerDirector = (function() {
  var players = {}, // 保存所有玩家
      operations = {}; // 中介者可以执行的操作

  // 新增一个玩家
  operations.addPlayer = function(player) {
    var teamColor = player.teamColor; // 玩家的队伍颜色
    players[teamColor] = players[teamColor] || []; // 如果该颜色的玩家还没有成立队伍，则新成立一个队伍
    players[teamColor].push(player); // 添加玩家进队伍
  };

  // 移除一个玩家
  operations.removePlayer = function(player) {
    var teamColor = player.teamColor, // 玩家的队伍颜色
        teamPlayers = players[teamColor] || []; // 该队伍所有成员

    for (var i = teamPlayers.length - 1; i >= 0; i--) { // 遍历删除
      if (teamPlayers[i] === player) {
        teamPlayers.splice(i, 1);
      }
    }
  };

  // 玩家换队
  operations.changeTeam = function(player, newTeamColor) {
    operations.removePlayer(player); // 从员队伍中删除
    player.teamColor = newTeamColor; // 改变队伍颜色
    operations.addPlayer(player); // 增加到新队伍中
  };

  operations.playerDead = function(player) {
    var teamColor = player.teamColor,
        teamPlayers = players[teamColor];

    var all_dead = true;

    for(var i = 0, player; player = teamPlayers[i++];) {
      if (player.state !== 'dead') {
        all_dead = false;
        break;
      }
    }

    if (all_dead === true) {
      for (var i = 0, player; player = teamPlayers[i++];) {
        player.lose(); // 本队所有玩家lose
      }

      for (var color in players) {
        if (color !== teamColor) {
          var teamPlayers = players[color];
          for (var i = 0, player; player = teamPlayers[i++];) {
            player.win();
          }
        }
      }
    };
  };

  var ReceiveMessage = function() {
    var message = Array.prototype.shift.call(arguments);

    operations[message].apply(this, arguments);
  };

  return {
    ReceiveMessage: ReceiveMessage
  };
})();

function Player(name, teamColor) {
  this.name = name;
  this.teamColor = teamColor;
  this.state = 'alive';
};

Player.prototype.win = function() {
  console.log(this.name + ' won');
};

Player.prototype.lose = function() {
  console.log(this.name + ' lost');
};

Player.prototype.die = function() {
  this.state = 'dead';
  playerDirector.ReceiveMessage('playerDead', this);
};

Player.prototype.remove = function() {
  playerDirector.ReceiveMessage('removePlayer', this);
};

Player.prototype.changeTeam = function(color) {
  playerDirector.ReceiveMessage('changeTeam', this, color);
};

var playerFactory = function(name, teamColor) {
  var newPlayer = new Player(name, teamColor);

  playerDirector.ReceiveMessage('addPlayer', newPlayer);

  return newPlayer;
};

var player1 = playerFactory('皮蛋', 'red');
var player2 = playerFactory('小乖', 'red');
var player3 = playerFactory('宝宝', 'red');
var player4 = playerFactory('小强', 'red');

var player5 = playerFactory('黑妞', 'blue');
var player6 = playerFactory('葱头', 'blue');
var player7 = playerFactory('胖墩', 'blue');
var player8 = playerFactory('海盗', 'blue');

player1.die();
player2.die();
player3.die();
player4.die();
// 皮蛋 lost
// 小乖 lost
// 宝宝 lost
// 小强 lost
// 黑妞 won
// 葱头 won
// 胖墩 won
// 海盗 won

// 如果皮蛋和小乖掉线
// player1.remove();
// player2.remove();
// player3.die();
// player4.die();
// 宝宝 lost
// 小强 lost
// 黑妞 won
// 葱头 won
// 胖墩 won
// 海盗 won

// 皮蛋从红队叛变到蓝队
player1.changeTeam('blue');
player2.die();
player3.die();
player4.die();
// 小乖 lost
// 宝宝 lost
// 小强 lost
// 黑妞 won
// 葱头 won
// 胖墩 won
// 海盗 won
// 皮蛋 won