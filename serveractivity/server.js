
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {dataService} from './actions.js';

const {port=5001}= process.env;

const app=express();
app.use(cors());
app.use(bodyParser.json());

app.listen(port,()=>{
	console.log('server is running on '+port);
})

const empDataService = new dataService();

app.get('/empData', async (req,res)=>{
let response = await empDataService.getAllRecords();
res.send(response);
});

app.post('/empData', async(req,res)=>{

    let insertObj=req.body.query;
    let response =await empDataService.insertRecord(insertObj);
    res.send(response);
});

app.delete('/empData/:id',async(req,res)=>{    
    let deleteId=req.params.id;    
   let response= await empDataService.deleteRecord(deleteId); 
   res.send(response);
});

app.put('/empData',async(req,res)=>{

    let updatedData=req.body.query;

    let response= await empDataService.updateRecord(updatedData);
    res.send(response);
});
