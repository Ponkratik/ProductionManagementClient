import { Route } from "./route.model";

export class Operation {
    operationId!: number;
    sequenceNumber!: number;
    operationName!: string;
    runtime!: Date;
    routeByRouteId!: Route;
}
