type GetUserAgeProps = {
  birthDate: Date;
};

export function getUserAge({ birthDate }: GetUserAgeProps) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  birthDate.setUTCHours(0, 0, 0, 0);

  return today.getUTCFullYear() - birthDate.getUTCFullYear();
}
