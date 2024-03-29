// computer fires
var justHitShip = false;
var foundPShip = {start: [0, 0], end: [0, 0]};
function computerFire() {
  var dx, dy;
  var hitNth = false;
  var index;
  if (!justHitShip){ // just shoot where ever
    do {
      dx = Math.floor(Math.random() * 10) + 11;
      dy = Math.floor(Math.random() * 10) + 1;
      hitNth = checkHitNothing(dx, dy);
      if (!hitNth) { // hit something
          justHitField = true;
          hitField.x = dx;
          hitField.y = dy;
        if(fieldIsShip(dx, dy)){ // hit ship
          computerHitsLanded++;
          if (computerHitsLanded >= 30){
            gameEnd = true;
          }
          mapState[dx][dy] = 5;
          justHitShip = true;
          foundPShip = {start: [dx, dy], end: [dx, dy]};
        } else { // hit water
          mapState[dx][dy] = 1;
        }
      }
    } while (hitNth);
  } else { // shot around the ship
    do {
      if (foundPShip.end[0] > foundPShip.start[0]) { // horizontal ship
        dx = getFieldNextToXEnd(foundPShip);
        dy = foundPShip.start[1];
      } else if (foundPShip.end[1] > foundPShip.start[1]) { // vertical ship
        dy = getFieldNextToYEnd(foundPShip);
        dx = foundPShip.start[0];
      } else if (getRandomBool()){
        dx = getFieldNextToXEnd(foundPShip);
        dy = foundPShip.start[1];
      } else {
        dy = getFieldNextToYEnd(foundPShip);
        dx = foundPShip.start[0];
      }
      hitNth = checkHitNothing(dx, dy);
      if (!hitNth){
        justHitField = true;
        hitField.x = dx;
        hitField.y = dy;
        if (fieldIsShip(dx, dy)){
          computerHitsLanded++;
          if (computerHitsLanded >= 30){
            gameEnd = true;
          }
          mapState[dx][dy] = 5; // hit ship
          addToFoundPShip(dx, dy);
        } else {
          mapState[dx][dy] = 1; // hit water
        }
      }
    } while (hitNth);
  }
  if (justHitShip && isPlayerShipSunk(foundPShip)){
    index = getCompletePlayerShipIndex(foundPShip);
    sinkPlayerShip(playerShips[index], index);
    justHitShip = false;
  } else {
    aniCounter = 1;
  }
}

function isPlayerShipSunk(ship) {
  if ( (ship.end[0] - ship.start[0] == 4) || (ship.end[1] - ship.start[1] == 4) ) { // 5-ships
    console.log("ship sunk 5");
    return true;
  } else if ( (ship.start[0] != ship.end[0]) && ((mapState[ship.start[0] - 1][ship.start[1]] === 1) || (mapState[ship.start[0] - 1][ship.start[1]] === 2) || (ship.start[0] === 11)) && ((mapState[ship.end[0] + 1][ship.end[1]] === 1) || (mapState[ship.end[0] + 1][ship.end[1]] === 2) || (ship.end[0] === 20)) ) {
    console.log("ship sunk x");
    return true;
  } else if ( (ship.start[1] != ship.end[1]) && ((mapState[ship.start[0]][ship.start[1]-1] === 1) || (mapState[ship.start[0]][ship.start[1]-1] === 2) || (ship.start[1] === 1)) && ((mapState[ship.end[0]][ship.end[1]+1] === 1) || (mapState[ship.end[0]][ship.end[1]+1] === 2) || (ship.end[1] === 10)) ) {
    console.log("ship sunk y");
    return true;
  }
  return false;
}

function sinkPlayerShip(ship, index){
  addSunkShipToMap(ship);
  addBorderToShip(ship, "right");
  playerShips[index].sunk = true;
}

function addToFoundPShip(dx, dy) {
  if (dx > foundPShip.end[0]) {
    foundPShip.end[0] = dx;
  } else if (dx < foundPShip.start[0]) {
    foundPShip.start[0] = dx;
  } else if (dy > foundPShip.end[1]) {
    foundPShip.end[1] = dy;
  } else if (dy < foundPShip.start[1]) {
    foundPShip.start[1] = dy;
  }
}

function getFieldNextToYEnd(ship){
  if ((getRandomBool()) && (ship.start[1] > 1)) {
    return ship.start[1] - 1;
  } else if (ship.end[1] < 10){
    return ship.end[1] + 1;
  } else {
    return ship.start[1] - 1;
  }
}

function getFieldNextToXEnd(ship){
  if ((getRandomBool()) && (ship.start[0] > 11)) {
    return ship.start[0] - 1;
  } else if (ship.end[0] < 20){
    return ship.end[0] + 1;
  } else {
    return ship.start[0] - 1;
  }
}