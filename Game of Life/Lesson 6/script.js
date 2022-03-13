var matrix = [
    [1,0,1,0,2,2,1,1,2,1,1,2,1,2,1,1,2,1,2,2,1,0,0,0,4,4,0,0],
    [1,1,2,1,1,1,2,2,2,1,2,2,2,1,1,0,1,1,2,1,0,0,2,0,0,2,4,0],
    [1,1,0,1,2,1,2,2,3,1,2,2,2,1,0,1,2,0,2,1,1,0,0,1,0,0,0,1],
    [1,2,1,1,1,2,1,1,2,2,1,1,2,1,2,1,1,1,1,2,2,0,0,0,0,4,2,0],
    [1,1,1,2,2,1,2,1,2,1,2,2,1,0,2,2,1,0,2,1,0,1,0,1,0,1,0,1],
    [0,2,1,2,1,1,1,2,2,1,2,2,2,1,2,2,2,1,5,1,2,2,1,2,0,2,5,2],
    [3,1,0,2,1,1,2,2,1,2,1,1,2,2,2,1,3,1,2,5,1,4,0,1,1,5,0,0],
    [1,2,1,2,2,1,2,2,1,2,1,1,1,1,5,2,0,1,2,1,5,1,0,0,5,1,0,0],
    [0,1,1,2,2,1,4,1,2,1,2,2,2,2,0,5,1,0,2,2,2,4,3,1,0,2,1,1],
    [1,2,2,1,0,4,3,1,5,1,1,5,2,2,1,2,5,1,0,1,2,0,1,2,1,0,2,0],
    [1,2,1,1,2,2,1,1,1,5,1,1,2,2,1,2,1,2,5,1,1,5,3,2,1,1,4,0],
    [2,2,1,2,1,2,1,1,2,1,5,2,2,2,5,1,0,1,4,5,2,1,1,1,1,1,0,2],
    [2,3,1,2,3,1,2,4,1,3,2,2,4,2,2,1,0,1,2,1,5,0,2,0,0,1,2,0],
    [1,2,1,2,1,1,1,2,5,1,1,2,1,2,1,1,1,0,2,1,1,5,0,1,1,1,2,2],
    [2,2,1,2,2,1,2,2,1,1,1,2,1,2,3,1,0,2,1,2,2,0,1,0,0,1,1,0],
    [1,2,1,1,2,5,1,2,2,2,2,2,2,3,1,2,1,1,2,1,1,3,0,0,0,2,0,3],
    [1,1,2,2,1,2,1,1,1,2,1,1,2,1,1,2,2,2,1,1,1,0,2,0,1,0,1,1],
    [2,0,2,2,1,4,5,3,1,2,2,2,2,1,5,2,1,2,0,2,3,0,0,0,0,1,1,2],
    [2,2,4,2,1,4,1,2,3,2,2,1,2,1,1,5,1,2,3,1,2,0,2,1,0,2,1,2],
    [1,1,3,2,2,1,2,2,1,2,0,1,2,1,3,2,5,2,2,1,2,2,1,0,0,0,1,1],
    [4,2,1,2,5,2,1,1,4,2,1,2,0,2,1,2,1,3,2,1,1,1,2,4,2,0,0,0],
    [2,1,2,2,1,5,2,1,2,2,1,1,2,1,2,2,1,1,2,4,3,0,4,0,4,1,4,2],
    [1,1,2,2,2,0,5,3,1,2,3,3,1,1,2,1,0,1,1,2,2,4,0,4,0,2,0,0],
    [1,1,1,2,1,2,1,2,1,2,1,2,2,1,1,2,1,2,1,1,2,0,1,2,0,3,0,4]
 ];


var side = 20;
const grassArr = [];
const grassEaterArr  = [];
const predatorArr = [];
const hunterArr = [];
const lightningArr = [];
const grassButton = document.querySelector("#grass");
const grassEaterButton = document.querySelector("#grasseater");
const predatorButton = document.querySelector("#predator");
const hunterButton = document.querySelector("#hunter");
const lightningButton = document.querySelector("#lightning");

grassButton.addEventListener("click", ()=> {
    for (let i= 0; i < 10; i++) {
        const y = getRndInteger(0, matrix.length - 1);
        const x = getRndInteger(0, matrix[0].length - 1);
        if(matrix[y][x] == 0) {
            grassArr.push(new Grass(x,y));
            matrix[y][x] = 1;
        }

    }
})

grassEaterButton.addEventListener("click", ()=> {
    for (let i= 0; i < 8; i++) {
        const y = getRndInteger(0, matrix.length - 1);
        const x = getRndInteger(0, matrix[0].length - 1);
        if(matrix[y][x] == 0) {
            grassEaterArr.push(new GrassEater(x,y));
            matrix[y][x] = 2;
        }

    }
})

predatorButton.addEventListener("click", ()=> {
    for (let i= 0; i < 6; i++) {
        const y = getRndInteger(0, matrix.length - 1);
        const x = getRndInteger(0, matrix[0].length - 1);
        if(matrix[y][x] == 0) {
            predatorArr.push(new Predator(x,y));
            matrix[y][x] = 3;
        }

    }
})

hunterButton.addEventListener("click", ()=> {
    for (let i= 0; i < 4; i++) {
        const y = getRndInteger(0, matrix.length - 1);
        const x = getRndInteger(0, matrix[0].length - 1);
        if(matrix[y][x] == 0) {
            hunterArr.push(new Hunter(x,y));
            matrix[y][x] = 4;
        }

    }
})

lightningButton.addEventListener("click", ()=> {
    for (let i= 0; i < 2; i++) {
        const y = getRndInteger(0, matrix.length - 1);
        const x = getRndInteger(0, matrix[0].length - 1);
        if(matrix[y][x] == 0) {
            lightningArr.push(new Lightning(x,y));
            matrix[y][x] = 5;
        }

    }
})

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function setup() {
frameRate(5);
createCanvas(500, 500);
for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            grassArr.push(new Grass(x,y,1));
        }
        else if (matrix[y][x] == 2) {
            grassEaterArr.push(new GrassEater(x,y,2));
        }
        else if (matrix[y][x] == 3) {
            predatorArr.push(new Predator(x,y,3));
        }
        else if (matrix[y][x] == 4) {
            hunterArr.push(new Hunter(x,y,4));
        }
        else if (matrix[y][x] == 5) {
            lightningArr.push(new Lightning(x,y,5));
        }
    }
}
}

function draw() {
   for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if(matrix[y][x] == 0){
               fill("grey")
        }
        else if(matrix[y][x] == 1){
            fill("green")
        }
        else if(matrix[y][x] == 2) {
           fill("yellow");
        }
        else if(matrix[y][x] == 3) {
           fill("red");
        }
        else if(matrix[y][x] == 4) {
           fill("burlywood");
        }
        else if(matrix[y][x] == 5) {
           fill("dodgerblue")
        }
rect(x * side , y * side , side,side )
}
}

for (let i = 0; i < grassArr.length; i++) {
    grassArr[i].mul();
}
for (let i = 0; i < grassEaterArr.length; i++) {
    grassEaterArr[i].eat();
}
for(let i = 0; i < predatorArr.length; i++) {
    predatorArr[i].eat();

}
for(let i = 0; i < hunterArr.length; i++) {
    hunterArr[i].eat();
}
for(let i = 0; i < lightningArr.length; i++) {
    lightningArr[i].eat();
}
}