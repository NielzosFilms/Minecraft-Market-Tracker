import {Injectable} from '@angular/core';
import {Client} from "@notionhq/client";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NotionService {
  private readonly _client: Client;

  constructor() {
    this._client = new Client({
      auth: environment.notion_key,
    });
  }

  get client(): Client {
    return this._client;
  }
}
