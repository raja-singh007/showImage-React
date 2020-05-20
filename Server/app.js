const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
let ObjectId = require('mongodb').ObjectID
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
  COMP_BG: 'compressed_bg',
  ORIGIN_BG: 'original_bg'
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


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '..','build', 'index.html'));
});

//api username 
router.get('/getImages',async(req,res)=>{
  try{
    let params = req.query,
    pageNo = params.pageNo,
    pageSize = params.pageSize
    console.log(params)
    const images = await dbObject.collection(Collection.COMP_BG).find().project({_id:0,url:1}).skip((pageNo-1)*pageSize).limit(pageNo*pageSize).toArray();
    res.send({status:'PASS',data: images.map(item => {
      return {
        url: item.url
      }
    })})
  }catch(err){
      res.send({status:"FAIL",message:err.message})
  }
})


router.get('/getImageLTK',async(req,res)=>{
  try{
    const image = await dbObject.collection('ltk_compressed').findOne({status:{$not:{$in:['save','delete','pending','doubtful','do-later']}}});
    let imageId = ObjectId(image._id);
    await dbObject.collection('ltk_compressed').updateOne({_id: imageId},{$set:{status: 'pending'}})
    let imageURL = `https://storage.googleapis.com${image.url.split('/').filter(item => item !== 'gs:').join('/')}`;
    res.send({status:'PASS',url: imageURL,id: image._id})
  }catch(err){
    res.send({status:"FAIL",message:err.message})
  }
})

router.post('/updateImageLTK',async(req,res)=>{
  try{
    let query = req.body;
    let url = `gs:/${query.url.split('/').filter(item => item !== 'storage.googleapis.com' && item !== 'https:').join('/')}`,
      status = query.status,
      angles = query.angles;
    const response = await dbObject.collection('ltk_compressed').updateOne({url:url},{$set:{
      status,
      angles
    }})
    if(response.result && response.result.nModified === 1){
      res.send({status:'PASS'})
    } else {
      res.send({status:'FAIL',message: 'Image Not Found'})
    }
  }catch(err){
    res.send({status:"FAIL",message:err.message})
  }
})

app.use('/', router);

app.listen(3002);
