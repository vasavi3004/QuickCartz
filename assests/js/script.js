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
        console.log('Navigation elements not found');
    }

    // Disable "Place Order" button if cart is empty
    const placeOrderButton = document.getElementById('placeOrderButton');
    if (placeOrderButton) {
        updatePlaceOrderButton();
    }

    // Initialize price filter if it exists
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        filterByPrice(priceRange.value);
    }

    // Load more products functionality
    const products = document.querySelectorAll('.product');
    let visibleProducts = 10;

    if (products.length > 0) {
        function showProducts(count) {
            products.forEach((product, index) => {
                product.style.display = index < count ? 'block' : 'none';
            });
        }

        function loadMoreProducts() {
            visibleProducts += 10;
            showProducts(visibleProducts);
            if (visibleProducts >= products.length) {
                const loadMoreBtn = document.getElementById('loadMoreButton');
                if (loadMoreBtn) {
                    loadMoreBtn.style.display = 'none';
                }
            }
        }

        showProducts(visibleProducts);
        window.loadMoreProducts = loadMoreProducts;
    }

    // Setup login link behavior
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

    // Display cart items if we're on cart page
    const cartList = document.getElementById('cart-list');
    if (cartList) {
        displayCart();
    }
});

// Add to Cart function - Making it globally available
window.addToCart = function(item, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ item, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(item + ' has been added to your cart!');
    updatePlaceOrderButton();
}

// Search functionality
window.searchItems = function() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const products = document.querySelectorAll('.product');
    let found = false;

    products.forEach(product => {
        const productName = product.querySelector('h2').textContent.toLowerCase();
        if (productName.includes(input)) {
            product.style.display = 'block'; // Show matching product
            found = true;
        } else {
            product.style.display = 'none'; // Hide non-matching product
        }
    });

    // Show or hide the "No products found" message
    const noResults = document.getElementById('noResults');
    if (noResults) {
        noResults.style.display = found ? 'none' : 'block';
    }
}

// Price filter functionality
window.filterByPrice = function(value) {
    const priceValue = document.getElementById('priceValue');
    if (priceValue) {
        priceValue.innerText = `₹${value}`;
    }
    
    const products = document.querySelectorAll('.product');
    let found = false;
    
    products.forEach(product => {
        const priceText = product.querySelector('p').innerText;
        const price = parseInt(priceText.replace('Price: ₹', ''));
        if (price <= parseInt(value)) {
            product.style.display = 'block';
            found = true;
        } else {
            product.style.display = 'none';
        }
    });
    
    // Show or hide the "No products found" message
    const noResults = document.getElementById('noResults');
    if (noResults) {
        noResults.style.display = found ? 'none' : 'block';
    }
}

// Cart display and management functions
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItems = document.getElementById('cart-list');
    
    if (!cartItems) return;
    
    cartItems.innerHTML = ''; // Clear previous items

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            cartItems.innerHTML += `
                <div class="cart-item">
                    <p>${item.item} - ₹${item.price} <button class="remove-button" onclick="removeItem(${index})">Remove</button></p>
                </div>
            `;
        });
    }
}

window.removeItem = function(index) {
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

window.placeOrder = function() {
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let pinCode = document.getElementById('pin-code').value;
    let paymentMethod = document.getElementById('payment-method').value;
    let paymentDetails = document.getElementById('payment-details').value;

    // Validation
    if (!name || !phone || !address || !pinCode) {
        alert('Please fill in all required fields.');
        return;
    }

    if (phone.length < 10 || isNaN(phone)) {
        alert("Please enter a valid phone number.");
        return;
    }

    if (paymentMethod !== 'cod' && paymentDetails === "") {
        alert("Please enter your payment details.");
        return;
    }

    let paymentSuccess = Math.random() > 0.2;
    if (!paymentSuccess) {
        alert("Payment failed! Please try again.");
        return;
    }

    alert("Payment successful! Your order is being processed.");
    document.getElementById('tracking-status').innerText = 'Processing';

    let estimatedTime = new Date();
    let lateNightOption = document.getElementById('late-night').value;
    let randomHour = lateNightOption === 'yes' ? Math.floor(Math.random() * 5) + 19 : Math.floor(Math.random() * 10) + 8;
    let randomMinute = Math.floor(Math.random() * 60);
    estimatedTime.setHours(randomHour, randomMinute, 0);
    document.getElementById('delivery-time').innerText = estimatedTime.toLocaleString();

    alert('Your order has been placed successfully!');
    
    localStorage.removeItem('cart'); // Clear cart after order
    displayCart(); // Refresh cart display
    updatePlaceOrderButton();
}

// Make the loadMoreProducts function available globally
window.loadMoreProducts = function() {
    const products = document.querySelectorAll('.product');
    let visibleProducts = 0;
    
    // Count currently visible products
    products.forEach(product => {
        if (product.style.display !== 'none') {
            visibleProducts++;
        }
    });
    
    // Show more products
    let newCount = visibleProducts + 10;
    let shownCount = 0;
    
    products.forEach(product => {
        if (shownCount < newCount) {
            product.style.display = 'block';
            shownCount++;
        }
    });
    
    // Hide load more button if all products are shown
    if (shownCount >= products.length) {
        const loadMoreBtn = document.getElementById('loadMoreButton');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }
}