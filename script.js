// Only redirect when user actually clicks the card, not the add-to-cart button
const products = document.querySelectorAll(".product-card")
products.forEach(product=>{
  product.addEventListener("click",(e)=>{
    // Stop if clicked on add-to-cart button
    if(e.target.closest('.add-to-cart')) return;

    const name = product.getAttribute('data-name')
    const price = product.getAttribute('data-price')
    const id = product.getAttribute('data-id')
    const image = product.querySelector("img").getAttribute("src")
    const selectedProduct = { name, price, id, image };
          
    localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));

    // Comment out or remove this if you want no redirect
    // window.location.href = "product.html";
  })
})




document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartCount = document.getElementById("cart-count");
  const cartIcon = document.getElementById("cart-icon");
  const cartPopup = document.getElementById("cart-popup");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const closeCartBtn = document.getElementById("close-cart");

  function updateCartCounter() {
    cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
      total += item.price * item.quantity;
      const div = document.createElement('div');
      div.innerHTML = `
        <span>${item.name} x ${item.quantity}</span>
        <span>₹${item.price * item.quantity}
          <button class="remove-item" data-id="${item.id}">Remove</button>
        </span>
      `;
      cartItemsContainer.appendChild(div);
    });

    cartTotal.innerText = total;

    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        cart = cart.filter(p => p.id !== id);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCounter();
        renderCart();
      });
    });
  }

  function addToCart(productCard) {
    const product = {
      id: productCard.getAttribute('data-id'),
      name: productCard.getAttribute('data-name'),
      price: parseInt(productCard.getAttribute('data-price')),
      quantity: 1
    };

    const existing = cart.find(p => p.id === product.id);
    if (existing) existing.quantity += 1;
    else cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
    renderCart();
  }

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const card = btn.closest(".product-card");
      addToCart(card);
    });
  });

  updateCartCounter();
  renderCart();

  cartIcon.addEventListener('click', e => {
    e.preventDefault();
    cartPopup.style.display = cartPopup.style.display === 'flex' ? 'none' : 'flex';
  });

  closeCartBtn.addEventListener('click', () => cartPopup.style.display = 'none');

  // ------------------------
  // SEARCH FUNCTIONALITY
  // ------------------------
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const featuredSection = document.querySelector('.features');
  const resultsSection = document.querySelector('.search-results');
  const resultsGrid = document.getElementById('resultsGrid');

  resultsSection.style.display = 'none';
  const originalCards = Array.from(document.querySelectorAll('.features .product-card')).map(c => c.cloneNode(true));

  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
      featuredSection.style.display = 'block';
      resultsSection.style.display = 'none';
      return;
    }

    featuredSection.style.display = 'none';
    resultsSection.style.display = 'block';
    resultsGrid.innerHTML = '';

    let hasResults = false;
    originalCards.forEach(card => {
      if (card.getAttribute('data-name').toLowerCase().includes(query)) {
        resultsGrid.appendChild(card.cloneNode(true));
        hasResults = true;
      }
    });

    if (!hasResults) resultsGrid.innerHTML = '<p>No products found.</p>';

    const backBtn = document.createElement('button');
    backBtn.textContent = '⬅ Back to Featured';
    backBtn.style.marginTop = '10px';
    backBtn.style.padding = '6px 12px';
    backBtn.style.background = '#0072ff';
    backBtn.style.color = '#fff';
    backBtn.style.border = 'none';
    backBtn.style.borderRadius = '6px';
    backBtn.style.cursor = 'pointer';
    backBtn.addEventListener('click', () => {
      searchInput.value = '';
      featuredSection.style.display = 'block';
      resultsSection.style.display = 'none';
    });

    resultsGrid.appendChild(backBtn);

    // Reattach add-to-cart listeners for search results
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const card = btn.closest('.product-card');
        addToCart(card);
      });
    });
  }

  searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') performSearch(); });
  searchBtn.addEventListener('click', performSearch);
});

