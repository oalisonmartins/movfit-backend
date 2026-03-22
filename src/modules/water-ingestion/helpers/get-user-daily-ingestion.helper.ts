import { BiologicalSex, UserGoal } from 'generated/prisma/enums';
import { getUserAge } from '../../../common/helpers/calculate-age.helper';

type CalculateDailyIngestionProps = {
  weightInGrams: number;
  biologicalSex: BiologicalSex;
  birthDate: Date;
  goal: UserGoal;
};

export function getUserDailyIngestion({
  biologicalSex,
  birthDate,
  goal,
  weightInGrams,
}: CalculateDailyIngestionProps) {
  const weightInKg = weightInGrams / 1000;
  const goalFactor =
    {
      LOSE_WEIGHT: 40,
      GAIN_MASS: 40,
      DEFINE: 38,
      MAINTAIN_WEIGHT: 35,
    }[goal] ?? 35;
  const sexFactor = biologicalSex === 'MALE' ? 1.1 : 1.0;
  const age = getUserAge({ birthDate });
  const ageFactor = age > 55 ? 0.9 : age < 18 ? 1.1 : 1.0;

  const dailyIngestion = Math.round(
    weightInKg * goalFactor * sexFactor * ageFactor,
  );

  return dailyIngestion;
}
