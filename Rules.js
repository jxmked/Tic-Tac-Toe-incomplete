'use strict'

const Rules = (function() {
    let moves;
    let moved;
    let strike; //Straight win
    let className = "block"; //Class Attribute name
    let hTitle = "highlighted"; //Block's title if straight
    
    
    //Straight patterns
    const patterns = ["012", "345", "678",
        "036", "147", "258",
        "048", "246"
    ];
    
    //Highlight the straight(s)
    const Roll = (function() {
        function run(arr) {
            let blocks = document.getElementsByClassName(className);
            arr.forEach((val, i) => {
                val.forEach((pos, i) => {
                    blocks[pos].setAttribute("title", hTitle);
                });
            });
            return this;
        }
        return run;
    }());
    
    //Check for straights
    const Check = (function() {
        function run(player, index) {
            let arr = [];
            
            patterns.forEach((pattern, i) => {
                
                if (pattern.indexOf(index) == -1 && index) return [];
                
                let res = pattern.split("").filter((pos, i) => {
                    try {
                        let title = ("undefined" != typeof moved[parseInt(pos)]) ? moved[parseInt(pos)] : "";
                        
                        return (player == title);
                    }
                    catch (e) {
                        return false;
                    }
                });
                
                if (res.length == strike) {
                    arr.push(res);
                }
            });
            
            return arr;
        }
        return run;
    }());
    
    
    //Constructor
    return function(md, straight) {
        moved = md;
        strike = straight;
        return {
            check: Check,
            highlight: Roll
        };
    };
    
}());