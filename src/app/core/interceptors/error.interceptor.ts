import type { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  return next(req).pipe(catchError(handleErrorResponse));
};

const handleErrorResponse = (error: HttpErrorResponse): ReturnType<typeof throwError> => {
  const errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
  return throwError(() => errorMessage)
}
