function getArrayItems<T>(items: T[]): T[] {
  return new Array<T>().concat(items);
}

getArrayItems<number>([1, 2, 4, 5, 6]);
getArrayItems<string>(['asd', 'bcd', 'xyz']);

// generic constraint

class Customer {
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

function customerLogger<T extends Customer>(customer: T): void {
  console.log(`Log: ${customer.firstName} ${customer.lastName}`);
}

const customerFoo = new Customer('Sabrina', 'Born');
customerLogger(customerFoo);

// customerLogger('Hello world')  //typescript error

// function generic
function genericFunction<T>(foo: T): T {
  return foo;
}

const test1: number = genericFunction(1235);
console.log(test1);

const test2: string = genericFunction('1235');
console.log(test2);

// interface generic
interface Person<N, A> {
  name: N;
  age: A;
}

const man: Person<string, number> = {
  name: 'Piter',
  age: 23,
};
