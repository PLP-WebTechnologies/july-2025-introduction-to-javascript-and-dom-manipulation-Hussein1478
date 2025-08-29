// ==========================================
// JAVASCRIPT FUNDAMENTALS MASTER PROJECT
// Demonstrating variables, functions, loops, and DOM manipulation
// ==========================================

// ==========================================
// PART 1: JAVASCRIPT BASICS
// Variables, data types, operators, conditionals
// ==========================================

// Global variables to store user data
let currentUser = {
    name: '',
    age: 0,
    category: ''
};

// Function to process user information with conditionals
function processUserInfo() {
    // Get input values from DOM elements
    const name = document.getElementById('userName').value;
    const age = parseInt(document.getElementById('userAge').value);
    
    // Variable declarations and validation
    let message = '';
    let isValid = true;
    
    // Conditional logic for validation
    if (!name || name.trim() === '') {
        message = 'Please enter a valid name!';
        isValid = false;
    } else if (!age || age < 1 || age > 120) {
        message = 'Please enter a valid age (1-120)!';
        isValid = false;
    } else {
        // Store user data in object
        currentUser.name = name.trim();
        currentUser.age = age;
        
        // Conditional logic for age categories using if/else statements
        if (age < 13) {
            currentUser.category = 'Child';
        } else if (age < 20) {
            currentUser.category = 'Teenager';
        } else if (age < 60) {
            currentUser.category = 'Adult';
        } else {
            currentUser.category = 'Senior';
        }
        
        // Create personalized message using template literals
        message = `Hello ${currentUser.name}! You are ${currentUser.age} years old and classified as a ${currentUser.category}.`;
        
        // Log to console for demonstration
        console.log('User Info Processed:', currentUser);
    }
    
    // Update the DOM with result
    document.getElementById('userResult').textContent = message;
}

// ==========================================
// PART 2: CUSTOM FUNCTIONS
// Reusable functions for calculations
// ==========================================

// Function 1: Mathematical operations with switch statement
function calculate(num1, num2, operation) {
    // Switch statement for different operations
    switch(operation) {
        case 'add':
            return num1 + num2;
        case 'subtract':
            return num1 - num2;
        case 'multiply':
            return num1 * num2;
        case 'divide':
            // Prevent division by zero
            return num2 !== 0 ? num1 / num2 : 'Cannot divide by zero';
        default:
            return 'Invalid operation';
    }
}

// Function 2: Format calculation result for display
function formatResult(num1, num2, operation, result) {
    // Object to store operation symbols
    const operationSymbols = {
        'add': '+',
        'subtract': '-',
        'multiply': '×',
        'divide': '÷'
    };
    
    const symbol = operationSymbols[operation];
    
    // Return formatted string based on result type
    if (typeof result === 'number') {
        return `${num1} ${symbol} ${num2} = ${result.toFixed(2)}`;
    } else {
        return `${num1} ${symbol} ${num2} = ${result}`;
    }
}

// Main function to perform calculation using custom functions
function performCalculation() {
    // Get values from input fields
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;
    
    // Input validation
    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('calculationResult').textContent = 'Please enter valid numbers!';
        return;
    }
    
    // Use custom functions to calculate and format result
    const result = calculate(num1, num2, operation);
    const formattedResult = formatResult(num1, num2, operation, result);
    
    // Display result in DOM
    document.getElementById('calculationResult').textContent = formattedResult;
    
    // Log to console for debugging
    console.log('Calculation performed:', formattedResult);
}

// ==========================================
// PART 3: LOOPS
// For loops, while loops, and forEach demonstrations
// ==========================================

// Array to store tasks for loop demonstrations
let tasks = [];
let taskCounter = 0;

// Function using array methods to add tasks
function addTask() {
    const taskName = document.getElementById('taskName').value;
    
    // Validation check
    if (!taskName || taskName.trim() === '') {
        alert('Please enter a task name!');
        return;
    }
    
    // Increment counter and create new task object
    taskCounter++;
    const newTask = {
        id: taskCounter,
        name: taskName.trim(),
        completed: false,
        createdAt: new Date().toLocaleTimeString()
    };
    
    // Add task to array
    tasks.push(newTask);
    
    // Clear input field
    document.getElementById('taskName').value = '';
    
    // Update display using loops
    displayTasks();
    
    console.log('Task added. Current tasks:', tasks);
}

// Function using forEach loop to display tasks
function displayTasks() {
    const taskList = document.getElementById('taskList');
    
    // Clear current display
    taskList.innerHTML = '';
    
    // Check if tasks array is empty
    if (tasks.length === 0) {
        taskList.innerHTML = '<p>No tasks yet. Add some tasks above!</p>';
        return;
    }
    
    // Use forEach loop to iterate through tasks array
    tasks.forEach(function(task, index) {
        // Create DOM element for each task
        const taskElement = document.createElement('div');
        taskElement.className = 'list-item';
        taskElement.innerHTML = `
            <div>
                <strong>#${task.id}: ${task.name}</strong><br>
                <small>Added at: ${task.createdAt}</small>
            </div>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        
        // Append to container
        taskList.appendChild(taskElement);
    });
    
    console.log(`Displayed ${tasks.length} tasks using forEach loop`);
}

// Function using for loop to find and delete specific task
function deleteTask(taskId) {
    console.log(`Attempting to delete task with ID: ${taskId}`);
    
    // Use for loop to find task index
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
            // Remove task from array
            tasks.splice(i, 1);
            console.log(`Task ${taskId} deleted using for loop`);
            break;
        }
    }
    
    // Update display
    displayTasks();
}

// Function using while loop to clear all tasks
function clearAllTasks() {
    // Confirm action
    if (tasks.length > 0 && confirm('Are you sure you want to clear all tasks?')) {
        // Use while loop to clear tasks array
        while (tasks.length > 0) {
            tasks.pop();
        }
        
        console.log('All tasks cleared using while loop');
        displayTasks();
    }
}

// ==========================================
// PART 4: DOM MANIPULATION
// Event handling and dynamic content updates
// ==========================================

// Global counter variable for DOM manipulation
let counter = 0;

// DOM Manipulation 1: Random background color generator
function changeBackgroundColor() {
    // Generate random RGB values using Math.random()
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    const backgroundColor = `rgb(${r}, ${g}, ${b})`;
    
    // Select and manipulate DOM element
    const colorBox = document.getElementById('colorDisplay');
    
    // Modify multiple CSS properties
    colorBox.style.backgroundColor = backgroundColor;
    colorBox.style.color = (r + g + b > 400) ? 'black' : 'white';
    colorBox.textContent = `RGB(${r}, ${g}, ${b})`;
    colorBox.style.display = 'flex';
    colorBox.style.alignItems = 'center';
    colorBox.style.justifyContent = 'center';
    colorBox.style.fontWeight = 'bold';
    
    console.log('Background color changed to:', backgroundColor);
}

// DOM Manipulation 2: Counter increment function
function incrementCounter() {
    counter++;
    updateCounterDisplay();
    console.log('Counter incremented to:', counter);
}

// DOM Manipulation 2: Counter decrement function
function decrementCounter() {
    counter--;
    updateCounterDisplay();
    console.log('Counter decremented to:', counter);
}

// DOM Manipulation 2: Counter reset function
function resetCounter() {
    counter = 0;
    updateCounterDisplay();
    console.log('Counter reset to:', counter);
}

// DOM Manipulation 3: Dynamic styling based on counter value
function updateCounterDisplay() {
    // Select counter element
    const counterElement = document.getElementById('counter');
    
    // Update text content
    counterElement.textContent = counter;
    
    // Change color based on counter value using conditionals
    if (counter > 0) {
        counterElement.style.color = '#4caf50';  // Green for positive
    } else if (counter < 0) {
        counterElement.style.color = '#ff4757';  // Red for negative
    } else {
        counterElement.style.color = '#667eea';  // Blue for zero
    }
    
    // Add animation effect by manipulating transform property
    counterElement.style.transform = 'scale(1.2)';
    
    // Use setTimeout to reset animation
    setTimeout(() => {
        counterElement.style.transform = 'scale(1)';
    }, 200);
}

// ==========================================
// EVENT LISTENERS AND INITIALIZATION
// Setting up interactive functionality
// ==========================================

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 JavaScript Fundamentals Project Loaded Successfully!');
    
    // Set initial color for color display
    changeBackgroundColor();
    
    // Add keyboard event listeners for better UX
    document.getElementById('userName').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            processUserInfo();
        }
    });
    
    document.getElementById('userAge').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            processUserInfo();
        }
    });
    
    document.getElementById('taskName').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    
    // Add input validation listeners
    document.getElementById('num1').addEventListener('input', validateNumberInputs);
    document.getElementById('num2').addEventListener('input', validateNumberInputs);
    
    console.log('✅ Event listeners added successfully!');
});

// ==========================================
// BONUS FUNCTIONS
// Additional functionality demonstrating concepts
// ==========================================

// Function to validate number inputs in real-time
function validateNumberInputs() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    
    // Change border color based on validity
    if (num1Input.value && !isNaN(num1Input.value)) {
        num1Input.style.borderColor = '#4caf50';
    } else if (num1Input.value) {
        num1Input.style.borderColor = '#ff4757';
    }
    
    if (num2Input.value && !isNaN(num2Input.value)) {
        num2Input.style.borderColor = '#4caf50';
    } else if (num2Input.value) {
        num2Input.style.borderColor = '#ff4757';
    }
}

// Educational function demonstrating different loop types
function demonstrateLoops() {
    console.log('=== EDUCATIONAL LOOP DEMONSTRATIONS ===');
    
    // For loop example - traditional counting
    console.log('1. Traditional for loop - counting 1 to 5:');
    for (let i = 1; i <= 5; i++) {
        console.log(`Count: ${i}`);
    }
    
    // While loop example - countdown
    console.log('2. While loop - countdown from 5:');
    let countdown = 5;
    while (countdown > 0) {
        console.log(`Countdown: ${countdown}`);
        countdown--;
    }
    
    // forEach example with array
    console.log('3. forEach loop - iterating through colors array:');
    const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
    colors.forEach(function(color, index) {
        console.log(`Color ${index + 1}: ${color}`);
    });
    
    // for...in loop example with object
    console.log('4. for...in loop - iterating through object properties:');
    const person = { name: 'John', age: 25, city: 'New York' };
    for (let key in person) {
        console.log(`${key}: ${person[key]}`);
    }
    
    // for...of loop example with array
    console.log('5. for...of loop - iterating through array values:');
    const fruits = ['apple', 'banana', 'orange'];
    for (let fruit of fruits) {
        console.log(`Fruit: ${fruit}`);
    }
}

// Function to generate statistics about current tasks (demonstrates array methods)
function generateTaskStatistics() {
    if (tasks.length === 0) {
        console.log('No tasks to analyze');
        return;
    }
    
    console.log('=== TASK STATISTICS ===');
    console.log(`Total tasks: ${tasks.length}`);
    
    // Use loops to calculate statistics
    let totalNameLength = 0;
    let longestTask = '';
    
    for (let i = 0; i < tasks.length; i++) {
        totalNameLength += tasks[i].name.length;
        if (tasks[i].name.length > longestTask.length) {
            longestTask = tasks[i].name;
        }
    }
    
    const averageLength = (totalNameLength / tasks.length).toFixed(2);
    console.log(`Average task name length: ${averageLength} characters`);
    console.log(`Longest task: "${longestTask}"`);
}

// ==========================================
// ADVANCED DOM MANIPULATION EXAMPLES
// ==========================================

// Function to create dynamic elements
function createDynamicElement(tagName, className, textContent) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
}

// Function to toggle element visibility
function toggleElementVisibility(elementId) {
    const element = document.getElementById(elementId);
    if (element.style.display === 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}

// Function demonstrating event delegation
function setupEventDelegation() {
    // Add event listener to parent container for efficient event handling
    document.querySelector('.content').addEventListener('click', function(event) {
        // Check if clicked element is a delete button
        if (event.target.classList.contains('delete-btn')) {
            console.log('Delete button clicked via event delegation');
        }
    });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Function to get random element from array
function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// Function to capitalize first letter of string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Function to validate email format (bonus demonstration)
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==========================================
// APPLICATION INITIALIZATION
// ==========================================

// Main initialization function
function initializeApp() {
    console.log('🎯 Initializing JavaScript Fundamentals Application...');
    
    // Setup event delegation for efficient event handling
    setupEventDelegation();
    
    // Display welcome message in console
    console.log('📚 This project demonstrates:');
    console.log('   - Variables and data types');
    console.log('   - Conditional statements (if/else/switch)');
    console.log('   - Custom functions with parameters and return values');
    console.log('   - Different types of loops (for, while, forEach)');
    console.log('   - DOM manipulation and event handling');
    
    // You can uncomment the line below to see loop demonstrations
    // demonstrateLoops();
    
    console.log('✅ Application initialized successfully!');
}

// ==========================================
// ASSIGNMENT REQUIREMENTS CHECKLIST
// ==========================================

/*
PART 1 - JavaScript Basics ✅
- ✅ Variable declarations (currentUser object, message, isValid)
- ✅ Data types (string, number, boolean, object)
- ✅ Operators (arithmetic, comparison, logical)
- ✅ Conditionals (if/else statements, switch case)

PART 2 - Custom Functions ✅
- ✅ Function 1: calculate() - performs mathematical operations
- ✅ Function 2: formatResult() - formats output strings
- ✅ Functions with parameters and return values
- ✅ Reusable code blocks

PART 3 - Loops ✅
- ✅ forEach loop: displayTasks() function
- ✅ for loop: deleteTask() function  
- ✅ while loop: clearAllTasks() function
- ✅ Practical applications of iteration

PART 4 - DOM Manipulation ✅
- ✅ Element selection: document.getElementById()
- ✅ Event handling: click events and keyboard events
- ✅ Content updates: textContent and innerHTML modifications
- ✅ Style manipulation: changing colors, transforms, animations
- ✅ Dynamic element creation: createElement() and appendChild()

CODE QUALITY ✅
- ✅ Clear comments explaining logic
- ✅ Consistent indentation and formatting
- ✅ Meaningful variable and function names
- ✅ Error handling and input validation
- ✅ Console logging for debugging
*/

// Call initialization function when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);