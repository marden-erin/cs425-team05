import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import {
  SmallRoundedButton,
  VisuallyHiddenSpan,
} from '../../simple-components';

type CloseButtonProps = {
  /**
   * The handler that toggles the element to close
   */
  handler: React.Dispatch<React.SetStateAction<boolean>>;
}

const CloseButton = ({handler}: CloseButtonProps) => {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <SmallRoundedButton
      onClick={() => {handler(false)}} >
        <IoMdClose />
      <VisuallyHiddenSpan>
        Close
      </VisuallyHiddenSpan>
    </SmallRoundedButton>
  );
};

export { CloseButton };
