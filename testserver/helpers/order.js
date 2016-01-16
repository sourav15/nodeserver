var mysql, async, _, mongo;
mysql = require('../core/mysql');
async = require ('async');
_ = require ('underscore');
mongo = require('../core/mongo');
module.exports = {

             setorder: function(incoming, callback){

                         var insertid = null;
                         var vat = 6;

                        function calculateamount(callback){
                        var amount = 0, totalamount = 0;
                        for(var i=0; i<incoming.menus.length; i++){
                               amount += (incoming.menus[i].amount*incoming.menus[i].quantity);
                                  }
                         totalamount = amount + ((amount*vat)/100);
                         callback(null, totalamount);
                        }

                        function setordertomysql(totalamount, callback){
                        var params, query;
                        query = "INSERT INTO orderfood(placeid, userid, amount, vat) VALUES(?, ?, ?, ?)";
                        params = [incoming.placeid, incoming.userid, totalamount, vat];
                        mysql.query(query, params, function(err, res){
                        if(!err && (res != null) && (res.insertId != null)){
                        insertid = res.insertId;
                        callback(err, insertid);
                        } else{
                            callback(err);
                        }
                        });
                        }

                        function setorderdetailstomongo(insertid, callback){
                        mongo.getclient(function(err, db){
                        if(err == null){
                        db.close();
                        callback(null);
                        } else{
                           callback(err);
                        }
                        });
                        } 
 
                        async.waterfall([calculateamount, setordertomysql, setorderdetailstomongo], function(err){
                        if(!err){
                          callback(JSON.stringify({"status": "success"}));
                        } else {
                          callback(JSON.stringify({"status": "failed", "message": err}));
                       }
                       });
                    }
                   };


