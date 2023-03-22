import { BaseModel } from '.';
import { SystemGroup } from './systemGroups';

export interface System extends BaseModel {
  description: string;
  groupId: number;
  link: string;
  systemGroup: SystemGroup;
  username: string;
}
