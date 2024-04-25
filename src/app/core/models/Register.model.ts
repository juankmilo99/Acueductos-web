export class Register {
  public username: string;
  public address: string;
  public city: string;
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public cellphone: string;

  constructor(
    username: string,
    address: string,
    city: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    cellphone: string
  ) {
    this.username = username;
    this.address = address;
    this.city = city;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.cellphone = cellphone;
  }
}
