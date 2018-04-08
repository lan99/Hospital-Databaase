const clientPromise = stitch.StitchClientFactory.create('hospitalapp-htwsl');

let client;
let db;
let exist;

//call this when the submit button is pressed
function loadClient() {

  if (this.localStorage.getItem("username") == ""){

    window.location = "loginTester.html";

  }
    clientPromise.then(stitchClient => {
        client = stitchClient;
        db = client.service('mongodb', 'mongodb-atlas').db('HospitalDatabase');

          client.login();
    });
}

//adds the user (hospital)
function searchSupply(){

  var user = this.localStorage.getItem("username");

  //get the username and password
  var id =  document.getElementById("id").value;
  var name =  document.getElementById("name").value;
  var brand =  document.getElementById("brand").value;
  var cat =  document.getElementById("category").value;
  var quantity =  document.getElementById("quantity").value;
  var zip =  document.getElementById("zip").value;
  var hName =  document.getElementById("hName").value;
  var searchQuery = "";

  var docs;

  exist = 0;
  if (hName != ""){

  /*if both name and zip*/
    if (zip != ""){

          docs = db.collection('Hospitals').find(  {

              $and: [

                 {'user' : { $ne: user}},

                 {'name' : hName},

                 {'zip':zip}
               ]

            }).limit(2000).execute();
          }

  /*if only name*/
    else {

      docs = db.collection('Hospitals').find(  {

          $and: [

             {'user' : { $ne: user}},

             {'name' : hName}           ]

        }).limit(2000).execute();
  }
}
  else {

    /*if only zip*/
    if (zip != ""){

          db.collection('Hospitals').find(  {

              $and: [

                 {'user' : { $ne: user}},

                 {'zip':zip}
               ]

            }).limit(2000).execute();
          }

  /*if neither Zip nor name*/
      else {

        docs = db.collection('Hospitals').find( {'user' : { $ne: user}}).limit(2000).execute();
      }

  }

var html = "<table border = '1'>";
html = html + "<th>Hospital</th> <th> Address </th> <th> Zip Code </th> <th> Phone</th><th>Email</th><th> Product ID</th> <th> Product Name</th><th>Product Brand</th><th>Product Quantity</th>";
html = html + "<th>Product Category</th><th>Date Updated</th>";

  docs.then(doc => {
        doc.map(c => {

          console.log(c.supplies);

        if (c.supplies instanceof Array){

          c.supplies.forEach(function(supply){

            if (name != ""){

              if (supply.name != name){

                return false;
              }
            }

            if (id != ""){

              console.log("q" + supply.id);
              if (supply.id != id){


                return false;
              }
            }

            if (brand != ""){

              if (supply.brand != brand){

                return false;
              }

           }

            if (cat != ""){

              if (supply.cat != cat){

                return false;
              }
            }

            if (quantity != ""){

              if (!(parseInt(supply.quantity) >= parseInt(quantity))){

                return false;
              }
            }

            exist = 1;
            html += "<tr> <td>" + c.name + "</td> <td>" + c.address + "</td> <td>" + c.zip + "</td><td>" + c.phone+ "</td> <td>" + c.email+ "</td>";

            html += "<td>" + supply.id + "</td>"
                                +"<td>" + supply.name+ "</td>"
                                +"<td>" + supply.brand + "</td>"
                                +"<td>" + supply.quantity + "</td>"
                                +"<td>" + supply.cat + "</td>"
                                +"<td>" + supply.updated + "</td> </tr>";


            document.getElementById("supplies").innerHTML = html + "</table>";

            console.log(html);

        });
      }
    });

});

if (exist == 0){

  document.getElementById("supplies").innerHTML = html + "</table>" + "<br>Nothing Found!";

}
      return;
}
