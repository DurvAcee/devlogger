import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id!: string;
  text!: string;
  date!: any;

  isNew: boolean = true;

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    // Subscrive to the selectedLog observable
    this.logService.selectedLog.subscribe(log => {
      if(log.id !== ''){
        this.isNew = false;
        console.log(log);
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    })
  }

  public onSubmit(){
    // Check if log is new
    if(this.isNew){
      // Create new log
      const newLog = {
        id: this.generateId(),
        text: this.text,
        date: new Date()
      }

      // Add log
      this.logService.addLog(newLog);
    } else {
      // Create log to be updated
      const updLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      }
      // Update log
      this.logService.updateLog(updLog);
    }
    // Clear state
    this.clearState();
  }

  clearState() {
    this.isNew = true;
    this.id = this.text = this.date = '';
    this.logService.clearState();
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ?
        r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
  }

  public onClear() { 
    this.text = '';
    this.isNew = true;
  }

}
