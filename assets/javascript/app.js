
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

//here we will make a on click function for when the user clicks the submit button
$("#submit-button").on("click", function(event) {

    event.preventDefault();

    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-time").val().trim();
    var frequency = $("#frequency-input").val().trim();

    database.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time").val("");
    $("#frequency-input").val("");

});

database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());

    $("table").append("<tr><td>" +
     snapshot.val().name + "</td><td>" + 
     snapshot.val().destination + "</td><td>" + 
     snapshot.val().firstTrain + "</td><td>" + 
     snapshot.val().frequency + "</td></tr>");


});