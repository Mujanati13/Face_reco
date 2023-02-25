const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
// Create a MySQL connection
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Face'
});

// Connect to the MySQL server
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL server: ' + error.stack);
    return;
  }
  console.log('Connected to MySQL server as ID ' + connection.threadId);
});

// Define a route that queries the database
app.get('/', (req, res) => {
  
});

app.get('/api/schedule', (req, res) => {
  const userId = req.query.userId;
  var query = "select * from schedule where user_id = 'TFCT4mVf4ZbPry9AVruWk67IF7f2'";
  connection.query(query , (err , docs)=>{
    if(err) console.log(err);
    else if(docs){
      console.log(docs);
      res.json(JSON.stringify(docs))
    }
  })
});

app.get('/api/absence', (req, res) => {

  const userId = req.query.userId;
  var query = "select * from absence where user_id = 'TFCT4mVf4ZbPry9AVruWk67IF7f2'";
  var query2 = "select * from absence where user_id = 'TFCT4mVf4ZbPry9AVruWk67IF7f2'";
  
  connection.query(query , (err , docs1)=>{
      if(docs1){
        connection.query(query2 , (err , docs)=>{
          var data = {
            table : docs1 ,
            table2: docs
          }
          console.log(data);
          res.json(JSON.stringify(docs))
        })
      }
  })

});



// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
