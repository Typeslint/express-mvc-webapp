"use strict";

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
            return window.location.href = "http://localhost:3000/home"
        } else {
            return;
        }
    });
})();

async function getFetch() {
    let emailValue = document.getElementById("emailValue").value;
    let passwordValue = document.getElementById("passwordValue").value;
    let jsonData = {
        email: emailValue,
        password: passwordValue
    }
    await fetch(`http://localhost:3000/api/login`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
    }).then(async (res) => {
        return res.json();
    }).then(async (data) => {
        if (data.status == 200) {
            alert("Login Berhasil");
            return window.location.href = "http://localhost:3000/home";
        } else {
            alert("Login Gagal");
            return;
        }
    });
}