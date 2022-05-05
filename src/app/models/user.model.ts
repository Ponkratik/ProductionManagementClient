import { Department } from "./department.model";

export class User {
    userId!: number;
    username!: string;
    password?: string;
    fio!: string;
    departmentByDepartmentId!: Department;
}
