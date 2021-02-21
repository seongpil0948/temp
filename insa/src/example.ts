interface User {
  name: string;
  email: string;
  age: number;    
}

class User implements User {
//   name: string;
//   email: string;
//   age: number;

  constructor(name: string, email: string, age: number) {
    this.name = name;
    this.email = email;
    this.age = age;

    console.log(name, email, age);
  }
}

let Rajan = new User("rajan", "myemail@gmail.com", 23);

