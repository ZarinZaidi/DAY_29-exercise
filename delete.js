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

        //insert a dummy document
        const insertResult1 = await collection.insertMany([
            { username: 'Princess', id: 1, email: 'queen@yahoo.com' },
            { username: 'zarin', id: 2, email: 'zarin@yahoo.com' }
        ]);

        //deleting users based on ID
        const deleteId = { id: 1 };
        const result = await collection
            .deleteOne(deleteId);

        //print out the result
        if (result) {
            console.log(`Deleted product with ID: ${deleteId.id}`);
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