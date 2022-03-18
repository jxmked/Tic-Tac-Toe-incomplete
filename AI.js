'use strict'
let AI = (function() {
    let Name = "enemy"; //AI 
    let Player = "user"; //Challenger
    let strike; //Straight win
    
    function striker(player, moves, moved) {
        
        //Check each available moves for possible winning of the given player index
        return moves.filter((index) => {
            //Cloning before modifying objects.
            let cloned = clone(moved);
            
            //Turn
            cloned[index] = player;
            
            //Check For straights
            let ruled = new Rules(cloned, strike).check(player, index);
            return (ruled.length != 0);
        });
    }
    
    // 1 Dept. I can't go further. Hahaha
    const Run = (function() {
        return (moves, moved, straight) => {
            strike = straight;
            
            //If AI has possible win move
            let wins = striker(Name, moves, moved);
            
            if (wins.length != 0) return random(wins, true);
            
            //If User has Possible win move, block it
            let blocks = striker(Player, moves, moved);
            
            if (blocks.length != 0) return random(blocks, true);
            
            //Else just a random numbers
            return random(moves, true);
        }
    }());
    
    return Run;
}());