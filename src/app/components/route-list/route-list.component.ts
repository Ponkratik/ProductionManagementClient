import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OperationComponent } from 'src/app/models/operation-component.model';
import { Operation } from 'src/app/models/operation.model';
import { Product } from 'src/app/models/product.model';
import { Route } from 'src/app/models/route.model';
import { ComponentService } from 'src/app/services/component.service';
import { OperationComponentService } from 'src/app/services/operation-component.service';
import { OperationService } from 'src/app/services/operation.service';
import { ProductService } from 'src/app/services/product.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  @ViewChild('readOnlyTemplateRoute', { static: false }) readOnlyTemplateRoute!: TemplateRef<any>;
  @ViewChild('editTemplateRoute', { static: false }) editTemplateRoute!: TemplateRef<any>;

  @ViewChild('readOnlyTemplateOperation', { static: false }) readOnlyTemplateOperation!: TemplateRef<any>;
  @ViewChild('editTemplateOperation', { static: false }) editTemplateOperation!: TemplateRef<any>;

  @ViewChild('readOnlyTemplateComponent', { static: false }) readOnlyTemplateComponent!: TemplateRef<any>;
  @ViewChild('editTemplateComponent', { static: false }) editTemplateComponent!: TemplateRef<any>;

  product: Product = new Product();

  routes: Route[] = [];
  routeToEdit: Route = new Route();
  isNewRouteRecord: boolean = false;
  sr = false;

  id!: number;

  selectedRoute: Route = new Route();

  operations: Operation[] = [];
  operationToEdit: Operation = new Operation();
  isNewOperationRecord: boolean = false;
  runtimeStr: string = '';
  so = false;

  selectedOperation: Operation = new Operation();

  components: OperationComponent[] = [];
  componentToEdit: OperationComponent = new OperationComponent();
  isNewComponentRecord: boolean = false;

  //componentToEdit: OperationComponent = new OperationComponent();
  // isNewComponentRecord: boolean = false;

  // components: any[] = [];
  // /*componentToEdit: any = {
  //   componentByComponentId: null,
  //   quantity: 0
  // };*/
  // componentToEdit: any;

  constructor(private productService: ProductService, private routeService: RouteService, private operationService: OperationService, private operationComponentService: OperationComponentService, private componentService: ComponentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.productService.getById(this.id).subscribe({
      next: data => {
        this.product = data;
      },
      error: error => {

      }
    });

    this.getAllRoutes();
  }

  getAllRoutes() {
    this.routeService.getAllByProductId(this.id).subscribe({
      next: data => {
        this.routes = data;
      },
      error: error => {

      }
    });
  }

  loadTemplateRoute(route: Route) {
    if (this.routeToEdit && this.routeToEdit.routeId === route.routeId) {
      return this.editTemplateRoute;
    } else {
      return this.readOnlyTemplateRoute;
    }
  }

  addRoute() {
    this.routeToEdit = new Route();
    this.routes.push(this.routeToEdit);
    this.isNewRouteRecord = true;
  }

  deleteRoute(route: Route) {
    this.routeService.delete(route.routeId).subscribe({
      next: data => {
        this.getAllRoutes();
      },
      error: error => {

      }
    });
  }

  updateRoute(route: Route) {
    this.routeToEdit.routeId = route.routeId;
    this.routeToEdit.routeName = route.routeName;
    this.routeToEdit.productByProductId = route.productByProductId;
  }

  saveRoute() {
    if (this.isNewRouteRecord) {
      this.routeToEdit.productByProductId = this.product;
      this.routeService.add(this.routeToEdit).subscribe({
        next: data => {
          this.getAllRoutes();
        },
        error: error => {

        }
      });
    } else {
      this.routeService.update(this.routeToEdit.routeId, this.routeToEdit).subscribe({
        next: data => {
          this.getAllRoutes();
        },
        error: error => {

        }
      });
    }

    this.isNewRouteRecord = false;
    this.routeToEdit = new Route();
  }

  cancelRoute() {
    if (this.isNewRouteRecord) {
      this.routes.pop();
      this.isNewRouteRecord = false;
    }

    this.routeToEdit = new Route();
  }

  selectRoute(route: Route) {
    this.selectedRoute = route;
    this.sr = true;
    this.so = false;
    this.getAllOperations();
  }

  getAllOperations() {
    this.operationService.getAllByRouteId(this.selectedRoute.routeId).subscribe({
      next: data => {
        this.operations = data;
      },
      error: error => {

      }
    });
  }

  loadTemplateOperation(operation: Operation) {
    if (this.operationToEdit && this.operationToEdit.operationId === operation.operationId) {
      return this.editTemplateOperation;
    } else {
      return this.readOnlyTemplateOperation;
    }
  }

  addOperation() {
    this.operationToEdit = new Operation();
    this.operations.push(this.operationToEdit);
    this.isNewOperationRecord = true;
  }

  deleteOperation(operation: Operation) {
    this.operationService.delete(operation.operationId).subscribe({
      next: data => {
        this.getAllOperations();
      },
      error: error => {

      }
    });
  }

  updateOperation(operation: Operation) {
    this.operationToEdit.operationId = operation.operationId;
    this.operationToEdit.sequenceNumber = operation.sequenceNumber;
    this.operationToEdit.operationName = operation.operationName;
    this.runtimeStr = operation.runtime.toISOString().substring(11, 16);
    this.operationToEdit.routeByRouteId = this.selectedRoute;
  }

  saveOperation() {
    this.operationToEdit.routeByRouteId = this.selectedRoute;
    this.operationToEdit.runtime = new Date(`1970-01-01T${this.runtimeStr}:00.000+03:00`);
    if (this.isNewOperationRecord) {
      this.operationService.add(this.operationToEdit).subscribe({
        next: data => {
          this.getAllOperations();
        },
        error: error => {

        }
      });
    } else {
      this.operationService.update(this.operationToEdit.operationId, this.operationToEdit).subscribe({
        next: data => {
          this.getAllOperations();
        },
        error: error => {

        }
      });
    }

    this.isNewOperationRecord = false;
    this.operationToEdit = new Operation();
  }

  cancelOperation() {
    if (this.isNewOperationRecord) {
      this.operations.pop();
      this.isNewOperationRecord = false;
    }

    this.operationToEdit = new Operation();
  }

  selectOperation(operation: Operation) {
    this.selectedOperation = operation;
    this.so = true;
    this.getAllComponents();
  }

  getAllComponents() {
    this.operationComponentService.getAllById(this.selectedOperation.operationId).subscribe({
      next: data => {
        this.components = data;
      },
      error: error => {

      }
    });
  }

  loadTemplateComponent(oc: OperationComponent) {
    if (this.componentToEdit && this.componentToEdit.componentByComponentId.componentId === oc.componentByComponentId.componentId) {
      return this.editTemplateComponent;
    } else {
      return this.readOnlyTemplateComponent;
    }
  }

  addComponent() {
    this.componentToEdit = new OperationComponent();
    this.components.push(this.componentToEdit);
    this.isNewComponentRecord = true;
  }

  deleteComponent(oc: OperationComponent) {
    this.components = this.components.filter((v) => {
      if (v == oc) {
        return false;
      }
      
      return true;
    });
    
    this.operationComponentService.updateById(this.selectedOperation.operationId, this.components).subscribe({
      next: data => {
        this.getAllComponents();
      },
      error: error => {

      }
    });
  }

  saveComponent() {
    if (this.isNewComponentRecord) {
      this.componentToEdit.operationByOperationId = this.selectedOperation;
      this.operationComponentService.updateById(this.selectedOperation.operationId, this.components).subscribe({
        next: data => {
          this.getAllComponents();
        },
        error: error => {

        }
      });
    } else {
      
    }

    this.isNewRouteRecord = false;
    this.componentToEdit = new OperationComponent();
  }

  cancelComponent() {
    if (this.isNewComponentRecord) {
      this.components.pop();
      this.isNewComponentRecord = false;
    }

    this.componentToEdit = new OperationComponent();
  }

}
