'use strict'

let Game = require('./classes/Game');

///Game



const startButton = document.getElementById('startButton');
startButton.addEventListener("click", function () {
    const game = new Game();
});

/*

Leave cards out
Play a round

*/