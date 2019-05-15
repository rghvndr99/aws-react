import config from './config';
import AWS from "aws-sdk";


AWS.config.update({
	region: config.region
});

let _docClient = new AWS.DynamoDB.DocumentClient();

const dataService = class {
	constructor() { }

	/**
	 * getAllRecords - Get all entries from dynamoDb table
	 * @returns {array} List of entries
	 */
	async getAllRecords() {
		let _params = {
			TableName: config.tableName
		};

		try {
			let data = await _docClient.scan(_params).promise();
			return data.Items;

		} catch (err) {
			console.log("error" + JSON.stringify(err));
			return [];
		}
	}


	/**
	 * insertRecord - inserts an entry into dynamoDb table
	 * @param { Object } itemToInsert - data to insert in table
	 * @returns {array} List of all the entries
	 */
	async insertRecord(itemToInsert) {
		let _params = {
			TableName: config.tableName,
			Item: itemToInsert
		};
   
		try {

			let data = await _docClient.put(_params).promise();
			return await this.getAllRecords();

		} catch (err) {

			console.log("error" + JSON.stringify(err));
			return [];

		} 
	}

	/**
	* deleteRecord - delete an entry from dynamoDb table
	* @param { string } id - id of an entry to detete record from table
	* @returns {array} List of all the entries
	*/
	async deleteRecord(id) {

		let _params = {
			TableName: config.tableName,
			Key: { id: id }
		};

		try {

			let data = await _docClient.delete(_params).promise();
			return await this.getAllRecords();

		}
		catch (err) {

			console.log("error" + JSON.stringify(err));
			return [];

		}
	}


	/**
	* updateRecord - update an entry from dynamoDb table
	* @param { obj } _updatedObj - An updated object 
	* @returns {array} List of all the entries
	*/
	async updateRecord(_updatedObj) {
        let {name='NA',address='NA',phone='NA',company='NA',gender='NA',age='NA',eyeColor='NA',email='NA',id}=_updatedObj;
		let _params = {
			TableName: config.tableName,
			UpdateExpression:
				"set  #name = :namevalue,#company= :company,#eyeColor= :eyeColor,#age= :age,#address= :addressValue,#phone= :phone,#gender= :gender,#email= :email ",
			ExpressionAttributeValues: {
				":namevalue": name,
				":addressValue":address,
				":phone": phone,
				":company":company,
				":gender": gender,
				":age": age,
				":eyeColor": eyeColor,
				":email":email
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
			Key: { [config.primaryKey]: id }
		};

		try {

			let data = await _docClient.update(_params).promise();
			return await this.getAllRecords();

		} catch (err) {

			console.log("error" + JSON.stringify(err));
			return [];

		}
	}

};

exports.dataService = dataService;
