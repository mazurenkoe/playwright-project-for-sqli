import { expect } from '@playwright/test';
import { test } from '../fixtures/test-fixture';
import { User } from '../../src/api/models/User';
import { PetStatus } from '../../src/api/PetService';
import { PetCounter } from '../../src/api/utils/PetCounter';

const USER_NAME = 'newUser_Olena';
const USER_ID = 987654321;
const FIRST_NAME = 'Olena';
const EMAIL = 'aaa@gmail.com';
const PASSWORD = '123456';
const PHONE_NUMBER = '123456';
const USER_STATUS = 0;

test('Create user and check created data', async ({ client }) => {
  const userToCreate = new User(USER_ID, USER_NAME, FIRST_NAME, EMAIL, PASSWORD, PHONE_NUMBER, USER_STATUS);

  await client.usersService.createUser(userToCreate);
  const createdUser = await client.usersService.getUser(USER_NAME);

  expect(userToCreate, 'User was created with wrong data').toEqual(createdUser);
});

test('Get sold pets', async ({ client }) => {
  const soldPets = await client.petService.getPetsByStatus(PetStatus.SOLD);
  expect(soldPets.length).toBeGreaterThan(0);
});

test('Count pets names', async ({ client }) => {
  const pendingPets = await client.petService.getPetsByStatus(PetStatus.AVAILABLE);
  const countedPets = new PetCounter(pendingPets).countPetNames();
  expect(countedPets['doggie']).toBeGreaterThan(0);
});
