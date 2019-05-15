import config from './config';
import AWS from "aws-sdk";


AWS.config.update({
  region: config.region
});

let _docClient = new AWS.DynamoDB.DocumentClient();

const empData = class {
	constructor() {}
	
/**
 * getAllRecords - Get all entries from dynamoDb table
 * @returns {array} List of entries
 */
	getAllRecords () {
		let _params = {
			TableName: config.tableName
		};

		return new Promise((resolve, reject) => {

			_docClient.scan(_params, function(err, data) {
				if (err) {
					console.log("error" + JSON.stringify(err));
					reject(err);
				} else {
					resolve(data.Items);
				}
			});

		});
	}


/**
 * insertRecord - inserts an entry into dynamoDb table
 * @param { Object } itemToInsert - data to insert in table
 * @returns {array} List of all the entries
 */
	insertRecord (itemToInsert) {

		let _params = {
			TableName: config.tableName,
			Item: itemToInsert
		};		

		return new Promise((resolve, reject) => {

			let _self =this;
      
			_docClient.put(_params, function(err, data) {
				let _selfInside =_self;
				
				if (err) {
					console.log("error" + JSON.stringify(err));
					reject(err);
				} else {

					_selfInside.getAllRecords().then(data => {
						resolve(data);
					});
				}	

			});

		});

	}


 /**
 * deleteRecord - delete an entry from dynamoDb table
 * @param { string } id - id of an entry to detete record from table
 * @returns {array} List of all the entries
 */
	  deleteRecord (id) {

		let _params = {
			TableName: config.tableName,
			Key: { id: id }
		};

		return new Promise((resolve, reject) => {

			let _self=this;

			_docClient.delete(_params, function(err, data) {

				let _selfInside=_self;

				if (err) {
					console.log("error" + JSON.stringify(err));
					reject(err);
				} else {
					_selfInside.getAllRecords().then(data => {
						resolve(data);
					});
				}

			});
		});
		
	}
	

 /**
 * updateRecord - update an entry from dynamoDb table
 * @param { obj } _updatedObj - An updated object 
 * @param { string } _key - Id of object
 * @returns {array} List of all the entries
 */
	updateRecord (_updatedObj, _key) {

		let params = {
			TableName: config.tableName,
			UpdateExpression:
				"set  #name = :namevalue,#company= :company,#eyeColor= :eyeColor,#age= :age,#address= :addressValue,#phone= :phone,#gender= :gender,#email= :email ",
			ExpressionAttributeValues: {
				":namevalue": _updatedObj.name ? _updatedObj.name : "NA",
				":addressValue": _updatedObj.address ? _updatedObj.address : "NA",
				":phone": _updatedObj.phone ? _updatedObj.phone : "NA",
				":company": _updatedObj.company ? _updatedObj.company : "NA",
				":gender": _updatedObj.gender ? _updatedObj.gender : "NA",
				":age": _updatedObj.age ? _updatedObj.age : "NA",
				":eyeColor": _updatedObj.eyeColor ? _updatedObj.eyeColor : "NA",
				":email": _updatedObj.email ? _updatedObj.email : "NA"
			},
			ExpressionAttributeNames: {
				"#name": "name",
				"#address": "address",
				"#phone": "phone",
				"#gender": "gender",
				"#company": "company",
				"#email": "email",
				"#age": "age",
				"#eyeColor": "eyeColor"
			},
			Key: { [config.primaryKey]: _key }
		};

		return new Promise((resolve, reject) => {

			let _self= this;

			_docClient.update(_params, function(err, data) {

				let _selfInside= _self;

				if (err) {
					console.log("error" + JSON.stringify(err));
					reject(err);
				} else {
					_selfInside.getAllRecords().then(data => {
						resolve(data);
						console.log(JSON.stringify(data));
					});
				}

			});

		});
	}
	
};

exports.empData = empData;
