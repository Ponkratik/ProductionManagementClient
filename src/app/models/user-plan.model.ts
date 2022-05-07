import { Plan } from "./plan.model";
import { User } from "./user.model";

export class UserPlan {
    planByPlanId!: Plan;
    userByUserId!: User;
}
