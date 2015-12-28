
module.exports = function(app) {
    app.namespace('/api/public',function(){
    app.get('/place', function(req, res){
        res.header("Access-Control-Allow-Origin", "*");
        var places = [
        {
          name: "Square_pizza",
          address: "Powai,Mumbai"
        }, {
          name: "Gurukripa",
          address: "Powai,Mumbai"
        }, {
          name: "Eat express",
          address: "Powai,Mumbai"
        }, {
          name: "paratha world",
          address: "Powai,Mumbai"
        }
      ];
        return res.send(JSON.stringify(places));
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

   app.get('/menu/mainmenu', function(req, res){
       res.header("Access-Control_Allow-Origin", "*");
       var menu = [];
        return res.send(JSON.stringify(menu));
     });
   });
};
