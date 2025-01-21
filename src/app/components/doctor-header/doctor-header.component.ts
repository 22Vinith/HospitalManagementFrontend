import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DoctorLoginComponent } from '../doctor-login/doctor-login.component';
import { MENU_ICON } from 'src/assets/svg-icons';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-doctor-header',
  templateUrl: './doctor-header.component.html',
  styleUrls: ['./doctor-header.component.scss']
})
export class DoctorHeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(public dialog: MatDialog, private router:Router,private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('mainmenu-icon', sanitizer.bypassSecurityTrustHtml(MENU_ICON));
  }

  ngOnInit(): void {
    // Check if user is logged in by verifying the presence of the token
    this.isLoggedIn = !!localStorage.getItem('authToken');
  }

  handleLogin(): void {
    if (this.isLoggedIn) return; // Prevent showing login dialog if already logged in
    const dialogRef = this.dialog.open(DoctorLoginComponent, {
      width: '800px',
      height: '600px',
    });

    // After the dialog closes, recheck login status
    dialogRef.afterClosed().subscribe(() => {
      this.isLoggedIn = !!localStorage.getItem('authToken');
    });
  }

  handleLogout(): void {
    localStorage.removeItem('authToken');
    this.isLoggedIn = false; // Update login status
    this.router.navigate(['doctorLogin']);
  }

  handleProfile(){
    this.router.navigate(['/doctorProfile']);
  }

  handleHistory(){
    this.router.navigate(['doctorHistory']);
  }

}
