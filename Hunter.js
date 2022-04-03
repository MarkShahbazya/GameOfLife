let LivingCreature = require('./LivingCreature')

module.exports = class Hunter extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 8;
        this.directions = [];
    }

    getNewCoordinates() {
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
        this.getNewCoordinates();
        return super.chooseCell(character)
    }

    mul() {
        var newCells = this.chooseCell(0)
        var newCell = newCells[Math.floor(Math.random() * newCells.length)]
        if (newCell && this.energy >= 12) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
            hunterArr.push(new Hunter(newX, newY));
            this.energy = 7;
        }


    }

    move() {
        var found = this.chooseCell(0);
        var newCell = found[Math.floor(Math.random() * found.length)]

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
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

        var found = this.chooseCell(3);
        var newCell = found[Math.floor(Math.random() * found.length)]

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            this.energy++;

            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
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


        for (var i in hunterArr) {
            if (this.x == hunterArr[i].x && this.y == hunterArr[i].y) {
                hunterArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;

    };
}