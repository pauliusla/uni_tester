import { beApiUrl } from "@/config/envConfig";

interface UserSuccess {
  success: boolean;
  token: string;
  user: {
    city: string;
    country: string;
    created_at: string;
    email: string;
    first_name: string;
    id: number;
    is_admin: boolean;
    last_name: string;
    street_address: string;
    updated_at: string;
  };
}

class DatabaseProvider {
  url: string;

  constructor() {
    this.url = beApiUrl();
  }

  /**
   * Sends user sign in request to the BE api and receives a response
   *
   * @param { email: string, password: string }
   *
   * @returns {Promise<UserSuccess>}
   *
   * @throws {Error}
   */
  async signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<UserSuccess> {
    console.log({ email, password });
    const request = await fetch(`${this.url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!request.ok) {
      throw new Error("Request was not successfull");
    }

    const response = await request.json();

    return response;
  }
}

export default DatabaseProvider;
