'use strict';

//Globale constante.
const NAMES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const SUITS = "♠♥♦♣";

//Erzeugt den Karten Namen.
function toName(inputString) {
    const splitInput = inputString.split(/\W/g);
    return NAMES.includes(splitInput[0].toUpperCase()) ? splitInput[0].toUpperCase() : false;
}

//Erzeugt das Karten Symbol.
function toSuit(inputString) {
    const splitInput = inputString.split(/\d+|\w/g);
    const SUITSarray = SUITS.split('');
    return SUITSarray.includes(splitInput[1]) ? splitInput[1] : false;
}

//Validierung der einzelnen Karte.
function isValidCard(inputString) {
    return toName(inputString) !== false && toSuit(inputString) !== false ? true : false;
}

//Validiert die gegebene Hand.
function isValidHand(inputArray) {
    const singleArrayItem = inputArray.slice();
    let validHandArray = [];

    Object.keys(singleArrayItem).forEach((key) => {
        validHandArray.push(isValidCard(singleArrayItem[key]));
    });
    return validHandArray.some(arryItem => arryItem === false) || validHandArray.length !== 5 ? false : true;
}

//Sortiert die gegebene Hand.
function sortHand(inputArray) {
    const validHandArray = isValidHand(inputArray);
    let toSortCards = [];
    let returnArray = [];

    function compareCards(firstElement, secondElement) {
        return firstElement[1] - secondElement[1];
    }

    if (validHandArray === true) {
        inputArray.forEach((arrayElement) => {
            const cardName = toName(arrayElement);
            const cardSuit = toSuit(arrayElement);
            toSortCards.push([arrayElement, SUITS.length * NAMES.indexOf(cardName) + SUITS.indexOf(cardSuit)]);
        });
        toSortCards.sort(compareCards);
        toSortCards.forEach((arrayElement) => {
            returnArray.push(arrayElement.shift());
        });
        return returnArray;
    } else {
        return false;
    }
}

//Teilt eine gegebene Hand in zwei Array's.
function checkHand(inputArray) {
    const validHandArray = sortHand(inputArray);

    if (validHandArray !== false) {
        let splitHand = [];
        let splitSuit = [];
        let splittedCards = [];
        validHandArray.forEach((arrayElement) => {
            splitHand.push(toName(arrayElement));
            splitSuit.push(toSuit(arrayElement));
        });
        splittedCards.push(splitHand, splitSuit);
        return splittedCards;
    } else {
        return false;
    }
}

//Prüft ob die gegebene Hand ein Straight ist.
function isStraight(inputArray) {
    let NAMESstring;
    let validHandArray = checkHand(inputArray);
    let isInArray;

    if (validHandArray !== false) {
        NAMESstring = NAMES.join(',');
        validHandArray = validHandArray[0].join(',');
        return isInArray = NAMESstring.includes(validHandArray);
    } else {
        return 'Not a valid hand';
    }
}

//Prüft ob die gegebene Hand ein Flush ist.
function isFlush(inputArray) {
    let validHandArray = checkHand(inputArray);

    if (validHandArray !== false) {
        let checkIsFlush = validHandArray[1].every(function (arrayItem) {
            return arrayItem === validHandArray[1][0];
        });
        return checkIsFlush;
    } else {
        return 'Not a valid hand';
    }
}

//Prüft ob die gegebene Hand ein StraightFlush ist.
function isStraightFlush(inputArray) {
    const checkIsStraight = isStraight(inputArray);
    const checkIsFlush = isFlush(inputArray);
    return checkIsStraight === true && checkIsFlush === true ? true : false;
}

//Prüft ob die gegebene Hand ein RoylaFlush ist.
function isRoyalFlush(inputArray) {
    const checkIsStraightFlush = isStraightFlush(inputArray);
    const validSplitHand = checkHand(inputArray);
    return checkIsStraightFlush === true && validSplitHand[0].includes('A') ? true : false;
}

// API Vorgaben
// console.log(toName("9♣"));
// console.log(toName("10♥"));
// console.log(toName("Q♥"));
// console.log(toSuit("9♣"));
// console.log(toSuit("10♥"));
// console.log(isValidCard("9♣"));
// console.log(isValidCard("11♣"));
// console.log(isValidCard("9X"));
// console.log(isValidHand(["9♣", "9♦", "9♠", "9♥", "Q♥"]));
// console.log(isValidHand(["9♣", "9♠", "9♥", "Q♥"]));
// console.log(sortHand(["3♥", "2♥", "5♥", "2♣", "4♣"]));
// console.log(sortHand(["2♦", "Q♥", "2♥", "2♣", "2♠"]));
// console.log(isFlush(["7♥", "2♥", "Q♥", "10♥", "5♥"]));
// console.log(isFlush(["7♥", "2♥", "Q♥", "10♣", "5♥"]));
// console.log(isStraight(["5♥", "6♦", "7♥", "8♣", "9♥"]));
// console.log(isStraightFlush(["5♥", "6♥", "7♥", "8♥", "9♥"]));
// console.log(isRoyalFlush(["10♥", "J♥", "Q♥", "K♥", "A♥"]));
// console.log(isRoyalFlush(["10♥", "J♥", "Q♥", "K♣", "A♥"]));
// console.log(isRoyalFlush(["K♥", "A♥", "Q♥", "10♥", "J♥"]));

// Beispiel Ausgabe
// console.log('toName("9♣") // => ' + toName("9♣"));
// console.log('toName("10♥") // => ' + toName("10♥"));
// console.log('toName("Q♥") // => ' + toName("Q♥"));
// console.log('toSuit("9♣") // => ' + toSuit("9♣"));
// console.log('toSuit("10♥") // => ' + toSuit("10♥"));
// console.log('isValidCard("9♣") // => ' + isValidCard("9♣"));
// console.log('isValidCard("11♣") // => ' + isValidCard("11♣"));
// console.log('isValidCard("9X") // => ' + isValidCard("9X"));
// console.log('isValidHand(["9♣", "9♦", "9♠", "9♥", "Q♥"]) // => ' + isValidHand(["9♣", "9♦", "9♠", "9♥", "Q♥"]));
// console.log('isValidHand([9♦", "9♠", "9♥", "Q♥"]) // => ' + isValidHand(["9♦", "9♠", "9♥", "Q♥"]));
// console.log('sortHand(["3♥", "2♥", "5♥", "2♣", "4♣"]) // => ' + sortHand(["3♥", "2♥", "5♥", "2♣", "4♣"]));
// console.log('sortHand(["2♦", "Q♥", "2♥", "2♣", "2♠"]) // => ' + sortHand(["2♦", "Q♥", "2♥", "2♣", "2♠"]));
// console.log('isFlush(["7♥", "2♥", "Q♥", "10♥", "5♥"]) // => ' + isFlush(["7♥", "2♥", "Q♥", "10♥", "5♥"]));
// console.log('isFlush(["7♥", "2♥", "Q♥", "10♣", "5♥"]) // => ' + isFlush(["7♥", "2♥", "Q♥", "10♣", "5♥"]));
// console.log('isStraight(["5♥", "6♦", "7♥", "8♣", "9♥"]) // => ' + isStraight(["5♥", "6♦", "7♥", "8♣", "9♥"]));
// console.log('isStraightFlush(["5♥", "6♥", "7♥", "8♥", "9♥"]) // => ' + isStraightFlush(["5♥", "6♥", "7♥", "8♥", "9♥"]));
// console.log('isRoyalFlush(["10♥", "J♥", "Q♥", "K♥", "A♥"]) // => ' + isRoyalFlush(["10♥", "J♥", "Q♥", "K♥", "A♥"]));
// console.log('isRoyalFlush(["10♥", "J♥", "Q♥", "K♣", "A♥"]) // => ' + isRoyalFlush(["10♥", "J♥", "Q♥", "K♣", "A♥"]));
// console.log('isRoyalFlush(["K♥", "A♥", "Q♥", "10♥", "J♥"]) // => ' + isRoyalFlush(["K♥", "A♥", "Q♥", "10♥", "J♥"]));
