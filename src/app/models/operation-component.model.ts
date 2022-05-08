import { Component } from "./component.model";
import { Operation } from "./operation.model";

export class OperationComponent {
    operationByOperationId!: Operation;
    componentByComponentId!: Component;
    quantity!: number;

    constructor() {
        this.operationByOperationId = new Operation();
        this.componentByComponentId = new Component();
    }
}
