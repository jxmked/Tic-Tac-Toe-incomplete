'use strict'

const Board = (function() {
    let boardSize;
    let table = document.getElementById("main-board");
    let className = "block";
     
    //Constructor 
    return function(size) {
        boardSize = size;
        return {
            update: (moved) => {
                //Our board is always needed to remove unnecessary moves(Edited in HTML) 
                let elem = document.getElementsByClassName(className);
                for (let i = 0; i < (boardSize * boardSize); i++) {
                    let title = ("undefined" == typeof moved[i]) ? "" : moved[i];
                    elem[i].setAttribute("title", title);
                }
                return this;
            },
            clear: () => {
                for (let i = 0; i < (boardSize * boardSize); i++) {
                    document.getElementsByClassName(className)[i].removeAttribute("title");
                }
                return this;
            },
            create: () => {
                //Generate Board
                for (let i = 0; i < boardSize; i++) {
                    let tr = document.createElement("tr");
                    for (let x = 0; x < boardSize; x++) {
                        let td = document.createElement("td");
                        let block = document.createElement("div");
                        td.setAttribute("style", "width:" + 100 / boardSize + "%;");
                        block.setAttribute("class", className);
                        td.appendChild(block);
                        tr.appendChild(td);
                    }
                    table.appendChild(tr);
                }
                return this;
            }
        };
    };
}());


const Move = (function() {
    let moved = {}; //Moves with property
    let moves = []; //Available Moves
    
    //Constructor
    return function(s, d) {
        if (s && d) {
            moved = d;
            moves = s;
        }
        
        //Check if the requested index/move is available
        function available(index) {
            return ((moves.indexOf(index) != -1) && ("undefined" == typeof moved[index]));
        }
        
        //Remove the requested index/move from available moves
        function remove(turn) {
            moves.splice(moves.indexOf(turn), 1);
            return this;
        }
        
        //Save to moves with property the given move and player's index
        function save(player, index) {
            moved[parseInt(index)] = player;
            return this;
        }
        return {
            create: (size) => {
                
                //Create available moves
                for (let index = 0; index < size; index++) {
                    moves.push(index);
                }
                return this;
            },
            make: (player, index) => {
                //Make a Move
                if (available(index)) {
                    remove(index);
                    save(player, index);
                    return true;
                }
                return false;
            },
            reset: () => {
                moves = [];
                moved = {};
                return this;
            },
            getMoved: () => {
                return moved;
            },
            getMoves: () => {
                return moves;
            }
        };
    };
}());


const GameObject = (function() {
    let player = "user"; //Challenger's index
    let aiName = "enemy"; //AI index
    let boardSize;
    let strike;
    
    //Constructor
    return (function() {
        
        return function(size, straight) {
            boardSize = size;
            strike = straight;
            
            //Create Board
            let board = Board(boardSize);
            board.create();
            
            //Prepare Moves
            let move = Move()
            move.create((boardSize * boardSize));
            
            return {
                board: board,
                move: move,
                reset: () => {
                    move.reset();
                    move.create((boardSize * boardSize));
                    board.clear();
                },
                turn: (player, pos) => {
                    if (move.make(player, pos)) {
                        board.update(move.getMoved());
                        return true;
                    }
                }
            }
        };
    }());
}());