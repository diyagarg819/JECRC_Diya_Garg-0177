function task20(){
const marks=[35,67,48,90,55,30];
const result=marks.filter(m=>m>50);
document.getElementById("t20").innerText=JSON.stringify(result);
}