import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import styled from 'styled-components';

import {
  SmallRoundedButton,
  VisuallyHiddenSpan,
} from '../../simple-components';

type CloseButtonProps = {
  /**
   * The handler that toggles the element to close
   */
  handler: React.Dispatch<React.SetStateAction<boolean>>;
};

const StyledSmallButton = styled(SmallRoundedButton)`
  position: fixed;
  right: 10px;
  top: 10px;
`;

const SmallerStyledSmallButton = styled(SmallRoundedButton)`
  position: fixed;
  right: 4px;
  top: 4px;
`;

const CloseButton = ({ handler }: CloseButtonProps) => {
  return (
    <StyledSmallButton
      onClick={() => {
        handler(false);
      }}
    >
      <IoMdClose />
      <VisuallyHiddenSpan>Close</VisuallyHiddenSpan>
    </StyledSmallButton>
  );
};

const SmallCloseButton = ({ handler }: CloseButtonProps) => {
  return (
    <SmallerStyledSmallButton
      onClick={() => {
        handler(false);
      }}
    >
      <IoMdClose />
      <VisuallyHiddenSpan>Close</VisuallyHiddenSpan>
    </SmallerStyledSmallButton>
  );
};

export { CloseButton, SmallCloseButton };
