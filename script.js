// Cart counter
let cartCount = 0;
const cartCounter = document.getElementById('cart-count');

// Select all add-to-cart buttons
const addCartButtons = document.querySelectorAll('.add-to-cart');

addCartButtons.forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault(); // prevent page jump
    cartCount++;
    cartCounter.textContent = cartCount;

    // Optional: store product info in cart array
    const productName = button.closest('.product-card').dataset.name;
    const productPrice = button.closest('.product-card').dataset.price;
    console.log(`Added to cart: ${productName} - ₹${productPrice}`);
  });
});
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    card.addEventListener('click', () => {
      const productData = {
        id: card.dataset.id,
        name: card.dataset.name,
        price: card.dataset.price,
        image: card.querySelector('img').src
      };

      // Save to localStorage
      localStorage.setItem('selectedProduct', JSON.stringify(productData));

      // Redirect to product details page
      window.location.href = 'product.html';
    });
  });
  // script.js (homepage)
const addToDetailPage = (productCard) => {
  const product = {
    name: productCard.dataset.name,
    price: productCard.dataset.price,
    image: productCard.querySelector('img').src, // full path
    brand: "HearHut"
  };
  localStorage.setItem('selectedProduct', JSON.stringify(product));
  window.location.href = "product.html";
}

// Example:
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => addToDetailPage(card));
});


