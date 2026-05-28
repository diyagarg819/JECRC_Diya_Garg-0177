// src/app/core/services/tracking.service.ts
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject, Observable } from 'rxjs';
import { VehicleLocationMessage } from '../models/models';

@Injectable({ providedIn: 'root' })
export class TrackingService {
  private hub: signalR.HubConnection;
  private vehicleLocation$ = new Subject<VehicleLocationMessage>();
  private shipmentUpdate$ = new Subject<any>();
  private fleetAlert$ = new Subject<any>();

  constructor() {
    this.hub = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/hubs/tracking', {
        accessTokenFactory: () => localStorage.getItem('token') ?? ''
      })
      .withAutomaticReconnect()
      .build();

    this.hub.on('VehicleLocationUpdated', (msg: VehicleLocationMessage) => this.vehicleLocation$.next(msg));
    this.hub.on('ShipmentStatusUpdated', (msg: any) => this.shipmentUpdate$.next(msg));
    this.hub.on('FleetAlertReceived', (msg: any) => this.fleetAlert$.next(msg));
  }

  async connect(): Promise<void> {
    if (this.hub.state === signalR.HubConnectionState.Disconnected) {
      await this.hub.start();
      await this.hub.invoke('JoinFleetRoom');
    }
  }

  async disconnect(): Promise<void> {
    await this.hub.stop();
  }

  async trackShipment(trackingNumber: string): Promise<void> {
    await this.hub.invoke('JoinShipmentGroup', trackingNumber);
  }

  async trackVehicle(vehicleId: string): Promise<void> {
    await this.hub.invoke('JoinVehicleGroup', vehicleId);
  }

  onVehicleLocation(): Observable<VehicleLocationMessage> { return this.vehicleLocation$.asObservable(); }
  onShipmentUpdate(): Observable<any> { return this.shipmentUpdate$.asObservable(); }
  onFleetAlert(): Observable<any> { return this.fleetAlert$.asObservable(); }
}
