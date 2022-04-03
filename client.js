

var socket = io();

//էստեղ նախկին սկրիպտ ֆայլիցդ տպում և էստեղ ես բերում setup ֆունկցիան
side = 20;
 weath = "winter";
//   let weath ="summer";

function setup() {
    createCanvas(28 * side, 24 * side);
    background("#acacac");
}

socket.on("weather", function (data) {
    weath = data;
});

function drawMatrix(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green")
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("burlywood");
            }
            else if (matrix[y][x] == 5) {
                fill("dodgerblue");
            }
            else {
                fill("grey");
            }
            var obj = matrix[y][x];
            if (obj == 1) {
                if (weath == "summer") {
                    fill("green");
                } else if (weath == "autumn") {
                    fill("#333300");
                } else if (weath == "winter") {
                    fill("white");
                } else if (weath == "spring") {
                    fill("#4dffa6");
                }
            }
            rect(x * side, y * side, side, side)
        }
    }
}

setInterval(
    function () {
        socket.on('send matrix', drawMatrix)
    }, 1000
)



function addGrass() {
    socket.emit("addGrass");    
}

function addGrassEater() {
    socket.emit("addGrassEater");    
}

function addPredator() {
    socket.emit("addPredator");    
}

function addHunter() {
    socket.emit("addHunter");    
}

function addLightning() {
    socket.emit("addLightning");    
}

function weather() {
    if (weath == "winter") {
        console.log(weath)
        
        weath = "spring";
        
    }
    else if (weath == "spring") {
        console.log(weath)
        weath = "summer";
        
    }
    else if (weath == "summer") {
        console.log(weath)
        weath = "autumn";
        
    }
    else if (weath == "autumn") {
        console.log(weath)
        weath = "winter";
        
    }
 
}
setInterval(weather, 3000);