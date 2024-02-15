import { AirdropMethod, Token } from '@/lib/types/airdrop';
import { Chain } from '@/lib/types/chains';

import { Icon } from '@/components/common/icons';

export type ComboboxOption = {
  label: string;
  value: Chain['config']['id'] | Token['id'] | AirdropMethod['id'];
  icon?: Icon;
  iconColor?: string;
  disabled?: boolean;
};

export type AirdropDataType = { recipient: string; amount?: string; tokenId?: string };
export type EstimationCostsDataType = {
  name: string;
  gasUsed: { root: string; l1submission: string };
  costNative: { root: string; l1submission: string };
  costUsd: { root: string; l1submission: string };
};
export type EstimationConfigDataType = {
  chainName: string;
  baseFeePerGas: number;
  priorityFeePerGas: number;
  nativeTokenPrice: number;
  contractName: string;
  functionName: string;
  githubLink: string;
  explorerLink: string;
  website: string;
};
