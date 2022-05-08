import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Plan } from 'src/app/models/plan.model';
import { UserPlan } from 'src/app/models/user-plan.model';
import { MachineService } from 'src/app/services/machine.service';
import { OperationService } from 'src/app/services/operation.service';
import { OrderService } from 'src/app/services/order.service';
import { PlanService } from 'src/app/services/plan.service';
import { UserPlanService } from 'src/app/services/user-plan.service';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {

  @ViewChild('readOnlyTemplatePlan', { static: false }) readOnlyTemplatePlan!: TemplateRef<any>;
  @ViewChild('editTemplatePlan', { static: false }) editTemplatePlan!: TemplateRef<any>;
  @ViewChild('readOnlyTemplateUser', { static: false }) readOnlyTemplateUser!: TemplateRef<any>;
  @ViewChild('editTemplateUser', { static: false }) editTemplateUser!: TemplateRef<any>;

  plans: Plan[] = [];
  planToEdit: Plan = new Plan();
  isNewPlanRecord: boolean = false;
  planTime: any = {
    date: '',
    time: ''
  };
  planForm: any = {
    order: 0,
    machine: 0,
    product: 0,
    operation: 0
  };


  sp = false;
  selectedPlan: Plan = new Plan();

  users: UserPlan[] = [];
  userToEdit: UserPlan = new UserPlan();
  isNewUserRecord: boolean = false;

  constructor(private planService: PlanService, private userPlanService: UserPlanService, private machineService: MachineService,
    private orderService: OrderService, private operationService: OperationService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPlans();
  }

  private getAllPlans() {
    this.planService.getAll().subscribe({
      next: data => {
        this.plans = data;
      },
      error: error => {

      }
    });
  }

  loadTemplatePlan(plan: Plan) {
    if (this.planToEdit && this.planToEdit.planId === plan.planId) {
      return this.editTemplatePlan;
    } else {
      return this.readOnlyTemplatePlan;
    }
  }

  addPlan() {
    this.planToEdit = new Plan();
    this.planForm = {
      order: 0,
      machine: 0,
      product: 0,
      operation: 0
    };
    this.plans.push(this.planToEdit);
    this.isNewPlanRecord = true;
  }

  updatePlan(plan: Plan) {
    this.planToEdit.planId = plan.planId;
    this.planToEdit.plannedDate = plan.plannedDate;
    this.planToEdit.completionStatus = plan.completionStatus;
    this.planToEdit.machineByMachineId = plan.machineByMachineId;
    this.planToEdit.operationByOperationId = plan.operationByOperationId;
    this.planToEdit.orderByOrderId = plan.orderByOrderId;
    let d: Date = new Date(plan.plannedDate);
    d.setHours(d.getHours() + 3);
    let dateStr: string = d.toISOString();
    this.planTime = {
      date: dateStr.substring(0, 10),
      time: dateStr.substring(11, 16)
    };
    this.planForm = {
      order: plan.orderByOrderId.orderId,
      machine: plan.machineByMachineId.machineId,
      product: plan.orderByOrderId.productByProductId.productId,
      operation: plan.operationByOperationId.operationId
    };
  }

  deletePlan(plan: Plan) {
    this.planService.delete(plan.planId).subscribe({
      next: data => {
        this.getAllPlans();
      },
      error: error => {

      }
    });
  }

  selectPlan(plan: Plan) {
    this.selectedPlan = plan;
    this.sp = true;
    this.getAllUsers();
  }

  savePlan() {
    this.orderService.getById(this.planForm.order).subscribe({
      next: data => {
        this.planToEdit.orderByOrderId = data;

        this.machineService.getById(this.planForm.machine).subscribe({
          next: data => {
            this.planToEdit.machineByMachineId = data;
            
            this.operationService.getById(this.planForm.operation).subscribe({
              next: data => {
                this.planToEdit.operationByOperationId = data;
                this.planToEdit.plannedDate = new Date(`${this.planTime.date}T${this.planTime.time}:00.000+03:00`);
                this.realSavePlan();
              },
              error: error => {
        
              }
            });
          },
          error: error => {
    
          }
        });
      },
      error: error => {

      }
    });
  }

  realSavePlan() {
    console.log(this.planToEdit);
    if (this.isNewPlanRecord) {
      this.planService.add(this.planToEdit).subscribe({
        next: data => {
          this.getAllPlans();
        },
        error: error => {

        }
      });
    } else {
      this.planService.update(this.planToEdit.planId, this.planToEdit).subscribe({
        next: data => {
          this.getAllPlans();
        },
        error: error => {

        }
      });
    }

    this.isNewPlanRecord = false;
    this.planToEdit = new Plan();
    this.planForm = {
      order: 0,
      machine: 0,
      product: 0,
      operation: 0
    };
    this.planTime = {
      date: '',
      time: ''
    };
  }

  cancelPlan() {
    if (this.isNewPlanRecord) {
      this.plans.pop();
      this.isNewPlanRecord = false;
    }

    this.planToEdit = new Plan();
    this.planForm = {
      order: 0,
      machine: 0,
      product: 0,
      operation: 0
    };
    this.planTime = {
      date: '',
      time: ''
    };
  }


  getAllUsers() {
    this.userPlanService.getAllById(this.selectedPlan.planId).subscribe({
      next: data => {
        this.users = data;
      },
      error: error => {

      }
    });
  }

  loadTemplateUser(up: UserPlan) {
    if (this.userToEdit && this.userToEdit.userByUserId.userId === up.userByUserId.userId) {
      return this.editTemplateUser;
    } else {
      return this.readOnlyTemplateUser;
    }
  }

  addUser() {
    this.userToEdit = new UserPlan();
    this.users.push(this.userToEdit);
    this.isNewUserRecord = true;
  }

  deleteUser(up: UserPlan) {
    this.users = this.users.filter((v) => {
      if (v == up) {
        return false;
      }
      
      return true;
    });
    
    this.userPlanService.updateById(this.selectedPlan.planId, this.users).subscribe({
      next: data => {
        this.getAllUsers();
      },
      error: error => {

      }
    });
  }

  saveUser() {
    if (this.isNewUserRecord) {
      this.userToEdit.planByPlanId = this.selectedPlan;
      this.userPlanService.updateById(this.selectedPlan.planId, this.users).subscribe({
        next: data => {
          this.getAllUsers();
        },
        error: error => {
  
        }
      });
    } else {
      
    }

    this.isNewUserRecord = false;
    this.userToEdit = new UserPlan();
  }

  cancelUser() {
    if (this.isNewUserRecord) {
      this.users.pop();
      this.isNewUserRecord = false;
    }

    this.userToEdit = new UserPlan();
  }

}
