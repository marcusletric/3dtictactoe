/**
 * Created by Martyin Kornél
 */

/**
 * Játéktér olvasásához olvasófej
 *
 * @param matrix {Array} játéktér mátrixa
 * @param position {object} kordinátahármas, az aktuális pozíció
 * @param direction {object} koordinátahármas, az eltolás iránya
 * @param value {number} az ellenőrzendő érték
 * @constructor
 */
function ScanHead(matrix,position,direction,value){
    this.direction = direction;
    this.matrix = matrix;
    this.value = value;
    this.posChecked = {
        x: utils.directions[direction].x + position.x,
        y: utils.directions[direction].y + position.y,
        z: utils.directions[direction].z + position.z
    };
    this.found =
        typeof (matrix[this.posChecked.x]) != 'undefined' &&
        typeof (matrix[this.posChecked.x][this.posChecked.y]) != 'undefined' &&
        matrix[this.posChecked.x][this.posChecked.y][this.posChecked.z] == value;
}