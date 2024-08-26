"use strict";

$(window).on("load", function() {
    $("#status").fadeOut(), $("#preloader").delay(350).fadeOut("slow"), $("body").delay(350).css({
        overflow: "visible"
    }), $(".mainauto").delay(350).css({
        visibility: "visible"
    })
});

async function getMembership(params) {
    let jsonData = {
        type: params
    }
    await fetch("http://localhost:3000/api/users/membership", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
    }).then((res) => {
        return res.json();
    }).then((data) => {
        if (data.status == 200) {
            alert("Berhasil membeli membership " + params);
        } else if (data.status == 202) {
            alert("Kamu telah mengganti membership menjadi " + params);
        } else {
            alert("Terjadi kesalahan");
        }
    });
}

async function pesanSekarang() {
    window.location.href = "http://localhost:3000/order";
    return;
}

async function checkSession() {
    if (document.getElementById("checkSession").innerHTML === "Login/Register") {
        return window.location.href = "http://localhost:3000/login";
    } else {
        return window.location.href = "http://localhost:3000/profile";
    }
}
