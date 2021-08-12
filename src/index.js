// write your code here
const menu = document.querySelector('#tea-menu')
const update=  document.querySelector('form#tea-rating')
const newform = document.querySelector('form#new-tea')
const deletebtn=document.querySelector('button.delete')
const orderbtn=document.querySelector('button.order')
const cartDOM = document.querySelector(".cart");
const cartContent = document.querySelector(".cart__centent");
const openCart = document.querySelector(".cart__icon");
const closeCart = document.querySelector(".close__cart");
const overlay = document.querySelector(".cart-overlay");
const cartTotal = document.querySelector(".cart__total");
const clearCartBtn = document.querySelector(".clear__cart");
const itemTotals = document.querySelector(".item__total");
const cartit=document.querySelector('.cart__item')
const add = document.querySelector('button.btn.addToCart')
const login=document.querySelector('.login')
const checkout = document.querySelector('.order')



let cart =[];

function getButtons() {
 
    const id = add.dataset.id;
    //console.log(add)
    console.log(id)

    const inCart = cart.find(item => {return item.id === parseInt(id)});

  console.log(cart)
   console.log(inCart)
    if (inCart) {
      add.innerText = "In Cart";
     add.disabled = true;
    }
  }
  checkout.addEventListener('click',e => {
    alert("Your Order has been placed, Thank you")
    clearCart();

  })
    add.addEventListener("click", e => {
      e.preventDefault();
     console.log(add)
  e.target.innerHTML = "In Cart";
  e.target.disabled = true;
 
      const id = add.dataset.id;
     console.log(id);
      // Get product from products
      const order_item = { ...Storage.getProduct(id), amount: 1 };
     
      console.log(order_item)
      // Add product to cart
      cart = [...cart, order_item];
      console.log(cart)

      // save the cart in local storage
      Storage.saveCart(cart);
      // set cart values
      this.setItemValues(cart);
      // display the cart item
      this.addOrderItem(order_item);
      // show the cart

    });
  ;


function setItemValues(cart) {
  let tempTotal = 0;
  let itemTotal = 0;

  cart.map(item => {
    tempTotal += item.price * item.amount;
    itemTotal += item.amount;
  });
  cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
  itemTotals.innerText = itemTotal;
}

  
function addOrderItem({ image, price, name, id }) {
  const div = document.createElement("div");
  div.classList.add("cart__item");

  div.innerHTML = `<img src=${image}>
        <div>
          <h3>${name}</h3>
          <h3 class="price">$${price}</h3>
        </div>
        <div>
          <span class="increase" data-id=${id}>
            <svg>
              <use xlink:href="./sprite.svg#icon-angle-up"></use>
            </svg>
          </span>
          <p class="item__amount">1</p>
          <span class="decrease" data-id=${id}>
            <svg>
              <use xlink:href="./sprite.svg#icon-angle-down"></use>
            </svg>
          </span>
        </div>

          <span class="remove__item" data-id=${id}>
            <svg>
              <use xlink:href="./sprite.svg#icon-trash"></use>
            </svg>
          </span>

      </div>`;
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
  cart = Storage.getCart();
  this.setItemValues(cart);
this.populate(cart);
openCart.addEventListener("click", this.show);
closeCart.addEventListener("click", this.hide);
}
function populate(cart) {
  cart.forEach(item => this.addOrderItem(item));
}

    // Clear Cart
    clearCartBtn.addEventListener("click", () => {
      this.clearCart();
      this.hide();
    });
    function clearCart() {
      const orderItems = cart.map(item => item.id);
      console.log(orderItems)
      orderItems.forEach(id => this.removeItem(id));
  
      while (cartContent.children.length > 0) {
        cartContent.removeChild(cartContent.children[0]);
      }
    }
   function removeItem(id) {
      cart = cart.filter(item => item.id !== id);
      this.setItemValues(cart);
      Storage.saveCart(cart);

      add.disabled = false;
      add.innerText = "Add to Cart";
    }
  
  
    cartContent.addEventListener("click", e => {
      const target = e.target.closest("span");
      const targetElement = target.classList.contains("remove__item");
      if (!target) return;

      if (targetElement) {
        const id = parseInt(target.dataset.id);
        this.removeItem(id);
        cartContent.removeChild(target.parentElement);
      } else if (target.classList.contains("increase")) {
        const id = parseInt(target.dataset.id, 10);
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount++;
        Storage.saveCart(cart);
        this.setItemValues(cart);
        target.nextElementSibling.innerText = tempItem.amount;
      } else if (target.classList.contains("decrease")) {
        const id = parseInt(target.dataset.id, 10);
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount--;

        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setItemValues(cart);
          target.previousElementSibling.innerText = tempItem.amount;
        } else {
          this.removeItem(id);
          cartContent.removeChild(target.parentElement.parentElement);
        }
      }
    });
  
  
function oneTea(tea)
{
  
    const detailimg = document.querySelector('img.detail-image')
    detailimg.src = tea.image

    const h2= document.querySelector('h2.name')
    h2.textContent = tea.name

    const h3= document.querySelector('h3.restaurant')
    h3.textContent = tea.restaurant
  
    const price =document.querySelector('div.price')
    price.textContent = '$'+tea.price
    
    const description = document.querySelector('#description')
    description.textContent = tea.description
    update.dataset.id = tea.id
    const rating = update.querySelector('input#rating')
    rating.value = tea.rating
    const comment = update.querySelector('#comment')
    comment.value = tea.comment
    add.dataset.id = tea.id
    add.disabled= false
    add.innerHTML="Add to Cart"
    console.log(add)
    getButtons();
    
}
class Storage {
  static saveProduct(obj) {
    localStorage.setItem("products", JSON.stringify(obj));

  }

  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static getProduct(id) {
    const products = JSON.parse(localStorage.getItem("products"));
   console.log(products)
   
  return products.find(product => {
      return product.id === parseInt(id)
    }
      );
 //console.log(products.find(product => product.id === id))
  }

  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}
function renderoneTea(tea){
    const teaimg= document.createElement('img')
    teaimg.src = tea.image
    teaimg.dataset.id = tea.id
    menu.append(teaimg)
  
  
}

function renderAllTea(){
  
    fetch('http://localhost:3000/menu_items')
        .then(r => r.json())
        .then(teas => {
            menu.innerHTML = ''
        oneTea(teas[0])
           
            Storage.saveProduct(teas)
            teas.forEach(tea => {
                renderoneTea(tea)
               
               
            })
        })
}

menu.addEventListener('click', event=>{
    if (event.target.matches('img')){
        const id = event.target.dataset.id
    fetch('http://localhost:3000/menu_items/' + id)
        .then(r => r.json())
        .then(tea => {
            oneTea(tea)
        })
    }
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
    .then(updateTea=>{
        
    })
})

newform.addEventListener('submit', e=>{

    const name = e.target.name.value
    const restaurant= e.target.restaurant.value
    const image = e.target.image.value
    const price = e.target.price.value
    const description = e.target.description.value
    

    fetch('http://localhost:3000/menu_items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, restaurant, image, price, description})
    })
        .then(r => r.json())
        .then(newTea => {
            oneTea(newTea)
            renderoneTea(newTea)
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
        renderAllTea()
    })

})



renderAllTea();

set();