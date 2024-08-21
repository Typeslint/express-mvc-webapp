"use strict";

$(window).on("load", function() {
    $("#status").fadeOut(), $("#preloader").delay(350).fadeOut("slow"), $("body").delay(350).css({
        overflow: "visible"
    }), $(".mainauto").delay(350).css({
        visibility: "visible"
    })
});

const slider = document.getElementById("qty");
const output = document.getElementById("qtyrange");

output.innerHTML = slider.value + " KG";
slider.addEventListener("input", function() {
    output.innerHTML = slider.value + " KG";
});

let qtyValue, nameValue, phoneValue, addressValue;
let serviceOption, deliveryOption;

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
            return;
        } else {
            alert("Kamu belum login");
            return window.location.href = "http://localhost:3000/login";
        }
    });
})();

window.addEventListener("load", async () => {
    var serviceBoxes = document.querySelectorAll(".servicesBox input[type=\"checkbox\"]");
    var deliveryBoxes = document.querySelectorAll(".deliveryBox input[type=\"checkbox\"]");

    serviceBoxes.forEach(async (checkbox) => {
        checkbox.checked = false;
    });

    deliveryBoxes.forEach(async (checkbox) => {
        checkbox.checked = false;
    });
});

document.querySelectorAll(".servicesBox input[type=\"checkbox\"]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        const servicesBox = checkbox.closest(".servicesBox");
        servicesBox.querySelector(".optionImg").classList.toggle("checked", checkbox.checked);

        if (servicesBox.querySelector(".optionImg").classList.contains("checked")) {
            servicesBox.style.outline = "4px solid #21B7E2";
        } else {
            servicesBox.style.outline = "none";
        }

        const checkedOptions = Array.from(document.querySelectorAll(".servicesBox input[type=\"checkbox\"]:checked")).map(checkbox => checkbox.id);
        serviceOption = checkedOptions;
    });
});

document.querySelectorAll(".deliveryBox input[type=\"checkbox\"]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        const deliveryBox = checkbox.closest(".deliveryBox");
        const allDeliveryBoxes = document.querySelectorAll(".deliveryBox");

        allDeliveryBoxes.forEach((box) => {
            if (box !== deliveryBox) {
                box.querySelector(".optionImg").classList.remove("checked");
                box.style.outline = "none";
                box.querySelector("input[type=\"checkbox\"]").checked = false;
            }
        });

        deliveryBox.querySelector(".optionImg").classList.toggle("checked", checkbox.checked);

        if (checkbox.checked) {
            deliveryBox.style.outline = "4px solid #21B7E2";
        } else {
            deliveryBox.style.outline = "none";
        }

        const checkedOptions = Array.from(document.querySelectorAll(".deliveryBox input[type=\"checkbox\"]:checked")).map((checkbox) => {
            if (checkbox.id == "pickupdelivery") {
                return "pickup%20%26%20delivery";
            } else {
                return checkbox.id;
            }
        });
        deliveryOption = checkedOptions;
    });
});

function backButton() {
    window.location.href = "http://localhost:3000/home";
    return;
}

async function submitForm() {
    qtyValue = document.getElementById("qty").value;
    nameValue = document.getElementById("usernameValue").value;
    phoneValue = document.getElementById("phoneValue").value;
    addressValue = document.getElementById("addressValue").value;
    if (nameValue && phoneValue && addressValue && serviceOption && deliveryOption) {
        return window.location.href = `http://localhost:3000/pay?qty=${qtyValue}&name=${nameValue}&phone=${phoneValue}&address=${addressValue}&service=${serviceOption.join(", ")}&delivery=${deliveryOption}&total=0`;
    } else {
        alert("Data Tidak Lengkap");
        return;
    }
}
