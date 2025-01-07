import { DataAPIClient } from "@datastax/astra-db-ts";

const client = new DataAPIClient(process.env.DB_TOKEN as string);

const db = client.db(process.env.DB_API_ENDPOINT as string);

const instaDataCollection = db.collection("social_data");

export { db, instaDataCollection };
