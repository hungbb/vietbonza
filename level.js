var test = {
    "parts": [
        [{
            "w": "H",
            "x": 0,
            "y": 1
        }, {
            "w": "E",
            "x": 0,
            "y": 2
        }],
        [{
            "w": "L",
            "x": 0,
            "y": 4
        }, {
            "w": "O",
            "x": 0,
            "y": 5
        }],
        [{
            "w": "L", "x": 0, "y": 3

        }]
    ],
    "words": {}
}

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
    [0,1,2,3,4],[2,5,6,7]
]
