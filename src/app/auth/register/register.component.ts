import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  register: FormGroup;
  x:any;
  constructor(private fb: FormBuilder, private leaveService: LeaveService) {
    this.register = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w]+@([\w-]+\.)+[\w-]{2,4}$/),
        ],
      ],
      username: ['', [Validators.required, Validators.pattern(/^[\S]*$/)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
          ),
        ],
      ],
      confirm: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    console.log('do check');
    if (this.register.dirty) {
      console.log('Dirty');
      this.leaveService.setLeaveRegisterValue(false);
    }
  }

  get formControls() {
    return this.register.controls;
  }

  handleRegister() {
    console.log(this.register);
  }
}
