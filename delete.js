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
        const collection = database.collection('users');

        //deleting users based on ID
        const result = await collection
            .deleteOne({ id: 1 });

        //print out the result
        if (result) {
            console.log('Deleted product', result.value);
            console.log(result);
        } else {
            console.log(`No product found to be deleted`);
        }
    } catch (e) {
        console.error(e);
    } finally {
        //Close connection
        await client.close();
    }
}

main().catch(console.error);