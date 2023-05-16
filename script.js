const tiles = document.querySelectorAll('.tile')
const LIGHTER_COLOR = "#88A2B9"
const DARKER_COLOR = "#648095"
const RED_COLOR = "red"
const WHITE_COLOR = "white"
const BLACK_COLOR = "black"
const COLOR_PALETTE = [DARKER_COLOR, LIGHTER_COLOR]

var queenChoice = "WHITE"
var piecesPlaced = [false, false, false]
var piecesIndexes = [-1, -1, -1]
const choiceTable = document.querySelectorAll('.choiceTable td')
const menuDiv = document.querySelector('.menu')

window.onload = function(){
    resetChessBoard()
}

function resetChessBoard(){
    let iterator = 0
    tiles.forEach((tile, i) => {
        if(i % 8 == 0) iterator = (iterator + 1) % 2
        tile.style.background = COLOR_PALETTE[(i + iterator) % 2]
    });
}

tiles.forEach((tile, i) => {
    tile.addEventListener('click', e => {
        if(!piecesPlaced[0] && tile.innerHTML == ""){
            //piecesPlaced[0] = true
            piecesIndexes[0] = i
            tile.innerHTML = "K"
            tile.style.color = queenChoice
            menuDiv.style.display = "none"
            blockWrongTiles(i)
        }
        else if(piecesPlaced[0] && !piecesPlaced[1] && tile.innerHTML == ""){
            piecesPlaced[1] = true
            piecesIndexes[1] = i
            tile.innerHTML = "K"
            if(queenChoice == "WHITE"){
                tile.style.color = BLACK_COLOR
            }
            else if(queenChoice == "BLACK"){
                tile.style.color = WHITE_COLOR
            }
        }
        else if(piecesPlaced[0] && piecesPlaced[1] && !piecesPlaced[2] && tile.innerHTML == ""){
            piecesPlaced[2] = true
            piecesIndexes[2] = i
            tile.innerHTML = "H"
            tile.style.color = queenChoice
        }
    })
});

choiceTable.forEach(choice => {
    choice.addEventListener('click', e => {
        queenChoice = e.target.innerHTML
    })
})

function blockWrongTiles(i){
    tileCoords2D = translate1Dto2D(i)
}

function translate1Dto2D(x){
    return [x%8, Math.floor(x/8)]
}

function translate2Dto1D(x, y){
    return y*8 + x
}