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

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const products = document.querySelectorAll(".product-card");
  const resultsSection = document.querySelector(".search-results");
  const resultsGrid = document.getElementById("resultsGrid");

  if (searchInput) {
    searchInput.addEventListener("keyup", () => {
      let filter = searchInput.value.toLowerCase();
      resultsGrid.innerHTML = ""; // clear old results

      if (filter === "") {
        resultsSection.style.display = "none"; // hide if nothing typed
        return;
      }

      let found = false;

      products.forEach(product => {
        let name = product.getAttribute("data-name").toLowerCase();

        if (name.includes(filter)) {
          found = true;
          // clone product card
          const clone = product.cloneNode(true);
          resultsGrid.appendChild(clone);
        }
      });

      resultsSection.style.display = found ? "block" : "none";

      if (!found) {
        resultsGrid.innerHTML = "<p>No products found.</p>";
      }
    });
  }
});


