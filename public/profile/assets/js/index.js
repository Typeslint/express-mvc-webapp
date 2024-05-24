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
        console.log(res);
        return res.json();
    }).then((data) => {
        if (data.status == 200) {
            document.getElementById("checkSession").innerHTML = `<i class="bi bi-person-circle"></i> Hello, ${data.username}. Ingin Logout?`;
            document.getElementById("userPhotoBackground").src = data.Profile.backgroundphoto;
            document.getElementById("userPhoto").src = data.Profile.photo;
            document.getElementById("usernameProfile").innerHTML = data.username;
            document.getElementById("usernameEmail").innerHTML = data.email;
            document.getElementById("noTelp").innerHTML = "No. Telp: " + data.Profile.telp;
            document.getElementById("alamatUser").innerHTML = "Alamat: " + data.Profile.alamat;
            document.getElementById("statusMembership").innerHTML = "Membership: " + data.Membership.is_member;

            return;
        } else {
            document.getElementById("mainProfile").remove();
            document.getElementById("checkSession").innerHTML = "Login/Register";
            alert("Kamu belum login");
            return window.location.href = "http://localhost:3000/login";
        }
    }).then(async () => {
        await fetch(`http://localhost:3000/api/users/transaction`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(async (res) => {
            console.log(res);
            return res.json();
        }).then(async (result) => {
            const tableHeader = ` <th><p>Tanggal</p></th> <th><p>Nama</p></th> <th><p>Berat</p></th> <th><p>Pelayanan</p></th> <th><p>Antar/Kirim</p></th> <th><p>Alamat</p></th> <th><p>Harga</p></th>`;
            document.getElementById("dataHeader").insertAdjacentHTML("afterbegin", tableHeader);

            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Jakarta"
            };
            const dateFormatter = new Intl.DateTimeFormat("id-ID", options);

            const currencyFormatter = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0
            });

            for (let i = 0; i < result.data.length; i++) {
                const dateObject = new Date(result.data[i].tanggal);
                const formattedDate = dateFormatter.format(dateObject);
                const formattedTotal = currencyFormatter.format(result.data[i].total);

                const chatdata = ` <tr> <td>${formattedDate}</td> <td>${result.data[i].name}</td> <td>${result.data[i].qty} KG</td> <td>${result.data[i].services}</td> <td>${result.data[i].delivery}</td> <td>${result.data[i].address}</td> <td>${formattedTotal}</td> </tr>`;
                document.getElementById("dataSetoran").insertAdjacentHTML("afterend", chatdata);
            }
        });
    });
})();

function backButton() {
    return window.location.href = "http://localhost:3000/home";
}

async function checkSession() {
    if (document.getElementById("checkSession").innerHTML === "Login/Register") {
        return window.location.href = "http://localhost:3000/login";
    } else {
        await fetch(`http://localhost:3000/api/logout`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if (data.status == 200) {
                alert("Logout Berhasil");
                return window.location.href = "http://localhost:3000/home";
            } else {
                alert("Terjadi Kesalahan");
                return window.location.reload();
            }
        });
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

            console.log(base64Data);

            try {
                await fetch(`http://localhost:3000/api/users/profile/photo`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                }).then(async (res) => {
                    console.log(res);
                    return res.json();
                }).then(async (data) => {
                    console.log(data);
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
                    console.log(res);
                    return res.json();
                }).then(async (data) => {
                    console.log(data);
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

            console.log(base64Data);

            try {
                await fetch(`http://localhost:3000/api/users/profile/photo`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                }).then(async (res) => {
                    console.log(res);
                    return res.json();
                }).then(async (data) => {
                    console.log(data);
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
                    console.log(res);
                    return res.json();
                }).then(async (data) => {
                    console.log(data);
                    document.getElementById("userPhoto").src = data.Profile.photo;
                });
            } catch (error) {
                console.error(error);
            }
        };
    }

});