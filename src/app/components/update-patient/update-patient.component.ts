import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/userService/user-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.scss']
})
export class UpdatePatientComponent implements OnInit {
  appointment: any; // Holds appointment details
  prescription: string = ''; // Prescription entered by the doctor
  bill: number | null = null; // Bill amount

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserServiceService,
    private location:Location
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.appointment = state ? state['appointment'] || {} : {};
  }

  ngOnInit(): void {}

  // Cancel the update and navigate back
  cancelUpdate(): void {
  this.location.back()
  }

  // Submit updates
  async submitUpdates(): Promise<void> {
    if (!this.prescription || this.bill === null) {
      alert('Please fill out both the prescription and bill amount.');
      return;
    }
  
    try {
      // Prepare the payload to update ailment status to true
      const ailmentStatusPayload = { ailment_status: true };
      await this.userService.updateAilmentStatus({ _id: this.appointment._id, ...ailmentStatusPayload }).toPromise();
      console.log('Ailment status updated successfully.');
  
      // Prepare the payload for prescription and bill
      const prescriptionPayload = {
        prescription: this.prescription,
        invoice: `${this.bill}rs`,  // Format invoice with 'rs'
      };
  
      // Send the POST request to update prescription and bill
      await this.userService.updatePrescriptionAndBill({
        _id: this.appointment._id,  // Attach the appointment ID
        ...prescriptionPayload      // Spread prescription and invoice data
      }).toPromise();
      console.log('Prescription and bill updated successfully.');
  
      alert('Patient details updated successfully.');
      this.router.navigate(['Home-appointments']);
    } catch (error) {
      console.error('Error updating details:', error);
      alert('Failed to update patient details. Please try again.');
    }
  }
  
}
