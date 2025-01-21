import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MENU_ICON } from 'src/assets/svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    public dialog: MatDialog,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    iconRegistry.addSvgIconLiteral(
      'mainmenu-icon',
      sanitizer.bypassSecurityTrustHtml(MENU_ICON)
    );
  }

  ngOnInit(): void {
    // Check if user is logged in by verifying the presence of the token
    this.isLoggedIn = !!localStorage.getItem('authToken');
  }

  // handleLogin(): void {
  //   if (this.isLoggedIn) return; // Prevent showing login dialog if already logged in

  //   console.log('Opening login dialog');
  //   const dialogRef = this.dialog.open(LoginComponent, {
  //     width: '700px',
  //     height: '700px',
  //   });

  //   // After the dialog closes, recheck login status
  //   dialogRef.afterClosed().subscribe(() => {
  //     this.isLoggedIn = !!localStorage.getItem('authToken');
  //   });
  // }
  handleLogin(): void {
    if (this.isLoggedIn) return;

    console.log('Opening login dialog');
    const dialogRef = this.dialog.open(LoginComponent, {});

    dialogRef.afterClosed().subscribe(() => {
      this.isLoggedIn = !!localStorage.getItem('authToken');
    });
  }

  handleLogout(): void {
    console.log('Logging out');
    localStorage.removeItem('authToken');
    localStorage.removeItem('appointmentId');
    this.router.navigate(['']);
    this.isLoggedIn = false;
  }

  handleProfile() {
    this.router.navigate(['/profile']);
  }

  handleHistory() {
    this.router.navigate(['/history']);
  }
  handleInvoice() {
    this.router.navigate(['/invoice']);
  }
}
