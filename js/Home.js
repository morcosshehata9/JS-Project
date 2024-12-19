
const slider = document.getElementById("slider");

window.onload = function () {
    getSomeProducts();
};


document.addEventListener("DOMContentLoaded", function () {
    var logoutBtn = document.getElementById("logout");
    var loginBtn = document.getElementById("login");
    var signupBtn = document.getElementById("signup");

    var loggedInUser = localStorage.getItem("loggedInUser");
    var users = JSON.parse(localStorage.getItem("users"));

    var username = document.getElementById("welcomeuser");

    if (loggedInUser && users) {
        var choosenUser = users.find(user => user.id == loggedInUser);
        if (choosenUser) {
            console.log(choosenUser);
            username.innerHTML = `Welcome, ${choosenUser.name}`;
            username.style.display = "inline-block";

            loginBtn.style.display = "none";
            signupBtn.style.display = "none";
            logoutBtn.style.display = "inline-block";
        } else {
            console.error("User not found in users array");
        }
    } else {
        loginBtn.style.display = "inline-block";
        signupBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
    }
});

const images = [    
    "images/download.jpg",
    "images/slider-1.jpg",
    "images/hero_2.jpg",
    "images/hero_1.jpg",
];

let currentIndex = 0;


function prev() {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    updateSlider();
}

function next() {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    updateSlider();
}

function updateSlider() {
    slider.style.opacity = 0;
    setTimeout(() => {
        slider.src = images[currentIndex];
        slider.style.opacity = 1;
    }, 500);
}


setInterval(() => {
    next();
}, 3000);


function confirmThisBuy() {
    let loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        alert("You must be logged in to buy!.");
        window.location.href = "signin.html";
        return;
    }
    else {
        if (confirm("Are you sure to buy?")) {
            window.location.href = "success.html"
        }
    }
}

var btn1 = document.getElementById("Our-Products");
var btn2 = document.getElementById("Pizza");
var btn3 = document.getElementById("Berger");
var btn4 = document.getElementById("Lazaniz");
console.log(btn1);



function logout() {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("cart");
    alert("You have been logged out.");
    window.location.href = "index.html";
}

function getAllProducts() {
    btn1.classList.add("activeBtn");
    btn2.classList.remove("activeBtn");
    btn3.classList.remove("activeBtn");
    btn4.classList.remove("activeBtn");
    fetch('http://localhost:3000/menu')
        .then(respone => respone.json())
        .then(data => {
            var product_grid = document.getElementById("product-grid");
            product_grid.innerHTML = '';
            data.forEach(item => {

                var product_card = document.createElement("div")
                product_card.classList.add("product-card")
                product_grid.append(product_card);

                var product_img = document.createElement("div")
                product_img.classList.add("product-image")
                product_img.innerHTML = `<img src="${item.image}" alt="${item.name}">`
                product_card.append(product_img);

                var product_details = document.createElement("div")
                product_details.classList.add("product-details")
                product_details.innerHTML = `<h2 class="product-name">${item.name}</h2>
                                <p class="product-price">${item.price}$</p>
                                 <button class="add-to-cart-btn" onclick="passElementToCart(${item.id})">Add to Cart</button>
                                <button class="add-to-cart-btn" onclick="passItemToDetails(${item.id})">Details</button>`;

                product_card.append(product_details);

            });

        })
        .catch(error => {
            console.error('Error loading menu:', error);
        });
}


function getSomeProducts() {

    fetch('http://localhost:3000/menu')
        .then(respone => respone.json())
        .then(data => {
            var product_grid = document.getElementById("product-grid");
            product_grid.innerHTML = '';

            const productsToShow = data.slice(0, 12);

            productsToShow.forEach(item => {

                var product_card = document.createElement("div")
                product_card.classList.add("product-card")
                product_grid.append(product_card);

                var product_img = document.createElement("div")
                product_img.classList.add("product-image")
                product_img.innerHTML = `<img src="${item.image}" alt="${item.name}">`
                product_card.append(product_img);

                var product_details = document.createElement("div")
                product_details.classList.add("product-details")
                product_details.innerHTML = `<h2 class="product-name">${item.name}</h2>
                                <p class="product-price">${item.price}$</p>
                                <button class="add-to-cart-btn" onclick="passElementToCart(${item.id})">Add to Cart</button>
                                <button class="add-to-cart-btn" onclick="passItemToDetails(${item.id})">Details</button>`;

                product_card.append(product_details);

            });

        })
        .catch(error => {
            console.error('Error loading menu:', error);
        });
}

function getPizza() {
    btn1.classList.remove("activeBtn");
    btn2.classList.add("activeBtn");
    btn3.classList.remove("activeBtn");
    btn4.classList.remove("activeBtn");

    fetch('http://localhost:3000/menu')
        .then(respone => respone.json())
        .then(data => {
            var product_grid = document.getElementById("product-grid");
            product_grid.innerHTML = '';
            data.forEach(item => {
                if (item.category == "Pizza") {

                    var product_card = document.createElement("div")
                    product_card.classList.add("product-card")
                    product_grid.append(product_card);

                    var product_img = document.createElement("div")
                    product_img.classList.add("product-image")
                    product_img.innerHTML = `<img src="${item.image}" alt="${item.name}">`
                    product_card.append(product_img);

                    var product_details = document.createElement("div")
                    product_details.classList.add("product-details")
                    product_details.innerHTML = `<h2 class="product-name">${item.name}</h2>
                                <p class="product-price">${item.price}$</p>
                                 <button class="add-to-cart-btn" onclick="passElementToCart(${item.id})">Add to Cart</button>
                                <button class="add-to-cart-btn" onclick="passItemToDetails(${item.id})">Details</button>`;
                    product_card.append(product_details);
                }

            });

        })
        .catch(error => {
            console.error('Error loading menu:', error);
        });

}

function getBurger() {
    btn1.classList.remove("activeBtn");
    btn2.classList.remove("activeBtn");
    btn3.classList.add("activeBtn");
    btn4.classList.remove("activeBtn");
    fetch('http://localhost:3000/menu')
        .then(respone => respone.json())
        .then(data => {
            var product_grid = document.getElementById("product-grid");
            product_grid.innerHTML = '';
            data.forEach(item => {
                if (item.category == "Burger") {

                    var product_card = document.createElement("div")
                    product_card.classList.add("product-card")
                    product_grid.append(product_card);

                    var product_img = document.createElement("div")
                    product_img.classList.add("product-image")
                    product_img.innerHTML = `<img src="${item.image}" alt="${item.name}">`
                    product_card.append(product_img);

                    var product_details = document.createElement("div")
                    product_details.classList.add("product-details")
                    product_details.innerHTML = `<h2 class="product-name">${item.name}</h2>
                                <p class="product-price">${item.price}$</p>
                                 <button class="add-to-cart-btn" onclick="passElementToCart(${item.id})">Add to Cart</button>
                                <button class="add-to-cart-btn" onclick="passItemToDetails(${item.id})">Details</button>`;

                    product_card.append(product_details);
                }

            });

        })
        .catch(error => {
            console.error('Error loading menu:', error);
        });

}
function getFriedChicken() {

    btn1.classList.remove("activeBtn");
    btn2.classList.remove("activeBtn");
    btn3.classList.remove("activeBtn");
    btn4.classList.add("activeBtn");
    fetch('http://localhost:3000/menu')
        .then(respone => respone.json())
        .then(data => {
            var product_grid = document.getElementById("product-grid");
            product_grid.innerHTML = '';
            data.forEach(item => {
                if (item.category == "Fried Chicken") {

                    var product_card = document.createElement("div")
                    product_card.classList.add("product-card")
                    product_grid.append(product_card);

                    var product_img = document.createElement("div")
                    product_img.classList.add("product-image")
                    product_img.innerHTML = `<img src="${item.image}" alt="${item.name}">`
                    product_card.append(product_img);

                    var product_details = document.createElement("div")
                    product_details.classList.add("product-details")
                    product_details.innerHTML = `<h2 class="product-name">${item.name}</h2>
                                <p class="product-price">${item.price}$</p>
                                 <button class="add-to-cart-btn" onclick="passElementToCart(${item.id})">Add to Cart</button>
                                <button class="add-to-cart-btn" onclick="passItemToDetails(${item.id})">Details</button>`;

                    product_card.append(product_details);
                }

            });

        })
        .catch(error => {
            console.error('Error loading menu:', error);
        });

}

function passElementToCartFromDetails(productid) {


    fetch('http://localhost:3000/menu')
        .then(response => response.json())
        .then(data => {
            const product = data.find(item => item.id == productid);
            if (product) {
                const cart = JSON.parse(localStorage.getItem("cart")) || [];

                const existingProduct = cart.find(item => item.id == productid);
                if (existingProduct) {
                    alert(`${existingProduct.name} add with updated counter`);
                } else {
                    cart.push({ ...product });
                    localStorage.setItem("cart", JSON.stringify(cart));
                    alert(`${product.name} added to the cart!`);
                }
            }
            else {
                console.error("Product not found!");
            }
        })
        .catch(error => {
            console.error("Error fetching products:", error);
        });
}

function passElementToCart(productid) {


    fetch('http://localhost:3000/menu')
        .then(response => response.json())
        .then(data => {
            const product = data.find(item => item.id == productid);
            if (product) {
                const cart = JSON.parse(localStorage.getItem("cart")) || [];

                const existingProduct = cart.find(item => item.id == productid);
                if (existingProduct) {
                    alert("This product is in the cart already!!!");
                } else {
                    cart.push({ ...product, quantity: 1 });
                    localStorage.setItem("cart", JSON.stringify(cart));
                    alert(`${product.name} added to the cart!`);
                }


            } else {
                console.error("Product not found!");
            }
        })
        .catch(error => {
            console.error("Error fetching products:", error);
        });
}

function loadCart() {
    const table_body = document.getElementsByTagName("tbody")[0];
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Clear previous cart details
    table_body.innerHTML = '';

    var buyBtn = document.getElementById("butBtn");
    if (cart.length === 0) {

        buyBtn.style.cssText = "display: none;";
        table_body.innerHTML = "<tr><td colspan='6'>Cart is empty!!!</td></tr>";
        document.getElementById("cart-total").innerHTML = "";
        return;
    }
    buyBtn.style.cssText = "display: inline-block;";
    let totalPrice = 0;
    let shippingCost = 0;
    const shippingThreshold = 50;
    const shippingRate = 5;

    cart.forEach(product => {
        const tr = document.createElement("tr");

        const imgTd = document.createElement("td");
        imgTd.innerHTML = `<img src="${product.image}" alt="${product.name}" class="product-img">`;

        const nameTd = document.createElement("td");
        nameTd.innerHTML = product.name;

        const priceTd = document.createElement("td");
        priceTd.innerHTML = product.price;

        const quantityTd = document.createElement("td");
        const control = document.createElement("div");
        control.classList.add("quantity-controls");
        control.innerHTML = `
            <button class="decrease-btn" onclick="updateQuantity(${product.id}, -1)">-</button>
            <span class="quantity">${product.quantity}</span>
            <button class="increase-btn" onclick="updateQuantity(${product.id}, 1)">+</button>
        `;
        quantityTd.appendChild(control);

        const totalTd = document.createElement("td");
        const productTotal = product.price * product.quantity;
        totalTd.innerHTML = productTotal;

        // Add to total price
        totalPrice += productTotal;

        // Remove button
        const removeTd = document.createElement("td");
        removeTd.innerHTML = `<button class="remove-btn" onclick="removeProduct(${product.id})">&#10006;</button>`;

        tr.append(imgTd, nameTd, priceTd, quantityTd, totalTd, removeTd);

        table_body.appendChild(tr);
    });

    if (totalPrice >= shippingThreshold) {
        shippingCost = 0;
    } else {
        shippingCost = shippingRate;
    }

    const overallTotal = totalPrice + shippingCost;

    const cartTotalSection = document.getElementById("cart-total");

    let shippingMessage = '';
    if (shippingCost === 0) {
        shippingMessage = `<p class="free-shipping">Free Shipping Applied!</p>`;
    } else {
        shippingMessage = `<p class="shipping-cost">Shipping: $${shippingCost.toFixed(2)}</p>
                           <p class="info">Take free shipping if your total above 50$ !!</p>`;
    }

    cartTotalSection.innerHTML = `
        <div>
            <p class="total-price">Total Price: $${totalPrice.toFixed(2)}</p>
            ${shippingMessage}
            <p class="overall-total"><strong>Overall Total: $${overallTotal.toFixed(2)}</strong></p>
        </div>
    `;
}


function updateQuantity(productId, change) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    var product = cart.find(item => item.id == productId);
    if (product) {
        product.quantity += change;

        if (product.quantity <= 0) {
            removeProduct(productId);
        }
        else {
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        }
    }

}
function updateQuantityInDetails(productId, change) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = cart.find(item => item.id == productId);

    if (!product) {
        fetch('http://localhost:3000/menu')
            .then(response => response.json())
            .then(data => {
                product = data.find(item => item.id == productId);
                if (product) {
                    product.quantity = 1; // Default quantity
                    product.quantity = change;
                    cart.push(product);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    document.querySelector(`#quantity-${productId}`).textContent = product.quantity;
                } else {
                    console.error('Product not found');
                }
            })
            .catch(error => console.error('Error fetching product:', error));
    } else {
        product.quantity += change;

        if (product.quantity <= 0) {
            removeProduct(productId);
            document.querySelector(`#quantity-${productId}`).textContent = 0;
        } else {
            localStorage.setItem("cart", JSON.stringify(cart));
            document.querySelector(`#quantity-${productId}`).textContent = product.quantity;
        }
    }
}


function removeProduct(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id != productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

document.addEventListener("DOMContentLoaded", loadCart);


function passItemToDetails(itemid) {
    fetch('http://localhost:3000/menu')
        .then(response => response.json())
        .then(data => {
            var product = data.find(item => item.id == itemid);
            if (product) {
                localStorage.setItem("details", JSON.stringify([product])) // ---- 
                window.location.href = "details.html";
            }
            else {
                console.error("Product not found!");
            }
        })
        .catch(error => {
            console.error("Error fetching products:", error);
        });
}

function displayDetails() {
    var details = JSON.parse(localStorage.getItem("details")) || [];
    if (details.length == 0) {
        console.error("Item not found!!");
        return;
    }

    details.forEach(item => {

        var imgDiv = document.getElementById("left");
        imgDiv.innerHTML = "";
        var imgIeam = document.createElement("img");
        imgIeam.setAttribute("src", `${item.image}`);
        imgDiv.append(imgIeam);

        var card = document.getElementById("card");
        card.innerHTML = `<h1 style="font-size: 50px; margin-bottom: 5px;">${item.name}</h1>`;

        var pCat = document.createElement("p");
        pCat.classList.add("category");
        pCat.innerHTML = `Category: ${item.category}`;

        var pPrice = document.createElement("p");
        pPrice.classList.add("price");
        pPrice.innerHTML = `Price: ${item.price}$`;

        var divRate = document.createElement("div");
        divRate.classList.add("rating");
        divRate.innerHTML = `
                                    <i class="star">★</i>
                                    <i class="star">★</i>
                                    <i class="star">★</i>
                                    <i class="star">★</i>
                                    <i class="star gray">★</i>`;

        var divDes = document.createElement("div");
        divDes.classList.add("description");
        divDes.innerHTML = `Description: ${item.description}`;

        var divQuantity = document.createElement("div");
        divQuantity.classList.add("quantity-controls");
        divQuantity.innerHTML = `
                                    <button class="decrease-btn" onclick="updateQuantityInDetails(${item.id}, -1)">-</button>
                                     <span id="quantity-${item.id}" class="quantity">${item.quantity || 1}</span>
                                    <button class="increase-btn" onclick="updateQuantityInDetails(${item.id}, 1)">+</button>`;

        var cartButton = document.createElement("button");
        cartButton.classList.add("add-to-cart");
        cartButton.setAttribute("onclick", `passElementToCartFromDetails(${item.id})`)
        cartButton.innerHTML = `Add to cart`;

        card.append(pCat, pPrice, divRate, divDes, divQuantity, cartButton);


    });


}
document.addEventListener("DOMContentLoaded", displayDetails);

let mybutton = document.getElementById("backToTopBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0; 
}