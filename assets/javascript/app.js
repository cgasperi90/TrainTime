
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

//now we will make our variables that will go into the database
    