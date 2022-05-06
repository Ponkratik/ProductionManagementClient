import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentService } from 'src/app/services/component.service';
import { Component as Comp } from '../../models/component.model';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css']
})
export class ComponentListComponent implements OnInit {
  components?: Comp[];
  allComponents?: Comp[];

  sortDir: boolean[] = [false, false, false]; 

  constructor(private componentService: ComponentService, private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.componentService.getAll().subscribe({
      next: data => {
        this.allComponents = data;
        this.components = this.allComponents;
      },
      error: error => {

      }
    });
  }

  navigateAdd() {
    this.router.navigate(['componentmanagement/add'])
  }

  navigateUpdate(id: number) {
    this.router.navigate(['componentmanagement/update', id])
  }

  applySort(event: any) {
    //получение всех свойств
    let properties = Object.getOwnPropertyNames(this.components![0]);
    //ключ сортировки
    let sortKey: string = event.target.id;
    //получение индекса свойства с направлениями сортировки
    let sortColumnId = properties.indexOf(sortKey);

    this.sortDir![sortColumnId] = !this.sortDir![sortColumnId];

    if (this.sortDir![sortColumnId]) {
      this.components = this.components!.sort((comp1: Comp, comp2: Comp) => {
        const key1 = comp1[sortKey as keyof Comp];
        const key2 = comp2[sortKey as keyof Comp];

        if (typeof key1 === "string" && typeof key2 === "string") {
          return key1!.toLowerCase() > key2!.toLowerCase() ? 1 : -1;
        }

        if (typeof key1 === "number" && typeof key2 === "number") {
          return key1! > key2! ? 1 : -1;
        }

        return 0;
      });
    } else {
      this.components = this.components!.sort((comp1: Comp, comp2: Comp) => {
        const key1 = comp1[sortKey as keyof Comp];
        const key2 = comp2[sortKey as keyof Comp];

        if (typeof key1 === "string" && typeof key2 === "string") {
          return key1!.toLowerCase() < key2!.toLowerCase() ? 1 : -1;
        }

        if (typeof key1 === "number" && typeof key2 === "number") {
          return key1! < key2! ? 1 : -1;
        }

        return 0;
      });
    }
  }

  applyFilter(event: any) {
    let filterValueLower = event.target.value.toLowerCase();
    this.components = this.allComponents?.filter((comp: Comp) =>{
      for (var property in comp) {
        const value = comp[property as keyof Comp];
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
