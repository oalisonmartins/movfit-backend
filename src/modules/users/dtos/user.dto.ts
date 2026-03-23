import { UserGoal, BiologicalSex } from 'generated/prisma/enums';
import { UserGetPayload } from 'generated/prisma/models';

export type UserDtoPayload = UserGetPayload<{
  omit: {
    passwordHash: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

export class UserDto implements UserDtoPayload {
  name: string;
  id: string;
  email: string;
  goal: UserGoal | null;
  biologicalSex: BiologicalSex | null;
  birthDate: Date;
  weightInGrams: number | null;
  heightInCentimeters: number | null;
  goalWeightInGrams: number | null;
}
