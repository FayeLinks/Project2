# Get Lit

## Check it out on Heroku!: 
[Open Here](https://peaceful-badlands-18716.herokuapp.com/ "Get Lit")

## Code Example:

``` 
app.get("/", sessionChecker, (req, res) => {
    hbsContent.loggedin = true;
    hbsContent.userName = req.session.user.username;
    hbsContent.title = "You are logged in";


    // This is the axios get method to the Google Books API to produce the book of the month
    var bookTitle = "East of Eden";

    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + bookTitle + "&key=" + process.env.GOOGLE_API_KEY)
      .then(books => {
        // console.log(books.data.items);
        var book = books.data.items[0];
        res.render("index", { hbsContent, book });
      });

  });
```

## Built With:
* HTML
* CSS
* Materialize
* Foundation
* Javascript
* JQuery 
* Google Calendar API
* Google Books API
* MySQL
* Node
* Express
* Express-Sessions
* Bcrypt


## Future Development: 
> Add an Administrator Option for the site to make changes to user inputs if they're inapporopriate
> Take user book suggestions and push them into an array that randomly selects one of the books for the next book of the month


## Authors: 
* Martin Polder, Hoi So, Justin Quezada and Alison Kelly
