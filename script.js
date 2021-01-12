var myboard = document.getElementById("board")
generateBoard()


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

