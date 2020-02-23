

class User {
    constructor(color, name) {
        this.color = color;
        this.name = name;
        this.score = 0;
    }
    drawPlayer(score, dimension){
        
    }
}
class Dice {
    constructor() {
        this.dice_value = 0;
    }
    rollDice() {
        // function that genereates the random number between 1 and 6
        this.dice_value = Math.floor(Math.random() * 6) + 1
        document.getElementById('diceValue').innerHTML = `${this.dice_value}`;
    }
    get value() {
        return this.dice_value;
    }
}
class Board {
    constructor() {
        // create an object of the board that consist of the co-ordinates of the 
        this.board_object = [];
        let num = 100;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let obj = {};
                obj.value = num;
                if ((i + j) % 2 === 0) {
                    obj.color = "#ffffff";
                }
                else {
                    obj.color = "#fff2cc"
                }
                this.board_object.push(obj)
                if (i % 2 === 0 && j < 9) {
                    num = num - 1;
                }
                if (i % 2 !== 0 && j < 9) {
                    num = num + 1;
                }
            }
            num = num - 10;
        }
    }
    get snake_ladder_board() {
        return this.board_object;
    }
    set robot(obj) {
        this.board_object.filter((elem) => {
            return elem.value === obj.from;
        })[0].robot = {
                type: obj.type,
                to: obj.to,
                from: obj.from
            }

    }
    set robots(arr) {
        arr.forEach((elem) => {
            this.robot = elem
        })
    }
    get_index(value){
        let index=-1;
        this.board_object.forEach((elem,i)=>{
            if(elem.value=== value){
                index =  i;
            }
        })
        return index;
    }
}
var dice = new Dice();
// dice.rollDice();
console.log(dice.value);
var board = new Board();
board.robots = [ {
    "type": "snake",
    "to": 87,
    "from": 97
},
{
    "type": "snake",
    "to": 92,
    "from": 25
},
{
    "type": "snake",
    "to": 45,
    "from": 83
},
{
    "type": "snake",
    "to": 48,
    "from": 90
},
{
    "type": "snake",
    "to": 16,
    "from": 54
},
{
    "type": "snake",
    "to": 6,
    "from": 51
},
{
    "type": "snake",
    "to": 10,
    "from": 26
},{
    "type": "ladder",
    "to": 91,
    "from": 88
},{
    "type": "ladder",
    "to": 86,
    "from": 73
},{
    "type": "ladder",
    "to": 76,
    "from": 57
},{
    "type": "ladder",
    "to": 74,
    "from": 17
},{
    "type": "ladder",
    "to": 67,
    "from": 49
},{
    "type": "ladder",
    "to": 34,
    "from": 15
},{
    "type": "ladder",
    "to": 23,
    "from": 11
},{
    "type": "ladder",
    "to": 94,
    "from": 4
}
]

function makeBoard(id, dimension) {
    var canv = document.getElementById(`${id}`)
    canv.setAttribute("height", dimension)
    canv.setAttribute("width", dimension)
    canvas = canv.getContext('2d');
    // canvas.translate(0, dimension); canvas.scale(1, -1);
    // make the vertical grid lines
    let scale = dimension /10;
    for (let i = 0; i <= dimension; i += scale) {
        canvas.moveTo(i, 0);
        canvas.lineTo(i, dimension);
    }
    // make the horizontal lines
    for (let i = 0; i <= dimension; i += scale) {
        canvas.moveTo(0, i);
        canvas.lineTo(dimension, i);
    }
    canvas.stroke();
    return canvas;
}

var canvas = makeBoard("board", 760);

// fill the rectangle with the color
function fillColor(dimension){
    let scale = dimension / 10;
    let counter = 0;
    for(let i = 0;i<dimension;i=i+scale){
        for(let j=0;j<dimension;j=j+scale){
            canvas.fillStyle = board.snake_ladder_board[counter].color;
            canvas.fillRect(i,j,scale,scale);
            canvas.stroke();
            counter++;
        }
    }
    return canvas;
}
function fillText(dimension){
    canvas.font = "30px Arial";
    canvas.fillStyle = "#000"
    let scale = dimension / 10;
    let counter = 0;
    for(let i = 0;i<dimension;i=i+scale){
        let posY = Math.floor((i+(scale/2)));
        for(let j=0;j<dimension;j=j+scale){
            let posX = Math.floor((j+(scale/6)));
            canvas.fillText(board.snake_ladder_board[counter].value, posX,posY);
            counter++;
        }
    }
    canvas.stroke()
    return canvas;
}
function drawRobot(dimension){
    let scale = dimension / 10;
    for(let i=0;i<100;i++){
        if(board.snake_ladder_board[i].robot){
            // get the xy cordinates
            let index_to,index_from;
            index_to = board.get_index(board.snake_ladder_board[i].robot.to);
            index_from = board.get_index(board.snake_ladder_board[i].robot.from);
            let x1,y1,x2,y2;
            x1 = ((index_from % 10)* scale + scale/5);
            if((index_from / 10)* scale - scale/5 <= 0){
                y1 = ((index_from / 10)* scale + scale/5);
            }
            else{
                y1 = ((index_from / 10)* scale - scale/5);
            }
            x2 = ((index_to % 10)* scale + scale/5);
            if((index_to / 10)* scale - scale/5 <= 0){
                y2 = ((index_to / 10)* scale + scale/5);
            }
            else{
                y2 = ((index_to / 10)* scale - scale/5);
            }
            // draw a line having the end points (x1,y1) and (x2,y2)
            canvas.beginPath();
            canvas.moveTo(x1,y1);
            canvas.lineTo(x2,y2);
            canvas.lineWidth=  10;
            canvas.strokeStyle = board.snake_ladder_board[i].robot.type === "ladder"? "green": "red";
            canvas.globalAlpha = .5;
            canvas.stroke();
        }
        
    }

    return canvas

    // if snake then draw a red arrow 
    // if ladder then draw a green arrow
}
canvas = fillColor(760);
canvas = fillText(760);
drawRobot(760);

var user1 = new User("green","ayush");
var user2 = new User("red", "anushka");
var user3 = new User("yellow", "mom");
var user4 = new User("blue", "dad");
canvas = user1.drawPlayer(45,760);
canvas = user2.drawPlayer(60,760);
canvas = user3.drawPlayer(99,760);
canvas = user4.drawPlayer(100,760);
