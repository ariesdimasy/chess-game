import readline from "readline-sync";
import boxen from "boxen";
class Log {
    logs = []
    addLog(board, piece, from, to ){

        let toConvert = convertCoordinate(to)
        let take = ""
        if(board[toConvert[0]][toConvert[1]] != "[ ]" && board[toConvert[0]][toConvert[1]] != "( )"){
            take = board[toConvert[0]][toConvert[1]]
            if( board[toConvert[0]][toConvert[1]] == piece){
                take = ""
            }
        }

        this.logs.push({
            piece, from, to, take
        })
    }
}

class Piece { 
    name = ""
    code=""
    direction = []
    max
    color=""
    coor=""

    constructor(name, code, color, coor){
        this.name = name
        this.code = code
        this.color = color
        this.coor = coor
    }

    move(){}
    validation(){}
}

class Queen extends Piece {

    direction=["forward","backward","left","right"]
    max=false
    
    constructor(color, coor){
        super("queen", "Q"+color[0], color, coor)
    }

    validation(coor){

    }
}

class Pawn extends Piece {
    name="pawn"
    direction=["forward"]
    max=1
    
    constructor(color, coor){
        super("pawn", "P"+color[0], color, coor)
    }

    validation(coor){

    }
}

class King extends Piece {
    name="king"
    direction=["forward","backward","left","right"]
    max=1

    constructor(color, coor){
        super("king", "K"+color[0], color, coor)
    }

    validation(coor){

    }
}

function board(){
    let board = []
  
    for(let i = 1; i <= 8; i++){
        let row = []
        for(let j = 1; j <= 8; j++){
            if(i % 2 == 0){
                if(j % 2 == 0){
                    row.push("( )")
                } else {
                    row.push("[ ]")
                }
            } else {
                if(j % 2 != 0){
                    row.push("( )")
                } else {
                    row.push("[ ]")
                }
            }
        }
        board.push(row)
    }
    return board
}

function convertCoordinate(ccor){
    let alpha = "ABCDEFGH"
    //console.log("CCOR => ", ccor)
    let x = ccor[0]
    let y = Number(ccor[1]) 
    if(alpha.split("").findIndex((item) => item == x) == -1){
        console.log(errorBox("invalid Coordinate"))
        return false
    }
    if(y < 1 && y > 8){
        console.log(errorBox("invalid Coordinate"))
        return false 
    }
   
    let findX = 8 - y
    let findY = alpha.split("").findIndex((item) => item == x)

    //console.log(ccor,findX, findY)
    return [findX, findY]
}

function errorBox(message){
    return boxen(message,{
        borderColor:'red',
        borderStyle:"single",
        padding:1
    })
}

function checkBoxColor(x,y){
    if(x % 2 == 0){
        if(y % 2 == 0){
            return "( )"
        } else {
            return "[ ]"
        }
    } else {
        if(y % 2 != 0){
            return "( )"
        } else {
            return "[ ]"
        }
    }
}

function move(board,logObj,from,to){
    //console.log("move()", from, to)
    let fromConvert = convertCoordinate(from)
    let toConvert = convertCoordinate(to)
  
    if(!fromConvert){
        console.log(errorBox("Invalid location From"))
        return false
    }
    if(!toConvert){
        console.log(errorBox("Invalid location To"))
        return false
    }

    //console.log("toConvert => ", to, toConvert)
    
    let temp = board[fromConvert[0]] ?  board[fromConvert[0]][fromConvert[1]] : undefined
    let toBoard = board[fromConvert[0]] ?  board[toConvert[0]][toConvert[1]] : undefined
 
    if(!toBoard){
        console.log(errorBox("Invalid location"))
        return false
    }
    if(temp == "[ ]" || temp == "( )" || !temp){
        console.log(errorBox("there is no Chessman in this location"))
        return false
    }

    logObj.addLog(board,temp,from,to)

    board[fromConvert[0]][fromConvert[1]] = checkBoxColor(fromConvert[0], fromConvert[1])
    board[toConvert[0]][toConvert[1]] = temp
    // turn = (turn == "w") ? 'b' : 'w'
}

function main(){
    let mainBoard = board()
    let log1 = new Log()
    let win = false
    let turn = "w" // w hite || b lack

    let whiteQueen = new Queen("white",convertCoordinate("A1")) 
    let whiteKing = new King("white",convertCoordinate("A2"))

    let blackKing = new King("black",convertCoordinate("B4"))
    let blackPawn = new Pawn("black",convertCoordinate("D4"))

    mainBoard[whiteKing.coor[0]][whiteKing.coor[1]] = whiteKing.code
    mainBoard[whiteQueen.coor[0]][whiteQueen.coor[1]] = whiteQueen.code
    mainBoard[blackKing.coor[0]][blackKing.coor[1]] = blackKing.code
    mainBoard[blackPawn.coor[0]][blackPawn.coor[1]] = blackPawn.code

    log1.addLog(mainBoard,"Kw","A3","A2")

    while(win == false){
        // console.clear()
        console.log("LOGS : ")
        console.table(log1.logs)
        console.log(" Last Board : ")
        console.table(mainBoard)
        // realBoard(mainBoard)
        console.log("turn : ", turn == "w" ? "white" : "black")
        let fromInput = readline.question("Init : ");
        let toInput = readline.question("Move to : ");
        move(mainBoard, log1, fromInput, toInput)
        console.log("-------------------------------------------------------------------------------------------------------------")
    }
}

main()