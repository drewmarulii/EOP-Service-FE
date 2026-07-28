import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
@Component({
	selector: 'user-edit',
	templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {

	roles!: [];
	formEdit!: FormGroup;
	maritalStatuses = [
		{ label: 'Married', value: 'MARRIED' },
		{ label: 'Single', value: 'SINGLE' }
	];

	constructor(
		private location: Location,
		private formBuilder: FormBuilder,
		private userService: UserService,
		private route: ActivatedRoute,
		private router: Router,
		private toastService: ToastService
	) { }

	ngOnInit(): void {
		this.editForm();

		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.getData(id);
		}
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

	async getData(id: string) {
		await lastValueFrom(this.userService.getByIdProfile(id))
			.then((res) => {
				this.formEdit.patchValue(res.data);
			})
			.catch((error) => { });
	}

	edit() {
		if (this.formEdit.valid) {
			const obj = this.formEdit.getRawValue();

			lastValueFrom(this.userService.editProfile(obj))
				.then((response) => {
					console.log(response.data)
					this.toastService.addMessage('success', 'Success', 'User Detail has been updated');
					this.router.navigate(['/users']);
				})
				.catch((error) => {
					this.toastService.addMessage('error', 'Update Failed', error?.error?.message || 'User Detail update failed');
				});
		} else {
			this.toastService.addMessage('error', 'Update Failed', 'Please fill in all required fields');
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