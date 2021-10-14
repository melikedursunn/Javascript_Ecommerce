$(document).ready(function () {
  
    
    const url1 = 'https://www.jsonbulut.com/json/news.php?ref=16638724aadccaea33841962014b597e&start=0&count=10'
    

        $.ajax({
            type: "get",
            url: url1,
            dataType: "json",
            success: function (response) {
                console.log(`response`, response)
                const haberler=response.News[0].Haber_Bilgileri
                console.log(`haberler`, haberler)
                
                let html=``
                $.each(response.News[0].Haber_Bilgileri, function (index, value) { 
                   html+= `<div class="card mt-5" style="width: 15rem;">
                   <img src="`+value.picture+`" class="card-img-top" alt="...">
                   <div class="card-body">
                     <h5 class="card-title">`+value.title+`</h5>
                     <p class="card-text">`+value.s_description+`</p>
                     <a href="https://www.haberler.com/" class="btn btn-dark">Habere Git</a>
                   </div>
                 </div>`
                });
                $("#news").html(html);
            }
        });
        
});

function logout() { 
  localStorage.removeItem("userLogInInfo");
  sessionStorage.removeItem("user");
  localStorage.removeItem("clickProduct")
  window.location.href="login.html"
}







