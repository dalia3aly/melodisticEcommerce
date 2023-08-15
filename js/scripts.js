/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

// The divided product arrays by page identifier



const onEarProducts = [
    { name: 'Sony On Ear Headphones', price: 150.00, image: 'assets/hp1.png' },
    { name: 'JBL Wireless Headphone', price: 208.00, image: 'assets/hp2.png' },
    { name: 'Beats Wireless Headphones', price: 420, image: 'assets/hp.png' },
    { name: 'Ferrari World Wireless Headphones', price: 560.00, image: 'assets/hp4.png' },
    { name: 'Alien Wireless Headphones', price: 125.00, image: 'assets/hp3.png' },
    { name: 'Sennheiser Wireless Headphones', price: 380.00, image: 'assets/hp5.png' },
    { name: 'Bose Wireless Headphones', price: 400.00, image: 'assets/hp6.png' },
    { name: 'Razer Gaming Headset', price: 170.00, image: 'assets/hp8.png' },
];

const inEarProducts = [
    { name: 'Sony In Ear Wired Headphones', price: 84.00, image: 'assets/iehp1.png' },
    { name: 'Alien In Ear Wired Headphones', price: 65.00, image: 'assets/iehp2.png' },
    { name: 'Xiaomi In Ear Wired Headphones', price: 150.00, image: 'assets/iehp3.png' },
    { name: 'In Ear Wireless Bluetooth Headphones', price: 210.00, image: 'assets/iehp4.png' },
];

const homeProducts = onEarProducts.slice(0, 4);

//for search bar
const allProducts = [...onEarProducts, ...inEarProducts];


const pageIdentifier = document.body.id;

let productsToShow;

switch (pageIdentifier) {
    case 'home':
        productsToShow = homeProducts;
        break;
    case 'onearrange':
        productsToShow = onEarProducts;
        break;
    case 'inearrange':
        productsToShow = inEarProducts;
        break;
    default:
        productsToShow = []; // Or any default set of products
        break;
}

// Now you can use 'productsToShow' to display the products for the current page
productsToShow.forEach(product => {
    addCard(product.name, product.price, product.image);
});


function productCardTemplate(productName, productPrice, productImage) {
    return `
    <div class="col-md-4 mb-5">
            <div class="card h-100">
                <img class="card-img-top" src="${productImage}" alt="${productName}">
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${productName}</h5>
                        <p>$${productPrice.toFixed(2)}</p>
                        <div class="d-flex justify-content-center small text-warning mb-2">
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                        </div>
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                        <a class="btn btn-outline-dark mt-auto" href="#" onclick="addToCart('${productName}', ${productPrice})">Add to cart</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    }

    function addCard(productName, productPrice, productImage) {
        const cardHtml = productCardTemplate(productName, productPrice, productImage);
        const container = document.querySelector('.py-5 .container .row');
        const div = document.createElement('div');
        div.innerHTML = cardHtml.trim();
        container.appendChild(div.firstChild);
    }


//checkout

        const cart = {
            items: JSON.parse(localStorage.getItem('cart') || '[]'),
            count: JSON.parse(localStorage.getItem('cart') || '[]').length, // UPDATE CART COUNT HERE
        };


        function addToCart(productName, productPrice) {
            cart.items.push({ name: productName, price: productPrice });
            localStorage.setItem('cart', JSON.stringify(cart.items)); // Update the cart in local storage
            
            updateCartCount(); // Update the cart count
        
            displayCart(); // Refresh the display
        }

        function updateCartCount() {
            const cartCountEl = document.getElementById('cart-count');
            cartCountEl.innerText = JSON.parse(localStorage.getItem('cart') || '[]').length;
            
        }



        function displayCart() {
            const cartItemsDiv = document.getElementById('cart-items');
            cartItemsDiv.innerHTML = ''; // Clear previous items
        
            const table = document.createElement('table');
            table.className = 'table table-striped'; // Apply Bootstrap classes
        
            // Create header row
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = `
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
            `;
            thead.appendChild(headerRow);
            table.appendChild(thead);
        
            // TABLE BODY FOR EACH ITEM IN THE CART
            const tbody = document.createElement('tbody');
            cart.items.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td><button onclick="removeItem(${index})" class="btn btn-danger">Remove</button></td>
                `;
                tbody.appendChild(row);
            });
            table.appendChild(tbody);
        
            cartItemsDiv.appendChild(table);
        }
        
        
        // Call this function on the checkout page to display the items
        displayCart();

        function checkout() {
            // Get the cart items element
            const cartItemsEl = document.getElementById('cart-items');
            // Get the current cart items
            const currentCartItems = cartItemsEl.innerText;
            // Get the cart count element
            const cartCountEl = document.getElementById('cart-count');
            // Get the current cart count
            const currentCartCount = parseInt(cartCountEl.innerText);
            // Clear the cart items
            cartItemsEl.innerText = '';
            // Set the cart count to 0
            cartCountEl.innerText = 0;
            // Create an alert
            alert(`You have purchased:\n${currentCartItems}`);
        }



                     //SORTING & SEARCHING TOOLS:


                     function sortProducts() {
                        const sortBy = document.getElementById('sort-options').value;
                    
                        switch (sortBy) {
                            case 'price-asc':
                                productsToShow.sort((a, b) => a.price - b.price);
                                break;
                            case 'price-desc':
                                productsToShow.sort((a, b) => b.price - a.price);
                                break;
                            default:
                                // Optional: You could add logic to reset the sorting to the original order
                                break;
                        }
                    
                        // Clear the current products
                        const productContainer = document.querySelector('.py-5 .container .row');
                        productContainer.innerHTML = '';
                    
                        // Re-add the products in their sorted order
                        productsToShow.forEach(product => {
                            addCard(product.name, product.price, product.image);
                        });
                    }

                    function searchProducts() {
                        const searchQuery = document.getElementById("search-input").value.toLowerCase();
                        const resultsContainer = document.querySelector('.py-5 .container .row'); // Targeting the product display row
                        resultsContainer.innerHTML = ""; // Clearing the existing products
                    
                        allProducts.forEach(function(product) { // Using the allProducts array to search across all products
                            if (product.name.toLowerCase().includes(searchQuery)) {
                                addCard(product.name, product.price, product.image); // Using the addCard function to append products
                            }
                        });
                    }
                    
                    document.getElementById('total-container').textContent = 'Total Price: $' + calculateTotal().toFixed(2);


        //CART MANAGEMENT/Removing items from cart

                        function removeItem(index) {
                            cart.items.splice(index, 1); // Remove the item from the array
                            localStorage.setItem('cart', JSON.stringify(cart.items)); // Update the cart in local storage
                        
                            // Update the cart count
                            const cartCountEl = document.getElementById('cart-count');
                            cartCountEl.innerText = cart.items.length; // Set the count to the current length of the cart items
                        
                            displayCart(); // Refresh the display
                            updateTotalDisplay(); // Update the total display <-- Added this line
                        }

                      
                        function updateProductDisplay() {
                            // Clear the current products
                            const productContainer = document.getElementById('products-container');
                            productContainer.innerHTML = '';
                          
                            // Re-add the products in their sorted order
                            productsToShow.forEach(product => {
                              addCard(product.name, product.price, product.image);
                            });
                          }                      
                          document.addEventListener("DOMContentLoaded", function() {
                            updateProductDisplay();
                            updateTotalDisplay()
                          });
                         
                            function calculateTotal() {
                                const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
                                let total = 0;
                                cart.items.forEach(item => {
                                    total += item.price;
                                });
                                return total;
                            }


                            function updateTotalDisplay() {
                                const total = calculateTotal(); // Call your existing calculateTotal function
                                const totalEl = document.getElementById('total-price'); // Get the element where you want to display the total
                                totalEl.innerText = `$${total.toFixed(2)}`; // Update the displayed total
                              }
                              


