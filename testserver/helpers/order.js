var mysql, async, _;
mysql = require('../core/mysql');
async = require ('async');
_ = require ('underscore');
module.exports = {

             setorder: function(incoming, callback){

                         var insertId;

                        function calculateamount(callback){
                        var amount = 0, totalamount = 0,vat = 6;
                        for(var i=0; i<incoming.menus.length; i++){
                               amount += (incoming.menus[i].price*incoming.menus[i].quantity);
                                  }
                         totalamount = amount + ((amount*vat)/100);
                         callback(totalamount, vat);
                        }

                        function setordertomysql(totalamount, vat, callback){
                        var params, query;
                        query = "INSERT INTO orderfood(placeid, userid, amount, vat) VALUES(?, ?, ?, ?)";
                        params = [incoming.placeid, incoming.userid, totalamount, vat];
                        mysql.query(query, params, function(err, res){
                        if(!err && (res != null) && (res.insertId != null)){
                        insertId = res.insertId;
                        callback(null);
                        } else{
                            callback(err);
                        }
                        });
                        }

                 //       function setorderdetailstomysql(insertid, callback){
                   //     var params, query;
                     //   query = "INSERT INTO orderdetails(orderid, menu, price, quantity) VALUES(?, ?, ?, ?)";
                     //   for(var i=0; i<incoming.menus.length; i++) {
                     //        params = [insertId, incoming.menus[i].name,incoming.menus[i].price,incoming.menus[i].quantity];
                     //        mysql.query(query, params, function(err, res){
                     //        if(!err && (res != null)){
                     //        callback(null);
                     //        } else {
                     //             callback(err);
                     //        }
                     //       });
                     // }
                     // }
                     async.waterfall([calculateamount, setordertomysql], function(err){
                     if(!err){
                        callback(JSON.stringify({"status": "success"}));
                       } else {
                          callback(JSON.stringify({"status": "failed", "message": err}));
                       }
                     });
                    }
                   };


