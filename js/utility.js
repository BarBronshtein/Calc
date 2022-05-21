'use strict';

function init() {
  display.textContent = '';
  gNum1 = gNum2 = null;
  gResult = 0;
}

function opposite() {
  if (gNum2 === null) gNum1 = -gNum1;
  else gNum2 = -gNum2;
}
