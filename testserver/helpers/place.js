var mysql, async, _;
mysql = require('../core/mysql');
async = require ('async');
_ = require ('underscore');
module.exports = {
       
           getplaces: function(incoming, callback){
                      var params, query;
                      query = 'select * from place';
                      mysql.query(query, params, function(err, places){
                      if((err == null) && (places != null)) {
                      callback(JSON.stringify({status: "success",data: {places: places}}));
                      } else { 
                              callback(JSON.stringify({status: "failed"}));
                      }
                      });
                    },

           getmenu: function(incoming, callback){
                   // var validateincoming, getdatafrommysql;
                    
                    function validateincoming(callback){
                    if(incoming && !incoming.placeid && !incoming.type){
                        callback("Missing important data");
                    } else {
                        callback(null);
                    }
                    }

                    function getdatafrommysql(callback){
                    var params, query;
                    query = "select * from menu where placeid = ? and type = ?";
                   // if(incoming != null) {
                       params = [incoming.placeid, incoming.type];
                   // } 
                    mysql.query(query, params, function(err, menus){
                    if((err == null) && (menus != null)) {
                        callback(err, menus);
                    } else {
                        callback(err);
                    }  
                    });
                    }
                    async.waterfall([validateincoming, getdatafrommysql],function(err, menus){
                    if(err == null){
                       callback(JSON.stringify({status: "success", data: {menus: menus}}));
                       } else {
                                callback(JSON.stringify({status: "failed", message: err}));
                       }
                    });
                   },

              setorder: function(incoming, callback){

                        function setordermysql(callback){
                        var params, query;
                        query = "";
                        }
                    }   
                 };

