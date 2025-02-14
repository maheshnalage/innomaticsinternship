
const removeSound = new Audio("sounds/remove.mp3");
const emptyCartSound = new Audio("sounds/empty.mp3");

function playSound(sound) {
    sound.currentTime = 0; 
    sound.play();
}



function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let productDiv = document.querySelector(`.product[data-id="${id}"]`);
    let quantityControls = productDiv ? productDiv.querySelector(".quantity-controls") : null;

    console.log("Before removal:", cart); 
   
    let itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        playSound(removeSound); 
    }

   
    cart = cart.filter(item => item.id !== id);

    
    localStorage.setItem("cart", JSON.stringify(cart));

    
    updateCart();
    
    console.log("After removal:", cart); 

    
    if (quantityControls) {
        quantityControls.style.display = "none";
    }
}



function clearCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length > 0) {
        playSound(emptyCartSound); 
    }

    localStorage.removeItem("cart"); 
    updateCart(); 

   
    document.querySelectorAll(".quantity-controls").forEach(control => {
        control.style.display = "none";
    });

    console.log("Cart has been emptied.");
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".product").forEach(product => {
        let minusBtn = product.querySelector(".quantity-minus");
        let plusBtn = product.querySelector(".quantity-plus");
        let quantityInput = product.querySelector(".quantity-input");

        if (minusBtn && plusBtn && quantityInput) {
            minusBtn.addEventListener("click", function () {
                let quantity = parseInt(quantityInput.value) || 1;
                if (quantity > 1) {
                    quantityInput.value = quantity - 1;
                }
            });

            plusBtn.addEventListener("click", function () {
                let quantity = parseInt(quantityInput.value) || 1;
                quantityInput.value = quantity + 1;
            });
        }
    });
});





document.addEventListener("DOMContentLoaded", loadCart);


document.querySelectorAll("nav ul li a").forEach(button => {
    button.addEventListener("click", function () {
        
        document.querySelectorAll("nav ul li a").forEach(btn => btn.classList.remove("active"));
        
      
        this.classList.add("active");
        
    });
});


function triggerCartAnimation() {
    let cartIcon = document.getElementById("cart-count");
    cartIcon.classList.add("cart-pop");
    setTimeout(() => cartIcon.classList.remove("cart-pop"), 500);
    
}



function toggleCart() {
    let cartElement = document.getElementById("cart");
    cartElement.classList.toggle("open");
}


document.getElementById("cart-icon").addEventListener("click", toggleCart);
document.getElementById("cart-text").addEventListener("click", toggleCart);


document.addEventListener("click", function (event) {
    let cart = document.getElementById("cart");
    let cartIcon = document.getElementById("cart-icon");
    let cartText = document.getElementById("cart-text");

    if (!cart.contains(event.target) && !cartIcon.contains(event.target) && !cartText.contains(event.target)) {
        cart.classList.remove("open");
    }
});



function addToCart(id, name, price, image, button) {
    let productDiv = button.closest(".product"); 
    let quantityInput = productDiv.querySelector(".quantity-input"); 
    let quantity = parseInt(quantityInput.value) || 1; 
    let quantityControls = productDiv.querySelector(".quantity-controls"); 
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += quantity; 
    } else {
        cart.push({ id, name, price, quantity, image }); 
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    triggerCartAnimation(); 

   
    let btnText = button.querySelector(".btn-text");
    let lottieContainer = button.querySelector(".lottie-container");

    if (!lottieContainer) {
        console.warn("Lottie container not found!"); 
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

    
    if (quantityControls) {
        quantityControls.style.display = "flex";
    }
}



function playAddToCartAnimation(button) {
    let container = button.querySelector(".lottie-container");

    if (!container) {
        console.error("Lottie container not found!");
        return;
    }

   
    container.innerHTML = "";

   
    let animation = lottie.loadAnimation({
        container: container,
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "animations/cart.json", 
    });

    animation.setSpeed(1.5); 
}






function updateQuantity(id, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        if (cart[itemIndex].quantity < 1) {
            removeFromCart(id);
            return; 
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    }
}

function updateCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCount = 0;

   
    cart.forEach(item => {
        cartCount += item.quantity;
    });

    
    let cartCountElement = document.getElementById("cart-count");
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = cartCount > 0 ? "inline" : "none"; 

   
    let cartItemsContainer = document.getElementById("cart-items");
    let totalPrice = 0;
    cartItemsContainer.innerHTML = ""; 

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
       
        let totalItemsElement = document.createElement("p");
        totalItemsElement.innerHTML = `<strong>Total Items: ${cartCount}</strong>`;
        cartItemsContainer.appendChild(totalItemsElement);
    }

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        let itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
            <p>${item.name} - ₹${item.price} x ${item.quantity}</p>
            <button onclick="updateQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${item.id}, 1)">+</button>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    document.getElementById("total-price").textContent = totalPrice.toLocaleString();
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

   
    if (!found) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }
}

document.querySelectorAll(".product").forEach(product => {
    product.addEventListener("click", function () {
        this.classList.add("selected-effect");

        
        setTimeout(() => {
            this.classList.remove("selected-effect");
        }, 300);
    });
});
