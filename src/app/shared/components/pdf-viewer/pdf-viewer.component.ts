import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PDFDocumentProxy, PdfViewerModule } from 'ng2-pdf-viewer';

const MODULES = [CommonModule, NgbTooltipModule, PdfViewerModule];

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [MODULES],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.scss',
})
export class PdfViewerComponent {
  @ViewChild('pdfContainer', { static: false }) pdfContainer!: ElementRef;
  @Input() fileName: string = '';
  @Input() fileSrc: string = '';
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  page: number = 1; // Página actual
  totalPages!: number; // Total de páginas
  zoom: number = 1.0; // Nivel de zoom

  adjustZoom(pdf: PDFDocumentProxy) {
    const container = this.pdfContainer.nativeElement;

    // Obtener dimensiones del contenedor
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Obtener dimensiones del PDF
    pdf.getPage(1).then((page) => {
      const viewport = page.getViewport({ scale: 1 });
      const pdfWidth = viewport.width;
      const pdfHeight = viewport.height;

      // Calcular el zoom para que el PDF se ajuste al contenedor
      const widthScale = containerWidth / pdfWidth;
      const heightScale = containerHeight / pdfHeight;

      // Usar el menor de los dos escalas para mantener la relación de aspecto
      this.zoom = Math.min(widthScale, heightScale);
    });
  }

  // Se ejecuta cuando el PDF ha sido cargado completamente
  onLoadComplete(pdf: PDFDocumentProxy) {
    this.totalPages = pdf.numPages;
    this.adjustZoom(pdf);
  }

  pageInputChange($event: any) {
    this.page = Number($event.target?.['value'] as string);
  }

  // Navegar a la página anterior
  previousPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  // Navegar a la siguiente página
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  // Incrementar el zoom
  zoomIn() {
    this.zoom += 0.1;
  }

  // Reducir el zoom
  zoomOut() {
    if (this.zoom > 0.2) {
      this.zoom -= 0.1;
    }
  }

  // Escuchar el evento 'keydown' a nivel global en el documento
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.emitClose();
    }
  }

  emitClose() {
    this.close.emit(true);
  }

  downloadPdf() {
    // Convertir la cadena base64 en un blob
    const byteCharacters = atob(this.fileSrc.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Crear un enlace para descargar el archivo
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = this.fileName;
    link.click();

    // Liberar el objeto URL
    URL.revokeObjectURL(link.href);
  }

  base64ToFile(base64: string, fileName: string): File {
    const byteString = atob(base64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([intArray], { type: 'application/pdf' });
    return new File([blob], fileName, { type: 'application/pdf' });
  }
}
