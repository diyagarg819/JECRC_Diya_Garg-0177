# JavaScript Arrow Functions & DOM Events Tasks

This project contains multiple small JavaScript tasks demonstrating the use of **Arrow Functions**, **DOM Events**, and **Dynamic UI updates** using JavaScript.

All tasks are implemented using **HTML, CSS, and JavaScript**.

---

# Tasks Implemented

## Task 1 – Button Click Event using Arrow Function

### Description

When the user clicks the **Login** button, the system displays a message indicating that the login process has started.

### Features

* Uses `addEventListener`
* Uses **Arrow Function**
* Displays message in **Console**
* Displays message using **Alert**

### Example Code

```javascript
document.getElementById("loginBtn").addEventListener("click", (e) => {

    console.log("Login button clicked");

    alert("Login process started");

});
```

---

# Task 2 – Search Input Keyboard Event

### Description

When the user presses **Enter** inside the search input field, a search operation is triggered.

### Features

* Uses `keydown` event
* Detects **Enter key**
* Uses **Arrow Function**

### Example Code

```javascript
document.getElementById("searchBox").addEventListener("keydown", (e) => {

    if(e.key === "Enter"){

        console.log("Search triggered");

        alert("Searching product...");

    }

});
```

---

# Task 3 – Button Hover Event

### Description

When the user moves the mouse over the **Submit** button, a message is displayed.

### Features

* Uses `mouseover`
* Uses **Arrow Function**

### Example Code

```javascript
document.getElementById("submitBtn").addEventListener("mouseover", () => {

    console.log("Mouse hovered over submit button");

});
```

---

# Task 4 – Live Character Counter

### Description

Displays the number of characters typed inside a textarea in real time.

### Features

* Uses `keyup`
* Uses **Arrow Function**
* Updates character count dynamically

### Example Code

```javascript
document.getElementById("message").addEventListener("keyup", (e) => {

    let length = e.target.value.length;

    document.getElementById("count").innerText = "Characters: " + length;

});
```

---

# Task 5 – Dark Mode Toggle Button

### Description

Allows users to switch between **Light Mode** and **Dark Mode**.

### Features

* Uses **Arrow Function**
* Modifies CSS dynamically using JavaScript
* Toggles a CSS class

### Example Code

```javascript
document.getElementById("darkMode").addEventListener("click", () => {

    document.body.classList.toggle("dark");

});
```

### CSS

```css
.dark{
background:black;
color:white;
}
```

---

# Technologies Used

* HTML5
* CSS3
* JavaScript (ES6 Arrow Functions)
* DOM Manipulation
* Event Listeners

---

# Learning Outcomes

Through these tasks, the following JavaScript concepts were practiced:

* Arrow Functions
* DOM Selection
* Event Handling
* Keyboard Events
* Mouse Events
* Dynamic UI Updates

---