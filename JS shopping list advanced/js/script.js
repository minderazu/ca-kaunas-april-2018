let products = [];

// istraukiam issaugotus produktus is local storage
let products_list_string = localStorage.getItem("ProdList");

// atgaunam issaugotu produktu masyva
let products_stored = JSON.parse(products_list_string);

if (products_stored != null) {
    products = products_stored;
}
print_products(products);

function add() {
    //nuskaityti reiksme nuo laukelio
    let new_product = document.getElementById("product_name").value;
    let new_quantity = Number(document.getElementById("product_quantity").value);
    let new_price = Number(document.getElementById("product_price").value);
    let new_city = document.getElementById("order_city").value;


    //patikrinti ar elementas egzistuoja
    let egzistuoja = false; // boolean

    egzistuoja = checkForDuplicates(new_product, products);



    if (egzistuoja == false) {
        // add product that does not exist
        let prod = {
            name: new_product,
            quantity: new_quantity,
            price: new_price,
            city: new_city

        };
        products.push(prod);


    }
    else {
        // show alert - product exists    
        alert("Produktas jau įvestas!");
    }
    resetForm();
    let products_string = JSON.stringify(products);
    // //
    localStorage.setItem("ProdList", products_string);
    // // atvaizduoti masyva
    print_products(products);
    // // print_sum(products);
    document.getElementById("btn_add").disabled = true;

}





function print_products(products) {
    let h = "";
    if (products != null) {
        for (let i = 0; i < products.length; i++) {
            h = h + "<tr><td>" + products[i].name + "</td><td>" + products[i].quantity + "</td><td>"
                + products[i].price + "</td><td>" + products[i].city + "</td><td>"
                + '<a href="#" onclick="clearEntry(this)" id="btnRem">Šąlinti</a>' + "</td></tr>";

               

        }
         document.getElementById("product_list").innerHTML = h;
    } else {
        document.getElementById("product_list").innerHTML = h;

    }
}
function checkForDuplicates(new_product, products) {
    let found = false;
    for (let i = 0; i < products.length; i++) {
        if (products[i].name == new_product) {
            found = true;
        }
    }
    return found;
}

// function print_sum(products, new_price) {
//     let total = 0;
//     for (let i = 0; i < products.length; i++) {
//         let p = products[i];
//         total += p.price;
//         document.getElementById("sum").innerHTML = total;
//     }
// }

function releaseButton() {
    document.getElementById("btn_add").disabled = false;
    document.getElementById("btn_clear").disabled = false;

}

function clearLocStorage() {
    localStorage.removeItem("ProdList");
    products = [];
    print_products();
    document.getElementById("btn_clear").disabled = true;
}

function clearEntry(a) {
    var i = products.indexOf(a);
    products.splice(i, 1);
    var row = a.parentNode.parentNode;
    row.parentNode.removeChild(row);
    // JSON
    let products_string = JSON.stringify(products);
    localStorage.setItem("ProdList", products_string);
}

function resetForm() {
    document.getElementById("my_form").reset();
}
