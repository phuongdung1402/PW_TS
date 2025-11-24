
//Bản thiết kế ko hoàn thiện ( ko new đc )
abstract class Vehicle{
    
    protected brand : string

    constructor(brand : string) {
        this.brand = brand
    }

    startEngine() {
        console.log(`Dong co cua ${this.brand} da khoi dong`);
    }

    // 1 abstract class ( chi co ten, ko co code)
    abstract move(): void
}

class Car extends Vehicle{
    move(): void {
        console.log(`Chiec xe ${this.brand} dang chay tren 4 banh`);
    }

}

class Truck extends Vehicle{
    move(): void {
        console.log(`Chiec xe ${this.brand} dang chay tren 18 banh`);
        
    }
}

const myCar = new Car('Toyota')
const myTruck = new Truck('Huyndai')

myCar.startEngine()
myCar.move()

myTruck.startEngine()
myTruck.move()
