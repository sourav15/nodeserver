var mysql;
mysql = require('../core/mysql');
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
                    var params, query;
                    query = "select * from menu where placeid = ? and type = ?";
                    if(incoming != null) {
                       params = [incoming.placeid, incoming.type];
                    } 
                    mysql.query(query, params, function(err, menus){
                    if((err == null) && (menus != null)) {
                    callback(JSON.stringify({status: "success", data: {menus:menus}}));
                    } else {
                            callback(JSON.stringify({status: "failed","message": err}));
                    }  
                    });
                   }   
                 };

