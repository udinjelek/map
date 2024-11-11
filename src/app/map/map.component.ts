import { Component, OnInit, AfterViewInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat, toLonLat } from 'ol/proj'; // Import the necessary functions


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, AfterViewInit {
  setmap: boolean = true;
  menuActive: string = 'task';
  map: Map = new Map();
  modeNow:string = 'click_normal';
  objSelect:any = {'name':'', 'long':0 , 'lat':0, 'coordinate':[]};
  vectorSource: VectorSource = new VectorSource();
  vectorLayer = new VectorLayer({source: this.vectorSource });
  noMarker_inc:number = 1
  constructor() { 
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    this.vectorSource = new VectorSource();
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource
    });

    this.map = new Map({
      target: 'map',
      layers: [ new TileLayer({ source: new OSM() }), 
                this.vectorLayer
              ],
      view: new View({ center:[   12119206.431929186,
                                  -791227.8118498495
                              ], 
                       zoom: 8})
                    });


    this.map.on('click', (event) => {
      if (this.modeNow == 'click_normal'){ this.click_normal(event) }
      if (this.modeNow == 'click_addMarker'){ this.click_addMarker(event) }
    });
    
  }

  click_normal(event:any){
    this.map.forEachFeatureAtPixel(event.pixel, (feature, layer) => {
      if (layer === this.vectorLayer) {
        const markerId = feature.get('id');
        const markerGeo = feature.get('geometry');
        // console.log('Marker ID:', markerId);
        // console.log('Marker geo:', markerGeo.flatCoordinates);
        const markerLonLat = toLonLat(markerGeo.flatCoordinates)
        this.objSelect.name = markerId;
        this.objSelect.long =  markerLonLat[0]
        this.objSelect.lat =  markerLonLat[1]

      }
    });
  }

  click_addMarker(event:any){
    if (this.setmap) {
      const coordinate = event.coordinate;
      
      const marker_name = 'marker_' + (this.noMarker_inc)
      this.noMarker_inc += 1;
      this.addMarker(coordinate, marker_name);
      this.addMarkerToList(marker_name, coordinate);
      console.log(coordinate)
      console.log(marker_name)
    }
  }

  menuClick(modeSelect:string)
  {
      this.menuActive = modeSelect
  }

  btnAction_cursor(){
    
    const view = this.map.getView();
    const center = view.getCenter();
    const zoom = view.getZoom();
    console.log("zoom : ", zoom)
    if (center != undefined){
      console.log("zoom : ", toLonLat(center))
      // console.log("zoom : ", center)
    }
    this.modeNow = 'click_normal'
    this.objSelect.name = ''
  }

  btnAction_geo(){
    
    const view = this.map.getView();
    const center = view.getCenter();
    const zoom = view.getZoom();
    console.log("zoom : ", zoom)
    if (center != undefined){
      console.log("zoom : ", toLonLat(center))
      // console.log("zoom : ", center)
    }
    this.modeNow = 'click_addMarker'
  }

  addMarker(coordinate:any, id:string) {
    // Create a new feature with a point geometry
    const marker = new Feature({
      geometry: new Point(coordinate),
      id: id,
    });

    // Set a style for the marker
    marker.setStyle(new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png' // URL to the marker icon
      })
    }));

    this.vectorSource.addFeature(marker);

  }

  deleteMarker(markerId:string) {
    // Find the feature with the specified ID
    const featureToRemove = this.vectorSource.getFeatures().find((feature) => {
      return feature.get('id') === markerId;
    });
  
    // Remove the feature from the vector source
    if (featureToRemove) {
      this.vectorSource.removeFeature(featureToRemove);
      this.objSelect.name = ''
    }
  }

  addMarkerToList(marker_name:string, coordinate:any)
  {
      
  }
}
