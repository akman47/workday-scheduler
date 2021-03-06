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

    auditEvents();
};

// create events
var createEvent = function (eventHour, eventNote) {
    // find corresponding hour
    var hourDiv = eventHour.find(".description");

    auditEvents();

    // add edited event text to hour div
    hourDiv.html(eventNote);
};

// ability to create and edit events by clicking on textarea
$(".description").on("click", "textarea", function() {
    var text = $(this)
        .text()
        .trim();
    console.log("text", text);

    $(this).html(text);

    // highlights the element
    $(this).trigger("focus");
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

    // replace textarea with div element containing textInput
    $(this).closest(".event-info").find(".description").html(textInput);

    auditEvents();
});

// // blur event will trigger when user clicks away from textarea without saving events
// $(".description").on("blur", function() {
//     $("textarea").each(function() {
//         var text = $(this).val().trim();
//         events = text;
//         console.log(events);
//         saveEvents();
//     });
// });

// change background of task to reflect agenda's availability
var auditEvents = function() {
    // current hour
    var currentHour = moment().hour();
    
    // event hour
    $(".event-info").each(function() {
        var eventHour = parseInt($(this).attr("id"));

        // remove old classes
        $(this).removeClass("past future present");

        // apply new class if event hour is past, present, or future
        if(currentHour > eventHour) {
            $(this).find(".description").addClass("past");
        }
        else if (currentHour === eventHour) {
            $(this).find(".description").addClass("present");
        }
        else {
            $(this).find(".description").addClass("future");
        }
    });
}

// automate auditEvents
setInterval(auditEvents, 5000);

// load event descriptions onto page
loadEvents();