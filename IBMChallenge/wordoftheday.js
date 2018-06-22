var expr = require('express');

var bodyParser = require('body-parser');

var app = expr();

var orm = require("orm");

var urlencodedParser = bodyParser.urlencoded({ extended: false });



app.get('/word/wordoftheday',function(req,res){

       // res.send("<html>ffddffd</html>");
       var begin_date = new Date('06/21/2018');
       console.log(new Date());
       var timeDiff = Math.abs(new Date() - begin_date.getTime());
       var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24)); 
       console.log(diffDays);

orm.connect("mysql://root:root@localhost:3306/IBM_AMULYA", function (err, db) {
  if (err) throw err;

    var Word = db.define("Word", {
        vocab      : String,
        id   : Number
        }

    );

    
    db.sync(function(err) {
        if (err) throw err;
               var id1 = (diffDays%465283) + 1;


                Word.find({ id: id1}, function (err, word) {
                if (err) throw err;

                    console.log("Word found: %d", word.length);
                    


                    res.send(
                        {
                            'word' : word[0].vocab 
                        }
                    );

                    
            });

        
    });
});




    });

app.listen(3000, function(){
    console.log("WOTD App has started !");
});