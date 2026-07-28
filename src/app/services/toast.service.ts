import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private msgService: MessageService
  ) { }

  addMessage(sev: string, summary: string, msg: string) {
    this.msgService.add({
      severity: sev,
      summary: summary,
      detail: msg,
      life: 3000
    });
  }
}