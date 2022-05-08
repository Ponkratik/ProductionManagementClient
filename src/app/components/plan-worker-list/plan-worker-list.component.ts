import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Plan } from 'src/app/models/plan.model';
import { MachineService } from 'src/app/services/machine.service';
import { OperationService } from 'src/app/services/operation.service';
import { OrderService } from 'src/app/services/order.service';
import { PlanService } from 'src/app/services/plan.service';
import { UserPlanService } from 'src/app/services/user-plan.service';

@Component({
  selector: 'app-plan-worker-list',
  templateUrl: './plan-worker-list.component.html',
  styleUrls: ['./plan-worker-list.component.css']
})
export class PlanWorkerListComponent implements OnInit {

  @ViewChild('readOnlyTemplatePlan', { static: false }) readOnlyTemplatePlan!: TemplateRef<any>;
  @ViewChild('editTemplatePlan', { static: false }) editTemplatePlan!: TemplateRef<any>;

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

}
