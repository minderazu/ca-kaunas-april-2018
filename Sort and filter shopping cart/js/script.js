var produktai = [];

//istraukiam issaugotas produktus is LocalStorage
var prod_list_string = localStorage.getItem("prod_sarasas");
//console.log(prod_list_string);

//atgaunam Issaugotu produktu masyva.
var prod_sarasas = JSON.parse(prod_list_string);
//console.log(prod_sarasas);

if (prod_sarasas != null) {
  produktai = prod_sarasas;
}

printProduktai(produktai);

function add() {
  //Input
  var pavadinimas_input = document.getElementById("pavadinimas").value;
  var kaina_input = document.getElementById("kaina").value;
  var kiekis_input = document.getElementById("kiekis").value;
  var miestas_input = document.getElementById("miestas").value;

  let errors_found = false;

  // Tikrinam "Kaina" laukeli
  if (kaina_input) {
    // Laukelis nera tuscias
    // viskas tvarkoi, tesiam toliau
    if (Number(kaina_input) <= 0 || Number(kaina_input) > 10000) {
      // cia yra klaida, kaina neatitinka kriterijų
      $("#kaina-validation-error").text(
        "Kaina negali viršyti 10000 ir būti 0 arba mažesnė"
      );
      $("#kaina-validation-error").fadeIn("fast");
      $("#kaina").addClass("is-invalid");
      errors_found = true;
    } // patikrinti ar kiekis turi "+" ARBA "-"
    else if (kaina_input == "-" || kaina_input == "+") {
      // rastas neleistinas "+" zenklas - klaida
      alert("Dėmesio, rastas + arba -");
      errors_found = true;
    } else {
      // klaidu nerasta, viskas gerai
      $("#kaina-validation-error").fadeOut("fast");
      $("#kaina").removeClass("is-invalid");
    }
  } else {
    // KLAIDA: "Kaina" laukelis yra privalomas ir negali buti tuscias
    $("#kaina-validation-error").text("Įveskite kainą");
    $("#kaina-validation-error").fadeIn("fast");
    $("#kaina").addClass("is-invalid");
    errors_found = true;
  }

  // Tikrinam "Pavadinimas" laukeli
  if (pavadinimas_input) {
    // Laukelis nera tuscias
    if (pavadinimas_input.length > 50) {
      // cia yra klaida, perilgas produkto pavadinimas
      $("#pavadinimas-validation-error").text("Per ilgas prekės pavadinimas.");
      $("#pavadinimas-validation-error").fadeIn("fast");
      $("#pavadinimas").addClass("is-invalid");
      errors_found = true;
    } else {
      // klaidu nerasta, viskas gerai
      $("#pavadinimas-validation-error").fadeOut("fast");
      $("#pavadinimas").removeClass("is-invalid");
    }
  } else {
    $("#pavadinimas-validation-error").text("Įveskite pavadinimą");
    $("#pavadinimas-validation-error").fadeIn("fast");
    $("#pavadinimas").addClass("is-invalid");
    errors_found = true;
  }

  // Tikrinam "Kiekis" laukeli
  if (kiekis_input) {
    // Laukelis nera tuscias
    if (Number(kiekis_input) < 1 || Number(kiekis_input) > 1000) {
      // cia yra klaida, kiekis neatitinka kriteriju
      $("#kiekis-validation-error").text(
        "Kiekis negali viršyti 1000 ir būti mažesnis nei 1"
      );
      $("#kiekis-validation-error").fadeIn("fast");
      $("#kiekis").addClass("is-invalid");
      errors_found = true;
    } // patikrinti ar kiekis turi "+" ARBA "-"
    else if (kiekis_input.indexOf("+") > -1 || kiekis_input.indexOf("-") > -1) {
      // rastas neleistinas "+" zenklas - klaida
      alert("Demesio rastas + arba -");
      errors_found = true;
    } else {
      // klaidu nerasta, viskas gerai
      $("#kiekis-validation-error").fadeOut("fast");
      $("#kiekis").removeClass("is-invalid");
    }
  } else {
    $("#kiekis-validation-error").text("Įveskite kiekį");
    $("#kiekis-validation-error").fadeIn("fast");
    $("#kiekis").addClass("is-invalid");
    errors_found = true;
  }
  // Tikrinam "Miestas" laukeli
  if (miestas_input) {
    // Laukelis nera tuscias
    if (pavadinimas_input.length > 50) {
      // cia yra klaida, perilgas miesto pavadinimas
      $("#miestas-validation-error").text("Per ilgas miesto pavadinimas.");
      $("#miestas-validation-error").fadeIn("fast");
      $("#miestas").addClass("is-invalid");
      errors_found = true;
    } else {
      // klaidu nerasta, viskas gerai
      $("#miestas-validation-error").fadeOut("fast");
      $("#miestas").removeClass("is-invalid");
    }
  } else {
    $("#miestas-validation-error").text("Įveskite miestą.");
    $("#miestas-validation-error").fadeIn("fast");
    $("#miestas").addClass("is-invalid");
    errors_found = true;
  }

  if (!errors_found) {
    // Jeigu klaidu nera, viskas gerai - galima registruot nauja produkta.
    //Logic
    var product = {
      pavadinimas: pavadinimas_input,
      kaina: Number(kaina_input),
      kiekis: Number(kiekis_input),
      miestas: miestas_input
    };
    produktai.push(product);
    console.log(produktai);

    //Output
    printProduktai(produktai);

    //Nera privaloma, bet mes issaugom i "localStorage".
    var p_string = JSON.stringify(produktai);
    localStorage.setItem("prod_sarasas", p_string);

    //Isvalyti forma
    resetForm();
  } else {
    // Jeigu klaidu yra, reikia apsaugoti duomenis
    // alert("buvo rasta klaida, registracija neiviko.");
  }
}

function printProduktai() {
  var h = "";
  h = h + "<table class='table table-striped' id=myTable>";
  h =
    h +
    "<tr><thead class='thead-dark'><th> Pavadinimas </th> <th>Kiekis</th> <th>Kaina</th> <th>Miestas</th> <th>Veiksmas</th></thead></tr>";
  for (var i = 0; i < produktai.length; i++) {
    let prod = produktai[i];
    h =
      h +
      "<tr><td>" +
      prod.pavadinimas +
      "</td>" +
      "<td>" +
      prod.kiekis +
      "</td>" +
      "<td>" +
      prod.kaina +
      "&euro;" +
      "</td>" +
      "<td>" +
      prod.miestas +
      "</td>" +
      "<td>" +
      "<button onclick='remove(" +
      i +
      ")' class='btn btn-link'>[Šalinti]</button>" +
      "</td></tr>";
    // console.log(p);
  }
  h = h + "</table>";
  document.getElementById("spausdinti").innerHTML = h;
}

function remove(index) {
  // reikia istrinti elementa pagal Indexa.
  //PASALINAM indexo dali
  produktai.splice(index, 1);

  //po pakeitimo, reikia is naujo atspausdint, ir is naujo issaugot

  //atspausdinam
  printProduktai(produktai);

  //issaugom i "localStorage".
  var p_string = JSON.stringify(produktai);
  localStorage.setItem("prod_sarasas", p_string);
}

function resetForm() {
  document.getElementById("myForm").reset();
}

function clearSavedData() {
  localStorage.removeItem("prod_sarasas");

  // is naujo persaugoti einama masyva
  produktai = [];
  //is naujo atvaizduot masyvo elementus
  printProduktai(produktai);
}

$("#sort_by_name").click(function() {
  produktai = produktai.sort(function(a, b) {
    return a.pavadinimas > b.pavadinimas; // Rusiuojame abeceles tvarka pagal pavadinima
  });
  printProduktai(produktai);
});

$("#sort_by_price").click(function() {
  produktai = produktai.sort(function(a, b) {
    return a.kaina > b.kaina; // Rusiuojame nuo maziausios pagal kaina
  });
  printProduktai(produktai);
});

//Filtravimas
//Pagal vardą
$("#filter_by_name").click(function() {
  produktai = produktai.filter(function(prod) {
    return prod.pavadinimas == document.getElementById("name_input").value;
  });
  printProduktai(produktai);
});

//Pagal kainą - intervale

$("#filter_by_price").click(function() {
  produktai = produktai.filter(function(prod) {
    return (
      prod.kaina >= document.getElementById("range_input1").value &&
      prod.kaina <= document.getElementById("range_input2").value
    );
  });
  printProduktai(produktai);
});
