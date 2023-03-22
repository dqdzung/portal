import { System } from '@/models/system';
import { SystemGroup } from '@/models/systemGroups';
import { createContext } from 'react';

export interface GlobalData {
  systemGroups?: SystemGroup[] | null;
  systems?: System[] | null;
}

export const GlobalDataContext = createContext<GlobalData>({
  systemGroups: null,
  systems: null
});
