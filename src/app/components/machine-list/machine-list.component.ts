import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Machine } from 'src/app/models/machine.model';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css']
})
export class MachineListComponent implements OnInit {
  machines?: Machine[];
  allMachines?: Machine[];

  sortDir: boolean[] = [false, false, false];

  constructor(private machineService: MachineService, private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.machineService.getAll().subscribe({
      next: data => {
        this.allMachines = data;
        this.machines = this.allMachines;
        console.log(this.allMachines);
      },
      error: error => {

      }
    });
  }

  navigateAdd() {
    this.router.navigate(['machinemanagement/add'])
  }

  navigateUpdate(id: number) {
    this.router.navigate(['machinemanagement/update', id])
  }

  applySort(event: any) {
    //получение всех свойств
    let properties = Object.getOwnPropertyNames(this.machines![0]);
    //ключ сортировки
    let sortKey: string = event.target.id;
    //получение индекса свойства с направлениями сортировки
    let sortColumnId = properties.indexOf(sortKey);

    this.sortDir![sortColumnId] = !this.sortDir![sortColumnId];

    if (this.sortDir![sortColumnId]) {
      this.machines = this.machines!.sort((machine1: Machine, machine2: Machine) => {
        const key1 = machine1[sortKey as keyof Machine];
        const key2 = machine2[sortKey as keyof Machine];

        if (typeof key1 === "number" && typeof key2 === "number") {
          return key1! > key2! ? 1 : -1;
        }



        if (typeof key1 === "object" && typeof key2 === "object") {
          return key1! > key2! ? 1 : -1;
        }

        return 0;
      });
    } else {
      this.machines = this.machines!.sort((machine1: Machine, machine2: Machine) => {
        const key1 = machine1[sortKey as keyof Machine];
        const key2 = machine2[sortKey as keyof Machine];

        if (typeof key1 === "number" && typeof key2 === "number") {
          return key1! < key2! ? 1 : -1;
        }

        if (typeof key1 === "string" && typeof key2 === "string") {
          return key1!.toLowerCase() < key2!.toLowerCase() ? 1 : -1;
        }

        if (typeof key1 === "object" && typeof key2 === "object") {
          return key1! < key2! ? 1 : -1;
        }

        return 0;
      });
    }
  }

  applyFilter(event: any) {
    let filterValueLower = event.target.value.toLowerCase();
    this.machines = this.allMachines?.filter((machine: Machine) =>{
      for (var property in machine) {
        const value = machine[property as keyof Machine];

        if (typeof value === "string" && value.toLowerCase().includes(filterValueLower)) {
          return true;
        }

        if (typeof value === "number" && value === Number.parseInt(filterValueLower)) {
          return true;
        }
      }

      return false;
    });
  }

}
