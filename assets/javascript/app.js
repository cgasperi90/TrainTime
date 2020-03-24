
//here we will be making the variable to call our database
var config = {
    apiKey: "AIzaSyAaTZtoBP2wiLZD7tm0Ev5ZE2Uagh-XGeY",
    authDomain: "closproject.firebaseapp.com",
    databaseURL: "https://closproject.firebaseio.com",
    projectId: "closproject",
    storageBucket: "closproject.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.database();

//We are going to display the current time on the page so users know what the time is
var currentTime;
var date;
$("#current-time").text("Current Time: " + moment(currentTime).format("LT"));

//function so that the time updates every second instead of refreshing the page
//to see the updated time
var update = function() {
    date = moment(new Date());
    currentTime.html(date.format("dddd, MMMM Do YYYY, hh:mm:ss A"));
}

//This updates the document every second and runs the update function
$(document).ready(function() {
    currentTime = $("#current-time");
    update();
    setInterval(update, 1000);
});



//here we will make a on click function for when the user clicks the submit button
$("#submit-button").on("click", function(event) {

    event.preventDefault();

    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-time").val().trim();
    var frequency = $("#frequency-input").val().trim();

    var firstTimeConverted = moment(firstTrain, "HH:mm");
    console.log(firstTimeConverted);
    
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes")
    console.log(diffTime);

    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var tMinutesTillTrain = frequency - tRemainder;
    console.log(tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log(moment(nextTrain).format("hh:mm A"));

    database.ref().push({
        name: name,
        destination: destination,
        tMinutesTillTrain: tMinutesTillTrain,
        nextTrain: JSON.parse(JSON.stringify(nextTrain.format("hh:mm A"))),
        frequency: frequency
    });

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time").val("");
    $("#frequency-input").val("");



});

database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());

    $("table").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().destination + "</td><td>" + "<p>Every " + snapshot.val().frequency + " Minutes</p>" + "</td><td>" + snapshot.val().nextTrain + "</td><td>" + snapshot.val().tMinutesTillTrain + "</td></tr>");


});