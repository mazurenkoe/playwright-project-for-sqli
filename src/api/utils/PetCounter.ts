import { Pet } from '../models/Pet';

export class PetCounter {
  private pets: Pet[];

  constructor(pets: Pet[]) {
    this.pets = pets;
  }

  public countPetNames(): Record<string, number> {
    const nameCount: Record<string, number> = {};

    this.pets.forEach((pet) => {
      if (nameCount[pet.name]) {
        nameCount[pet.name]++;
      } else {
        nameCount[pet.name] = 1;
      }
    });

    return nameCount;
  }
}
