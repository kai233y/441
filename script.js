/*mark by Kay*/
let cart = [];
let totalPrice = 0;
let isLoggedIn = false;
let loginAttempts = 0;
const maxLoginAttempts = 3;
let createdUsername = "";
let createdPassword = "";

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}

// Function to show the default home page on load
function showHomePage() {
    showPage('homePage');
}

window.onload = showHomePage;

function createUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    createdUsername = username;
    createdPassword = password;
    alert(`Create a new user: ${username}`);
}

function login() {
    if (loginAttempts >= maxLoginAttempts) {
        alert("You have exceeded the maximum login attempts. Please try again later.");
        return;
    }

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    if (username === createdUsername && password === createdPassword) {
        isLoggedIn = true;
        alert(`Login in: ${username}`);
        document.getElementById('shoppingLink').style.display = 'block'; // shopping link display After logging in
    } else {
        alert("Invalid username or password. Please try again.");
        loginAttempts++;
    }
}

function addToCart(courseName, price, quantity) {
    if (!isLoggedIn) {
        alert("Please login to add items to the cart.");
        return;
    }

    const qty = parseInt(quantity);
    if (qty > 0) {
        const item = { name: courseName, price: price, quantity: qty };
        cart.push(item);
        totalPrice += price * qty;
        updateCart();
    } else {
        alert("Please enter a valid quantity");
    }
}

function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItemsDiv.appendChild(cartItem);
    });
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

function checkout() {
    if (!isLoggedIn) {
        alert("Please login to checkout.");
        return;
    }

    if (cart.length === 0) {
        alert("The cart is empty!");
    } else {
        alert("Checkout successful! total: $" + totalPrice.toFixed(2));
        cart = []; // Empty your shopping cart
        totalPrice = 0;
        updateCart(); // Update the cart display
    }
}

function submitContactForm(event) {
    event.preventDefault(); // Prevent form submissions from causing page refreshes

    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;

    // Here you can add logic to process the form data, e.g. send to the server
    // Currently, only alerts are used to display messages
    alert(`Thanks you message, ${name}! We will reply early.`);

    // Clear the form
    document.getElementById('contactForm').reset();
    document.getElementById('contactResponse').textContent = "Your message sent successfully";
    document.getElementById('contactResponse').style.display = "block";
}