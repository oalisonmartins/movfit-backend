import { BiologicalSex, UserGoal } from 'generated/prisma/enums';
import { UserGetPayload } from 'generated/prisma/models';

type GetMetricsUserPayload = UserGetPayload<{
  select: {
    biologicalSex: true;
    birthDate: true;
    heightInCentimeters: true;
    weightInGrams: true;
    goal: true;
  };
}>;

export class GetUserMetricsDto implements GetMetricsUserPayload {
  biologicalSex: BiologicalSex | null;
  birthDate: Date;
  heightInCentimeters: number | null;
  weightInGrams: number | null;
  goal: UserGoal | null;
}
