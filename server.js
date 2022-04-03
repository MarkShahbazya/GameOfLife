var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");


app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

matrix = [
    [1, 0, 1, 0, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 0, 0, 0, 4, 4, 0, 0],
    [1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 0, 1, 1, 2, 1, 0, 0, 2, 0, 0, 2, 4, 0],
    [1, 1, 0, 1, 2, 1, 2, 2, 3, 1, 2, 2, 2, 1, 0, 1, 2, 0, 2, 1, 1, 0, 0, 1, 0, 0, 0, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 2, 0, 0, 0, 0, 4, 2, 0],
    [1, 1, 1, 2, 2, 1, 2, 1, 2, 1, 2, 2, 1, 0, 2, 2, 1, 0, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 2, 1, 2, 1, 1, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 5, 1, 2, 2, 1, 2, 0, 2, 5, 2],
    [3, 1, 0, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 2, 2, 1, 3, 1, 2, 5, 1, 4, 0, 1, 1, 5, 0, 0],
    [1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 1, 1, 5, 2, 0, 1, 2, 1, 5, 1, 0, 0, 5, 1, 0, 0],
    [0, 1, 1, 2, 2, 1, 4, 1, 2, 1, 2, 2, 2, 2, 0, 5, 1, 0, 2, 2, 2, 4, 3, 1, 0, 2, 1, 1],
    [1, 2, 2, 1, 0, 4, 3, 1, 5, 1, 1, 5, 2, 2, 1, 2, 5, 1, 0, 1, 2, 0, 1, 2, 1, 0, 2, 0],
    [1, 2, 1, 1, 2, 2, 1, 1, 1, 5, 1, 1, 2, 2, 1, 2, 1, 2, 5, 1, 1, 5, 3, 2, 1, 1, 4, 0],
    [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 5, 2, 2, 2, 5, 1, 0, 1, 4, 5, 2, 1, 1, 1, 1, 1, 0, 2],
    [2, 3, 1, 2, 3, 1, 2, 4, 1, 3, 2, 2, 4, 2, 2, 1, 0, 1, 2, 1, 5, 0, 2, 0, 0, 1, 2, 0],
    [1, 2, 1, 2, 1, 1, 1, 2, 5, 1, 1, 2, 1, 2, 1, 1, 1, 0, 2, 1, 1, 5, 0, 1, 1, 1, 2, 2],
    [2, 2, 1, 2, 2, 1, 2, 2, 1, 1, 1, 2, 1, 2, 3, 1, 0, 2, 1, 2, 2, 0, 1, 0, 0, 1, 1, 0],
    [1, 2, 1, 1, 2, 5, 1, 2, 2, 2, 2, 2, 2, 3, 1, 2, 1, 1, 2, 1, 1, 3, 0, 0, 0, 2, 0, 3],
    [1, 1, 2, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 1, 1, 1, 0, 2, 0, 1, 0, 1, 1],
    [2, 0, 2, 2, 1, 4, 5, 3, 1, 2, 2, 2, 2, 1, 5, 2, 1, 2, 0, 2, 3, 0, 0, 0, 0, 1, 1, 2],
    [2, 2, 4, 2, 1, 4, 1, 2, 3, 2, 2, 1, 2, 1, 1, 5, 1, 2, 3, 1, 2, 0, 2, 1, 0, 2, 1, 2],
    [1, 1, 3, 2, 2, 1, 2, 2, 1, 2, 0, 1, 2, 1, 3, 2, 5, 2, 2, 1, 2, 2, 1, 0, 0, 0, 1, 1],
    [4, 2, 1, 2, 5, 2, 1, 1, 4, 2, 1, 2, 0, 2, 1, 2, 1, 3, 2, 1, 1, 1, 2, 4, 2, 0, 0, 0],
    [2, 1, 2, 2, 1, 5, 2, 1, 2, 2, 1, 1, 2, 1, 2, 2, 1, 1, 2, 4, 3, 0, 4, 0, 4, 1, 4, 2],
    [1, 1, 2, 2, 2, 0, 5, 3, 1, 2, 3, 3, 1, 1, 2, 1, 0, 1, 1, 2, 2, 4, 0, 4, 0, 2, 0, 0],
    [1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 2, 0, 1, 2, 0, 3, 0, 4]
];

console.log(matrix.length, matrix[0].length);

weath = "winter";



io.sockets.emit('send matrix', matrix);


grassArr = [];
grassEaterArr = [];
predatorArr = [];
hunterArr = [];
lightningArr = [];

Grass = require("./Grass");
GrassEater = require("./GrassEater");
Lightning = require("./Lightning");
Predator = require("./Predator");
Hunter = require("./Hunter");

function createObject(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y, 1));
            }
            else if (matrix[y][x] == 2) {
                grassEaterArr.push(new GrassEater(x, y, 2));
            }
            else if (matrix[y][x] == 3) {
                predatorArr.push(new Predator(x, y, 3));
            }
            else if (matrix[y][x] == 4) {
                hunterArr.push(new Hunter(x, y, 4));
            }
            else if (matrix[y][x] == 5) {
                lightningArr.push(new Lightning(x, y, 5));
            }
        }
    }
    io.sockets.emit('send matrix', matrix);
}

function game() {
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat();
    }
    for (let i = 0; i < predatorArr.length; i++) {
        predatorArr[i].eat();
    }
    for (let i = 0; i < hunterArr.length; i++) {
        hunterArr[i].eat();
    }
    for (let i = 0; i < lightningArr.length; i++) {
        lightningArr[i].eat();
    }
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000)



function addGrass() {
    
    for (let i = 0; i < 10; i++) {
        const y = getRndInteger(0, matrix.length - 1);
        const x = getRndInteger(0, matrix[0].length - 1);
        if (matrix[y][x] == 0) {
            grassArr.push(new Grass(x, y));
            matrix[y][x] = 1;
        }

    }
    

}
function addGrassEater() {
    for (let i = 0; i < 8; i++) {
        const y = getRndInteger(0, matrix.length - 1);
        const x = getRndInteger(0, matrix[0].length - 1);
        if (matrix[y][x] == 0) {
            grassEaterArr.push(new GrassEater(x, y));
            matrix[y][x] = 2;
        }

    }
    

}

function addPredator() {
    for (let i = 0; i < 6; i++) {
        const y = getRndInteger(0, matrix.length - 1);
        const x = getRndInteger(0, matrix[0].length - 1);
        if (matrix[y][x] == 0) {
            predatorArr.push(new Predator(x, y));
            matrix[y][x] = 3;
        }

    }
    

}

function addHunter() {
    for (let i = 0; i < 4; i++) {
        const y = getRndInteger(0, matrix.length - 1);
        const x = getRndInteger(0, matrix[0].length - 1);
        if (matrix[y][x] == 0) {
            hunterArr.push(new Hunter(x, y));
            matrix[y][x] = 4;
        }

     }
    

}
 
function addLightning() {
    for (let i = 0; i < 2; i++) {
        const y = getRndInteger(0, matrix.length - 1);
        const x = getRndInteger(0, matrix[0].length - 1);
        if (matrix[y][x] == 0) {
            lightningArr.push(new Lightning(x, y));
            matrix[y][x] = 5;
        }
    
    }
    
    function weather() {
        if (weath == "winter") {
            weath = "spring";
        }
        else if (weath == "spring") {
            weath = "summer";
        }
        else if (weath == "summer") {
            weath = "autumn";
        }
        else if (weath == "autumn") {
            weath = "winter";
        }
        io.sockets.emit('weather', weath)
    }
    setInterval(weather, 3000);

}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
io.on('connection', function (socket) {
    createObject(matrix);
    socket.on('addGrass', addGrass);
    socket.on('addGrassEater', addGrassEater);
    socket.on('addPredator', addPredator);
    socket.on('addHunter', addHunter);
    socket.on('addLightning', addLightning);

})



// var statistics = {};

// setInterval(function() {
//     statistics.grass = grassArr.length;
//     statistics.grassEater = grassEaterArr.length;
//     fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
//         console.log("send")
//     })
// },1000)