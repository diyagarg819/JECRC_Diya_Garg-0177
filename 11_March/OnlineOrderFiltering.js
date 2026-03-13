function task17(){
const orders=[450,1200,700,3000,1500];
const result=orders.filter(o=>o>1000);
document.getElementById("t17").innerText=JSON.stringify(result);
}