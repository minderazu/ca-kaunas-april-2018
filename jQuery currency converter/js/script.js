$("#convert").click(function () {
    let rate = 0;
    let currency_name_full = "";
   
    let base_amount = Number($("#base_input").val());
    let currency = $("#currency_select").val();

    if(currency == "USD" ){
        rate = 1.23;
        currency_name_full = "US Dollar";
    }else if(currency == "GBP" ){
        rate = 0.87;
        currency_name_full = "British Pound";
    }else if(currency == "PLN"){
        rate = 4.17;
        currency_name_full = "Polish Zloty";
    }else if( currency == "DKK"){
        rate = 7.45;
        currency_name_full = "Danish Krone";
    }else if (currency == "RUB"){
        rate = 76;
        currency_name_full = "Russian Ruble";
    }

    let result = base_amount * rate;

    $(".result_bottom").text(result + " " + currency);
    $(".result_top").text(rate + " " + currency_name_full);

});