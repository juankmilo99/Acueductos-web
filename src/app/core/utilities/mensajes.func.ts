import { ToastrService } from 'ngx-toastr';

export function mostrarMensaje(tipo: string, mensaje: string, alerta: string, toastr: ToastrService): void {

  const PARAMETROS = {
    closeButton: true,
    enableHtml: true,
    progressBar: true,
    positionClass: "toast-top-center",
    timeOut: 4000,
  };

  switch (tipo) {
    case "success":
      toastr.success(mensaje, alerta, PARAMETROS);
      break;
    case "info":
      toastr.info(mensaje, alerta, PARAMETROS);
      break;
    case "warning":
      toastr.warning(mensaje, alerta, PARAMETROS);
      break;
    case "error":
      toastr.error(mensaje, alerta, PARAMETROS);
      break;
    default:
      toastr.clear(0);
      break;
  }
}
