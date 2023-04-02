/**
 * Model User
 *
 */
export type User = {
  id: number;
  netId: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  collegeId: number;
  createdAt: Date;
  updatedAt: Date;
  defaultTableId: number;
};

export const EntranceYear = {
  y_2023: "y_2023",
  y_2022: "y_2022",
  y_2021: "y_2021",
  y_2020m: "y_2020m",
};

export type EntranceYear = typeof EntranceYear[keyof typeof EntranceYear];
