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