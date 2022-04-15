import {Handler} from "@netlify/functions";
import {Client} from "@notionhq/client";
import {environment} from "../../src/environments/environment";
import {Item} from "../../src/app/database-services/item-type";

const columns = {
  name: 'Name',
  category: 'Category',
  for_sale: 'For sale',
  price: 'Price',
  amount: 'Amount',
  bulk_price: 'Bulk price'
}

export const handler: Handler = async (event, context) => {
  const client = new Client({
    auth: environment.notion_key
  });

  const result = await client.databases.query({
    database_id: environment.notion_database_id_items
  });

  return {
    headers: {
      'Content-Type': 'application/json'
    },
    statusCode: 200,
    body: JSON.stringify(result),
  }
}

// function mapResult(result: any): Item[] {
//   return result.results.map((row: any): Item => ({
//     id: row.id,
//     name: row.properties[columns.name].
//   }))
// }
