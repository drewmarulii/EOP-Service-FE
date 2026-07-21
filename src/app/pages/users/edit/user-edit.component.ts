import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {

    roles!: [];
    formEdit!: FormGroup;
    maritalStatuses!: [];
    uuid: any = this.route.snapshot.paramMap.get("uuid");

    constructor(
        private location: Location,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.editForm();
    }

    editForm() {
        this.formEdit = this.formBuilder.group({
            id: [''],
            version: [''],
            nik: ['', Validators.required],
            fullName: ['', Validators.required],
            address: ['', Validators.required],
            mobilePhone: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            placeOfBirth: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            maritalStatus: ['', Validators.required]
        });
    }

    async getData() {
        await lastValueFrom(this.userService.getById(this.uuid))
            .then((res) => {
                this.formEdit.patchValue(res.data);
            })
            .catch((error) => { });
    }

    edit() {
        if (this.formEdit.valid) {
            let obj = this.formEdit.getRawValue();

            lastValueFrom(this.userService.edit(obj)).then((res) => {
                let response = JSON.parse(res);
                console.log(response);
            })
        } else {
            this.formEdit.markAllAsTouched();
        }
    }

    onCancel() {
        this.location.back();
    }

    goBack() {
        this.location.back();
    }
}