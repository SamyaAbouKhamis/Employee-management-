import { Component , Inject, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common'
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';




@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatDatepickerModule,MatRadioModule,MatSelectModule,
    FormsModule,CommonModule,ReactiveFormsModule,MatButtonModule,  MatDialogModule],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.css',
  providers:[provideNativeDateAdapter()]
})
export class EmpAddEditComponent  implements OnInit{
empForm:FormGroup;

education : string[] = [
  'Matric',
  'Diploma',
  'Intermediate',
  'Graduate',
  'Post Graduate',
];
constructor(private _fb:FormBuilder ,
   private _empService:EmployeeService ,
    private _dialogRef:MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any){

  this.empForm= this._fb.group({
    firstName:'',
    lastName:'',
    email:'',
    dob:'',
    gender:'',
    education:'',
    company:'',
    experience:'',
    package:'',

  });
}

ngOnInit(): void{
  this.empForm.patchValue(this.data);
}

onFormSubmit(){
  if(this.empForm.valid){
    if(this.data){
      this._empService.updteEmployee(this.data.id,this.empForm.value).subscribe({
        next:(val:any)=>{
          alert('Employee details updated!');
          this._dialogRef.close(true);
          
        },
        error:(err : any)=>{
          console.error(err);
        },
      }); 

    }else{
      this._empService.addEmployee(this.empForm.value).subscribe({
        next:(val:any)=>{
          alert('Employee added successfully');
          this._dialogRef.close(true);
          
        },
        error:(err : any)=>{
          console.error(err);
        },
      });
    }
  
  }
  }

}
