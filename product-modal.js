const modal = document.getElementById('productModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalTelugu = document.getElementById('modalTelugu');
const modalPrice = document.getElementById('modalPrice');
const modalAdd = document.getElementById('modalAdd');

function openProductModal(product){
    modalImg.src = product.img;
    modalTitle.textContent = product.name;
    modalTelugu.textContent = product.telugu || '';
    modalDesc.textContent = product.desc || '';
    modalPrice.textContent = '₹' + product.price;
    modal.classList.remove('hidden');
    modalAdd.onclick = ()=>{ cart.push(product); localStorage.setItem('cart', JSON.stringify(cart)); modal.classList.add('hidden'); };
}

window.openProductModalById = function(id){
    const p = PRODUCTS.find(x=>x.id===id);
    if(p) openProductModal(p);
}

modalClose.addEventListener('click', ()=> modal.classList.add('hidden'));
modalBackdrop.addEventListener('click', ()=> modal.classList.add('hidden'));
