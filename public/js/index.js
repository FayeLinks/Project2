// Get references to page elements
var $author = $("#bom-author");
var $title = $("bom-title");
var $submitBtn = $("#submit-btn");
var $summary = $("#bom-summary");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};
// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var bom = {
    title: $title.val().trim(),
    author: $author.val().trim(),
    description: $summary.val().trim()
  };

  if (!(bom.author && bom.title)) {
    alert("You must enter the Authors name and Title!");
    return;
  }

  API.saveExample(bom).then(function() {
    refreshExamples();
  });

  $author.val("");
  $title.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
