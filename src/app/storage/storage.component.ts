import { Component, OnInit } from '@angular/core';
import { FirestorageService } from '../firestorage.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  constructor(public firestorage :  FirestorageService) { }

  ngOnInit(): void {
  }

}
