document.addEventListener("DOMContentLoaded", loadCart);


document.querySelectorAll("nav ul li a").forEach(button => {
    button.addEventListener("click", function () {
        // Remove 'active' class from all buttons
        document.querySelectorAll("nav ul li a").forEach(btn => btn.classList.remove("active"));
        
        // Add 'active' class to the clicked button
        this.classList.add("active");
        
    });
});


function triggerCartAnimation() {
    let cartIcon = document.getElementById("cart-count");
    cartIcon.classList.add("cart-pop");
    setTimeout(() => cartIcon.classList.remove("cart-pop"), 500);
    
}


// Function to toggle the cart slider
// Function to toggle the cart slider
function toggleCart() {
    let cartElement = document.getElementById("cart");
    cartElement.classList.toggle("open");
}

// Attach event listener to both cart icon and cart text
document.getElementById("cart-icon").addEventListener("click", toggleCart);
document.getElementById("cart-text").addEventListener("click", toggleCart);

// Close cart when clicking outside
document.addEventListener("click", function (event) {
    let cart = document.getElementById("cart");
    let cartIcon = document.getElementById("cart-icon");
    let cartText = document.getElementById("cart-text");

    if (!cart.contains(event.target) && !cartIcon.contains(event.target) && !cartText.contains(event.target)) {
        cart.classList.remove("open");
    }
});


function addToCart(id, name, price, image, button) {
    let quantityInput = document.getElementById(`quantity-${id}`);
    let quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id, name, price, quantity, image });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();

    // 🎬 Lottie Animation Setup
    let btnText = button.querySelector(".btn-text");
    let lottieContainer = button.querySelector(".lottie-container");

    if (!lottieContainer) {
        console.warn("Lottie container not found!"); // Debugging log
        return; 
    }

    btnText.style.display = "none";
    lottieContainer.innerHTML = ""; 

    let animation = lottie.loadAnimation({
        container: lottieContainer,
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "https://lottie.host/a01a82ba-8182-4a52-956f-5973febbb878/5Ex2cZup3B.json"
    });

    animation.addEventListener("complete", function () {
        setTimeout(() => {
            btnText.style.display = "inline"; 
            lottieContainer.innerHTML = "";  
        }, 300);
    });
}

function playAddToCartAnimation(button) {
    let container = button.querySelector(".lottie-container");

    if (!container) {
        console.error("Lottie container not found!");
        return;
    }

    // Clear previous animation if any
    container.innerHTML = "";

    // Load animation
    let animation = lottie.loadAnimation({
        container: container,
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "animations/cart.json", // Ensure this file exists
    });

    animation.setSpeed(1.5); // Make animation faster
}






function updateQuantity(id, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        if (cart[itemIndex].quantity < 1) {
            removeFromCart(id);
            return; // Ensure function stops here after removal
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    }
}



function clearCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length > 0) {
        playSound(emptyCartSound); // Play sound if cart is not empty
    }
    
    localStorage.removeItem("cart"); // Clear localStorage
    document.getElementById("cart-items").innerHTML = ""; // Clear UI
    document.getElementById("total-price").textContent = "0"; // Reset total price
    document.getElementById("cart-count").textContent = "0"; // Reset count
}

function updateCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    let totalPrice = 0;
    let cartCount = 0;

    cartItemsContainer.innerHTML = ""; // Clear previous UI

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    }

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        cartCount += item.quantity;

        let itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.setAttribute("id", `cart-item-${item.id}`);
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name} - ₹${item.price} x ${item.quantity}</p>
            <button onclick="updateQuantity(${item.id}, -1)">-</button>
            <button onclick="updateQuantity(${item.id}, 1)">+</button>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    document.getElementById("total-price").textContent = totalPrice.toLocaleString();

    let cartCountElement = document.getElementById("cart-count");
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = cartCount > 0 ? "inline-block" : "none";
}



function loadCart() {
    updateCart();
}


function filterCategory(category) {
    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        if (category === "all" || product.classList.contains(category)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

// Search Functionality with "No Products Found" Message
function searchProducts() {
    let input = document.getElementById("search-input").value.toLowerCase();
    let products = document.querySelectorAll(".product");
    let noResults = document.getElementById("no-results");
    let found = false;

    products.forEach(product => {
        let name = product.dataset.name.toLowerCase();
        if (name.includes(input)) {
            product.style.display = "block";
            found = true;
        } else {
            product.style.display = "none";
        }
    });

    // Show "No products found" message if nothing matches
    if (!found) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }
}
// Load audio files
const removeSound = new Audio("sounds/remove.mp3");
const emptyCartSound = new Audio("sounds/empty.mp3");

function playSound(sound) {
    sound.currentTime = 0; // Reset sound if already playing
    sound.play();
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Before removal:", cart); // Debugging

    // Remove item from cart array
    cart = cart.filter(item => item.id !== id);
    
    // Update local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the UI
    updateCart();
    
    console.log("After removal:", cart); // Debugging
}




function clearCart() {
    // Check if cart is empty before clearing
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        console.log("Cart is already empty!");
        return; 
    }

    localStorage.removeItem("cart"); // Clear localStorage
    updateCart(); // Refresh the cart UI
    console.log("Cart has been emptied.");
}
