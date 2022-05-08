import { Machine } from "./machine.model";
import { Operation } from "./operation.model";
import { Order } from "./order.model";

export class Plan {
    planId!: number;
    plannedDate!: Date;
    completionStatus!: string;
    operationByOperationId!: Operation;
    orderByOrderId!: Order;
    machineByMachineId!: Machine;

    constructor() {
        this.operationByOperationId = new Operation();
        this.orderByOrderId = new Order();
        this.machineByMachineId = new Machine();
    }
}
