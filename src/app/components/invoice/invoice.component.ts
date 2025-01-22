import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/userService/user-service.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  bill: any = {}; // Holds the bill data
  loading: boolean = true;

  // Breadcrumb Navigation
  breadcrumb = [
    { label: 'Home', path: '' },
    { label: 'Invoice', path: 'invoice' }
  ];

  constructor(
    private route: ActivatedRoute,
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const appointmentId = localStorage.getItem('appointmentId');
    if (appointmentId) {
      console.log(appointmentId);
      this.fetchBillDetails(appointmentId);
    }
  }

  fetchBillDetails(appointmentId: string): void {
    // Assuming we have an API to get the bill by appointment ID
    this.userService.getBillDetails({ _id: appointmentId }).subscribe({
      next: (response: any) => {
        console.log(response);
        this.bill = response.bill;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching bill details:', err);
        this.loading = false;
      }
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
