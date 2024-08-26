"use strict";

$(window).on("load", function() {
    $("#status").fadeOut(), $("#preloader").delay(350).fadeOut("slow"), $("body").delay(350).css({
        overflow: "visible"
    }), $(".mainauto").delay(350).css({
        visibility: "visible"
    })
});

const urlQuery = new URLSearchParams(window.location.search);
const qtyParams = urlQuery.get('qty');
const nameParams = urlQuery.get('name');
const phoneParams = urlQuery.get('phone');
const addressParams = urlQuery.get('address');
const serviceParams = urlQuery.get('service');
const deliveryParams = urlQuery.get('delivery');
let servicePay, deliveryPay;
let totalParams = urlQuery.get('total');

if (deliveryParams == "pickup") {
    deliveryPay = 5000;
    totalParams = 5000;
} else if (deliveryParams == "delivery") {
    deliveryPay = 5000;
    totalParams = 5000;
} else {
    deliveryPay = 10000;
    totalParams = 10000;
}

if (serviceParams == "washing") {
    servicePay = (5000 * qtyParams);
    totalParams = totalParams + (5000 * qtyParams);
} else if (deliveryParams == "ironing") {
    servicePay = (6000 * qtyParams);
    totalParams = totalParams + (6000 * qtyParams);
} else {
    servicePay = (7000 * qtyParams);
    totalParams = totalParams + (7000 * qtyParams);
}

(async() => {
    await fetch("http://localhost:3000/api/users/profile", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(async (res) => {
        return res.json();
    }).then(async (data) => {
        if (data.status == 200) {
            document.getElementById("nameOrder").innerHTML = nameParams;
            document.getElementById("serviceOrder").innerHTML = serviceParams;
            document.getElementById("serviceOrderPay").innerHTML = servicePay;
            document.getElementById("phoneOrder").innerHTML = phoneParams;
            document.getElementById("deliveryOrder").innerHTML = deliveryParams;
            document.getElementById("deliveryOrderPay").innerHTML = deliveryPay;
            document.getElementById("addressOrder").innerHTML = addressParams;
            document.getElementById("qtyOrder").innerHTML = qtyParams + " KG";
            document.getElementById("totalOrder").innerHTML = totalParams;
            return;
        } else {
            alert("Kamu belum login");
            return window.location.href = "http://localhost:3000/login";
        }
    });
})();

function backButton() {
    window.location.href = "http://localhost:3000/order";
    return;
}

async function submitForm() {
    const nowDate = new Date();
    if (totalParams) {
        let jsonData = {
            tanggal: nowDate,
            qty: qtyParams,
            name: nameParams,
            phone: phoneParams,
            address: addressParams,
            services: {
                service: serviceParams,
                delivery: deliveryParams
            },
            total: totalParams
        }
        await fetch("http://localhost:3000/api/order", {
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
                alert("Pesanan Sudah Dibuat");
                return window.location.href = "http://localhost:3000";
            } else {
                alert("Data Tidak Valid");
                return;
            }
        });
    } else {
        alert("Data Tidak Lengkap");
        return;
    }
}
