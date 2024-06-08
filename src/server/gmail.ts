export class Gmail {
  private readonly BASE_URL = "https://gmail.googleapis.com/gmail/v1/";

  constructor(
    private apiKey: string,
    private accessToken: string,
  ) {}

  async getLastMessages(count: number) {
    const url = this.getApiUrl("users/me/messages");
    url.searchParams.append("maxResults", count.toString());
    
    const response = await this.fetchApi<{ messages: Message[] }>(url);
    return response.messages
  }


  private getApiUrl(path: string) {
    const url = new URL(this.BASE_URL + path);
    url.searchParams.append("key", this.apiKey);
    return url;
  }

  private async fetchApi<T>(url: URL): Promise<T> {
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + this.accessToken,
    };
    const reponse = await fetch(url, { headers });
    return reponse.json() as T;
  }
}

interface Message {
  id: string;
  threadId: string;
}
