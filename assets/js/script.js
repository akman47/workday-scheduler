// set date at top of page
var today = moment();
$("#currentDay").text(today.format("dddd, MMMM Do"));

// event object to store in localStorage
var events = {
    "9": [],
    "10": [],
    "11": [],
    "12": [],
    "13": [],
    "14": [],
    "15": [],
    "16": [],
    "17": []
};

// add events to localStorage
var saveEvents = function() {
    localStorage.setItem("events", JSON.stringify(events));
};

// loads events from localStorage and create events in correct row
var loadEvents = function() {
    var loadedEvents = JSON.parse(localStorage.getItem("events"));

    if (loadedEvents) {
        events = loadedEvents;

        // for each key/value in events, create an event
        $.each(events, function(hour, event) {
            var hourDiv = $("#" + hour);
            createEvent(hourDiv, event);
        });
    }

    //auditEvents();
}

// create events
var createEvent = function (eventHour, eventNote) {
    // create element 
    var hourDiv = eventHour.find(".event");

    var eventP = $("<p>")
        .addClass("description")
        .text(eventNote);

    // append p element to hour div
    hourDiv.html(eventP);
};

// ability to create and edit events by clicking on p
$(".event").on("click", function() {
    var text = $(this)
        .text()
        .trim();
    console.log("text", text);

    // creates new textarea element
    var textInput = $("<textarea>")
        .addClass("w-75 form-control description")
        .val(text);

    $(this).replaceWith(textInput);

    console.log("text Input", textInput);

    // highlights the element
    textInput.trigger("focus");
});

// when save button is clicked, new/edited event is updated and sent to localStorage
$(".saveBtn").click(function() {
    // get textarea's current value
    var textInput = $(this)
        .closest(".event-info")
        .find("textarea")
        .val()
        .trim();

    // get event hour from parent div event-info
    var hour = $(this)
        .closest(".event-info")
        .attr("id");

    // add new event description to events array and save events
    events[hour] = textInput;
    console.log("events", events);
    saveEvents();
    
    // re-create p element
    var eventP = $("<p>")
        .addClass("col-10 description")
        .text(textInput);

    // replace textarea with p element
    $(this).closest(".event-info").find("textarea").replaceWith(eventP);
});

// load event descriptions onto page
loadEvents();
