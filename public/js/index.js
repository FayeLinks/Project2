


$(document).ready(function() {

//declaring variables for our inputs
var $title = $("input#bom-title");
var $author = $("input#bom-author");
var $summary = $("input#bom-summary");
var $button = $("#submit-btn");

//event listner for submit 
$button.on("click", insertBOM);

// inserts a new BOM into the db 
function insertBOM(event) {
  event.preventDefault();
  var bom = {
    title: $title.val().trim(),
    author: $author.val().trim(),
    summary:  $summary.val().trim(),
  }
  $.post("/api/bom", bom);
    // clear input fields 
    $title.val("");
    $author.val("");
    $summary.val("");
}

});