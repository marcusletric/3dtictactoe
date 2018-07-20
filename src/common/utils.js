/**
 * Created by Martyin Kornél
 */

/**
 * Segédeszközök
 *
 * @constructor
 */
function Utils(){

    /**
     * Egy pontból kiindó elérhető irányok.
     *
     * @type {Array}
     */
    this.directions = [];

    var index = 0;

    for(var x1 = -1; x1 <=1; x1++ ){
        for(var y1 = -1; y1 <=1; y1++ ){
            for(var z1 = -1; z1 <=1; z1++ ){
                this.directions[index]={x: x1, y: y1, z: z1};
                index++;
            }
        }
    }

}

var utils = new Utils();