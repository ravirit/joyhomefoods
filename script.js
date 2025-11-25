// ===================== PRODUCTS =====================
const products = [
    { name:"Ariselu", telugu:"అరిసెలు", img:"ariselu.jpg", price:120, desc:"Soft, sweet, and made with pure ghee and jaggery." },
    { name:"Chekkalu", telugu:"చెక్కలు", img:"chekkalu.jpg", price:160, desc:"Crispy and flavorful traditional Telugu snack." },
    { name:"Kajjikayalu", telugu:"కజ్జికాయలు", img:"kajjikayalu.jpg", price:150, desc:"Sweet coconut filling wrapped in crispy shell." }
        { name:"murukulu", telugu:"కజ్జికాయలు", img:"murukulu.jpg", price:150, desc:"Crispy and flavorful traditional Telugu snack." }

];

// ===================== LOCAL STORAGE =====================
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// ===================== UPDATE COUNTS =====================
function updateCounts(){
    const cartCountEls = document.querySelectorAll('.cart-count');
    const wishlistCountEls = document.querySelectorAll('.wishlist-count');
    cartCountEls.forEach(el => el.textContent = cart.length);
    wishlistCountEls.forEach(el => el.textContent = wishlist.length);
}
updateCounts();

// ===================== LOAD PRODUCTS =====================
function loadProducts(){
    const container = document.getElementById('products');
    if(!container) return;
    container.innerHTML = products.map((p,i)=>`
        <div class="product">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="telugu">${p.telugu}</p>
            <p>₹${p.price}</p>
            <p>${p.desc}</p>
            <button onclick="addToCart(${i})" class="btn primary">Add to Cart</button>
            <button onclick="addToWishlist(${i})" class="btn secondary">💖 Wishlist</button>
        </div>
    `).join('');
}
loadProducts();

// ===================== CART FUNCTIONS =====================
function addToCart(i){
    cart.push(products[i]);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCounts();
    alert(`${products[i].name} added to cart!`);
}

function removeFromCart(i){
    cart.splice(i,1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCounts();
    renderCartPage();
}

// ===================== WISHLIST FUNCTIONS =====================
function addToWishlist(i){
    if(!wishlist.find(item => item.name === products[i].name)){
        wishlist.push(products[i]);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateCounts();
        alert(`${products[i].name} added to wishlist!`);
    }
}

function removeFromWishlist(i){
    wishlist.splice(i,1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateCounts();
    renderWishlistPage();
}

// ===================== CART PAGE RENDER =====================
function renderCartPage(){
    const cartList = document.getElementById('cart-list');
    const totalEl = document.getElementById('total');
    if(!cartList || !totalEl) return;

    let total = 0;
    cartList.innerHTML = '';
    cart.forEach((item,i)=>{
        total += item.price;
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ₹${item.price} <button onclick="removeFromCart(${i})">❌</button>`;
        cartList.appendChild(li);
    });
    totalEl.textContent = total;
}
renderCartPage();

// ===================== WISHLIST PAGE RENDER =====================
function renderWishlistPage(){
    const wishlistList = document.getElementById('wishlist-list');
    if(!wishlistList) return;
    wishlistList.innerHTML = '';
    wishlist.forEach((item,i)=>{
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ₹${item.price} <button onclick="removeFromWishlist(${i})">❌</button>`;
        wishlistList.appendChild(li);
    });
}
renderWishlistPage();

// ===================== CHECKOUT =====================
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutSection = document.getElementById('checkout');
if(checkoutBtn){
    checkoutBtn.addEventListener('click', ()=>{
        if(cart.length===0){ alert('Cart is empty!'); return; }
        checkoutSection.classList.remove('hidden');
        checkoutSection.scrollIntoView({behavior:'smooth'});
    });
}

const form = document.getElementById('checkout-form');
if(form){
    form.addEventListener('submit', e=>{
        e.preventDefault();
        const name = document.getElementById('customer-name').value;
        const phone = document.getElementById('customer-phone').value;
        const address = document.getElementById('customer-address').value;
        const payment = document.querySelector('input[name="payment"]:checked')?.value;
        if(!payment){ alert("Select a payment method!"); return; }

        let message = "Hello! I would like to order:\n";
        let total = 0;
        cart.forEach(item => {
            message += `${item.name} - ₹${item.price}\n`;
            total += item.price;
        });
        message += `Total: ₹${total}\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nPayment: ${payment}`;

        window.open(`https://wa.me/+918977801118?text=${encodeURIComponent(message)}`, "_blank");

        form.reset();
        checkoutSection.classList.add('hidden');
        document.getElementById('order-success').classList.remove('hidden');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCounts();
        renderCartPage();
    });
}

// ===================== SEARCH =====================
const searchBars = document.querySelectorAll('#search-bar');
searchBars.forEach(searchBar => {
    searchBar.addEventListener('input', ()=>{
        const query = searchBar.value.toLowerCase();
        const productEls = document.querySelectorAll('.product');
        productEls.forEach((el, i)=>{
            if(products[i].name.toLowerCase().includes(query) || products[i].telugu.includes(query)){
                el.style.display = 'block';
            } else {
                el.style.display = 'none';
            }
        });
    });
});


