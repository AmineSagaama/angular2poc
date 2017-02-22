import {Component} from '@angular/core';
import {Car} from './cars/car';
import {CarService} from './cars/carservice';
import {ButtonModule} from 'primeng/primeng';
import {CommonModule} from '@angular/common';
import {Item} from './models/item';
import {Config} from './config';
import {ItemPipe} from './pipes/item.filter';

class PrimeCar implements Car {
    constructor(public vin?, public year?, public brand?, public color?) {}
}

@Component({
	templateUrl: 'app/app.component.html',
	selector: 'my-app',
    styleUrls: ['app/app.component.css'],
    pipes: [ItemPipe]
})
export class AppComponent {

    private title: string;

    private newItem: Item;

    private collection: [Item];

	displayDialog: boolean;

    car: Car = new PrimeCar();

    selectedCar: Car;

    newCar: boolean;

    cars: Car[];

    private items: MenuItem[];

    constructor(private carService: CarService) {
        this.title = Config.APP_TITLE;
        this.collection = [
            new Item({reference: '1', name: 'User1', state: 0}),
            new Item({reference: '2', name: 'User2', state: 1}),
            new Item({reference: '3', name: 'User3', state: 2})
        ]
        this.resetNewItem();
     }

     resetNewItem(){
         this.newItem = new Item({reference: '', name: '', state:0});
     }

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars = cars);
    }

    showDialogToAdd() {
        this.newCar = true;
        this.car = new PrimeCar();
        this.displayDialog = true;
    }

    save() {
        if(this.newCar)
            this.cars.push(this.car);
        else
            this.cars[this.findSelectedCarIndex()] = this.car;

        this.car = null;
        this.displayDialog = false;
    }

    delete() {
        this.cars.splice(this.findSelectedCarIndex(), 1);
        this.car = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newCar = false;
        this.car = this.cloneCar(event.data);
        this.displayDialog = true;
    }

    cloneCar(c: Car): Car {
        let car = new PrimeCar();
        for(let prop in c) {
            car[prop] = c[prop];
        }
        return car;
    }

    findSelectedCarIndex(): number {
        return this.cars.indexOf(this.selectedCar);
    }

    getDetails(event: Event, parameter){
        event.preventDefault();
        let element = event.target || event.srcElement || event.currentTarget;

        console.log(element.id);
        console.log(parameter)
    }

    createObject(){
        this.collection.push(this.newItem);
        this.resetNewItem();
    }
}
