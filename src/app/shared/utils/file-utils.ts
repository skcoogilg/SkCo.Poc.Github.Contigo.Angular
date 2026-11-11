import Swal from 'sweetalert2';

export const base64ToFile = (base64: string, fileName: string): File => {
  const byteString = atob(base64);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([intArray], { type: 'application/pdf' });
  return new File([blob], fileName, { type: 'application/pdf' });
};

export const downloadFile = (file: File | Blob, fileName: string) => {
  const url = window.URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  a.remove();
};

export const showStatusPdfError = () => {
  Swal.fire({
    icon: 'error',
    title: '¡Ups! Algo no salió como esperábamos.',
    text: `Regresa más tarde e intenta de nuevo. Si el problema persiste, contáctanos por medio de Sami. Estamos para ayudarte a resolverlo.
    
              ¡Gracias por tu comprensión! 😊`,
    confirmButtonColor: '#00C83C',
  });
};
