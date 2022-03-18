'use strict'

function setClickEvent(name, callback, index){
    index = (index) ? index : 0;
    var elem = document.querySelectorAll(name)[index]
    elem.addEventListener("click", function(){
        callback(elem, index);
    });
}

function click(attr, callback){
    var elem = document.querySelectorAll(attr);

    for(var index = 0; index < elem.length; ++index){
        setClickEvent(attr, function(e, i){
            callback(e, i);    
        }, index);
    }
}

function delay(ms, callback){
    var ival = setInterval(function(){
        callback();
        clearInterval(ival);
    }, ms);
}

function forEachIn(obj, callback){
    switch(obj.constructor){
        case Object:
            var i = 0;
            for(var index in obj){
                callback(obj[index], index, i);
                i++;
            }
            return true;
        
        case Array:
            for(var index = 0; index < obj.length; index++){
                callback(obj[index], index, index);
            }
            return true;
        
        default:
            throw Error("No available method");
    }
}

function random(obj, max){
    var rand = function(min, max){
        var res = Math.floor(Math.random() * max) + min;
        return (res > max) ? (res - min) : res;
    };
    
    if("number" == typeof obj){
        return rand(obj, max);
    }
    
    switch(obj.constructor){
        case Array:
            var res = rand(0, obj.length);
            return (max) ? obj[res] : res;

        case Object:
            var arr = [];
            
            forEachIn(obj, function(val, index){
                arr.push(index);
            });
            
            var res = rand(0, arr.length);
            return (max) ? obj[arr[res]] : arr[res];
    }
}

function clone(data){
    var res;
    if(data.constructor == Object){
        res = {};
        forEachIn(data, function(val, index) {
            res[index] = val;
        });
    }
    
    if(data.constructor == Array){
        res = data.map(function(val) {
            return val;
        });
    }
    return res;
}