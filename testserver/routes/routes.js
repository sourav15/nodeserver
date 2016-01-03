
module.exports = function(app) {
    app.namespace('/api/public',function(){
    app.post('/menu', function(req, res){
        var placehelper = require('../helpers/place');
        placehelper.getmenu(req.body, function(response){
        res.header("Access-Control-Allow-Origin", "*");
        return res.send(response);
   });
   });

    app.get('/menu/starter', function(req, res){
        res.header("Access-Control-Allow-Origin", "*");
        var menu = [
        {
          name: "",
          price: ""
        }, {
          name: "",
          price: ""
        }
     ];
        return res.send(JSON.stringify(menu));
     });

   app.get('/place', function(req, res){
       var placehelper = require('../helpers/place');
       placehelper.getplaces(req, function(response){
       res.header("Access-Control_Allow-Origin", "*");
       return res.send(response);
     });
     });
   });
};
