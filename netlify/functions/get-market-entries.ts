import {Handler} from "@netlify/functions";
import {Client} from "@notionhq/client";
import {environment} from "../../src/environments/environment";
import {MarketEntry} from "../../src/app/database-services/market-entry-type";

const columns = {
  price: 'Price (Diamonds)',
  purchase: 'Purchase',
  date: 'Date',
  amount: 'Amount (Items)',
  item: 'Item',
  bulk: 'Bulk'
}

export const handler: Handler = async (event, context) => {
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
    body: JSON.stringify(mapResult(result)),
    // body: JSON.stringify(result),
  }
}

function mapResult(result: any): MarketEntry[] {
  return result.results.map((row: any): MarketEntry => ({
    id: row.id,
    item_id: row.properties[columns.item].relation[0].id,
    // item: null,
    amount_of_diamonds: row.properties[columns.price].number,
    amount: row.properties[columns.amount].number,
    transaction_date: row.properties[columns.date].date.start,
    bulk: row.properties[columns.bulk].checkbox,
    was_purchase: row.properties[columns.purchase].checkbox,
    created_by: row.properties["Property"].created_by.name,
  }))
}
