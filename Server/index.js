const axios = require('axios')
const InitModule = require('./InitModule');
const initObject = new InitModule();
var count = 2427;
let dbObject;


async function getFiles(token){
  let data = await axios({
    method: 'get',
    'url': 'https://storage.googleapis.com/storage/v1/b/liketoknowit/o',
    headers:{
      "Authorization": "Bearer ya29.a0Ae4lvC2gsc6RWJPH9XMeiReEeFd7ZYxokYyoO5M3g7ro4mqsssuj9Gj1jC7-99x-xIq5s9C1qEY6kKxYgBozucu1h-696YndkSqm3oK4q_FutP8FZpL0B21yIoj5jugLM1Sp384OzioekyxWlaDbYqs_AaLlfjrqLmU"
    },
    params:{
      pageToken: token
    }
  })
  // console.log(data.data.nextPageToken,data.data.items.length)
  let newToken = data.data.nextPageToken;
  let items = data.data.items.map(item => {
    return {url: `https://storage.googleapis.com/liketoknowit/${item.name}`}
  })
  console.log('run',count++, newToken)
  // if(count > 1728){
    for(let i=0;i<items.length;i++){
      let found = await dbObject.collection('liketoknowit').find({url:items[i].url}).toArray();
      if(found.length > 0){
        console.log('found')
      } else {
        console.log('not found')
        await dbObject.collection('liketoknowit').insertOne(items[i])
      }
    }
    // let resp = await dbObject.collection('liketoknowit').insertMany(items);
    if(newToken.length > 0){
      return newToken;
    } else {
      return null;
    }
  // }
  // return newToken;
}
(async () => {
  await initObject.getMongoDB()
  .then(dbo => {
    dbObject = dbo;
  })
  .catch(e => {
    console.log("Mongo Connection Failed", e);
  });
  // let data = await dbObject.collection('liketoknowit').find({}).toArray();
  // console.log(data[1727001])
  let token = await getFiles();
  while(token.length > 0){
    token = await getFiles();
  }
})();