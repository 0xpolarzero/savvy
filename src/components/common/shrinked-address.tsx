'use client';

import { FC, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Address } from 'tevm/utils';

import { useMediaQuery } from '@/lib/hooks/use-media-query';
import { Icons } from '@/components/common/icons';

type ShrinkedAddressProps = {
  address: Address;
  explorer?: string;
  adapt?: boolean;
  full?: boolean;
  className?: string;
};

/**
 * @notice A component to display a shrinked version of an Ethereum address
 * @dev The component will display the first 6 and the last 4 characters of the address,
 * with a "..." in between, and a tooltip with the full address.
 * Depending on the size of the screen, the full address will be displayed or not.
 * @param address The Ethereum address to display
 * @param explorer The URL of the explorer to link the address to
 * @param adapt Whether to adapt the display to the screen size (default: true)
 * @param full Whether to display the full address (default: false)
 * @param className Additional classes for the component
 */
const ShrinkedAddress: FC<ShrinkedAddressProps> = ({
  address = '0x', // default to avoid errors
  explorer,
  adapt = true,
  full = false,
  className,
}) => {
  const pathname = usePathname();
  const isLargeScreen = useMediaQuery('(min-width: 1280px)'); // xl
  const [copy, setCopy] = useState(false);

  // Display the full address only on large screens (if adapt is true)
  const fullAddress = useMemo(() => {
    if ((isLargeScreen && adapt) || full) return true;
    return false;
  }, [isLargeScreen, adapt, full]);

  // Open the address in the explorer for this chain
  const openExplorerTab = () => {
    if (!explorer) return;
    window.open(
      `${explorer.endsWith('/') ? explorer : `${explorer}/`}address/${address}`,
      '_blank',
    );
  };

  // Copy the address to the clipboard (and update the icon)
  const CopyButton = useMemo(() => {
    const copyToClipboard = () => {
      navigator.clipboard.writeText(address);
      setCopy(true);
      setTimeout(() => setCopy(false), 2000);
    };

    if (copy) {
      return <Icons.copyCheck className="mx-2 h-3 w-3 sm:mx-0" />;
    }

    return (
      <Icons.copyAction
        className="mx-2 h-3 w-3 cursor-pointer opacity-50 transition-opacity duration-200 hover:opacity-80 sm:mx-0"
        onClick={copyToClipboard}
        aria-label="Copy to clipboard"
      />
    );
  }, [address, copy]);

  if (explorer)
    return (
      <div className="flex items-center gap-2">
        <Link
          href={
            pathname.includes('address') ? `${address}` : `/address/${address}`
          }
          className="cursor-pointer hover:underline"
        >
          <pre className={className}>
            {fullAddress
              ? address
              : `0x${address.slice(2, 6)}...${address.slice(-4)}`}
          </pre>
        </Link>
        {CopyButton}
        <Icons.external
          className="mx-2 h-3 w-3 cursor-pointer opacity-50 transition-opacity duration-200 hover:opacity-80 sm:mx-0"
          onClick={openExplorerTab}
          aria-label="Open in explorer"
        />
      </div>
    );

  return (
    <div className="flex items-center gap-2">
      <Link href={address} className="cursor-pointer hover:underline">
        <pre className={className}>
          {fullAddress
            ? address
            : `0x${address.slice(2, 6)}...${address.slice(-4)}`}
        </pre>
      </Link>
      {CopyButton}
    </div>
  );
};

export default ShrinkedAddress;
