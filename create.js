const { MongoClient } = require('mongodb');
const uri = "mongodb://zarin:281812@localhost:27017";
const client = new MongoClient(uri);
const dbName = 'exercise1'; //Database chosen

async function main() {
    try {
        //Connect to the database
        await client.connect();
        console.log("Successfully connected to Database");

        const database = client.db(dbName);
        const collection = database.collection('employees');

        //creating document
        await createEmployee(collection,
            {
                name: "Zar",
                position: "Developer",
                branch: 'HQ'
            });
    } catch (e) {
        console.error(e);
    } finally {
        //Close connection
        await client.close();
    }
}

main().catch(console.error);

//creating 1 employee (insertOne)
async function createEmployee(collection, newEmployee) {
    const result = await collection.insertOne(newEmployee);

    console.log(`New employee created with the following ID: ${result.insertedId}`);
}