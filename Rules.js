'use strict'

const Rules = (function() {
    let moves;
    let moved;
    let strike; //Straight win
    let className = "block"; //Class Attribute name
    let hTitle = "highlighted";
    
    
    //Straight patterns
    const patterns = ["012", "345", "678",
        "036", "147", "258",
        "048", "246"
    ];
    
    //Highlight the straight(s)
    const Roll = function(arr) {
        let blocks = document.getElementsByClassName(className);
        
        arr.forEach((val, i) => {
           val.forEach((pos, i) => {
                    blocks[pos].setAttribute("title", hTitle);
                });
            });
            return this;
        }
    
    //Check for straights
    const Check = function(player, index) {
        let arr = [];
            
        patterns.forEach((pattern, i) => {
                
            if (pattern.indexOf(index) == -1 && index) return [];
                
            let res = pattern.split("").filter((pos, i) => {
                try {
                    let title = ""
                    
                    if("undefined" != typeof moved[parseInt(pos)]){
                        title = moved[parseInt(pos)]
                    }
                        
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