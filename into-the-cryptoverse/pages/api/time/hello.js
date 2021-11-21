// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var fs = require('fs');

const page1 = require('./page1.json'); 
const page2 = require('./page2.json'); 
const page3 = require('./page3.json'); 
const page4 = require('./page4.json'); 
const page5 = require('./page5.json'); 
const page6 = require('./page6.json'); 
const page7 = require('./page7.json'); 
const page8 = require('./page8.json'); 
const page9 = require('./page9.json'); 
const page10 = require('./page10.json'); 
const tokenIds = [];
let items = 0;


export default function handler(req, res) {

  // console.log(results[0].metadata.name);

  filterIdsByMetaDataName("GRACE II");
  console.log('Total items: ', items)
  console.log(tokenIds);
  fs.writeFile ("tokenIds.json", JSON.stringify(tokenIds), function(err) {
    if (err) throw err;
    console.log('complete');
    }
);
  
  res.status(200).json(tokenIds)
}


function filterIdsByMetaDataName(name){

  const p1 = JSON.parse(JSON.stringify(page1));
  const p2 = JSON.parse(JSON.stringify(page2));
  const p3 = JSON.parse(JSON.stringify(page3));
  const p4 = JSON.parse(JSON.stringify(page4));
  const p5 = JSON.parse(JSON.stringify(page5));
  const p6 = JSON.parse(JSON.stringify(page6));
  const p7 = JSON.parse(JSON.stringify(page7));
  const p8 = JSON.parse(JSON.stringify(page8));
  const p9 = JSON.parse(JSON.stringify(page9));
  const p10 = JSON.parse(JSON.stringify(page10));

  addTokenIds(p1,name);
  addTokenIds(p2,name);
  addTokenIds(p3,name);
  addTokenIds(p4,name);
  addTokenIds(p5,name);
  addTokenIds(p6,name);
  addTokenIds(p7,name);
  addTokenIds(p8,name);
  addTokenIds(p9,name);
  addTokenIds(p10,name);

  return tokenIds;
}

function addTokenIds(data,name){
    data.map((item) => {
    const metadata = item.metadata;
    if(metadata.name === name){
      tokenIds.push(item.token_id);
    }
    items++;
  })
  
  return tokenIds;
}

