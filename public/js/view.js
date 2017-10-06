$(document).ready(function() {

  var newBurger = $("input.new-burg");
  var ateBurg = $("#ateBurg");

  $(document).on("submit", "#add-form", addBurger);//---button to add burger
  $(document).on("click", "button.delete", eatBurger);//--devour button to delete from available and send to eaten

  getBurgers(); // displays all uneaten in database //
  chomped(); //displays eaten burgz---//

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
          newRow.find("button.delete").attr("id", data[i].id);
          $("#eatBurgs").append(newRow);
        }
      }
    });
  }
//---Sends the burger to the eaten section after "devour"
  function chomped() {
    $.get("/api/burgers", function(data) {
      //  console.log(data);
      for (var i = 0; i < data.length; i++) {

        if (data[i].devoured) {
          var newRow = $([
            "<li class='list-group-item burger-item'>",
            "<span>",
            data[i].id + ". " + data[i].burger_name,
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

///---eat burgz-----///
function eatBurger(event, getBurgers) {
  console.log("eating burger");
    var id = $(this).attr("id");
    console.log(id);
    $.ajax({
      method: "PUT",
      url: "/api/burgers/" + id,
      devoured: true,
    }).then(getBurgers);
    location.reload();

}
