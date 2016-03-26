var mysql, async;
mysql = require('../core/mysql');
async = require('async');

module.exports = {

              userregister : function(incoming, callback) {
                            
                             function validateincoming(callback) {
                                if(!incoming || !incoming.username || !incoming.password
                                   || incoming.username === "" || incoming.password === "") {
                                   callback('Missing important data');
                                } else {
                                   callback(null);
                                }
                             } 

                             function insertintomysql(callback) {
                                var params, query;
                                params = [incoming.username, incoming.password];
                                query = "INSERT INTO users(username, password) VALUES(?, ?)"; 
                                mysql.query(query, params, function(err, res){
                                if(!err && (res != null) && (res.insertId != null)){
                                   insertid = res.insertId;
                                   callback(err, insertid);
                                } else {
                                    callback(err);
                                }    
                                });
 
                             }

                             async.waterfall([validateincoming, insertintomysql], function(err){
                             if(!err){
                                callback(JSON.stringify({"status": "success"}));
                             } else {
                                 callback(JSON.stringify({"status": "failed", "message": err}));
                             }
                             });

              }  
}
