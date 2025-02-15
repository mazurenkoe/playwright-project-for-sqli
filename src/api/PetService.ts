import { AxiosInstance } from 'axios';
import { Pet } from './models/Pet';

export class PetService {
  constructor(private readonly ax: AxiosInstance) {}

  async getPetsByStatus(petStatus: PetStatus): Promise<Pet[]> {
    return (
      await this.ax.get<Pet[]>('pet/findByStatus', {
        params: { status: petStatus },
      })
    ).data as Pet[];
  }
}

export enum PetStatus {
  AVAILABLE = 'available',
  PENDING = 'pending',
  SOLD = 'sold',
}
