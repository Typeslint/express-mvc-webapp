"use strict";

$(window).on("load", function () {
    $("#status").fadeOut(), $("#preloader").delay(350).fadeOut("slow"), $("body").delay(350).css({
        overflow: "visible"
    }), $(".mainauto").delay(350).css({
        visibility: "visible"
    });
});

void (async () => {
    await fetch('http://localhost:3000/api/users/profile', {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    }).then((res) => {
        return res.json();
    }).then((data) => {
        if (data.status == 200) {
            return;
        } else {
            document.getElementById("mainProfile").remove();
            document.getElementById("checkSession").innerHTML = "Login/Register";
            alert("Kamu belum login");
            return window.location.href = "http://localhost:3000/login";
        }
    });
})();

function backButton() {
    return window.location.href = "http://localhost:3000";
}

async function checkSession() {
    if (document.getElementById("checkSession").innerHTML === "Login/Register") {
        return window.location.href = "http://localhost:3000/login";
    } else {
        return window.location.href = "http://localhost:3000/profile";
    }
}

document.getElementById('photoBackgroundInput').addEventListener('change', function () {
    const file = this.files[0];

    if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            let base64Data = reader.result;
            let jsonData = {
                backgroundPhoto: base64Data
            };

            try {
                await fetch(`http://localhost:3000/api/users/profile/photo`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                }).then(async (res) => {
                    return res.json();
                }).then(async (data) => {
                    alert("Data Berhasil Diubah");
                    if (data.message == "OK") {
                        return;
                    } else {
                        return;
                    }
                });
            } catch (err) {
                console.error(err);
            }

            try {
                await fetch(`http://localhost:3000/api/users/profile`, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }).then(async (res) => {
                    return res.json();
                }).then(async (data) => {
                    document.getElementById("userPhotoBackground").src = data.Profile.backgroundphoto;
                });
            } catch (error) {
                console.error(error);
            }
        };
    }

});

document.getElementById('photoInput').addEventListener('change', function () {
    const file = this.files[0];

    if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            let base64Data = reader.result;
            let jsonData = {
                photo: base64Data
            };

            try {
                await fetch(`http://localhost:3000/api/users/profile/photo`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                }).then(async (res) => {
                    return res.json();
                }).then(async (data) => {
                    alert("Data Berhasil Diubah");
                    if (data.message == "OK") {
                        return;
                    } else {
                        return;
                    }
                });
            } catch (err) {
                console.error(err);
            }

            try {
                await fetch(`http://localhost:3000/api/users/profile`, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }).then(async (res) => {
                    return res.json();
                }).then(async (data) => {
                    document.getElementById("userPhoto").src = data.Profile.photo;
                });
            } catch (error) {
                console.error(error);
            }
        };
    }

});