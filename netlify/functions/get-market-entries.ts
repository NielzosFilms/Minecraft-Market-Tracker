import {Handler} from "@netlify/functions";
import {Client} from "@notionhq/client";
import {environment} from "../../src/environments/environment";

export const handler: Handler = async (event, context) => {
  try {
    const client = new Client({
      auth: environment.notion_key
    });

    const result = await client.databases.query({
      database_id: environment.notion_database_id_entries
    });

    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: JSON.stringify(result),
    }
  } catch (e) {
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 500,
      body: JSON.stringify({error: e})
    }
  }
}
