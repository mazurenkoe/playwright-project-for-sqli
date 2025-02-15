import axios, { AxiosInstance } from 'axios';
import * as AxiosLogger from 'axios-logger';
import { requestLogger, responseLogger, errorLogger } from 'axios-logger';
import { UserService } from './UserService';
import { PetService } from './PetService';

export class PetstoreRestClient {
  readonly usersService: UserService;
  readonly petService: PetService;

  private readonly axiosInstance: AxiosInstance;

  constructor() {
    axios.defaults.timeout = 30_000;

    this.axiosInstance = axios.create({
      baseURL: `https://petstore.swagger.io/v2/`,
    });

    this.axiosInstance.interceptors.request.use(requestLogger, errorLogger);
    this.axiosInstance.interceptors.response.use(responseLogger, errorLogger);

    AxiosLogger.setGlobalConfig({
      dateFormat: 'HH:MM:ss',
      params: true,
      headers: true,
    });

    this.usersService = new UserService(this.axiosInstance);
    this.petService = new PetService(this.axiosInstance);
  }
}
