var swiper = new Swiper(".home", {
    spaceBetween: 30,
    centeredSlides: true,
    
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

function profileReval(){
  let profile= document.getElementById("profscroll")  
  if(profile.style.display=='none'){
    profile.style.display='block'
  }else{
    profile.style.display='none'
  }
}

function logoutpge(){
   location="Login.html"
}

  let menu = document.querySelector('#menu-icon');
  let navbar = document.querySelector('.navbar');

  menu.onclick = () => {
      menu.classList.toggle('bx-x');
      navbar.classList.toggle('open');
  }
  let openshopping= document.getElementById("openshopping")
 let closeshopping= document.querySelector(".closeshopping")
 let listcard=document.querySelector('.listcard')
 let total=document.querySelector('.total')
 let body=document.querySelector('body')
 let Quantity= document.querySelector('.quantity')

 openshopping.addEventListener('click',(e)=>{
  e.preventDefault()
   body.classList.add('active')
 })
 closeshopping.addEventListener('click',()=>{
  body.classList.remove('active')
})

  const productList = document.getElementById("products-container")

  function loadJson() {
    fetch("products.json")
      .then((responce) => responce.json())
      .then((data) => {
        let item = "";
      data.forEach((element) => {
        if (element.filter_name == "All categories") {
          element.products.forEach((element,index) => {
            item += productView(element,index);
          });
          productList.innerHTML = item;
        }})})};

      function productView(product,index){
        return ` 
        <div class="box">
            <img src=${product.imgSrc}>
            <span>fresh items</span>
            <h2>${product.name}<br> 250g</h2>
            <h3 class="price">₹${product.price}<span>/g</span></h3>
            <button onclick="addtocart(${index})"><i class='bx bx-cart'></i></button>
            <i class='bx bx-heart' ></i>
            <span class="discount">-25%</span>

        </div>`
      }
   
  loadJson();
  let listcards = []
  function addtocart(key){
    fetch("products.json")
    .then((responce) => responce.json())
    .then((data) => {
    data.forEach((element) => {
      if (element.filter_name == "All categories") {
    if(listcards[key]== null){
      listcards[key]= element.products[key];
      listcards[key].quantity=1;
    } }})})
    reloadcard()  
  }
  function reloadcard(){
    listcard.innerHTML='';
    total.innerHTML='0';
    let count= 0;
    let totalprice=0;
    listcards.forEach((value,key)=>{
        totalprice=totalprice + value.price
        count= count + value.quantity

        if(value!= null){
        
          listcard.innerHTML+=`<li><div>${value.name}</div>
          <div><button onclick="changeQuantity(${key},${value.quantity-1})">-</button><div class="count">${value.quantity}</div><button onclick="changeQuantity(${key},${value.quantity+1})">+</button></div>
          <div> ₹ ${value.price} <i onclick="Delete(${key})" class='bx bx-trash'></i></div>
            </li>`
        }
        total.innerText=totalprice
    })}
     function Delete(data){
       listcards.splice(data,1)
       reloadcard()
     }
    function changeQuantity(key,quantity){
     
      if(quantity==0){
        delete listcards[key]
      }else{
        fetch("products.json")
    .then((responce) => responce.json())
    .then((data) => {
    data.forEach((element) => {
      if (element.filter_name == "All categories") {
        listcards[key].quantity=quantity
        listcards[key].price= quantity * element.products[key].price
     }})})
      }
        reloadcard()
    }
  

 


        
