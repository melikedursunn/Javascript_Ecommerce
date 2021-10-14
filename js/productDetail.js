$(document).ready(function () {
    
    const cProduct = localStorage.getItem("clickProduct");
    let htmlProduct = ``
    const url = "https://www.jsonbulut.com/json/product.php";
    const obj = {
        ref: "16638724aadccaea33841962014b597e",
        start: "0"
    }
    $.ajax({
        type: "get",
        url: url,
        data: obj,
        dataType: "json",
        success: function (response) {
            const values = response.Products[0].bilgiler;
            for (i = 0; i < values.length; i++) {
                if (cProduct == values[i].productId) {
                    htmlProduct = `
                    <div class="row">
                    <div class="col-sm-12 col-lg-6">
                        <img src="${values[i].images[0].normal}" style="width:400px; height:400px" class="img-fluid mt-5 mb-5 productImage" alt="image" id="pImage">
                        
                    </div>
                    <div class="col-sm-12 col-lg-6" style="margin-bottom:0">
                        <h1 class="baslik mb-3 mt-5">${values[i].productName}</h1>
                        <p class="lead">
                            ${values[i].description}
                        </p>
                        
                        <h5>Fiyat Bilgisi:</h5>
                        <div class="pr">
                            <p id="price">${values[i].price} TL</p>
                        </div>
                        
                        <button class="btn btn-dark mb-3 form" onclick="fncBasket(${values[i].productId})">Sepete Ekle</button>
                          
                        <br/>
                        
                    </div>
                </div> `
                        
                }
            }

            $(".productDetail").html(htmlProduct)
        }
    });
    
});
function fncBasket(id) {
    const userInfo = localStorage.getItem("userLogInInfo");
    const userInf = sessionStorage.getItem("user");
    if (userInfo == null && userInf == null) {
        alert("Lütfen Giriş Yapınız..")
        window.location.href = "login.html"
    }
    else {
        console.log(`userInf`, userInf)
        console.log(`userInfo`, userInfo)

            const urlBasket="https://www.jsonbulut.com/json/orderForm.php";
        const DataBasket={
            ref:"16638724aadccaea33841962014b597e",
            customerId: JSON.parse(userInf).userId,
            productId:localStorage.getItem("clickProduct"),
            html:12
        }
        $.ajax({
            type: "get",
            url: urlBasket,
            data: DataBasket,
            dataType: "json",
            success: function (response) {
                if(response.order[0].durum==true){
                    window.location.href="sepet.html"
                }
                else{
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





