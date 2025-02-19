import { Admin, Agent, Organization } from '../database';
import { Request } from 'express';

export interface IRequest<T = Agent | Admin> extends Request {
  admin: Admin;
  agent: Agent;
  currentOrganization: Organization;
  reqId: string;
  reqIp: string;
  userAgent: string;
  //   device: UAParser.IResult;
  //   currentDevice: Device;
  //   consumer: CreateConsumerResponse;
  //   consumerId: string;
  headers: Request['headers'] & {
    'x-consumer-id': string;
    'x-consumer-username': string;
  };
}
