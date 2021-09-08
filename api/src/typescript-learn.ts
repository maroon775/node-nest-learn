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
  console.log(`generic constraint: ${customer.firstName} ${customer.lastName}`);
}

const customerFoo = new Customer('Sabrina', 'Born');
customerLogger(customerFoo);

// customerLogger('Hello world')  //typescript error

// function generic
function genericFunction<T>(foo: T): T {
  return foo;
}

const test1: number = genericFunction(1235);
console.log('function generic:', test1);

const test2: string = genericFunction('1235');
console.log('function generic:', test2);

// interface generic
interface Person<N, A> {
  name: N;
  age: A;
}

const man: Person<string, number> = {
  name: 'Piter',
  age: 23,
};

// interface to describe function type

interface ICheckerElement {
  <T>(items: T[], toBeChecked: T, atIndex: number): boolean;
}

function checkerElementAt<T>(
  items: T[],
  toBeChecked: T,
  atIndex: number,
): boolean {
  return items[atIndex] === toBeChecked;
}

const checker: ICheckerElement = checkerElementAt;

const checkResult: boolean = checker([1, 2, 3, 4, 5], 5, 4);
console.log('interface to describe function type:', checkResult);

// decorators

function logger(target, key, descriptor) {
  // const originalFn = descriptor.value;
  console.log({ target, key, descriptor });
  console.log('Decorators logger: ', `${key} was called from logger`);

  const originalFn = descriptor.value;
  descriptor.value = function (...args) {
    const result = originalFn.apply(this, args);
    console.log(`${key} with arguments ${args} returned ${result}`);

    return result;
  };

  return descriptor;
}

class MyCalc {
  @logger
  sum(...args: number[]): number {
    return args.reduce((a, b) => a + b, 0);
  }
}

const calc = new MyCalc();

const result1 = calc.sum(2, 2);
console.log('result calc.sum(2, 2): ', result1);

const result2 = calc.sum(6, 3);
console.log('result calc.sum(6, 3): ', result2);
