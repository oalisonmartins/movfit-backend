import { DietMeal } from 'generated/prisma/client';
import { BiologicalSex, UserGoal } from 'generated/prisma/enums';

export type DailyNutrition = {
  day: Date;
  proteinsInGrams: number;
  carbsInGrams: number;
  fatsInGrams: number;
  user?: {
    weightInGrams: number | null;
    goal: UserGoal | null;
    biologicalSex: BiologicalSex | null;
    birthDate: Date;
    activeDiet: {
      carbsInGrams: number;
      fatsInGrams: number;
      proteinsInGrams: number;
      meals?: DietMeal[];
    } | null;
  };
};
