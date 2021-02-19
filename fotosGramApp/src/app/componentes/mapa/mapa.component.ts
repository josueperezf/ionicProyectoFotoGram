import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';


declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit, AfterViewInit {

  @Input() coords: string;
  a=1;
  @ViewChild('miMapa', { static: true }) mapa:ElementRef;

  constructor() { }

  ngOnInit() {



  }
  ngAfterViewInit() {
    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zdWVwZXJlemYiLCJhIjoiY2trenJxc3BxMGVzMDJxbnkwMWlzbTJtcCJ9.4JqnC3t0oqZCp2mDkb4sKA';
    const map = new mapboxgl.Map({
      container:  this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ lng, lat ],
      zoom: 15
    });

    const marker = new mapboxgl.Marker()
        .setLngLat( [ lng, lat ] )
        .addTo( map );

  }

}
