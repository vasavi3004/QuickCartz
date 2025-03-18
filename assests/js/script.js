document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');
    
    // Make sure both elements exist before adding the event listener
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            console.log('Menu toggled');
        });
    } else {
        console.error('Navigation elements not found');
    }

    // Disable "Place Order" button if cart is empty
    const placeOrderButton = document.getElementById('placeOrderButton');
    if (placeOrderButton) {
        updatePlaceOrderButton();
    }

    // Load more products functionality
    const products = document.querySelectorAll('.product');
    let visibleProducts = 10;

    function showProducts(count) {
        products.forEach((product, index) => {
            product.style.display = index < count ? 'block' : 'none';
        });
    }

    function loadMoreProducts() {
        visibleProducts += 10;
        showProducts(visibleProducts);
        if (visibleProducts >= products.length) {
            document.getElementById('loadMoreButton').style.display = 'none';
        }
    }

    showProducts(visibleProducts);
    window.loadMoreProducts = loadMoreProducts;

    const loginLink = document.getElementById('login-link');
    
    console.log("Login Setup: ", loginLink);
    
    if (loginLink) {
        loginLink.href = "../index.html";
    }
 
    const loggedInUser = localStorage.getItem('loggedInUser');
    console.log("Logged in user: ", loggedInUser);
    
    if (loggedInUser && loginLink) {
        console.log("Setting up logged in state");
        loginLink.textContent = loggedInUser;
        loginLink.removeAttribute('href');
        loginLink.classList.remove('login-button');
        loginLink.classList.add('logged-in');
        loginLink.style.pointerEvents = 'auto';
        loginLink.style.cursor = 'pointer';
    }
});

// boys.html
function addToCart(item, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ item, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(item + ' has been added to your cart!');
    updatePlaceOrderButton();
}

function searchItems() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productName = product.querySelector('h2').textContent.toLowerCase();
        if (productName.includes(input)) {
            product.style.display = 'block'; // Show matching product
        } else {
            product.style.display = 'none'; // Hide non-matching product
        }
    });
}

// cart.html

function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Clear previous items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            cartItems.innerHTML += `
                <div class="cart-item">
                    <p>${item.item} - $${item.price} <button class="remove-button" onclick="removeItem(${index})">Remove</button></p>
                </div>
            `;
        });
    }
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove item from cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
    displayCart(); // Refresh cart display
    updatePlaceOrderButton();
}

function updatePlaceOrderButton() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const placeOrderButton = document.getElementById('placeOrderButton');
    if (placeOrderButton) {
        placeOrderButton.disabled = cart.length === 0;
    }
}

function showOrderForm() {
    const orderForm = document.getElementById('orderForm');
    orderForm.style.display = 'block'; // Show the order form
}

function submitOrder() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    if (name && address && phone) {
        alert(`Order placed successfully!\nName: ${name}\nAddress: ${address}\nPhone: ${phone}`);
        localStorage.removeItem('cart'); // Clear cart after order
        displayCart(); // Refresh cart display
        document.getElementById('orderForm').style.display = 'none'; // Hide the order form
    } else {
        alert('Please fill in all fields.');
    }
}

displayCart(); // Initial call to display cart items

// price filter
function filterByPrice(value) {
    document.getElementById('priceValue').innerText = `₹${value}`;
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const price = parseInt(product.querySelector('p').innerText.replace('Price: ₹', ''));
        if (price <= value) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}