import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { IRequest } from 'src/lib';

@Injectable({ scope: Scope.REQUEST })
export class RequestContextService {
  private readonly contextMap: Map<string, any> = new Map();

  constructor(@Inject(REQUEST) private readonly request: IRequest) {}

  set<T>(key: string, value: T): void {
    this.contextMap.set(key, value);
  }

  get<T>(key: string): T | undefined {
    return this.contextMap.get(key) as T;
  }

  get req() {
    return this.request;
  }
  get currentAgent() {
    // request.agent is set in the agent guard. So with access tokens, once you verify who an agent is
    // you can assign the agent for the duration of that request
    return this.request.agent;
  }

  get currentAdmin() {
    return this.request.admin;
  }
}
