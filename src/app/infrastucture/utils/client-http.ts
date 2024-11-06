import { authOptions } from "@/app/api/auth";
import { DefaultSession, getServerSession } from "next-auth";

const defaultBaseUrl = "https://beautysalongates-production.up.railway.app/api/v1";

interface Session extends DefaultSession {
  user: {
      id?: string;
      token?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
  };
}
export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || defaultBaseUrl;
  }

  async get<T>(url: string): Promise<T> {
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: headers,
      method: "GET",
      cache: "no-store",
    });

    return this.handleResponse(response);
  }

  async post<T, B>(url: string, body: B): Promise<T> {
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: headers,
      method: "POST",
      body: JSON.stringify(body),
    });

    return this.handleResponse(response);
  }

  async delete(url: string): Promise<void> {
    const headers = await this.getHeader();
    await fetch(`${this.baseUrl}/${url}`, {
      headers: headers,
      method: "DELETE",
    });
  }

  async put<T, B>(url: string, body: B): Promise<T> {
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: headers,
      method: "PUT",
      body: JSON.stringify(body),
    });

    return this.handleResponse(response);
  }

  private async getHeader() {

    const session = await getServerSession(authOptions) as Session;
    const token = session.user.token as string;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw errorData;
    }
    return await response.json();
  }
}
