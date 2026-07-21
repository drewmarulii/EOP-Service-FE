import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { Location } from "@angular/common";

@Component({
    selector: 'user-register',
    templateUrl: './user-register.component.html'
})
export class UserRegisterComponent implements OnInit {

    roles!: [];
    formRegister!: FormGroup;
    maritalStatuses!: [];

    constructor (
        private location: Location,
        private formBuilder: FormBuilder,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.formRegister = this.formBuilder.group({
            uid: ['', Validators.required],
            password: ['', Validators.required],
            role: ['', Validators.required],
            userPersonRequest: this.formBuilder.group({
                nik: ['', Validators.required],
                fullName: ['', Validators.required],
                address: ['', Validators.required],
                mobilePhone: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                placeOfBirth: ['', Validators.required],
                dateOfBirth: ['', Validators.required],
                maritalStatus: ['', Validators.required]
            })
        });
    }

    create() {
        if (this.formRegister.valid) {
            let obj = this.formRegister.getRawValue();

            lastValueFrom(this.userService.create(obj)).then((res) => {
                let response = JSON.parse(res);
                console.log(response);
            })
        } else {
            this.formRegister.markAllAsTouched();
        }
    }

    onCancel() {
        this.location.back();
    }

    goBack() {
        this.location.back();
    }
}