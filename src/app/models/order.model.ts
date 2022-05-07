import { Product } from "./product.model";

export class Order {
    orderId!: number;
    quantity!: number;
    orderDate!: Date;
    batchId?: number;
    productByProductId!: Product;
}
