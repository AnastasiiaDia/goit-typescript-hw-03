class Key {
  private signature: number;
  constructor() {
    this.signature = Math.random();
  }
  getSignature(): number {
    return this.signature;
  }
}
// Людина (Person): Створіть клас Person.
//  Конструктор цього класу приймає об'єкт класу Key
//  і зберігає їх у приватному властивості key.
//   Клас Person повинен мати метод getKey, який повертає збережений ключ.
class Person {
  constructor(private key: Key) {}
  getKey(): Key {
    return this.key;
  }
}

// Дім (House): Створіть абстрактний клас House. Цей клас має дві властивості:
// door, яка може бути відкрита (true), або закрита (false),
//  і key, яка зберігає об'єкт класу Key.
//   У цьому класі також повинен бути метод comeIn,
//    який додає об'єкт класу Person у масив tenants, якщо door відкрита.
//    Ваш абстрактний клас House також повинен мати абстрактний метод OpenDoor,
//    який приймає об'єкт класу Key.

abstract class House {
  door: boolean;
  tenants: Person[] = [];
  constructor(public key: Key) {
    this.door = false;
  }
  comeIn(person: Person) {
    if (this.door) {
      this.tenants.push(person);
    } else {
      console.log(`The door is closed.`);
    }
  }
  abstract openDoor(key: Key): void;
}

// Мій будинок (MyHouse): Створіть клас MyHouse, який успадковується від абстрактного класу House.
// Реалізуйте метод openDoor у цьому класі.
//  Якщо ключ, переданий цьому методу, збігається з ключем, збереженим як key, то двері відчиняються.

class MyHouse extends House {
  openDoor(key: Key): void {
    if (this.key.getSignature() === key.getSignature()) {
      this.door = true;
    } else {
      console.log(`The door is closed`);
    }
  }
}
const key = new Key();

const house = new MyHouse(key);

const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
