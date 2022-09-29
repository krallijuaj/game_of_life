var matrix = [];
var side = 15;
var size2 = 50; // Reduced size due to lag
var emptyCells = [];
var timer = 0;
var weather = ["spring", "summer", "fall", "Winter"];
var emptyItems;
var grassItems;
var grassEaterItems;

function setup(){
    createCanvas(size2*side,size2*side)
    background(50)
    for(var i=0;i<size2;i++){
        var arr = [];
        for(var j=0;j<size2;j++){
            var entity = Math.random()
            if(entity > 0.4){
                arr.push(new Empty(j,i))
            } else if(entity < 0.4 && entity > 0.01){
                arr.push(new Grass(j,i))
            } else if(entity < 0.02){
                arr.push(new GrassEater(j,i,15))
            } 
             if(entity < 0.01){
                arr.push(new Flower(j,i))
            }
            if(entity < 0.03){
                arr.push(new FlowerEater(j,i))
            }
            if(entity < 0.05){
                arr.push(new White(j,i))
            }
        }
        matrix.push(arr)
    }
}

function draw(){
    emptyItems = 0;
    grassItems = 0;
    grassEaterItems = 0;
    flowerItems = 0
    for (var i in matrix) {
        for(var j in matrix[i]){
            if(matrix[i][j] instanceof Empty){
                emptyItems++
            }
            if(matrix[i][j] instanceof Grass){
                grassItems++
            }
            if(matrix[i][j] instanceof GrassEater){
                grassEaterItems++
            }
            if(matrix[i][j] instanceof Flower){
               
                grassItems++
            }
            if(matrix[i][j] instanceof FlowerEater){
               
                grassItems++
            }
            if(matrix[i][j] instanceof White){
               
                grassEaterItems++
            }
          
        }
    }
    if(timer== 10){
    
        weather="spring"
        console.log(weather)
        }
        if(timer== 20){
    
            weather="winter"
            console.log(weather)
            }
            if(timer== 30){
    
                weather="summer"
                console.log(weather)
                }
                if(timer== 40){
    
                    weather="fall"
                    console.log(weather)
                    }
                    
        
                  
    document.getElementById('empty').innerText = "Empty Cells: " + emptyItems
    document.getElementById('grass').innerText = "Grass Cells: " + grassItems
    document.getElementById('grassEater').innerText = "GrassEater Cells: " + grassEaterItems
    
    frameRate(5)
    emptyCells=[];
    timer++
    for(var i=0;i<size2;i++){
        for(var j=0;j<size2;j++){
            if(matrix[j][i] instanceof Empty){
                fill('grey')
            }else if(matrix[j][i] instanceof Grass){
                fill('green')
                emptyCells.push(matrix[j][i].chooseCells())
                emptyCells = emptyCells.filter(e => e != null); // Removes unindentified values(happens when green cells don't have empty cells surrounding it)
            }else if(matrix[j][i] instanceof GrassEater){
                if(weather == 'summer'){
                    matrix[j][i] = new Empty(i,j)
                    fill('gray')
                } else {
                    fill('yellow')
                    matrix[j][i].move()
                }
                
            }
        else if(matrix[j][i] instanceof Flower){
           
            if(weather == 'winter'){
                matrix[j][i] = new Empty(i,j)
                fill('gray')
            } else {
                fill('red')
            matrix[j][i].move()
            } 
        }
        else if(matrix[j][i] instanceof FlowerEater){
            if(weather == 'fall'){
                matrix[j][i] = new Empty(i,j)
                fill('gray')
            } else {
                fill('blue')
                matrix[j][i].move()
            }
        }
        else if(matrix[j][i] instanceof White){
           
            if(weather == 'spring'){
                matrix[j][i] = new Empty(i,j)
                fill('gray')
            } else {
                fill('white')
            matrix[j][i].move()
            } 
        }
        
  
            rect(j*side,i*side,side,side)
        }
    }
    if (timer % 3 == 0){
        for(var i in emptyCells){
            var x3 = emptyCells[i][0]
            var y3 = emptyCells[i][1]
            matrix[y3][x3]=new Grass(x3,y3);
        }
    }    
    
    document.getElementById('empty').innerText = "Empty Cells: " + emptyItems
    document.getElementById('grass').innerText = "Grass Cells: " + grassItems
    document.getElementById('grassEater').innerText = "GrassEater Cells: " + grassEaterItems
    
    document.getElementById('timer').innerText = "Timer: "+ timer
    
}




class Item{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],     
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],     
            [this.x + 1, this.y + 1]  
        ];
    }
}


class Grass extends Item {
    chooseCells(){
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] instanceof Empty) {
                    found.push(this.directions[i]);
                }
            }  
        }
        var target = random(found);
        return target;
    }
} 

    

class GrassEater  extends Item{
    constructor(x,y,energy){
       super(x,y)
        this.energy = energy;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCells(){
        var foundGrassEater = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] instanceof Grass) {
                    foundGrassEater.push(this.directions[i]);
                    this.energy = 15;
                }   
            }
        }
        if (foundGrassEater.length == 0) {
            for (var i in this.directions) {
                var x = this.directions[i][0];
                var y = this.directions[i][1];
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                    if (matrix[y][x] instanceof Empty) {
                        foundGrassEater.push(this.directions[i]);
                    }
                    
                }  
            }
            this.energy--
        }
        if (foundGrassEater.length == 0) {
            for (var i in this.directions) {
                var x = this.directions[i][0];
                var y = this.directions[i][1];
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                    if (matrix[y][x] instanceof GrassEater) {
                        foundGrassEater.push(this.directions[i]);
                    }
                    
                }  
            }
            this.energy--
        }
        var target = random(foundGrassEater);
        return target;
    }
    move(){
        var targetCell = this.chooseCells()
        var x = targetCell[0]
        var y = targetCell[1]
        var targetCellClone = this.chooseCells()
        var xClone = targetCellClone[0]
        var yClone = targetCellClone[1]
        matrix[this.y][this.x] = new Empty(this.x,this.y)
        if(this.energy > 0){
            matrix[y][x] = new GrassEater(x,y,this.energy)
            if(Math.random()<0.05){  
                matrix[yClone][xClone] = new GrassEater(xClone,yClone,this.energy)
            }
        }
    }
}

class Empty {
    constructor(x,y){
        this.x = x
        this.y = y
    }
}


class Flower  extends Item{
    constructor(x,y,energy){
       super(x,y)
        this.energy = energy;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCells(){
        var foundGrassEater = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] instanceof Grass) {
                    foundGrassEater.push(this.directions[i]);
                    this.energy = 15;
                }   
            }
        }
        if (foundGrassEater.length == 0) {
            for (var i in this.directions) {
                var x = this.directions[i][0];
                var y = this.directions[i][1];
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                    if (matrix[y][x] instanceof Empty) {
                        foundGrassEater.push(this.directions[i]);
                    }
                    
                }  
            }
            this.energy--
        }
        if (foundGrassEater.length == 0) {
            for (var i in this.directions) {
                var x = this.directions[i][0];
                var y = this.directions[i][0];
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                    if (matrix[y][x] instanceof GrassEater) {
                        foundGrassEater.push(this.directions[i]);
                    }
                    
                }  
            }
            this.energy--
        }
        var target = random(foundGrassEater);
        return target;
    }
    move(){
        var targetCell = this.chooseCells()
        var x = targetCell[1]
        var y = targetCell[0]
        var targetCellClone = this.chooseCells()
        var xClone = targetCellClone[0]
        var yClone = targetCellClone[1]
        matrix[this.y][this.x] = new Empty(this.x,this.y)
        if(this.energy > 0){
            matrix[y][x] = new Flower(x,y,this.energy)
            if(Math.random()<0.05){  
                matrix[yClone][xClone] = new Flower(xClone,yClone,this.energy)
            }
        }
    }
}


class FlowerEater  extends Item{
    constructor(x,y,energy){
       super(x,y)
        this.energy = energy;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCells(){
        var foundFlower = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] instanceof Grass) {
                    foundFlower.push(this.directions[i]);
                    this.energy = 15;
                }   
            }
        }
        if (foundFlower.length == 0) {
            for (var i in this.directions) {
                var x = this.directions[i][0];
                var y = this.directions[i][1];
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                    if (matrix[y][x] instanceof Empty) {
                        foundFlower.push(this.directions[i]);
                    }
                    
                }  
            }
            this.energy--
        }
        if (foundFlower.length == 0) {
            for (var i in this.directions) {
                var x = this.directions[i][0];
                var y = this.directions[i][0];
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                    if (matrix[y][x] instanceof Flowerr) {
                        foundFlower.push(this.directions[i]);
                    }
                    
                }  
            }
            this.energy--
        }
        var target = random(foundFlower);
        return target;
    }
    move(){
        var targetCell = this.chooseCells()
        var x = targetCell[1]
        var y = targetCell[0]
        var targetCellClone = this.chooseCells()
        var xClone = targetCellClone[0]
        var yClone = targetCellClone[1]
        matrix[this.y][this.x] = new Empty(this.x,this.y)
        if(this.energy > 0){
            matrix[y][x] = new FlowerEater(x,y,this.energy)
            if(Math.random()<0.05){  
                matrix[yClone][xClone] = new FlowerEater(xClone,yClone,this.energy)
            }
        }
    }
}



class White  extends Item{
    constructor(x,y,energy){
       super(x,y)
        this.energy = energy;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCells(){
        var foundGrass = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] instanceof Grass) {
                    foundGrass.push(this.directions[i]);
                    this.energy = 15;
                }   
            }
        }
        if (foundGrass.length == 0) {
            for (var i in this.directions) {
                var x = this.directions[i][0];
                var y = this.directions[i][1];
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                    if (matrix[y][x] instanceof Empty) {
                        foundGrass.push(this.directions[i]);
                    }
                    
                }  
            }
            this.energy--
        }
        if (foundGrass.length == 0) {
            for (var i in this.directions) {
                var x = this.directions[i][0];
                var y = this.directions[i][1];
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                    if (matrix[y][x] instanceof GrassEater) {
                        foundGrass.push(this.directions[i]);
                    }
                    
                }  
            }
            this.energy--
        }
        var target = random(foundGrass);
        return target;
    }
    move(){
        var targetCell = this.chooseCells()
        var x = targetCell[0]
        var y = targetCell[1]
        var targetCellClone = this.chooseCells()
        var xClone = targetCellClone[0]
        var yClone = targetCellClone[1]
        matrix[this.y][this.x] = new Empty(this.x,this.y)
        if(this.energy > 0){
            matrix[y][x] = new White(x,y,this.energy)
            if(Math.random()<0.05){  
                matrix[yClone][xClone] = new White(xClone,yClone,this.energy)
            }
        }
    }
}



