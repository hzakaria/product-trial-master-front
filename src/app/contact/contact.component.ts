import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule
  ],
  providers: [MessageService]
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      message: ['', [Validators.required, Validators.maxLength(300)]] 
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Demande de contact envoyée avec succès' });
      this.contactForm.reset();
      this.submitted = false;
    }
  }
}
