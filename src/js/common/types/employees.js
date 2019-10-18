export type employeeType = {
  name: string;
  jobTitle: string;
  tenure: number;
  gender: string;
};

export type employeesType = {
  employeeList: employeeType[];
  sort?: {
    field: string;
    ascending: boolean;
  }
};
