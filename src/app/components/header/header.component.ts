import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(public dialog: MatDialog, private router:Router) {}

  ngOnInit(): void {
    // Check if user is logged in by verifying the presence of the token
    this.isLoggedIn = !!localStorage.getItem('authToken');
  }

  handleLogin(): void {
    if (this.isLoggedIn) return; // Prevent showing login dialog if already logged in

    console.log('Opening login dialog');
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '800px',
      height: '600px',
    });

    // After the dialog closes, recheck login status
    dialogRef.afterClosed().subscribe(() => {
      this.isLoggedIn = !!localStorage.getItem('authToken');
    });
  }

  handleLogout(): void {
    console.log('Logging out');
    localStorage.removeItem('authToken'); // Remove the token
    this.isLoggedIn = false; // Update login status
  }

  handleProfile(){
    this.router.navigate(['profile']);
  }

  handleHistory(){
    this.router.navigate(['history']);
  }
  handleInvoice(){
    this.router.navigate(['invoice']);
  }
}
