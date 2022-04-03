let LivingCreature = require('./LivingCreature')

module.exports = class Predator extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 8;
        this.directions = [];
    }

    getNewCoordinatess() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinatess();
        return super.chooseCell(character);
    }

    mul() {
        var newCells = this.chooseCell(0)
        var newCell = newCells[Math.floor(Math.random() * newCells.length)]
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            predatorArr.push(new Predator(newX, newY));
            this.energy = 7;
        }


    }

    move() {
        var found = this.chooseCell(0);
        var newCell = found[Math.floor(Math.random() * found.length)]

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
        this.energy--;

        if (this.energy < 0) {
            this.die();
        }
    }

    eat() {

        var found = this.chooseCell(2);
        var newCell = found[Math.floor(Math.random() * found.length)]

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            this.energy++;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 30) {
                this.mul();
            }
        }
        else {
            this.move();
        }
    }


    die() {

        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;

    };
}