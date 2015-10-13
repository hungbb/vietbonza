var test1 = [
    {
        "top": -1, "left": -1, "bottom": -1, "right": 1, "value": "H","idx":0, "initX":100,"initY":100
    }, {
        "top": -1, "left": -1, "bottom": -1, "right": -1, "value": "E","idx":1
    },{
        "top": -1, "left": -1, "bottom": -1, "right": 3, "value": "L","idx":2, "initX":50,"initY":200
    }, {
        "top": -1, "left": -1, "bottom": -1, "right": -1, "value": "L","idx":3
    },{
        "top": -1, "left": -1, "bottom": -1, "right": -1, "value": "O","idx":4, "initX":200,"initY":200
    }, {
        "top": -1, "left": -1, "bottom": 6, "right": -1, "value": "O","idx":5, "initX":250,"initY":250
    },{
        "top": -1, "left": -1, "bottom":7, "right": -1, "value": "N","idx":6
    }, {
        "top": -1, "left": -1, "bottom": -1, "right": -1, "value": "G","idx":7
    },
]
var answer=[
    {"isSolved":false,"value":[0,1,2,3,4]},
       {"isSolved":false,"value": [2,5,6,7]}
]


var level1={
    obj:[
        {
            "top": -1, "left": -1, "bottom": -1, "right": 1, "value": "N","idx":0, "initX":50,"initY":50
        }, {
            "top": -1, "left": -1, "bottom": -1, "right": -1, "value": "A","idx":1
        },

        {
            "top": 4, "left": -1, "bottom": -1, "right": 3, "value": "I","idx":2, "initX":100,"initY":500
        }, {
            "top": -1, "left": -1, "bottom": -1, "right": -1, "value": "X","idx":3
        },{
            "top": -1, "left": -1, "bottom": -1, "right": -1, "value": "L","idx":4
        },

        {
            "top": -1, "left": -1, "bottom": 6, "right": -1, "value": "O","idx":5, "initX":150,"initY":250
        },{
            "top": -1, "left": -1, "bottom":-1, "right": 7, "value": "N","idx":6
        }
        ,{"top": -1, "left": -1, "bottom": 10, "right": -1, "value": "A","idx":7 }
        


        ,{"top": -1, "left": -1, "bottom": 12, "right": 9, "value": "L","idx":8 , "initX":200,"initY":100 }
        ,{"top": -1, "left": -1, "bottom": -1, "right": -1, "value": "I","idx":9 }      
        ,{"top": -1, "left": -1, "bottom": -1, "right": -1, "value": "X","idx":10 }
        ,{"top": -1, "left": -1, "bottom": -1, "right": -1, "value": "E","idx":11 , "initX":50,"initY":350}
        ,{"top": -1, "left": -1, "bottom": -1, "right": -1, "value": "I","idx":12 }

        ,{"top": -1, "left": -1, "bottom": 14, "right": -1, "value": "C","idx":13, "initX":300,"initY":250 }
        ,{"top": -1, "left": -1, "bottom": -1, "right": -1, "value": "H","idx":14 }

        
    ],
    answer:[
        {"isSolved":false,"value":[0,1,2,3],"text":"NAIX"}
        ,{"isSolved":false,"value": [4,2,5,6],"text":"LION"}
        ,{"isSolved":false,"value": [8,9,6,7],"text":"LINA"}
        ,{"isSolved":false,"value": [7,10,11],"text":"AXE"}
        ,{"isSolved":false,"value": [8,12,13,14],"text":"AXE"}
    ]

}