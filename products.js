fetch("https://fakestoreapi.com/products")
.then(res=>res.json())
.then(products=>{
    const container=document.getElementById("products");
    products.forEach(product=>{
        const card=document.createElement("div");
        card.className="product-card";
        card.dataset.category=product.category;
        card.dataset.title=product.title;

        card.innerHTML=`
          <img src="${product.image}">
          <h3>${product.title}</h3>
          <p>$${product.price}</p>
          <button onclick="addToCart(${product.id},'${product.title}',${product.price},'${product.image}')">Add to Cart</button>
        `;
        container.appendChild(card);
    });
})
.catch(err=>console.log(err));

function addToCart(id,title,price,image){
    let cart=JSON.parse(localStorage.getItem("cart"))||[];
    const exists=cart.find(p=>p.id===id);
    if(exists) exists.qty++;
    else cart.push({id,title,price,image,qty:1});
    localStorage.setItem("cart",JSON.stringify(cart));
    alert("Added to cart!");
}
