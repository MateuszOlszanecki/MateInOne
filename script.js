const tiles = document.querySelectorAll('.tile')
const LIGHTER_COLOR = "#88A2B9"
const DARKER_COLOR = "#648095"
const RED_COLOR = "red"
const WHITE_COLOR = "white"
const BLACK_COLOR = "black"
const COLOR_PALETTE = [DARKER_COLOR, LIGHTER_COLOR]

var queenChoice = null
var piecesPlaced = [false, false, false]
var piecesIndexes = [-1, -1, -1]
const choiceTable = document.querySelectorAll('.choiceTable td')
const menuDiv = document.querySelector('.menu')

window.onload = function(){
    paintBoardDefault()
}

function paintBoardDefault(){
    let iterator = 0
    tiles.forEach((tile, i) => {
        if(i % 8 == 0) iterator = (iterator + 1) % 2
        tile.style.background = COLOR_PALETTE[(i + iterator) % 2]
    });
}

tiles.forEach((tile, i) => {
    tile.addEventListener('click', e => {
        if(queenChoice === null){
            alert("Pick who has a Queen!")
            return
        }

        if(!piecesPlaced[0] && tile.style.background != RED_COLOR){
            piecesPlaced[0] = true
            piecesIndexes[0] = i
            tile.innerHTML = "K"
            tile.style.color = queenChoice
            menuDiv.style.display = "none"
            blockWrongTiles(i)
        }
        else if(piecesPlaced[0] && !piecesPlaced[1] && tile.style.background != RED_COLOR){
            piecesPlaced[1] = true
            piecesIndexes[1] = i
            tile.innerHTML = "K"
            if(queenChoice == "WHITE"){
                tile.style.color = BLACK_COLOR
            }
            else if(queenChoice == "BLACK"){
                tile.style.color = WHITE_COLOR
            }
            blockWrongTiles(i)
        }
        else if(piecesPlaced[0] && piecesPlaced[1] && !piecesPlaced[2] && tile.style.background != RED_COLOR){
            piecesPlaced[2] = true
            piecesIndexes[2] = i
            tile.innerHTML = "H"
            tile.style.color = queenChoice
            paintBoardDefault()
        }
    })
});

choiceTable.forEach(choice => {
    choice.addEventListener('click', e => {
        queenChoice = e.target.innerHTML
    })
})

function blockWrongTiles(index){
    tileCoords2D = translate1Dto2D(index)
    tiles[index].style.background = RED_COLOR

    if(inBounds(tileCoords2D[0] - 1)){
        tiles[translate2Dto1D(tileCoords2D[0] - 1, tileCoords2D[1])].style.background = RED_COLOR
    }
    if(inBounds(tileCoords2D[0] + 1)){
        tiles[translate2Dto1D(tileCoords2D[0] + 1, tileCoords2D[1])].style.background = RED_COLOR
    }
    if(inBounds(tileCoords2D[1] - 1)){
        tiles[translate2Dto1D(tileCoords2D[0], tileCoords2D[1] - 1)].style.background = RED_COLOR
    }
    if(inBounds(tileCoords2D[1] + 1)){
        tiles[translate2Dto1D(tileCoords2D[0], tileCoords2D[1] + 1)].style.background = RED_COLOR
    }

    if(inBounds(tileCoords2D[0] - 1) && inBounds(tileCoords2D[1] - 1)){
        tiles[translate2Dto1D(tileCoords2D[0] - 1, tileCoords2D[1] - 1)].style.background = RED_COLOR
    }
    if(inBounds(tileCoords2D[0] + 1) && inBounds(tileCoords2D[1] + 1)){
        tiles[translate2Dto1D(tileCoords2D[0] + 1, tileCoords2D[1] + 1)].style.background = RED_COLOR
    }
    if(inBounds(tileCoords2D[0] - 1) && inBounds(tileCoords2D[1] + 1)){
        tiles[translate2Dto1D(tileCoords2D[0] - 1, tileCoords2D[1] + 1)].style.background = RED_COLOR
    }
    if(inBounds(tileCoords2D[0] + 1) && inBounds(tileCoords2D[1] - 1)){
        tiles[translate2Dto1D(tileCoords2D[0] + 1, tileCoords2D[1] - 1)].style.background = RED_COLOR
    }

    if(piecesPlaced[0] && piecesPlaced[1]){
        for(let i = 0; i < 8; i++){
            tiles[translate2Dto1D((tileCoords2D[0] + i) % 8, tileCoords2D[1])].style.background = RED_COLOR
            tiles[translate2Dto1D(tileCoords2D[0], (tileCoords2D[1] + i) % 8)].style.background = RED_COLOR

            if(inBounds(tileCoords2D[0] - i) && inBounds(tileCoords2D[1] - i)){
                tiles[translate2Dto1D(tileCoords2D[0] - i, tileCoords2D[1] - i)].style.background = RED_COLOR
            }
            if(inBounds(tileCoords2D[0] + i) && inBounds(tileCoords2D[1] + i)){
                tiles[translate2Dto1D(tileCoords2D[0] + i, tileCoords2D[1] + i)].style.background = RED_COLOR
            }
            if(inBounds(tileCoords2D[0] - i) && inBounds(tileCoords2D[1] + i)){
                tiles[translate2Dto1D(tileCoords2D[0] - i, tileCoords2D[1] + i)].style.background = RED_COLOR
            }
            if(inBounds(tileCoords2D[0] + i) && inBounds(tileCoords2D[1] - i)){
                tiles[translate2Dto1D(tileCoords2D[0] + i, tileCoords2D[1] - i)].style.background = RED_COLOR
            }
        }
    }
}

function inBounds(x){
    return 0 <= x && x <= 7
}

function translate1Dto2D(x){
    return [x%8, Math.floor(x/8)]
}

function translate2Dto1D(x, y){
    return y*8 + x
}