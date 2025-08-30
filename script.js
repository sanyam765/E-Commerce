const products = document.querySelectorAll(".product-card")
products.forEach(product=>{
  product.addEventListener("click",()=>{
const name = product.getAttribute('data-name')
const price = product.getAttribute('data-price')
const id = product.getAttribute('data-id')
const image = product.querySelector("img").getAttribute("src")
const selectedProduct = { name, price, id, image };

      
      localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));

      window.location.href = "product.html";
  })
})

const searchInput = document.getElementById("searchInput");
const resultsDiv = document.querySelector(".search-results");
const resultsGrid = document.getElementById("resultsGrid");
const productCards = document.querySelectorAll(".product-card");

// Live search
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  if (query.trim() === "") {
    resultsDiv.style.display = "none"; // hide results
    document.querySelector(".features").style.display = "block"; // show main grid
    return;
  }

  resultsGrid.innerHTML = ""; // clear old results
  let found = false;

  productCards.forEach(card => {
    const name = card.getAttribute("data-name").toLowerCase();

    if (name.includes(query)) {
      found = true;
      const clone = card.cloneNode(true); // copy product
      resultsGrid.appendChild(clone);
    }
  });

  if (found) {
    resultsDiv.style.display = "block";  // show results section
    document.querySelector(".features").style.display = "none"; // hide main grid
  } else {
    resultsDiv.innerHTML = "<p>No products found</p>";
    resultsDiv.style.display = "block";
    document.querySelector(".features").style.display = "none";
  }
});


// Cart array (load from localStorage if available)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart counter on load
document.getElementById("cart-count").innerText = cart.length;

// Select all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    event.preventDefault(); // stop page reload if <a href="#">
    
    // Find product card
    const productCard = button.closest(".product-card");
    
    // Get product details from data attributes
    const product = {
      id: productCard.getAttribute("data-id"),
      name: productCard.getAttribute("data-name"),
      price: parseInt(productCard.getAttribute("data-price")),
      quantity: 1
    };

    // Check if already in cart
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1; // increase quantity
    } else {
      cart.push(product); // add new product
    }

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update counter
    document.getElementById("cart-count").innerText = cart.length;
  });
});


