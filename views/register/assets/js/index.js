"use strict";

$(window).on("load", function() {
    $("#status").fadeOut(), $("#preloader").delay(350).fadeOut("slow"), $("body").delay(350).css({
        overflow: "visible"
    }), $(".mainauto").delay(350).css({
        visibility: "visible"
    })
});

(async () => {
    await fetch("http://localhost:3000/api/users/profile", {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    }).then((res) => {
        console.log(res);
        return res.json();
    }).then((data) => {
        if (data.status == 200) {
            alert("Kamu masih login menggunakan " + data.username);
            return window.location.href = "http://localhost:3000"
        } else {
            return;
        }
    });
})();

async function getFetch() {
    let userValue = document.getElementById("userValue").value;
    let emailValue = document.getElementById("emailValue").value;
    let passwordValue = document.getElementById("passwordValue").value;
    let jsonData = {
        username: userValue,
        email: emailValue,
        password: passwordValue
    }
    await fetch(`http://localhost:3000/api/register`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
    }).then(async (res) => {
        console.log(res);
        return res.json();
    }).then(async (data) => {
        console.log(data);
        if (data.status == 200) {
            alert("Register Berhasil");
            return window.location.href = "http://localhost:3000/login";
        } else {
            alert("Register Gagal");
            return;
        }
    });
}