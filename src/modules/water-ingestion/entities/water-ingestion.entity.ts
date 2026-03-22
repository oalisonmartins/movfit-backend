import { BiologicalSex, UserGoal } from 'generated/prisma/enums';

export type WaterIngestion = {
  goalInMl: number | null;
  consumedInMl: number;
  user?: {
    biologicalSex: BiologicalSex | null;
    goal: UserGoal | null;
    birthDate: Date;
    weightInGrams: number | null;
  };
};
