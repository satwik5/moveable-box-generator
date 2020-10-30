import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-datahandler',
  templateUrl: './datahandler.component.html',
  styleUrls: ['./datahandler.component.css']
})

export class DatahandlerComponent implements OnInit {

  boxes = [];
  selectedBox: number;
  createBox = 0; 
  color: string = ''; 
  nextColor: string = '#ce7d21';
  boxNumber: number = 1;
  xValue = 0; 
  yValue = 0; 
  speed = 1;
  actionFlag: boolean = false; 
  deleteFlag: boolean = false;
  pageLoader: boolean = true;

  ngOnInit(): void {
    //page loader for attracting users before application starts
    const myAsync = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      this.pageLoader = false;
    }
    myAsync();
  }
  //event listerner for keyboard key press
  @HostListener('window:keydown', ['$event']) spaceEvent(event: any) {
    this.action(event.keyCode);
  }
  constructor() { }

  //box movement speed change
  onChange(val) {
    this.speed = parseInt(val);
  }

  //addition of box after clicking button
  onAddBox() {
    this.createBox = this.boxNumber;
    this.color = this.nextColor;
    this.boxes.push({ "id": this.createBox, "y": 0, "x": 15, "color": this.color })
    this.boxNumber++;
    this.nextColor = "#" + ((1 << 24) * Math.random() | 0).toString(16);
  }
  //seletion of particular box to make moves
  onSelectBox(id: number) {
    this.selectedBox = id;
  }

  //clearing the frame
  onClear() {
    this.boxes = [];
    this.boxNumber = 1;
  }

  //user actions on key press 
  action(key: number) {

    switch (key) {
      case 38: case 87:
        this.xValue = 0;
        this.yValue = -Math.abs(this.speed);
        this.actionFlag = true;
        break;
      case 40: case 83:
        this.xValue = 0;
        this.yValue = this.speed;
        this.actionFlag = true;
        break;
      case 37: case 65:
        this.xValue = -Math.abs(this.speed);
        this.yValue = 0;
        this.actionFlag = true;
        break;
      case 39: case 68:
        this.xValue = this.speed;
        this.yValue = 0;
        this.actionFlag = true;
        break;
      case 46:
        this.deleteFlag = true;
        break;
      default:
        break;
    }
    //fetching the width and height of frame based on window size
    let height = document.getElementById('main').offsetHeight;
    let width = document.getElementById('main').offsetWidth;
    if (this.actionFlag) {
      for (let i = 0; i < this.boxes.length; i++) {
        if (this.boxes[i].id == this.selectedBox) {
          let xVal = this.boxes[i].x + this.xValue;
          let yVal = this.boxes[i].y + this.yValue;
          if (xVal <= width && xVal >= 0) {
            xVal > width - 65 ? this.boxes[i].x = width - 65 : xVal - 15 >= 0 ? this.boxes[i].x += this.xValue : this.boxes[i].x = 15;
          }
          if (yVal <= height && yVal >= 0) {
            yVal > height - 75 ? this.boxes[i].y = height - 75 : yVal >= this.speed ? this.boxes[i].y += this.yValue : this.boxes[i].y = 0;
          }
        }
      }
    }
    if (this.deleteFlag) {
      for (let i = 0; i < this.boxes.length; i++) {
        if (this.boxes[i].id == this.selectedBox) {
          this.boxes.splice(i, 1)
        }
      }
    }
    //clearing the values after movement
    this.xValue = 0; this.yValue = 0; this.actionFlag = false; this.deleteFlag = false;
  }
}
