import { BiologicalSex, UserGoal } from 'generated/prisma/enums';

export class GetMeOutoutDto {
  name: string;
  email: string;
  age: number;
  goal: UserGoal | null;
  biologicalSex: BiologicalSex | null;
  heightInCentimeters: number | null;
  weightInGrams: number | null;
  goalWeightInGrams: number | null;
}
