$(document).ready(function() {

  var newBurger = $("input.new-burg");
  var ateBurg = $("#ateBurg");

  $(document).on("submit", "#add-form", addBurger);
  $(document).on("click", "button.delete", eatBurger);

  getBurgers(); // displays all uneaten in database //
  chomped();//displays eaten burgz---//

  // This function grabs burgers from the database to display
  function getBurgers() {
    $("#eatBurgs").empty();
    $.get("/api/burgers", function(data) {
      //  console.log(data);
      for (var i = 0; i < data.length; i++) {
        if (!data[i].devoured) {
          var newRow = $([
            "<li class='list-group-item burger-item'>",
            "<span>",
            data[i].id + ". " + data[i].burger_name,
            "</span>",
            "<button class='delete btn btn-default'>Devour</button>",
            "</li>",
            "<hr>"
          ].join(""));
          $("#eatBurgs").append(newRow);
        }
      }
    });
  }

  function chomped() {
    $.get("/api/burgers", function(data) {
      //  console.log(data);
      for (var i = 0; i < data.length; i++) {

        if (data[i].devoured) {
          var newRow = $([
            "<li class='list-group-item burger-item'>",
            "<span>",
            data[i].burger_name,
            "</span>",
            "</li>",
            "<hr>"
          ].join(""));
          $("#ateBurg").append(newRow);
        }
      }
    });
  }

  // This function inserts a new burger into our database and then updates the view
  function addBurger(event) {
    event.preventDefault();
    var burger = {
      burger_name: newBurger.val().trim(),
      devoured: false
    };

    $.post("/api/burgers", burger, getBurgers);
    newBurger.val("");
  }
});

///---eat burgz

console.log("eating burger");

function eatBurger(){
//  $.put("api/burgers/:id", function(data){
    var id = $(this).data("id");
    $.ajax({
      method: "PUT",
      url: "/api/burgers/" + id,
      devoured:true
    }).done(getBurgers);
  //});
}


/*function eatBurger(burger) {
  $.ajax({
    method: "PUT",
    url: "/api/burgers",
    data: burger
  }).done(getBurgers);
}*/

/////////////----WORKING ABOVE-------//////////////////
