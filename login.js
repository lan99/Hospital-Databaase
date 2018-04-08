const clientPromise = stitch.StitchClientFactory.create('hospitalapp-htwsl');

let client;
let db;

//when the user clicks submit, will search the database for the user
function lookForUser() {

  this.localStorage.setItem("username", "");

    clientPromise.then(stitchClient => {

        client = stitchClient;
        db = client.service('mongodb', 'mongodb-atlas').db('HospitalDatabase');

          client.login();
    });
}

function check(){

  //get the username and password
  var user =  document.getElementById("username").value;
  var pass =  document.getElementById("password").value;

  db.collection('Hospitals').find({ $and: [{ 'user' : user}, {'password': pass }]}).limit(1).execute().then( docs => {

    var times = 0;
    docs.map(c => times++);

    if (times == 1){

      this.localStorage.setItem("username", user);

      //will redirect to homeTester.html. CHANGE THIS TO CORRECT WEBPAGE
      window.location = "homeTester.html";
      return;
    }

    else {


      document.getElementById("error").innerHTML = "<p> Not a valid user! </p>";

    }
    return;
  });

  return;
}
