import type { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@envs/environment';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  // Verifica si la solicitud es para request.service
  if (req.url.includes(environment.baseEnvApimUrl)) {
    const clonedRequest = req.clone({
      headers: req.headers.set('client_id', environment.clientId)
    });
    return next(clonedRequest);
  }

  // Si la solicitud no es para request.service, no modifica nada
  return next(req);
};
