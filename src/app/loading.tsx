import { Icons } from '@/components/common/icons';

/**
 * @notice The root component for the loading page
 */
const Loading = () => {
  return (
    <div className="flex grow items-center justify-center">
      <Icons.logo className="h-8 w-8 animate-pulse" />
    </div>
  );
};

export default Loading;
