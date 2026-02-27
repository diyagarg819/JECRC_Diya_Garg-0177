
const companyName = "TechMart";
let warehouseLocation = "Delhi";
var totalProducts = 0;


let products = [
    { id: 1, name: "Laptop", price: 50000, quantity: 5 },
    { id: 2, name: "Mouse", price: 500, quantity: 20 },
    { id: 3, name: "Keyboard", price: 1500, quantity: 10 }
];


totalProducts = products.length;


function displayProducts() {
    for (let i = 0; i < products.length; i++) {
        console.log(
            products[i].id + " " +
            products[i].name + " " +
            products[i].price + " " +
            products[i].quantity
        );
    }
}
 
function calculateInventoryValue() {
    let totalValue = 0;

    for (let i = 0; i < products.length; i++) {
        totalValue += products[i].price * products[i].quantity;
    }

    return totalValue;
}

function applyDiscount(discountPercent = 10) {
    for (let i = 0; i < products.length; i++) {
        products[i].price =
            products[i].price - (products[i].price * discountPercent) / 100;
    }
}


console.log("Before Block:");
console.log(warehouseLocation, totalProducts);

{
    let warehouseLocation = "Mumbai"; // block scoped
    var totalProducts = 100;          // NOT block scoped

    console.log("Inside Block:");
    console.log(warehouseLocation, totalProducts);
}

console.log("After Block:");
console.log(warehouseLocation, totalProducts);


displayProducts();
console.log("Total Inventory Value:", calculateInventoryValue());
applyDiscount();
console.log("After Discount:");
displayProducts();