import { Chain } from './chains';
import { Address } from 'viem';

import { Icon } from '@/components/common/icons';

export type Token = {
  id: 'native' | 'ERC20' | 'ERC721' | 'ERC1155';
  label: string;
  iconColor?: string;
  disabled?: boolean;
};
export type AirdropMethod = {
  id: 'push' | 'merkle' | 'signature';
  label: string;
  icon?: Icon;
  disabled?: boolean;
};

export type AirdropSolution = {
  name: string;
  description: string;
  tokens: Token[];
  method: AirdropMethod;
  functionSig: string;
  sourceUrl: string;
  website: string;
  contract: string;
  deployments: {
    [chain: Chain['config']['id']]: Address;
  };
};

export type AirdropSolutionsList = {
  [token in Token['id']]: {
    [method in AirdropMethod['id']]: AirdropSolution;
  };
};
