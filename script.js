const tiles = document.querySelectorAll('.tile')
const LIGHTER_COLOR = "#88A2B9"
const DARKER_COLOR = "#648095"
const COLOR_PALETTE = [DARKER_COLOR, LIGHTER_COLOR]

var queenChoice = "WHITE"
const choiceTable = document.querySelectorAll('.choiceTable td')

window.onload = function(){
    resetChessBoard()
}

function resetChessBoard(){
    let iterator = 0
    tiles.forEach((tile, i) => {
        if(i % 8 == 0) iterator = (iterator + 1) % 2
        tile.style.background = COLOR_PALETTE[(i + iterator) % 2]
        tile.innerHTML = ""
    });
}

tiles.forEach((tile, i) => {
    tile.addEventListener('click', e => {
    })
});

choiceTable.forEach(choice => {
    choice.addEventListener('click', e => {
        queenChoice = e.target.innerHTML
    })
})