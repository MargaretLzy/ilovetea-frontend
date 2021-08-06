// write your code here
const menu = document.querySelector('#ramen-menu')
const update=  document.querySelector('form#ramen-rating')
const newform = document.querySelector('form#new-ramen')
const deletebtn=document.querySelector('button.delete')
const orderbtn=document.querySelector('button.order')
const cartDOM = document.querySelector(".cart");
const cartContent = document.querySelector(".cart__centent");
const openCart = document.querySelector(".cart__icon");
const closeCart = document.querySelector(".close__cart");
const overlay = document.querySelector(".cart__overlay");
const cartTotal = document.querySelector(".cart__total");
const clearCartBtn = document.querySelector(".clear__cart");
const itemTotals = document.querySelector(".item__total");
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {

  var addToCartButtons = document.querySelectorAll(".addToCart")
  for (var i = 0; i < addToCartButtons.length; i++) {
      var button = addToCartButtons[i]
      button.addEventListener('click', addToCartClicked)

  }

}
let cart =[];
let buttonDOM = [];

function addToCartClicked(event) {
  console.log('cli')
  var button = event.target

  var shopItem = button.parentElement.parentElement.parentElement
  console.log(shopItem)
  var title = shopItem.getElementsByClassName('name')[0].innerText
  var price = shopItem.getElementsByClassName('price')[0].innerText
  var imageSrc = shopItem.getElementsByClassName('detail-image')[0].src
  console.log(title,price, imageSrc)
  addItemToCart(title, price, imageSrc)
 
}

function addItemToCart(title, price, imageSrc) {
  var div = document.createElement('div')
  div.classList.add("cart__item");

  div.innerHTML = `<img src=${imageSrc}>
        <div>
          <h3>${title}</h3>
          <h3 class="price">$${price}</h3>
        </div>
        <div>
          

      </div>`;
      console.log(div)
  cartContent.appendChild(div);
}
function show() {
  
  cartDOM.classList.add("show");
  overlay.classList.add("show");
}
function hide() {
  cartDOM.classList.remove("show");
  overlay.classList.remove("show");
}
function set(){

this.populate(cart);
openCart.addEventListener("click", this.show);
closeCart.addEventListener("click", this.hide);
}
function populate(cart) {
  cart.forEach(item => this.addItemToCart(item));
}


    // Clear Cart
    clearCartBtn.addEventListener("click", () => {
      this.clearCart();
      this.hide();
    });
    function clearCart() {
      const cartItems = cart.map(item => item.id);
      cartItems.forEach(id => this.removeItem(id));
  
      while (cartContent.children.length > 0) {
        cartContent.removeChild(cartContent.children[0]);
      }
    }
function oneRamen(tea)
{
    const detailimg = document.querySelector('img.detail-image')
    detailimg.src = tea.image

    const h2= document.querySelector('h2.name')
    h2.textContent = tea.name

    const h3= document.querySelector('h3.restaurant')
    h3.textContent = tea.restaurant
  
    const price =document.querySelector('div.price')
    price.textContent = '$'+tea.price
    
    update.dataset.id = tea.id
    const rating = update.querySelector('input#rating')
    rating.value = tea.rating
    const comment = update.querySelector('#comment')
    comment.value = tea.comment
}

function renderoneRamen(ramen){
    const ramenimg= document.createElement('img')
    ramenimg.src = ramen.image
    ramenimg.dataset.id = ramen.id
    menu.append(ramenimg)
}

function renderAllRamen(){
    fetch('http://localhost:3000/menu_items')
        .then(r => r.json())
        .then(ramens => {
            menu.innerHTML = ''
            oneRamen(ramens[0])

            ramens.forEach(ramen => {
                renderoneRamen(ramen)
            })
        })
}

menu.addEventListener('click', event=>{
    if (event.target.matches('img')){
        const id = event.target.dataset.id
    fetch('http://localhost:3000/menu_items/' + id)
        .then(r => r.json())
        .then(ramen => {
            oneRamen(ramen)
        })
    }
})

orderbtn.addEventListener('click',() => {
  //window.location.href ='http://localhost:3000/menu_items/home'
})
update.addEventListener('submit', e=>{
    e.preventDefault()
    const rating=e.target[0].value
    const comment= e.target[1].value
    fetch ('http://localhost:3000/menu_items/' + e.target.dataset.id,{
        method:'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({rating, comment })
    })
    .then (r=>r.json())
    .then(updateRamen=>{
        
    })
})

newform.addEventListener('submit', e=>{
    e.preventDefault()

    const name = e.target[0].value
    const restaurant= e.target.restaurant.value
    const image = e.target.image.value
    const rating = e.target.rating.value
    const comment = e.target[4].value

    fetch('http://localhost:3000/menu_items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, restaurant, image, rating, comment })
    })
        .then(r => r.json())
        .then(newRamen => {
            oneRamen(newRamen)
            renderoneRamen(newRamen)
            e.target.reset()
        })
})
deletebtn.addEventListener('click',e=>{
    const id = e.target.parentElement.dataset.id

    fetch('http://localhost:3000/menu_items/' + id,{
    method: 'DELETE'
    })
    .then(r=> r.json())
    .then(()=>{
        renderAllRamen()
    })

})


renderAllRamen()

set()