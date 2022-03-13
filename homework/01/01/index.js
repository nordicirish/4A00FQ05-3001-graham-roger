var animals = ["bat", "cat", "dog", "giraffe", "elephant", "python", "giraffe"];
var animal1 = "giraffe";
var animal2 = "hippo";
//The findIndex() method returns the index of the first element in the array that satisfies the provided testing function.
// Otherwise, it returns - 1, indicating that no element passed the test.
function returnItem(arrayItem) {
  return arrayItem == this;
}
console.log(
  "index of the first " +
    animal1 +
    " is " +
    animals.findIndex(returnItem, animal1)
);

console.log(
  "index of the first " +
    animal2 +
    " is " +
    animals.findIndex(returnItem, animal2)
);
//-1 hippo not found

// The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.;
console.log(
  "index of the first " + animal1 + " is " + animals.indexOf(animal1)
);
console.log(
  "index of the first " + animal2 + " is " + animals.indexOf(animal2)
);
//returns -1 hippo not found

//The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate.
console.log("animals includes " + animal1 + " : " + animals.includes(animal1));
// expected output: true

console.log("animals includes " + animal2 + " : " + animals.includes(animal2));
// expected output: false

// The some() method tests whether at least one element in the array passes the test implemented by the provided function.
// It returns true if, in the array, it finds an element for which the provided function returns true;
//otherwise it returns false.
// It doesn't modify the array.

console.log(animal1 + " is found : " + animals.some(returnItem, animal1));

console.log(animal2 + " is found : " + animals.some(returnItem, animal2));
