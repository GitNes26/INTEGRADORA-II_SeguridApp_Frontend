import Swal from "sweetalert2";
// import Swal from 'sweetalert2/dist/sweetalert2.js';

export function successDialog(msg: string) {
    return Swal.fire({
        position: 'center',
        icon: 'success',
        text: msg,
        showConfirmButton: false,
        timer: 1500
    });
}

export function warningMessage(msg: string) {
    return Swal.fire({
        position: 'center',
        icon: 'warning',
        text: msg,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#65c005'
    });
}

// tslint:disable-next-line: typedef
export function deleteMessage(productName: string|any) {
    return Swal.fire({
        position: 'center',
        icon: 'warning',
        text: 'Estas seguro que deseas eliminar el producto: ' + productName + '?',
        showConfirmButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#d33',
        showCancelButton: true,

    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Producto Eliminado',
                productName,
                'success'
            );
            // Swal.getConfirmButton()
        }
    });
}

export function errorMessage(msg: string) {
    return Swal.fire({
        position: 'center',
        icon: 'error',
        text: msg,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ce2b16'
    });
}

export function confirmDialog(msg: string, cancel: string, confirm: string) {
    return Swal.fire({
        position: 'center',
        icon: 'warning',
        text: msg,
        showCancelButton: true,
        cancelButtonText: cancel,
        cancelButtonColor: '#ce2b16',
        showConfirmButton: true,
        confirmButtonText: confirm,
        confirmButtonColor: '#65c005'
    });
}

export function timeMessage(text: string, time) {
    let timerInterval;
    return Swal.fire({
        html: text,
        timer: time,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => { }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    });
}
