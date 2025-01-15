import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/service/userService/user-service.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  bill: any = {}; // Holds the bill data
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    const appointmentId = localStorage.getItem('appointmentId')
    if (appointmentId) {
      this.fetchBillDetails(appointmentId);
    }
  }

  fetchBillDetails(appointmentId: string): void {
    // Assuming we have an API to get the bill by appointment ID
    this.userService.getBillDetails({ _id: appointmentId }).subscribe({
      next: (response: any) => {
        this.bill = response.bill;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching bill details:', err);
        this.loading = false;
      }
    });
  }
}
