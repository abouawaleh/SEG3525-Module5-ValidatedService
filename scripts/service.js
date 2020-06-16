// Function to verify that the phone number is correct.
// Here, I validate for (12345), but you have to change that for a phone validation
// Tutorials on Regular expressions
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions 
// https://flaviocopes.com/javascript-regular-expressions/ 
// Regular expressions can get complex, you can think in terms of a series of characters
// or numbers 
function validatePhone(txtPhone) {
    var a = document.getElementById(txtPhone).value;
    // This filter asks for something like (12345), so parentheses with any number (at least 1)
    // of digits
    // Regex taken from https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
    var filter = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}

function validateCard(txtDebit) {
    var a = document.getElementById(txtDebit).value;
    // This filter asks for something like (12345), so parentheses with any number (at least 1)
    // of digits
    // Regex taken from https://ihateregex.io/expr/credit-card
    var filter = (^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$);
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}

// Using date restrictions on datepicker
// Document of datepicker is here: https://api.jqueryui.com/datepicker/ 
// The following code shows how to set specific dates to exclude, as well as Sundays (Day 0)
// Make sure in your version that you associate Days to remove with Experts (e.g. John doesn't work Mondays)
const setDateFormat = "yyyy-MM-ddThh:mm";

function disableDates(date) {         
    var day = date.getDay();
    
    // code to check if radio button is checked from https://stackoverflow.com/questions/2272507/find-out-whether-radio-button-is-checked-with-jquery
    if($('#radioJohn').is(':checked')) { 
        return [(day != 0 && day != 4 && day != 5 && day != 6)];
    }
    
    if($('#radioJane').is(':checked')) {         
       var day = date.getDay();
        return [(day != 0 && day != 1 && day != 2 && day != 3)];
    }
}


// HERE, JQuery "LISTENING" starts
$(document).ready(function(){

    //If text empty, when focus out it becomes red
    //If empty and red, when writing text, it goes back to original color
    //Code taken from https://stackoverflow.com/questions/24079277/how-change-border-color-of-text-box-when-text-box-empty-lost-focus-event-and-onf
    $("input[type='text']").keyup(function () {
        var text = $(this).val();
        if(text != "")
        {
            $(this).css('border','solid 1px #ced4da');
        }
        });
    $("input[type='text']").blur(function () {
        var text = $(this).val();
        if(text == "")
        {
            $(this).css('border','solid 1px red');
        }
        });                
                    
               
                    
    // phone validation, it calls validatePhone
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the phone input
    // The "error" class in style.css defines yellow background and red foreground
    $("#phone").on("change", function(){
        if (!validatePhone("phone")){
            alert("Wrong format for phone");
            $("#phone").val("(xxx) xxx-xxxx");
            $("#phone").addClass("error");
        }
        else {
            $("#phone").removeClass("error");
        }
    });

    // To change the style of the calender, look in jqueryui.com, under Themes, in the ThemeRoller Gallery 
    // You can try different themes (the names are under the calendars) / This is Excite Bike 
    // To use a different theme you must include its css in your HTML file. 
    // The one I included in my HTML is the Excite Bike, but you can try others

    // Also, here is a good tutorial for playing with the datepicker in https://webkul.com/blog/jquery-datepicker/ 
    // Datepicker is also documented as one of the widgets here: https://api.jqueryui.com/category/widgets/ 
    $( "#dateInput" ).datepicker(
        {
            dateFormat: setDateFormat,
            // no calendar before June 1rst 2020
            minDate: new Date('06/01/2020'),  
            maxDate: '+4M',
            // used to disable some dates
            beforeShowDay: $.datepicker.noWeekends,
            beforeShowDay: disableDates
        }   
    );
    
    //Card number validation
    $("#debit").on("change", function(){
        if (!validateCard("debit")){
            alert("Wrong format for card number");
            $("#debit").addClass("error");
        }
        else {
            $("#debit").removeClass("error");
        }
    });
    
});
