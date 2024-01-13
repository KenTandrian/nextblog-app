import { MongoClient } from "mongodb";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, name, message } = await req.json() as IContactDetail;

    if (!email || !email.includes('@') || !name || name.trim() !== '' || !message || message.trim() !== '') {
        return NextResponse.json({ message: 'Invalid input!' }, { status: 422 });
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
        return NextResponse.json({ message: 'Could not connect to database.' }, { status: 500 });
    }

    const db = client.db();
    try {
        const result = await db.collection('messages').insertOne(newMessage);
        newMessage._id = result.insertedId;
    } catch (err) {
        client.close();
        return NextResponse.json({ message: 'Storing message failed!' }, { status: 500 });
    }
    client.close();
    return NextResponse.json({ message: 'Successfully stored message', data: newMessage }, { status: 201 });
}