import boxen from 'boxen';

let multiArray = [
  [1, 2],
  [3, 4]
];

// Format the array into a displayable string
let arrayString = JSON.stringify(multiArray, null, 2);

// Output the string inside a box
console.log(boxen(arrayString, { padding: 1, margin: 1, borderStyle: 'round' }));
