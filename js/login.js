$(document).ready(function () {
    $("#loginForm").submit(function (e) {
      e.preventDefault();
  
      const email = $("#email").val();
      const password = $("#password").val();
  
  
      const pushObj = {
        ref: "16638724aadccaea33841962014b597e",
        userEmail: email,
        userPass: password,
        face: "no",
      };
      const url = "https://www.jsonbulut.com/json/userLogin.php";
  
      $.ajax({
        type: "get",
        url: url,
        data: pushObj,
        dataType: "json",
        success: function (res) {
          const item=res.user[0];
                const status1 = res.user[0].durum
                const message1 = res.user[0].mesaj
                if (status1 == true) {
                    console.log(`response`, res)
                    if($("#remember").is(':checked')){
                        
                        localStorage.setItem("userLogInInfo",JSON.stringify(item.bilgiler));
                        
                    }
                    
                    //session create
                   sessionStorage.setItem("user",JSON.stringify(item.bilgiler));
                   if(localStorage.getItem("clickProduct")==null) {
                    window.location.href="index.html";
                } 
                else{
                    window.location.href="productDetail.html"
                }
                    

                } else {
                    alert(message1)
                }
          
  
        }
  
      });
  
    });



 
  });
 
  
  
  
  