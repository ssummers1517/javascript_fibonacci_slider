// Re-set the document title
document.title = "Interactive Fibonacci Tree";

// Create a red div in the body of the document
var div = document.createElement('div');
div.setAttribute('class', 'red fib-container');
document.querySelector('body').appendChild(div);

// Some text to explain how the slider works
var para = document.createElement('p');
para.textContent = "Move the slider to see a Fibonacci tree that starts from a number between 0 and 11.";
div.appendChild(para);

// Creating the form
var slider = document.createElement('form');
div.appendChild(slider);

// Creating the label
var sliderLabel = document.createElement('label');
sliderLabel.setAttribute('for', 'tree-slider');
sliderLabel.setAttribute('id', 'tree-label');
sliderLabel.textContent = "Fib(0)";
slider.appendChild(sliderLabel);

// Creating the actual slider
var sliderInput = document.createElement('input');
sliderInput.setAttribute('id', 'tree-slider');
sliderInput.setAttribute('type', 'range');
sliderInput.setAttribute('min', '0');
sliderInput.setAttribute('max', '11');
sliderInput.setAttribute('value', '0');
sliderInput.setAttribute('oninput', 'treeSlider(this)');
slider.appendChild(sliderInput);

// Creating a div for the tree
var newDiv = document.createElement('div');
newDiv.setAttribute('class', 'fib-container');
newDiv.setAttribute('id', 'tree-of-divs');
div.appendChild(newDiv);

// Creating the inner div
var itemDiv = document.createElement('div');
itemDiv.setAttribute('class', 'fib-item');
newDiv.appendChild(itemDiv);

// Creating the text for the initial slider value of 0
var fibNumbers = document.createElement('p');
fibNumbers.textContent = "Fib(0) = 0";
itemDiv.appendChild(fibNumbers);

// Recursive function
var recursiveFibTree = function(depth) {
	var newDiv = document.createElement('div');
	newDiv.setAttribute('class', 'fib-item');
	var newP = document.createElement('p');
	
	// If the slider is at 0, Fib(0) is displayed, and zero is returned with the div
	if (depth === 0) {
		value = depth;
		newP.textContent = `Fib(${depth}) = ${value}`;
		newDiv.appendChild(newP);
	
		return { div: newDiv, value: value };
	}
	// If the slider is at 1, Fib(1) is displayed, and one is returned with the div
	else if (depth === 1) {
		value = depth;
		newP.textContent = `Fib(${depth}) = ${value}`;
		newDiv.appendChild(newP);
		
		return { div: newDiv, value: value };
	}
	// If the slider is at 2-11, the left child node calls the recursive function with depth - 1
	else {
		var left = recursiveFibTree(depth - 1);
		var cls = left.div.getAttribute('class');
		left.div.setAttribute('class', `fib-left ${cls}`);
		
		// The right child node calls the recursive function with depth - 2
		var right = recursiveFibTree(depth - 2);
		cls = right.div.getAttribute('class');
		right.div.setAttribute('class', `fib-right ${cls}`);
		
		// A value is initialized that adds the results of the left and right values, and all the values are appended to the div
		var value = left.value + right.value;
		newP.textContent = `Fib(${depth}) = ${value}`;
		newDiv.appendChild(newP);
		newDiv.appendChild(left.div);
		newDiv.appendChild(right.div);
		
		// The div and the fibonacci sum are returned.
		return { div: newDiv, value: value };
	}
}

/**
This method was adapted from the lecture notes that use the binary tree example.
*/

var treeSlider = function(me) {
	var form = me.parentNode;
	
	// Get the value from the slider
	var value = parseInt(me.value);
	console.log(value);
	
	// Change the slider label to match the slider position
	var label = document.querySelector('label#tree-label');
	label.textContent = `Fib(${value})`;
	
	// Get the current tree and erase it when the slider slides
	var tree = document.querySelector('#tree-of-divs');
	if (tree) {
		tree.remove();
	}
	
	// Make a new div for the tree that shows with the slider value
	tree = document.createElement('div');
	tree.id = 'tree-of-divs';
	tree.setAttribute('class', 'fib-container');
	
	// Get the tree from the recursive function
	var treeObj = recursiveFibTree(value);
	tree.appendChild(treeObj.div);
	
	// Append the tree to the form
	form.parentNode.appendChild(tree);
}