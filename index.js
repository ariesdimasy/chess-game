import readline from "readline-sync";
import boxen from "boxen"

class Log {
    logs = []
    addLog(piece, from, to ){
        this.logs.push({
            piece, from, to
        })
    }
}

class Piece { 
    name = ""
    direction = []
}

class Queen extends Piece {
    
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
    let x = ccor[0]
    let y = Number(ccor[1]) 
    let alpha = "ABCDEFGH"
    let findX = 8 - y
    let findY = alpha.split("").findIndex((item) => item == x)
    //console.log(ccor,findX, findY)
    return [findX, findY]
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

function move(board,logObj,turn,from,to){
    let fromConvert = convertCoordinate(from)
    let toConvert = convertCoordinate(to)

    //console.log("toConvert => ", to, toConvert)

    let temp = board[fromConvert[0]][fromConvert[1]]

    board[fromConvert[0]][fromConvert[1]] = checkBoxColor(fromConvert[0], fromConvert[1])
    board[toConvert[0]][toConvert[1]] = temp

    logObj.addLog(temp,from,to)
    turn = (turn == "w") ? 'b' : 'w'
}

function main(){
    let mainBoard = board()
    let log1 = new Log()
    let win = false
    let turn = "w" // w hite || b lack

    let whiteQueen = convertCoordinate("A1")
    let whiteKing = convertCoordinate("A2")

    let blackKing = convertCoordinate("B4")

    mainBoard[whiteKing[0]][whiteKing[1]] = "Kw"
    mainBoard[whiteQueen[0]][whiteQueen[1]] = "Qw"
    mainBoard[blackKing[0]][blackKing[1]] = "Kb"

    log1.addLog("Kw","A3","A2")

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
        move(mainBoard, log1,turn, fromInput, toInput)
    }
}

main()