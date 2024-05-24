"use strict";

$(window).on("load", function() {
    $("#status").fadeOut(), $("#preloader").delay(350).fadeOut("slow"), $("body").delay(350).css({
        overflow: "visible"
    }), $(".mainauto").delay(350).css({
        visibility: "visible"
    })
});

void (async () => {
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
            document.getElementById("checkSession").innerHTML = `<i class="bi bi-person-circle"></i> Hello, ${data.username}. Kunjungi profilmu?`;
            return;
        } else {
            document.getElementById("checkSession").innerHTML = "Login/Register";
            return;
        }
    });
})();

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
        console.log(res);
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
        // await fetch(`http://localhost:3000/api/logout`, {
        //     method: "POST",
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json"
        //     },
        // }).then((res) => {
        //     return res.json();
        // }).then((data) => {
        //     if (data.status == 200) {
        //         alert("Logout Berhasil")
        //         return window.location.reload();
        //     } else {
        //         alert("Terjadi Kesalahan");
        //         return window.location.reload();
        //     }
        // });
    }
}
