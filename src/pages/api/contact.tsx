import { MongoClient } from "mongodb";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'POST'){
        const { email, name, message } = req.body as IContactDetail;

        if (!email || !email.includes('@') || !name || name.trim() !== '' || !message || message.trim() !== '') {
            res.status(422).json({ message: 'Invalid input!' });
            return
        }
        const newMessage: any = {
            email, name, message
        };

        // Store it in a database
        let client: MongoClient;
        const connectionString = 
            `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_pwd}@${process.env.mongodb_clustername}.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
        
        try {
            client = await MongoClient.connect(connectionString);
        } catch (err) {
            res.status(500).json({ message: 'Could not connect to database.' })
            return;
        }

        const db = client.db();
        try {
            const result = await db.collection('messages').insertOne(newMessage);
            newMessage._id = result.insertedId;
        } catch (err) {
            client.close();
            res.status(500).json({ message: 'Storing message failed!' })
            return;
        }
        client.close();
        res.status(201).json({ message: 'Successfully stored message', data: newMessage });
    }
}

export default handler;