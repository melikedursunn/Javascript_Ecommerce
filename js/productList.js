$(document).ready(function () {
    const categoryId = sessionStorage.getItem("categoryProduct");
    const urlProduct = "https://www.jsonbulut.com/json/product.php";
    const data = {
      ref: "16638724aadccaea33841962014b597e",
      start: 0,
      count:30
    }
    $.ajax({
      type: "get",
      url: urlProduct,
      data: data,
      dataType: "json",
      success: function (response) {
        let productHtml = ``;
        const product = response.Products[0].bilgiler;
        if (categoryId == null) {
          window.location.href="productList.html";
        }
        else {
          for (let i = 0; i < product.length; i++) {
            const element = product[i].categories.length;
  
            for (let j = 0; j < element; j++) {
              if (product[i].categories[j].categoryId == categoryId) {
                console.log(product[i])
                if(product[i].images[0].normal=="" || product[i].images[0].normal==null){
                  productHtml += `<div class="card col-lg-3 col-md-3 col-sm-6 mt-4 mb-3 col-12" >
                  <img src="${product[i].images[0].normal}" onclick=fncProduct(${product[i].productId}) class="card-img-top" alt="">
                  <div class="card-body">
                    <h5 class="card-title">${product[i].productName}</h5>
                  <span>${product[i].price} TL</span>
                    <p class="card-text"></p>
                    <a href="#" onclick="fncBasket(${product[i].productId}) id="addSepet" class="btn btn-dark">Sepete Ekle</a>
                  </div>
                </div>`
                }
                else{
                  productHtml += `<div class="card col-lg-3 col-md-3 col-sm-6 mt-4 mb-3 col-12" >
                  <img src="${product[i].images[0].normal}" onclick=fncProduct(${product[i].productId}) class="card-img-top" alt="">
                  <div class="card-body">
                    <h5 class="card-title">${product[i].productName}</h5>
                  <span>${product[i].price} TL</span>
                    <p class="card-text"></p>
                    <a href="#" onclick="fncBasket(${product[i].productId}) id="addSepet" class="btn btn-dark">Sepete Ekle</a>
                  </div>
                </div>`;
                }
  
              }
            }
          }
        }
        
        $("#productList").html(productHtml)
  
  
      }
    });
  });
  function fncProduct(val) {
    localStorage.setItem("clickProduct", val);
    window.location.href = "productDetail.html"
  
  }
  function fncBasket(id) {
  
    const userInfo = localStorage.getItem("userLogInInfo");
    const userInf = sessionStorage.getItem("user");
    if (userInfo == null && userInf == null) {
      localStorage.setItem("clickProduct",id);
      alert("Lütfen Giriş Yapınız..")
      window.location.href = "login.html"
    }
    else {
      
        const urlBasket = "https://www.jsonbulut.com/json/orderForm.php";
        const DataBasket = {
          ref: "16638724aadccaea33841962014b597e",
          customerId: JSON.parse(userInf).userId,
          productId: id,
          html: 12
        }
        $.ajax({
          type: "get",
          url: urlBasket,
          data: DataBasket,
          dataType: "json",
          success: function (response) {
            if (response.order[0].durum == true) {
              window.location.href="sepet.html"
            }
            else {
              alert(response.order[0].mesaj)
            }
          }
        });
        localStorage.removeItem("clickProduct")
  
    }
  }

  function logout() { 
    localStorage.removeItem("userLogInInfo");
    sessionStorage.removeItem("user");
    localStorage.removeItem("clickProduct")
    window.location.href="login.html"
 }