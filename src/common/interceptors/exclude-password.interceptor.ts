import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export function SerializeUserResponse() {
  return UseInterceptors(new ExcludePasswordInterceptor());
}

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    // Run this before a request is handled by the request handler
    // console.log('Running before the request handler', context);

    // Run this after the request handler has run:
    return next.handle().pipe(
      map((user) => {
        if (user.password) {
          user.password = undefined;
        }
        return user;
      }),
    );
  }
}
