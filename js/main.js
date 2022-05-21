'use strict';
var gNum1 = null,
  gNum2 = null;
var gOp;
const display = document.querySelector('.display');
const modal = document.querySelector('.modal');
var gRoot = false;
var gResult = 0;
var gMemoRes = 0;
var gMode = 10;

var modes = {
  oct: 8,
  dec: 10,
  bin: 2,
  hex: 16,
};

function addDigit(digit) {
  display.textContent += digit.textContent;
  if (gNum2 === null && !gOp) gNum1 = display.textContent;
  else gNum2 = display.textContent;
}

function setMode(elMode) {
  gMode = modes[elMode.value];
  closeModal();
}

function setOp(op) {
  if (gNum1 && gNum2) gNum1 = eval(gNum1 + gOp + gNum2);
  gOp = op.textContent;
  display.textContent = '';
  gNum2 = 0;
}

function result() {
  // TODO: Change base value with only one click // Completed
  // TODO: Show also letters with hex base // Completed

  // Checks if there are 2 numbers if the second one isn't gNum2 must be gMemoRes
  if (gNum1 && gOp && display.textContent && !gNum2) {
    gResult = +eval(gNum1 + gOp + gMemoRes);
  }

  if (gNum1 && gNum2) {
    gResult = +eval(gNum1 + gOp + gNum2);
  }

  if (gRoot) {
    // Checks the result of the first number he entered.
    if (gNum2 === null) gResult = gNum1 ** 0.5;
    // If the user wants to make an equastion inside the root
    else gResult = eval(gNum1 + gOp + gNum2) ** 0.5;
    gRoot = false;
  }
  console.log(gNum1, gNum2, gResult);
  gNum2 = null;
  gOp = null;
  gResult = gResult ? gResult : +gNum1;
  gNum1 = gResult;
  // if (gMode === 16) display.textContent = decimalToHex(gResult);
  display.textContent = gResult.toString(gMode);
}

function addDot() {
  if (gNum2 === null) gNum1 += '.';
  else gNum2 += '.';
  if (display.textContent) display.textContent = gNum1;
}

function resetC() {
  // Resetting everything
  gRoot = false;
  gOp = null;
  init();
}

// function decimalToHex(val) {
//   var hex = Number(val).toString(16);
//   hex = '000000'.substr(0, 6 - hex.length) + hex;
//   while (hex.charAt(0) === '0') {
//     hex = hex.slice(1);
//   }
//   return hex;
// }

function fractionOfNum() {
  // Gets 1/x of number
  if (gResult) {
    gResult = 1 / gResult;
    display.textContent = gResult;
  } else if (gNum2 === null) {
    gNum1 = 1 / gNum1;
    display.textContent = gNum1;
  } else {
    gNum2 = 1 / gNum2;
    display.textContent = gNum2;
  }
}

function negativePositive() {
  if (display.textContent.charAt(0) === '-') {
    display.textContent = display.textContent.slice(1);
    opposite();
  } else {
    display.textContent = '-' + display.textContent;
    opposite();
  }
}

function resetCE() {
  // TODO: Repair functionallity // Completed

  // Resets the last number entered

  console.log(gNum1, gNum2, gResult);
  if (gNum2 === null) {
    gNum1 = null;
    gResult = 0;
  } else gNum2 = null;
  display.textContent = '';
}

function memoReset() {
  gMemoRes = 0;
}

function memoAdd() {
  gMemoRes += +display.textContent;
  init();
}

function memoSubtract() {
  gMemoRes -= +display.textContent;
  init();
}

function memoRecall() {
  if (gNum1 && gNum2) gNum1 = eval(gNum1 + gOp + gNum2);
  display.textContent = gMemoRes.toString(gMode);
}

function memoStore() {
  gMemoRes = +display.textContent;
  init();
}

function root() {
  display.textContent = '';
  gRoot = true;
}

function openModal() {
  // Opens base mode options
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}
