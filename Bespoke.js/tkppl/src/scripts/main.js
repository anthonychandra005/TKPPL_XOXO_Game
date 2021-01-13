// Require Node modules in the browser thanks to Browserify: http://browserify.org
var bespoke = require('bespoke');
var classes = require('bespoke-classes');
var nav = require('bespoke-nav');
var scale = require('bespoke-scale');
var bullets = require('bespoke-bullets');
var hash = require('bespoke-hash');
var prism = require('bespoke-prism');
var multimedia = require('bespoke-multimedia');
var extern = require('bespoke-extern');

//Custom Javascript for my game
var board
var round
var count
var tie
var end
var winner
var win_lines = Array.from(Array(5).keys)
const player1 = "O"
const player2 = "X"

var myboard = document.getElementById("board")
generateBoard()

var board_piece = document.querySelectorAll(".board_piece")
var oturn = document.getElementById("oturn")
var xturn = document.getElementById("xturn")

startGame()

function generateBoard(){
    var mytable = document.createElement("table")
    myboard.appendChild(mytable)

    var count_id = 1

    for(var i=0; i<20; i++){
        var newTr = document.createElement("tr")
        mytable.appendChild(newTr)

        for(var j=0; j<20; j++){
            var newTd = document.createElement("td")
            newTd.id = count_id
            newTd.className = "board_piece"
            newTr.appendChild(newTd)
            count_id++
        }
    }    
}

function startGame(){
    console.log("game start")
    winner = ""
    round = -1
    end = false
    tie = false
    board = Array.from(Array(400).keys)
    for(var i = 0; i < board_piece.length; i++){
        board_piece[i].innerHTML = ""
        board_piece[i].style.backgroundColor = "black"
        board_piece[i].addEventListener('click', get_pos, false)
    }
}

function get_pos(pos){
    if(board[pos.target.id - 1] == undefined){
        piece_clicked(pos.target.id, round++)
    }
}

function piece_clicked(posID, current_round){
    var player = ""
    if(round % 2 == 0) player = player1
    else player = player2
    board[posID - 1] = player

    
    //Player 1 = font color : Lavender magenta #ee82ee rgb(238, 130, 238)
    //Player 2 = font color : daffodil #ffff31 rgb(255, 255, 49)
    if(player == "X") document.getElementById(posID).style.color = "#ffff31"
    else document.getElementById(posID).style.color = "#ee82ee"
    document.getElementById(posID).innerHTML = player

    if(current_round%2==0) {
        oturn.style.visibility = "visible"
        xturn.style.visibility = "hidden"
    }
    else {
        oturn.style.visibility = "hidden"
        xturn.style.visibility = "visible"
    }

    var end = checkWin(posID - 1, current_round, player)
    if(end) gameover()
    if(checkTie(round)){
        tie = true
        gameover()
    }
}

function gameover(){
    //game end / tombol di nonaktifkan
    for(var i = 0; i<board_piece.length; i++){
        board_piece[i].removeEventListener('click', get_pos, false)
    }

    //untuk kiri/kanan siapa yang win
    if(round%2==0) {
        oturn.style.visibility = "visible"
        oturn.innerHTML = "YOU WIN"
        xturn.style.visibility = "hidden"
    }
    else{
        xturn.style.visibility = "visible"
        xturn.innerHTML = "YOU WIN"
        oturn.style.visibility = "hidden"
    } 
    
    if(winner != "") {
        //tandai piece yang straight 5 (WIN)
        for(var i=0; i<5; i++){
            board_piece[win_lines[i]].style.backgroundColor = "royalblue"
        }

        player_win.innerHTML = winner + " WIN"
    }
    else{
        if(tie) {
            player_win.innerHTML = "TIE"

            xturn.style.visibility = "visible"
            xturn.innerHTML = "TIE"
            oturn.style.visibility = "visible"
            oturn.innerHTML = "TIE"
        }
        else if(round%2==0) player_win.innerHTML = "PLAYER 1" + " WIN"
        else player_win.innerHTML = "PLAYER 2" + " WIN"
    }

}

function checkTie(current_round){
    if(current_round>=399) return true
    else return false
}

function checkWin(current_pos, current_round, player){
    //console.log(current_round)
    //console.log(current_pos)
    
    //pengecekan kemungkinan game dapat berakhir dimulai dari round 9
    if(current_round > 6){
        var indexVertical = current_pos - 80
        var indexHorizontal = current_pos - 4
        var indexDiagonalLeft = current_pos - 84
        var indexDiagonalRight = current_pos - 76
        
        //Checking Vertically
        var win = 0
        for(var i = 0; i < 9; i++){
            //console.log(indexVertical)
            if(board[indexVertical] == player){
                win_lines[win] = indexVertical
                win++
                if(win >= 5) break
            }
            else{
                win = 0
            }
            indexVertical+= 20
            //console.log(board[indexVertical] + "  " + player + "  " + win)
        }

        if(win == 5) {
            //alert("CONGRATS, " +  (player == "X" ? "Player 2" : "Player 1")   + " WIN")
            winner = (player == "X" ? "Player 2" : "Player 1")
            return true
        }

        //Checking Horizontally
        win = 0
        for(var i = 0; i < 9; i++){
            if(indexHorizontal%20 == 0){ //biar ga nembus, array[19] pisah dengan array[20]
                win = 0
                win_lines[win] = indexHorizontal
                win++
            }
            else if(board[indexHorizontal] == player){
                win_lines[win] = indexHorizontal
                win++
                if(win >= 5) break
            }
            else{
                win = 0
            }
            indexHorizontal++
            //console.log(board[indexHorizontal] + "  " + player + "  " + win)
        }

        if(win == 5) {
            //alert("CONGRATS, " +  (player == "X" ? "Player 2" : "Player 1")   + " WIN")
            winner = (player == "X" ? "Player 2" : "Player 1")
            return true
        }

        // Checking Diagonal From Left
        win = 0
        for(var i = 0; i < 9; i++){
            if(board[indexDiagonalLeft] == player){
                win_lines[win] = indexDiagonalLeft
                win++
                if(win >= 5) break
            }
            else{
                win = 0
            }
            indexDiagonalLeft+=21
            //console.log(board[indexHorizontal] + "  " + player + "  " + win)
        }

        if(win == 5) {
            //alert("CONGRATS, " +  (player == "X" ? "Player 2" : "Player 1")   + " WIN")
            winner = (player == "X" ? "Player 2" : "Player 1")
            return true
        }

        // Checking Diagonal From Right
        win = 0
        for(var i = 0; i < 9; i++){
            if(board[indexDiagonalRight] == player){
                win_lines[win] = indexDiagonalRight
                win++
                if(win >= 5) break
            }
            else{
                win = 0
            }
            indexDiagonalRight+=19
            //console.log(board[indexHorizontal] + "  " + player + "  " + win)
        }

        if(win == 5) {
            //alert("CONGRATS, " +  (player == "X" ? "Player 2" : "Player 1")   + " WIN")
            winner = (player == "X" ? "Player 2" : "Player 1")
            return true
        }
    }
    
    return false
}


// Bespoke.js
bespoke.from({ parent: 'article.deck', slides: 'section' }, [
  classes(),
  nav(),
  scale(),
  bullets('.build, .build-items > *:not(.build-items)'),
  hash(),
  prism(),
  multimedia(),
  extern(bespoke)
]);