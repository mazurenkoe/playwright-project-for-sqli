import { AxiosInstance } from 'axios';
import { User } from './models/User';

export class UserService {
  constructor(private readonly ax: AxiosInstance) {}

  async createUser(user: User): Promise<any> {
    return await this.ax.post<any>('user', user);
  }

  async getUser(username: string): Promise<User> {
    return (await this.ax.get<User>(`user/${username}`)).data;
  }
}
