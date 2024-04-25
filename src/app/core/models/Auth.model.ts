export class Auth {
  public usuario: string;
  public contrasenia: string;


  constructor(
    cod: string,
    doc: string,
  ) {

    this.usuario = cod;
    this.contrasenia = doc;

  }

}
