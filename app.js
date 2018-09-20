const HashMap = require('hashmap');

//Comapares the two hands
function compare(handA, handB){
    handAScore = score (handA);
    handBScore = score (handB);
    if (handAScore > handBScore){
        console.log('hand A wins');
    }
    else if (handBScore > handAScore){
        console.log('hand B wins');
    }
    else {
        console.log("tie")
    }
}

//calculates the score of a hand
function score(hand){
    var score = 0;
    var hands = hand.split(/[\s,]+/)
    var number = [];
    var suit = [];
    for(i = 0; i < hands.length; i++){
        var card = hands[i].split("");
        if(card[0] == 'J'){card[0] = 11;}
        else if(card[0] == 'Q'){card[0] = 12;}
        else if (card[0] == 'K'){card[0] = 13;}
        else if (card[0] == 'A'){card[0] = 14;}
        if (hands[i].includes(10)){
            number.push(10);
        }
        else{
            number.push(Number(card[0]));
        }
        suit.push(card[1]);
    }
    number = sortArray (number);
    numMap = uniqueNumbers(number);
    if(uniqueSuits(suit) === 1){
        // It will be a royal flush
        if (straight(number)&&number.includes(14)){score = 10;}
        //straight flush
        else if (straight(number)){score = 9;}
        //flush
        else {score = 6;}
    }
    else{
        //if four of a kind, call fourOfAKind
        if(fourOfAKind(numMap)){score = 8;}
        //if fullhouse: call threeOfAKind and pair
        else if(threeOfAKind(numMap) && pair(numMap)){score = 7;}
        //if straight: call straight
        else if (straight(number)){score = 5;}
        //if three of a kind: call threeOfAKind
        else if(threeOfAKind(numMap)){score = 4;}
        //if two pair: cal two pair
        else if (twoPais(numMap)){score = 3;}
        //if one pair: call pair
        else if (pair(numMap)){score = 2}
        //high card
        else{score = 1}
    }
    return score;
}

//Sorts an array
function sortArray(number){
    return number.sort(function(number,b) { return number - b; });
}

//checks if the hand is a 4 of a kind
function fourOfAKind(numMap){
    var returned = false;
    numMap.forEach(function (value){
        if(value == 4){
            returned = true;
        }
    });
    return returned;
}

//checks if the hand is a 3 of a kind
function threeOfAKind(numMap){
    var returned = false;
    numMap.forEach(function (value){
        if(value === 3){
            returned = true;
        }
    });
    return returned;
}

//checks if the hand is a straight
function straight(number){
    returned = false
    for(i = 0; i < number.length-1; i++){
        if(number[i]+1 === number[i+1]){
            returned = true;
        }
        else{
            returned = false;
            return returned;
        }
    }
    return returned;
}

//checks if the hand is a 2 pairs
function twoPais(numMap){
    var returned = false;
    var pairs = 0;
    numMap.forEach(function (value){
        if(value === 2){
            pairs++;
        }
        if (pairs ==2){
            returned = true
        }
    });
    return returned;
}

//checks if the hand is a pair
function pair(numMap){
    var returned = false;
    numMap.forEach(function (value){
        if(value === 2){
            returned = true;
        }
    });
    return returned;
}

//sees how many unique numbers are there
function uniqueNumbers(number){
    var numMap = new HashMap();
    for (i = 0; i < number.length; i++){

        if (numMap.get(number[i].toString()) == null){
            numMap.set(number[i].toString(), 1);
        }
        else {
            numMap.set(number[i].toString(),numMap.get(number[i].toString())+1);
        }
    }
    return numMap;
}

//sees how many different suits there are
function uniqueSuits(suit){
    var suitMap = new HashMap();
    for (i = 0; i < suit.length; i++){
        if (suit[i] == 'H'){
            suitMap.set("H","");
        }
        else if(suit[i] == 'C'){
            suitMap.set("C","");
        }
        else if(suit[i] == 'D'){
            suitMap.set("D","");
        }
        else if(suit[i] == 'S'){
            suitMap.set("S","");
        }
    }
    return suitMap.size;
}

//main
handA = "KS, QS, JS, 10S, 9S";
handB = "2S, 3S, 6S, 10H, 9D";
compare(handA, handB);