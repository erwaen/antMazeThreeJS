import {csv} from 'csvtojson';
// import {fs} from 'fs';
// import {path} from 'path';
import {fs} from 'fs';




// read csv
const csvFilePath = 'eglobal_tdp.csv';

csv()
.fromFile('./eglobal_tdp.csv')
.then((jsonObj)=>{
    console.log(jsonObj);
});


export default '*';