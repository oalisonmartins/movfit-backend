type ToPercentageProps = {
  goal: number;
  current: number;
};

export function toPercentage({ current, goal }: ToPercentageProps): number {
  if (goal === 0) {
    return 0;
  }

  const progressPercentage = Math.min((current / goal) * 100, 100);

  return progressPercentage;
}
