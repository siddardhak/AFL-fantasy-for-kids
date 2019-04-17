// Require the express web application framework (https://expressjs.com)
var express = require('express')

// Create a new web application by calling the express function
var app = express()

// Tell our application to serve all the files under the `public_html` directory
app.use(express.static('public_html'))

// Tell our application to listen to requests at port 3000 on the localhost
app.listen(3000, function () {
  // When the application starts, print to the console that our app is
  // running at http://localhost:3000. Print another message indicating
  // how to shut the server down.
  console.log("Web server running at: http://localhost:3000")
  console.log("Type Ctrl+C to shut down the web server")
})
