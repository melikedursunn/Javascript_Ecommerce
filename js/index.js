$(document).ready(function () {
    const url ="https://www.jsonbulut.com/json/companyCategory.php";
    const obj ={
        ref:"16638724aadccaea33841962014b597e"
    }

    
    let html=``
    $.ajax({
        type: "get",
        url: url,
        data: obj,
        dataType: "json",
        success: function (response) {
            const categories=response.Kategoriler[0].Categories
            let html=``;
            let altHtml="";
            for(let i=0;i<categories.length;i++){
                if(categories[i].TopCatogryId==0){
                    //console.log(`categories[i]`, categories[i])
                    for(let x=0;x<categories.length;x++){
                        if(categories[x].TopCatogryId==categories[i].CatogryId){
                            altHtml+=`<a href="#" id="${categories[x].CatogryId}"  onclick="fncProducts(${categories[x].CatogryId})">${categories[x].CatogryName}</a><br>`
                            //console.log(x,altHtml)
                        }
                    }
                    
                    html+=`
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="${"h"+categories[i].CatogryId}">
                        <button  class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${"cat"+categories[i].CatogryId}" aria-expanded="true" aria-controls="${"cat"+categories[i].CatogryId}">
                         ${categories[i].CatogryName}
                        </button>
                      </h2>
                      <div id="${"cat"+categories[i].CatogryId}" class="accordion-collapse collapse" aria-labelledby="${"h"+categories[i].CatogryId}" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                        <strong><a href="#" id="${categories[i].CatogryId}" onclick="fncProducts(${categories[i].CatogryId})">${categories[i].CatogryName}</a><br/></strong>
                          <strong>${altHtml}</strong>
                        </div>
                      </div>
                    </div>
                    `
                    altHtml=``;
                }
                
            }
            $(".accordion").html(html);
        }
    });
   
    const url1 ='https://www.jsonbulut.com/json/advertisement.php?'
   
    $.ajax({
        type: "get",
        url: url1,
        data: "ref=16638724aadccaea33841962014b597e&advertisementId=46",
        dataType: "json",
        success: function (response) {
            console.log(`Reklam response`, response)
            fncReklam(response)
            
        }
    });
    function fncReklam(res) {
    let html =``
    $(res.reklam).each(function( index,value ) {
        console.log(`value`, value)
      html+= `<div class="card" style="width:10rem;">
      <img src="`+value.reklam.dosya+`" class="card-img-top" alt="...">
      <div class="card-body">
        <a href="`+value.reklam.href+`" target="_blank"class="btn btn-dark">Reklama Git</a>
      </div>
        </div>
        </div>`
    });
    $("#reklam").html(html)
    }
    



        const url2 ="https://www.jsonbulut.com/json/product.php?ref=16638724aadccaea33841962014b597e&start=0&count=6&order=desc"
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            success: function (response) {
                console.log(`response`, response)
                if(response.Products[0].durum==true){
                    localStorage.setItem("productObject", JSON.stringify(response.Products[0].bilgiler));
    
                    let html=``;
                    $( response.Products[0].bilgiler ).each(function( index,value ) {
                        html+= `<div class="card col-lg-3 col-md-3 col-sm-6 mt-4 mb-3 col-12" >
                        <img src="${value.images[0].normal}" onclick=fncProduct(${value.productId}) class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${value.productName}</h5>
                          <p class="card-text">${value.price} TL</p>
                          <a href="#" class="btn btn-dark" onclick=fncBasket(${value.productId})>Sepete Ekle</a>
                        </div>
                      </div>`
                        
                    });
                   
                   
                    $("#sixproducts").html(html);
            }
        }
        });
    

        

});


function fncProducts(id){
    sessionStorage.setItem("categoryProduct",id);
    window.location.href="productList.html"
  }

function fncProduct(val){
    localStorage.setItem("clickProduct",val);
    window.location.href="productDetail.html"}

    function fncBasket(id) {
        const userInfo = localStorage.getItem("userLogInInfo");
        const userInf = sessionStorage.getItem("user");
        if (userInfo == null && userInf == null) {
            localStorage.setItem("clickProduct",id);
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
                productId:id,
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