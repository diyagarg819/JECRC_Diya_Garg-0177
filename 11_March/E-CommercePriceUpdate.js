function task19(){
const prices=[1200,800,1500,2000];
const discounted=prices.map(p=>p*0.9);
document.getElementById("t19").innerText=JSON.stringify(discounted);
}