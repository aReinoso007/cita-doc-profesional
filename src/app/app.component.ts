import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  closed$ = new Subject<any>();
  showTabs = true; // <-- show tabs by default
  constructor(private _router: Router) {}

  ngOnDestroy(): void {
    this.closed$.next(); // <-- close subscription when component is destroyed
  }

  ngOnInit(): void {
      this._router.events.pipe(
        filter(e=> e instanceof NavigationEnd),
        takeUntil(this.closed$)
      ).subscribe(event=>{
        if(event['url']=== '/tabs/dashboard'){
          const tabBar = document.getElementById('myTabBar'); tabBar.style.display='flex'
        }
        if(event['url']=== '/tabs/horario'){
          const tabBar = document.getElementById('myTabBar'); tabBar.style.display='flex'
        }
        if(event['url']=== '/tabs/historial'){
          const tabBar = document.getElementById('myTabBar'); tabBar.style.display='flex'
        }
        if(event['url']=== '/tabs/cuenta'){
          const tabBar = document.getElementById('myTabBar'); tabBar.style.display='flex'
        }

        //Desactivar tabs con id
        if(event['url'].indexOf('/tabs/clinicas/') !== -1){
          const tabBar = document.getElementById('myTabBar'); tabBar.style.display = 'none'
        }
        if(event['url'].indexOf('/tabs/horario/') !== -1){
          const tabBar = document.getElementById('myTabBar'); tabBar.style.display = 'none'
        }
        if(event['url'].indexOf('/tabs/cuenta/especialidades/') !== -1){
          const tabBar = document.getElementById('myTabBar'); tabBar.style.display = 'none'
        }
    


        if(event['url'] === '/tabs/clinicas'){
          const tabBar = document.getElementById('myTabBar'); tabBar.style.display = 'none'
        }
        if(event['url'] === '/tabs/cuenta/detalle'){
          const tabBar = document.getElementById('myTabBar'); tabBar.style.display = 'none'
        }
        if(event['url'] === '/tabs/cuenta/especialidades'){
          const tabBar = document.getElementById('myTabBar'); tabBar.style.display = 'none'
        }

        
        if(event['url'] === '/tabs/historial'){
          const tabBar = document.getElementById('myTabBar'); tabBar.style.display = 'flex'
        }
        if(event['url'] === '/tabs/dashboard'){
          const tabBar = document.getElementById('myTabBar'); tabBar.style.display = 'flex'
        }
        if(event['url'] === '/tabs/cuenta'){
          const tabBar = document.getElementById('myTabBar'); tabBar.style.display = 'flex'
        }


      })
  }

}
