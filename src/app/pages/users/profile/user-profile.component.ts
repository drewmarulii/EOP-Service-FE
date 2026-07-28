import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css']
})
export class UserDetailComponent implements OnInit {

	userData: any = {};

	constructor(
		private userService: UserService,
		private route: ActivatedRoute,
		private location: Location,
	) { }

	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id');

		if (id) {
			this.userService.getByIdProfile(id).subscribe(res => {
				this.userData = res.data;
			});
		}
	}

	goBack() {
		this.location.back();
	}
}