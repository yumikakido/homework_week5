// DOM elements
var currentDateEl = $('#currentDay');
var container = $(".container");

// Displaying today's date
var today = moment().format('dddd MMM Do, YYYY');
currentDateEl.text(today);

function createTimerBlock(time) {

    // Time in each row
    const timeMoment = moment(time, "H")

    const timeRow = $("<div class = 'row align-items-center time-row'>");

    const colTime = $("<div class = 'col-2 d-flex justify-content-end time-col-time'>").text(timeMoment.format('hA'));
    
    const colTextArea = $("<div class = 'time-col-textarea'>");
    // Getting saved events so they persist even after refreshing the page`
    const textArea = $("<textarea cols='80'>").val(localStorage.getItem(time));
    // Real time
    const currentTime = moment();

    // Color coded to indicate whether it is in the past, current or future
    const isPast = timeMoment < currentTime; 
    const isPresent = (currentTime > timeMoment) && (currentTime < timeMoment.clone().add(1, "hours"));
    const isFuture = (timeMoment  > currentTime)
    if(isPresent) {
        textArea.addClass("present");        
    }
    if(isPast) {
        textArea.addClass("past");
    }
    if(isFuture) {
        textArea.addClass("future");
    }

    colTextArea.append(textArea);

    //Save button
    const colButton = $(`<div id='${time}' class = 'col-2 time-col-button'>`);
    const button = $('<button type="submit" class="fas fa-save btn btn-primary">');
    colButton.append(button);

    // Saving event in local storage
    button.click(function() {
        localStorage.setItem(time,textArea.val() );
    })

    return  timeRow.append(colTime, colTextArea, colButton)
}


// Creating time block
$ (function() {

    for (let index = 9; index < 18; index++) {
        const timeBlock = createTimerBlock(index);
        container.append(timeBlock); 
    }

})
