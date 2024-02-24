import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './services/employee.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {AfterViewInit,ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatToolbarModule,MatButtonModule,MatIconModule,
    EmpAddEditComponent,MatDialogModule,MatFormFieldModule,MatDatepickerModule,
    FormsModule,CommonModule,ReactiveFormsModule,HttpClientModule,
    MatTableModule,MatInputModule,MatPaginator,MatSortModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }


  displayedColumns: string[] = [
    'id', 'FirstName', 'LastName', 'email',
   'dob','gender','education',
  'company','experience','package','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  

  constructor(private _dialog:MatDialog, private _empService:EmployeeService){}


  ngOnInit(): void {
    this.getEmployeeList();
  }


  openAddEditEmpForm(){
   const dialogRef= this._dialog.open(EmpAddEditComponent);
   dialogRef.afterClosed().subscribe({
    next:(val)=>{
      if(val){
this.getEmployeeList();
      }
    }
   })
  }

  getEmployeeList(){
    this._empService.getEmployeeList().subscribe({
      next:(res) =>{
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator= this.paginator;

      },
      error: console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }}

    deleteEmployee(id:number){
      this._empService.deleteEmployee(id).subscribe({
        next:(res)=>{
          alert('Employee deleted!');
          this.getEmployeeList();
        },
  
      })
    }

    openEditForm(data:any){
   this._dialog.open(EmpAddEditComponent, {
    data,
   });
    }
}
