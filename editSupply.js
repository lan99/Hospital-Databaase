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
function editSupply(){

  var user = this.localStorage.getItem("username");

  var d = new Date();
  var update = (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
  //get the username and password
  var id =  document.getElementById("id").value;
  var add =  document.getElementById("add").value;
  var subtract =  document.getElementById("subtract").value;


    var times = 0;

    if (id != ""){

        db.collection('Hospitals').find({'user' : user}).limit(1).execute().then(doc => {
              doc.map(c => {

              if (c.supplies instanceof Array){

                c.supplies.every(function(supply){

                  var newQuantity;
                  if ( supply.id == id){

                    if (add != ""){

                      if (subtract == ""){

                        newQuantity = parseInt(supply.quantity) + parseInt(add);
                      }

                      else {

                        return;
                      }
                    }

                    else {

                      if (subtract != ""){

                        newQuantity = parseInt(supply.quantity) - parseInt(subtract);

                        if (newQuantity <0){

                          return;
                        }
                      }

                      else {

                        return;
                      }
                    }

                    times = 1;


                    db.collection('Hospitals').updateOne(
                       {'user': user, 'supplies.id' : id },
                       { $set: { "supplies.$.quantity" :  newQuantity +""} }
                    );

                }
              });
            }
          });

          if (times == 0){

            document.getElementById("message").innerHTML = "Fields incorrect!";

          }

else {
          document.getElementById("id").value = "";
          document.getElementById("add").value = "";
          document.getElementById("subtract").value = "";

          document.getElementById("message").innerHTML = id + " updated!";

}

        return;
      });
    }


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
