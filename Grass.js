let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature {
    mul() {
        let emptyCells = this.chooseCell(0)
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell && this.multiplay >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;
            grassArr.push(new Grass(newX, newY));
            this.multiplay = 0;
        }
        this.multiplay++;
    }
}
