import { parseGwei } from 'viem';
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from 'viem/chains';

import { Chain, OPStackSupport } from '@/lib/types/chains';

import { Icons } from '@/components/common/icons';

const evmOptimisticRollupBase: OPStackSupport = {
  consensusMechanism: 'Optimistic Rollup',
  nativeTokenSlug: 'ethereum',
  evmCompatible: true,
  layer: 2,
  hasCustomStack: true,
  underlying: 'ethereum',
};

/* -------------------------------------------------------------------------- */
/*                                   CHAINS                                   */
/* -------------------------------------------------------------------------- */

const Ethereum: Chain = {
  config: mainnet,
  consensusMechanism: 'PoS',
  nativeTokenSlug: 'ethereum',
  evmCompatible: true,
  layer: 1,
  hasCustomStack: false,
  hasPriorityFee: true,
  avgBlockTime: 12080,
  rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/',
  gasControls: {
    min: Number(parseGwei('1')),
    max: Number(parseGwei('1000')),
    step: Number(parseGwei('1')),
    gweiDecimals: 2,
  },
  icon: Icons.ethereum,
};

const EthereumSepolia: Chain = {
  config: sepolia,
  consensusMechanism: 'PoS',
  nativeTokenSlug: 'ethereum',
  evmCompatible: true,
  layer: 1,
  hasCustomStack: false,
  hasPriorityFee: true,
  avgBlockTime: 12080,
  rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/',
  gasControls: {
    min: Number(parseGwei('1')),
    max: Number(parseGwei('1000')),
    step: Number(parseGwei('1')),
    gweiDecimals: 2,
  },
  icon: Icons.ethereum,
};

const Arbitrum: Chain = {
  config: arbitrum,
  ...evmOptimisticRollupBase,
  hasPriorityFee: false,
  avgBlockTime: 260,
  rpcUrl: 'https://arb-mainnet.g.alchemy.com/v2/',
  gasControls: {
    min: Number(parseGwei('0.1')),
    max: Number(parseGwei('1000')),
    step: Number(parseGwei('0.1')),
    gweiDecimals: 1,
  },
  icon: Icons.arbitrum,
  disabled: false,
};

const Base: Chain = {
  config: base,
  ...evmOptimisticRollupBase,
  hasPriorityFee: true,
  avgBlockTime: 2000,
  rpcUrl: 'https://base-mainnet.g.alchemy.com/v2/',
  gasControls: {
    min: Number(parseGwei('0.001')),
    max: Number(parseGwei('500')),
    step: Number(parseGwei('0.001')),
    gweiDecimals: 4,
  },
  icon: Icons.base,
  disabled: false,
};

const Optimism: Chain = {
  config: optimism,
  ...evmOptimisticRollupBase,
  hasPriorityFee: true,
  avgBlockTime: 2000,
  rpcUrl: 'https://opt-mainnet.g.alchemy.com/v2/',
  gasControls: {
    min: Number(parseGwei('0.001')),
    max: Number(parseGwei('500')),
    step: Number(parseGwei('0.001')),
    gweiDecimals: 4,
  },
  icon: Icons.optimism,
  disabled: false,
};

const Polygon: Chain = {
  config: polygon,
  consensusMechanism: 'PoS',
  nativeTokenSlug: 'polygon',
  evmCompatible: true,
  layer: 2,
  hasCustomStack: false,
  hasPriorityFee: true,
  avgBlockTime: 2140,
  rpcUrl: 'https://polygon-mainnet.g.alchemy.com/v2/',
  gasControls: {
    min: Number(parseGwei('0.001')),
    max: Number(parseGwei('1000')),
    step: Number(parseGwei('1')),
    gweiDecimals: 4,
  },
  icon: Icons.polygon,
  disabled: false,
};

export const CHAINS: Chain[] = [Ethereum, EthereumSepolia, Arbitrum, Base, Optimism, Polygon];
