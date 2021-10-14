$(document).ready(function () {

    // Register Form Submit
    $('#registerForm').submit(function (e) {
        e.preventDefault();

        const name = $("#userName").val()
        const surname = $("#userSurname").val()
        const phone = $("#userPhone").val()
        const email = $("#email").val()
        const password = $("#password").val()

        const pushObj = {
            ref: "16638724aadccaea33841962014b597e",
            userName: name,
            userSurname: surname,
            userPhone: phone,
            userMail: email,
            userPass: password
        }

        const url = "https://www.jsonbulut.com/json/userRegister.php"


        $.ajax({
            type: "get",
            url: url,
            data: pushObj,
            dataType: "json",
            success: function (res) {
                const status = res.user[0].durum
                const message = res.user[0].mesaj
                if (status == true) {
                    // redirect
                    alert(message)
                    window.location.href = "login.html";

                } else {
                    alert(message);
                }
            }
        });
    });
});

