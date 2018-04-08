const clientPromise = stitch.StitchClientFactory.create('hospitalapp-htwsl');

let client;
let db;
let times = 0;
//call this when the submit button is pressed
function loadClient() {

  if (this.localStorage.getItem("username") === ""){

    window.location = "loginTester.html";

  }

  console.log(this.localStorage.getItem('username'))
    clientPromise.then(stitchClient => {
        client = stitchClient;
        db = client.service('mongodb', 'mongodb-atlas').db('HospitalDatabase');

          client.login();
    });
}

//adds the user (hospital)
function addSupply(){

  var user = this.localStorage.getItem("username");

  var d = new Date();
  var update = (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
  //get the username and password
  var id =  document.getElementById("id").value;
  var name =  document.getElementById("name").value;
  var brand =  document.getElementById("brand").value;
  var cat =  document.getElementById("category").value;
  var quantity =  document.getElementById("quantity").value;

    var times = 0;

    if (id != "" && name != "" &&  brand != "" &&  cat != "" && quantity != ""){

        db.collection('Hospitals').find({'user' : user}).limit(1).execute().then(doc => {
              doc.map(c => {

              if (c.supplies instanceof Array){

                c.supplies.every(function(supply){

                  if ( supply.id == id){

                    var newQuantity = parseInt(supply.quantity) + parseInt(quantity);

                    console.log(newQuantity);

                    times = 1;


                    if (newQuantity >= 0){

                    db.collection('Hospitals').updateOne(
                       {'user': user, 'supplies.id' : id },
                       { $set: { "supplies.$.quantity" :  newQuantity +""} }
                    );
                  }

                }
              });
            }
          });

          if (times == 0){

            console.log("new");

              db.collection('Hospitals').updateOne(
                {'user' : user},
              { $push: {
                "supplies": { "id": id, "name": name, "brand": brand,
                      "cat": cat, "quantity" : quantity,
                      "updated": update
                    }
                  }
                });
          }

          document.getElementById("id").value = "";
          document.getElementById("name").value ="";
          document.getElementById("brand").value = "";
          document.getElementById("category").value = "";
          document.getElementById("quantity").value = "";

          document.getElementById("message").innerHTML = id + " updated!";

        return;
      });
    }

    document.getElementById("message").innerHTML = "Not all fields filled!";

  }

    /*
    db.collection('Hospitals').updateOne(
      {

        $and: [

           {'user' : user},

           {'supplies' : {"id": id, "name": name, "brand": brand, "cat": cat}}
         ]

      },
    { $set: { "supplies.$.quantity" : quantity, "supplies.$.updated": update }}

  ).then(function(result) {

    times = 1;

    document.getElementById("message").innerHTML = id + " updated!";

    return;

  });

  if (times == 0){

    console.log("new");

    db.collection('Hospitals').updateOne(
      {'user' : user},
    { $push: {
      "supplies": { "id": id, "name": name, "brand": brand,
            "cat": cat, "quantity" : quantity,
            "updated": update
          }
        }
      }
  );

  return;
}
}*/
