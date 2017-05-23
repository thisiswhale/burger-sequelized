// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function for SQL syntax.
// replace ":" to "="
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }

  return arr.toString();
}

var orm = {
  all:function(tableInput, cb){
    var queryString = "SELECT * FROM " +tableInput +";";
    connection.query(queryString, function(err, result){
      if(err){ throw err;}
      cb(result);
    });
  },
  create:function( tableInput, cols, vals, cb ){
      var queryString = "INSERT INTO " + tableInput;
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      // printQuestionMarks prints question marks
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";

      console.log(queryString);
      // those question mark printed, calls query from vals
      connection.query(queryString, vals, function(err, result){
      if(err){ throw err;}

        cb(result);
      });
    },

  devour: function(tableInput, objColVals, condition, cb ){
    var queryString = "UPDATE " +tableInput;
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err,result){
      if(err){throw err}
      cb(result);
    });
  }
};

module.exports= orm;
