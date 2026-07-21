import { Component, OnInit } from "@angular/core";
import { AuthService } from '../../services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

    uid : String = '';
    role : String = '';
    userSize : number = 0;
    eventSize : number = 0;
    requestSize : number = 0;

    constructor(
        private authService: AuthService, 
        private title: Title
    ) {
        this.title.setTitle("Dashboard")
    }

    ngOnInit(): void {
        const role = this.authService.getRole();
        const uid = this.authService.getUid();

        this.uid = uid ? uid : "NA";
        this.role = role ? role : "NA";
    }


}
