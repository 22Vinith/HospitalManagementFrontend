import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UserServiceService} from 'src/app/service/userService/user-service.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class registerComponent {

  registerForm!: FormGroup;
constructor( private userService:UserServiceService, private router: Router){}

ngOnInit() {
  this.registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(1), Validators.max(150)]), 
    email: new FormControl('', [Validators.required, Validators.email]),
    phno: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]), 
    password: new FormControl('', [Validators.required, Validators.minLength(6)]) 
  });
}

handleRegister(){
console.log(this.registerForm.value)
const {name,age,email,phno,password}=this.registerForm.value

if(this.registerForm.status == "INVALID") return

    //register api call
    this.userService.registerApiCall({name,age,email,phno,password}).subscribe({next: (res:any) => {
      console.log(res);  
    }, error: (err) => {
      console.log(err);
    }})
}

handleLogin(){
  this.router.navigate(['login']);
}

}
