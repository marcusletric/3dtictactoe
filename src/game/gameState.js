/**
 * Created by Martyin Kornél
 */

/**
 * A játékállás prototípusa
 *
 * @param stageSize {number} a játéktér élhossza mezőkben
 * @param rowLength {number} elérendő sorhossz a győzelemhez
 * @param playerNum {number} játékosok száma a játékban
 * @constructor
 */
function GameState(stageSize,rowLength,playerNum){
    var self = this;

    this.playerNum = playerNum;
    this.stageSize = stageSize;
    this.rowLength = rowLength;
    this.table = [];
    this.moves = 0;

    for( x = 1; x <= stageSize; x++){
        if(typeof (this.table[x]) != "object"){
            this.table[x] = [];
        }
        for( y = 1; y <= stageSize; y++){
            if(typeof (this.table[x][y]) != "object"){
                this.table[x][y] = [];
            }
            for( z = 1; z <= stageSize; z++){
                this.table[x][y][z]=0;
            }
        }
    }

    /**
     * A játékállás táblájának frissítlése
     *
     * @param table {Array} tábla a játékosokkal
     */
    this.setTable = function(table){
        for(var x = 1; x <= stageSize; x++){
            for(var y = 1; y <= stageSize; y++){
                for(var z = 1; z <= stageSize; z++){
                    this.table[x][y][z] = table[x][y][z];
                }
            }
        }
    };

    /**
     * Végállás ellenőrzése.
     * Ha egy játékos nyert akkor a játékost azonosító számmal tér vissza.
     * Ha döntetlen akkor a 'deuce' string értékelődik ki, minden más esetben 0.
     *
     * @returns {number|string}
     */
    this.over = function(){

        for(var i=1; i<=3;i++){
            // stócok
            if(this.table[1][1][i] !=0 && this.table[1][1][i] == this.table[1][2][i] && this.table[1][2][i] == this.table[1][3][i]){
                return this.table[1][1][i];
            }
            if(this.table[2][1][i] !=0 && this.table[2][1][i] == this.table[2][2][i] && this.table[2][2][i] == this.table[2][3][i]){
                return this.table[2][1][i];
            }
            if(this.table[3][1][i] !=0 && this.table[3][1][i] == this.table[3][2][i] && this.table[3][2][i] == this.table[3][3][i]){
                return this.table[3][1][i];
            }

            //sorok
            if(this.table[1][i][1] !=0 && this.table[1][i][1] == this.table[2][i][1] && this.table[2][i][1] == this.table[3][i][1]){
                return this.table[1][i][1];
            }
            if(this.table[1][i][2] !=0 && this.table[1][i][2] == this.table[2][i][2] && this.table[2][i][2] == this.table[3][i][2]){
                return this.table[1][i][2];
            }
            if(this.table[1][i][3] !=0 && this.table[1][i][3] == this.table[2][i][3] && this.table[2][i][3] == this.table[3][i][3]){
                return this.table[1][i][3];
            }

            //oszlopok
            if(this.table[i][1][1] !=0 && this.table[i][1][1] == this.table[i][1][2] && this.table[i][1][2] == this.table[i][1][3]){
                return this.table[i][1][1];
            }
            if(this.table[i][2][1] !=0 && this.table[i][2][1] == this.table[i][2][2] && this.table[i][2][2] == this.table[i][2][3]){
                return this.table[i][2][1];
            }
            if(this.table[i][3][1] !=0 && this.table[i][3][1] == this.table[i][3][2] && this.table[i][3][2] == this.table[i][3][3]){
                return this.table[i][3][1];
            }

            //lapátlók
            if(this.table[1][i][1] !=0 && this.table[1][i][1] == this.table[2][i][2] && this.table[2][i][2] == this.table[3][i][3]){
                return this.table[1][i][1];
            }

            if(this.table[1][i][3] !=0 && this.table[1][i][3] == this.table[2][i][2] && this.table[2][i][2] == this.table[3][i][1]){
                return this.table[1][i][3];
            }

            if(this.table[i][1][1] !=0 && this.table[i][1][1] == this.table[i][2][2] && this.table[i][2][2] == this.table[i][3][3]){
                return this.table[i][1][1];
            }

            if(this.table[i][1][3] !=0 && this.table[i][1][3] == this.table[i][2][2] && this.table[i][2][2] == this.table[i][3][1]){
                return this.table[i][1][3];
            }

            if(this.table[1][1][i] !=0 && this.table[1][1][i] == this.table[2][2][i] && this.table[2][2][i] == this.table[3][3][i]){
                return this.table[1][1][i];
            }
            if(this.table[1][3][i] !=0 && this.table[1][3][i] == this.table[2][2][i] && this.table[2][2][i] == this.table[3][1][i]){
                return this.table[1][3][i];
            }

        }

        // keresztátlók
        if(
            this.table[1][1][1] !=0 && this.table[1][1][1] == this.table[2][2][2] && this.table[2][2][2] == this.table[3][3][3] ||
            this.table[3][1][1] !=0 && this.table[3][1][1] == this.table[2][2][2] && this.table[2][2][2] == this.table[1][3][3] ||
            this.table[3][3][1] !=0 && this.table[3][3][1] == this.table[2][2][2] && this.table[2][2][2] == this.table[1][1][3] ||
            this.table[1][3][1] !=0 && this.table[1][3][1] == this.table[2][2][2] && this.table[2][2][2] == this.table[3][1][3]
        ){
            return this.table[2][2][2];
        }

        if(this.moves < Math.pow(this.stageSize,3)){
            return 0;
        } else {
            return 'deuce';
        }


        /*var hasEmptyField = false;

        for(x = 1; x < this.table.length; x++){
            for(y = 1; y < this.table.length; y++){
                for(z = 1; z < this.table.length; z++){
                    if(this.table[x][y][z]!=0){
                        if(isEndState(x,y,z)){
                            return this.table[x][y][z];
                        }
                    } else {
                        hasEmptyField = true;
                    }
                }
            }
        }

        return !hasEmptyField ? 'deuce' : false;

        function isEndState(x,y,z){
            var scanHeads = [];
            var neighbours = {};
            var maxDepth = self.rowLength / 2;
            var value = self.table[x][y][z];

            for(var i = 0; i < utils.directions.length;i++){
                scanHeads.push(
                    new ScanHead(self.table,{x: x, y: y, z: z},i,value)
                );
            }

            scanLines(scanHeads,neighbours,0);

            for(i=0; i < utils.directions.length/2; i++){
                var sum = neighbours[i] + neighbours[26-i];
                if(sum + 1 == self.rowLength){
                    return true;
                }
            }

            return false;

            function scanLines(scanHeads,neighbours,length){
                var continueScanHeads = [];

                for(var i = 0; i < scanHeads.length;i++){
                    var scanHead = scanHeads[i];
                    if(!neighbours[scanHead.direction]) {
                        neighbours[scanHead.direction] = 0;
                    }
                    if(scanHead.found){
                        neighbours[scanHead.direction]++;
                        continueScanHeads.push(new ScanHead(self.table,scanHead.posChecked,scanHead.direction,scanHead.value));
                    }
                }

                length++;

                if(continueScanHeads.length > 0 && length < maxDepth){
                    scanLines(continueScanHeads,neighbours,length);
                }
            }
        }*/
    };

    /**
     * Lépni következő játékos azonosítójának kiszámolása
     *
     * @returns {number}
     */
    this.nextPlayer = function(){
        var count = 0;

        for(x = 1; x < this.table.length; x++){
            for(y = 1; y < this.table.length; y++){
                for(z = 1; z < this.table.length; z++){
                    this.table[x][y][z]!=0?count++:'';
                }
            }
        }

        return count % this.playerNum + 1;
    }

}