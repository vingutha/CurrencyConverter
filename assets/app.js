const base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

//adding option to from amd to elements
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
// for (i in countryList){
//     console.log(i, countryList[i] ) //get the currencycode and countrycode
// }

for (let select of dropdown){
    for ( currCode in countryList){ 
        let option = document.createElement("option");//creating option element for every select item
        option.innerText = currCode;
        option.value = currCode;
        if(select.name === 'from' && currCode === 'USD'){
            option.selected="selected";
        }
       else if(select.name === 'to' && currCode === 'INR'){
            option.selected="selected";
        }
        select.append(option);
    }
    select.addEventListener("change", (event)=>{
        updateFlag(event.target);
    });
}

const UpdateExchageRate = async () => {
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 0){
        amtVal = 1;
        amount.Value = "1";
    }

    const URL = `${base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let amt = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${amt} ${toCurr.value}`;

};

const updateFlag = (element) => {  //<select name="from"> is the element
    let currCode = element.value;
    let countryCode = countryList[currCode]; 
    //get the country code from curr code
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    UpdateExchageRate();
});


window.addEventListener("load", () => {
    updateExchangeRate();
});