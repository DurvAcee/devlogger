import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/models/log'; 
import { LogService } from 'src/app/services/log.service';
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  public logs!: Log[];
  public selectedLog!: Log;
  public loaded:boolean = false;
  public isLoading: boolean = false;

  constructor(private logService: LogService) { 
  }

  ngOnInit(): void {
    this.logService.stateClear.subscribe(clear => {
      if(clear){
        this.selectedLog = {id: '', text: '', date: ''};
      }
    });
    this.logService.getLogs().subscribe( logs => {
      this.logs = logs;
      this.simulateApiCall();
      // setTimeout(() => {
      //   this.loaded = true;
      // }, 1750);
    });
  }

  public onSelect(log: Log){
    this.logService.setFormLog(log);
    this.selectedLog = log;
  }

  public onDelete(log: Log){
    if(confirm('Are you sure?')){
      this.logService.deleteLog(log);
    }
  }

  public simulateApiCall() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.loaded = true;
    }, 2000); 
  }
}
