const btn = document.querySelectorAll("button");

btn.forEach(function (button, index) {
    button.addEventListener("click", function (event) {
        var btnItem = event.target;
        var product = btnItem.closest(".menu_card"); // Use closest() to find the closest ancestor with the specified selector
        var productImg = product.querySelector(".menu_image img").src;
        var productName = product.querySelector("h2").innerText;
        var productPrice = product.querySelector("h3").innerText;

        addCart(productPrice, productImg, productName);
    });
});

//----------Add Cart-------------//

function addCart(productPrice,productImg,productName){
    var addtr = document.createElement("tr")
    var cartItem = document.querySelectorAll("tbody tr")
    for (var i = 0; i < cartItem.length; i++){
        var productT = document.querySelectorAll(".title")
        if(productT[i].innerHTML == productName){
            alert("Product already exist")
            return
        }
    }
    var trcontent = ' <tr><td style="display:flex; align-items: center;"><img style="width:70px" src="'+productImg+'"alt=""><span class="title">'+productName+'</span></td> <td><p><span class="price">'+productPrice+'</span></p> </td><td><input style="width: 30px; outline: none; " type="number" value="1" min="0"></td> <td style="cursor:pointer"><span class="delete-cart">Delete</span></td></tr>'
    addtr.innerHTML = trcontent
    var cartTable = document.querySelector("tbody")
    cartTable.append(addtr)
    cartTotal()
    Cartdelete()
    inputchange()
    updateCartIcon(cartItem.length + 1);
}

//----------Cart Total--------------//

function cartTotal() {
    var cartItem = document.querySelectorAll("tbody tr");
    var Total = 0;

    for (var i = 0; i < cartItem.length; i++) {
        var inputValue = cartItem[i].querySelector("input").value;
        console.log("Input Value:", inputValue);

        var productPrice = cartItem[i].querySelector(".price").innerHTML;
        console.log("Product Price:", productPrice);

        // Convert inputValue and productPrice to numbers before multiplying
        inputValue = parseFloat(inputValue);
        productPrice = parseFloat(productPrice);

        // Check if the values are valid numbers
        if (!isNaN(inputValue) && !isNaN(productPrice)) {
            Total += inputValue * productPrice;
        } else {
            console.error("Invalid input value or product price for item " + i);
        }
    }

    // Concatenate the dollar sign with the total
    var totalWithCurrency = "$" + Total.toFixed(2);
    console.log("Total:", totalWithCurrency);

    // Add any further processing or display logic here
    // var Cartprice = document.querySelector(".cart-icon span");
    var ToTalPrice = document.querySelector(".price-total span") 
    ToTalPrice.textContent = totalWithCurrency;

 }
    
//--------Delete----------//
function Cartdelete() {
    var cartItem = document.querySelectorAll("tbody tr");

    cartItem.forEach(function (item) {
        var productT = item.querySelector(".delete-cart");

        productT.addEventListener("click", function (event) {
            var Cartdelete = event.target;
            var Itemcart = Cartdelete.parentElement.parentElement;
            Itemcart.remove();
            console.log(Itemcart);
            setTimeout(function () {
                cartTotal();
                var updatedCartItems = document.querySelectorAll("tbody tr");
                updateCartIcon(updatedCartItems.length);
            }, 0);
        });
    });
}


//------------input change -----------------//

function inputchange() {
    var cartItem = document.querySelectorAll("tbody tr");

    for (var i = 0; i < cartItem.length; i++) {
        (function (index) {
            var inputValue = cartItem[index].querySelector("input");

            inputValue.addEventListener("change", function () {
                // You can use 'index' here to reference the correct 'i'
                console.log("Input changed for item " + index);
                cartTotal(); // Call your cartTotal function or any other logic you need
            });
        })(i);
    }
}

const cartbtn = document.querySelector(".fa-xmark")
const cartShow = document.querySelector(".fa-cart-shopping")
cartShow.addEventListener("click", function () {
    document.querySelector(".cart").style.right ="0"
  })
  cartbtn.addEventListener("click", function(){
    document.querySelector(".cart").style.right="-100%"
  })
  
  function updateCartIcon(cartItemCount) {
    var cartItemCountElement = document.querySelector('.item-count');
    cartItemCountElement.innerText = cartItemCount;
}