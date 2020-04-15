const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '..','build')));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const Collection = {
  URLS: 'liketoknowit'
}

const InitModule = require('./InitModule');
const initObject = new InitModule();

let dbObject;
initObject.getMongoDB()
  .then(dbo => {
    dbObject = dbo;
    console.log('MOngodb connected')
  })
  .catch(e => {
    console.log("Mongo Connection Failed", e);
  });

  router.get('/getImages',async(req,res)=>{
    try{
      let data = req.body;
     const imageUrls =  await dbObject.collection(Collection.URLS).find({}).project({_id:0}).toArray();
     console.log(imageUrls.length)
    const pageUrls = imageUrls.splice((data.pageNo -1)*data.pageSize,data.pageNo*data.pageSize);
    console.log(data.pageNo ,'*** ',data.pageSize);  
    res.send({status : 'PASS',data:pageUrls})
    }catch(err){
      res.send({status:"FAIL",message:err.message})
  }
  })

  app.use('/', router);

  app.listen(3000);
  
