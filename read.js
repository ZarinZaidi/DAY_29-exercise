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
        const collection = database.collection('orders');

        //insert a document
        const insertResult1 = await collection.insertOne({
            order: 'cat food',
            quantity: 2,
            customer: 'Zarin'
        });

        //finding document
        await findOrderByCustomer(collection, 'Zarin');
    } catch (e) {
        console.error(e);
    } finally {
        //Close connection
        await client.close();
    }
}

main().catch(console.error);

//finding 1 order belonged to specified customer (findOne)
async function findOrderByCustomer(collection, customerName) {
    const result = await collection.findOne({ customer: customerName });

    //print out the result
    if (result) {
        console.log(`Order(s) belonged to the customer: ${customerName} `);
        console.log(result);
    } else {
        console.log(`No order found belonged to the customer: ${customerName}`);
    }
}