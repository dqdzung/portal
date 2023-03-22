import { BaseModel } from '.';
import { System } from './system';

export interface SystemGroup extends BaseModel {
  description: string;
  systems: System[];
  username: string;
}
