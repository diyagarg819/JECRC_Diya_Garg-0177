function task18(){
const cart=[500,1200,800,1500];
const total=cart.reduce((s,p)=>s+p,0);
document.getElementById("t18").innerText=total;
}