import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RequestContextService } from 'src/services/context/context.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private requestContextService: RequestContextService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // Extract the user token from the request headers
    const userToken: string = request.headers['x-access-token'];
    // Store the user token in RequestContextService
    this.requestContextService.set<string>('userToken', userToken);
    // Add your authentication logic here
    const isAuthenticated = this.authenticate(userToken);

    return isAuthenticated;
  }

  private authenticate(userToken: string): boolean {
    // Implement your token validation logic here
    return true; // Assume the user is authenticated for demo purposes
  }
}
