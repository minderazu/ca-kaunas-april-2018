let cities = []

function test() {
    let text_input = $("#input_field").val();
    if (text_input) {

        $("#input-validation-error").fadeOut('fast');
        $("#input_field").removeClass("is-invalid");

    } else {
        $("#input-validation-error").text("Įveskite miestą");
        $("#input-validation-error").fadeIn('fast');
        $("#input_field").addClass("is-invalid");

    }}