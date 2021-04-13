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

// adds events to localStorage
var saveEvents = function() {
    localStorage.setItems("events", JSON.stringify(events));
};

