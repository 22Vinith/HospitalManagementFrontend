import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminLoginComponent } from '../admin-login/admin-login.component';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
 isLoggedIn: boolean = false;

  constructor(public dialog: MatDialog, private router:Router) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('authToken');
  }

  handleLogin(): void {
    if (this.isLoggedIn) return; 

    console.log('Opening login dialog');
    const dialogRef = this.dialog.open(AdminLoginComponent, {
      width: '800px',
      height: '600px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isLoggedIn = !!localStorage.getItem('authToken');
    });
  }

  handleLogout(): void {
    localStorage.removeItem('authToken');
    this.isLoggedIn = false; 
    this.router.navigate(['adminLogin'])
  }
  handleDoctors(){
    this.router.navigate(['/getAllDoctors'])
  }


}
