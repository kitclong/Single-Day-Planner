// Wait until Jquery loaded
$(document).ready(function () {

    let headerDate = moment().format('dddd, MMMM Do YYYY - h:mm');
    $('#current-day').text(headerDate);

    // ======================================================================================================
    // Display the time in AM/PM within daytime 
    function daytimeAP(hour) {
        let meridiem = '';
        if (hour < 12) {
            meridiem = 'AM';
        } else {
            meridiem = 'PM';
        }
        hour = hour % 12; //Modulus remainder to print out 12hr 9, 10, 11 etc
        hour = hour ? hour : 12; //ternary operator (condition ? true:false) print 12 for 0
        return hour + ' ' + meridiem;
    }


    // ======================================================================================================
    // Color for input box according to time past, present, future
    function updateColor() {
        let hour = new Date().getHours(); //getHours method to compare local time
        for (var i = 9; i <= 17; i++) {
            console.log(hour, i);

            if (hour == i) {
                $(`#inputText${i}`).css('background', '#ff6961');  //color input present red
            } else if (hour < i) {
                $(`#inputText${i}`).css('background', '#77dd77');  //color input future green
            } else {
                $(`#inputText${i}`).css('background', '#d3d3d3');  //color input past grey
            }
        }
    }
    setInterval(function () {
        updateColor();
    }, 100);

    // ======================================================================================================
    //Iterate to display 9am - 17:00pm (9-5) and create rows with jquery
    //Use backtick in jquery for multi-line strings, interpolate an expression within string
    let row = '';
    for (let i = 9; i <= 17; i++) {
        row = $(`<div class="row">`);
        firstCol = $(`<div class="col-12 col-lg-2 hour">${daytimeAP(i)}</div>`);
        row.append(firstCol);

        secondCol = $(`<div class="col-12 col-lg-8 inputStuff"><input data-input="${i}" id="inputText${i}" class="form-control inputText" type="text" name="userInput"></div>`);
        row.append(secondCol);

        thirdCol = $(`<div class="col-12 col-lg-2"><button data-id="${i}" id="savePlanner" class="btn btn-success btn-block"><i class="fas fa-save"></i></button></div>`);
        row.append(thirdCol);

        $("#display-planner").append(row);

        grabStorage(i);
    }

    // ======================================================================================================
    // Create bootstrap save button for onclick event to save to local storage
    $('button.btn.btn-success').click(function () {
        let save = $(this).data('id');
        let inputText = $(this).parent().siblings().find('input').val();
        localStorage.setItem(save, inputText);
    });

    // ======================================================================================================
    // Grab values in local storage
    function grabStorage(time) {
        let value = localStorage.getItem(time);
        if (true) {
            let text = $(`input#inputText${time}`).val(value);
            console.log(text);
        }
    }
});