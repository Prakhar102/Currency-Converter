let ipt = document.querySelector("input");
let dropDown = document.querySelectorAll(".drop_down select");
let from = document.querySelector(".from select");
let to = document.querySelector(".to select");
let submit = document.querySelector("button");
let msg = document.querySelector(".msg");


for (let select of dropDown) {
    for (let curCode in countryList) {
        //countryList ke hr ik country code ko utha ke ik new option create kr rhe hai and 
        //uske innertext and value ko country code ke equal kr diye
        let newOption = document.createElement("option");
        newOption.innerText = curCode;
        newOption.value = curCode;
        select.appendChild(newOption);
    };
    //Yaha hum event listener lagaye ki jb hum koi cuntry code ko click kre tho sath me flag v change ho jaye
    select.addEventListener("change", (evt) => {
        // console.log(evt.target);
        // console.log(evt.target.value)
        updateFlag(evt.target);
    });
}
function updateFlag(element) {
    let countryCode = countryList[element.value];

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`

    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

let url = "https://v6.exchangerate-api.com/v6/cd868803e7a280c541409e0b/latest/";


submit.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if (amountValue == " " || amountValue < 1) {
        amountValue = 1;
        amount.value = 1;
    }

    let newUrl = `${url}${from.value.toLowerCase()}`;
    console.log(newUrl)
    try {
        let res = await fetch(newUrl);
        let data = await res.json();

        let convert = data.conversion_rates[to.value.toUpperCase()];
        let finalValue = convert * amountValue;

        msg.innerText = `${amountValue} ${from.value} <=> ${finalValue} ${to.value.toUpperCase()}`;
    }
    catch (err) {
        console.log(err);
    }
})

