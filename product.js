const product = JSON.parse(localStorage.getItem("selectedProduct"));
if(product){
   document.getElementById("productImage").src=product.image;
   document.getElementById("productName").innerText=product.name;

   document.getElementById("productPrice").innerText=product.price;
}