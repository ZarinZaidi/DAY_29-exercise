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
        const collection = database.collection('product');

        //insert a dummy document
        const insertResult1 = await collection.insertOne({
            name: 'Tablet',
            quantity: 2,
            brand: 'Samsung'
        });

        //updating quantity belonged to specified product
        const result = await collection.findOneAndUpdate(
            { name: 'Tablet' },
            { $set: { quantity: 20 } },
            { returnOriginal: false }
        );

        //print out the result
        if (result) {
            console.log('Updated product(s)', result.value);
            console.log(result);
        } else {
            console.log(`No product found to be updated`);
        }
    } catch (e) {
        console.error(e);
    } finally {
        //Close connection
        await client.close();
    }
}

main().catch(console.error);