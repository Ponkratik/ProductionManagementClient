import { Department } from "./department.model";

export class Machine {
    machineId!: number;
    machineName!: string;
    capacity!: Date;
    departmentByDepartmentId!: Department;
}
