
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {empData} from './operation.js';
const {port=5001}= process.env;

const app=express();
app.use(cors());
app.use(bodyParser.json());

app.listen(port,()=>{
	console.log('server is running on '+port);
})

const empDataObj = new empData();

app.get('/empData',(req,res)=>{

    empDataObj.getAllRecords().then((data)=>{
         res.send(data);
     });

});

app.post('/empData',(req,res)=>{

    let insertObj=req.body.query;
    empDataObj.insertRecord(insertObj).then((data)=>{
       res.send(data);
    });

});


app.delete('/empData/:id',(req,res)=>{    
    let deleteId=req.params.id;    
    empDataObj.deleteRecord(deleteId).then((data)=>{
       res.send(data);
    });
});

app.post('/updateEmpData',(req,res)=>{

    let {updateObj,id}=req.body.query;
    empDataObj.updateRecord(updateObj,id).then((data)=>{
       res.send(data);
    });

});
