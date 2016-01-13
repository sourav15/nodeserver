var pool;

pool = require('mysql').createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'sourav',
    password : 'sou15rav',
    database : 'happytoorder',
    debug    :  false
});

module.exports = {
               query: function(query, params, callback){
                      pool.getConnection(function(err, connection) {

                      if (err) {
                         connection.release();
                         callback(err);
                      }         

                      console.log('connected as id ' + connection.threadId);

                     connection.query(query, params, function(err, res){
                     connection.release();
                                callback(err, res);
                      });

                     connection.on('error', function(err) {
                     callback(err);
                     });
                 });
              }     

         }; 
