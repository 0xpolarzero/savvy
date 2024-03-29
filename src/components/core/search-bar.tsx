'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAddress } from 'tevm/utils';

import { Chain } from '@/lib/types/providers';
import { useMediaQuery } from '@/lib/hooks/use-media-query';
import { useProviderStore } from '@/lib/store/use-provider';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Icons } from '@/components/common/icons';
import ExampleButton from '@/components/core/example';

type SearchBarProps = {
  initialSearchedAccount?: string;
  hydrating?: boolean;
};

/**
 * @notice Search for a contract or an EOA by pasting its address and selecting a chain
 * @dev If it's a contract, this will fetch the abi and retrieve the contract's methods.
 * @dev In any case, this will retrieve and display information about the address.
 * @param initialSearchedAccount The researched address, if relevant (not on the home page)
 * @param hydrating Whether the app is still hydrating or not
 */
const SearchBar: FC<SearchBarProps> = ({
  initialSearchedAccount,
  hydrating = false,
}) => {
  /* ---------------------------------- STATE --------------------------------- */
  // The current input value
  const [inputValue, setInputValue] = useState<string>('');
  // Whether the targets's address passes the checksum
  const [isValidAddress, setIsValidAddress] = useState<boolean>(
    !!initialSearchedAccount,
  );

  // Expand from tablet breakpoint
  const isTablet = useMediaQuery('(min-width: 640px)'); // sm

  // Get the chain & client
  const { chain, initializing, setProvider } = useProviderStore((state) => ({
    chain: state.chain,
    initializing: state.initializing,
    setProvider: state.setProvider,
  }));

  // Navigate to a specific address' page on search
  const { push } = useRouter();

  /* -------------------------------- HANDLERS -------------------------------- */
  // Update the current account after checking if it's a valid address
  // Let the user know if the address is invalid
  // This will avoid unnecessary requests to the blockchain as well
  const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isAddress(e.target.value) || e.target.value.endsWith('.eth')) {
      setIsValidAddress(true);
    } else {
      setIsValidAddress(false);
    }

    setInputValue(e.target.value);
  };

  // Retrieve the state of an account; if called from the example button, this will
  // update the chain and client first, then fetch the account's data
  const handleAccountSearch = async (address?: string, targetChain?: Chain) => {
    // If we're clicking search again on the same address, bail out
    if (initialSearchedAccount === inputValue && !address) return;
    // targetChain means it's called from the example button
    // If it's different than the current chain, we need to update the provider
    // No need to wait for completion, the loading state will be explicit enough
    if (targetChain && targetChain.id !== chain.id) {
      setProvider(
        // Either the target chain (example) or the current chain (search)
        targetChain,
      );
    }

    // Don't push the prefix if we're already on the address page
    push(`${initialSearchedAccount ? '' : 'address/'}${address ?? inputValue}`);
    // Reset the input value
    setInputValue('');
  };

  /* --------------------------------- RENDER --------------------------------- */
  // If hydrating, we don't know the screen size yet; we want to avoid flashing buttons
  if (hydrating) {
    return (
      <div className="flex w-full flex-col gap-1">
        <div className="lg:h-[29px]" />
        <div className="grid grid-cols-[1fr_min-content] items-center gap-2 sm:flex sm:gap-4">
          <Skeleton className="h-[36px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="lg:h-[29px]" />
      <div className="grid grid-cols-[1fr_min-content] items-center gap-2 sm:flex sm:gap-4">
        <Input
          id="target"
          type="text"
          className={cn(
            inputValue !== '' && !isValidAddress && 'border-red-500',
            'grow font-mono text-xs sm:min-w-[250px] sm:text-sm',
          )}
          placeholder={
            isTablet
              ? 'Paste the address of an EOA or a contract'
              : 'Paste an address'
          }
          value={inputValue}
          onChange={updateInput}
        />
        {isTablet ? null : (
          <Button
            size="sm"
            variant="ghost"
            className="flex items-center gap-2 text-muted-foreground"
            onClick={() => navigator.clipboard.readText().then(setInputValue)}
          >
            <Icons.paste className="h-4 w-4" /> Paste
          </Button>
        )}
        {initializing ? (
          <>
            <Skeleton className="h-[36px] w-[238px]" />
            <Skeleton className="h-[36px] w-[110px]" />
          </>
        ) : (
          <>
            <ExampleButton handleAccountSearch={handleAccountSearch} />
            <Button
              size={isTablet ? 'default' : 'sm'}
              disabled={!isValidAddress}
              onClick={() => handleAccountSearch()}
            >
              Search
            </Button>
          </>
        )}
      </div>
      {!isValidAddress && inputValue !== '' ? (
        <span className="text-sm font-medium text-muted-foreground">
          Invalid address or ENS
        </span>
      ) : null}
    </div>
  );
};

export default SearchBar;
