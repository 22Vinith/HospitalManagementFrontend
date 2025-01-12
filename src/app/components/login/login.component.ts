import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UserServiceService} from 'src/app/service/userService/user-service.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private userService:UserServiceService,private router:Router){}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]) 
    });
  }

  handleLogin(){
    console.log(this.loginForm.value)
    const {email,password}=this.loginForm.value
    if(this.loginForm.status == "INVALID") return

        //login api call
        this.userService.loginApiCall({email,password}).subscribe({next: (res:any) => {
          console.log(res);  
          localStorage.setItem("authToken", res.token) 
          this.router.navigate(["book-appointment"]) 
        }, error: (err:any) => {
          console.log(err);
        }})

  }

}
