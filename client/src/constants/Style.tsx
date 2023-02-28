import { css } from 'styled-components';
import { COLORS } from './Colors';

export const ScrollBarStyle = css`::-webkit-scrollbar {
    width: 1.2rem;s
  }
   
  ::-webkit-scrollbar-track {
    background-color: ${COLORS.PURPLE_MID};
    border-radius: 15px;
  }
   
  ::-webkit-scrollbar-thumb {
    background-color: ${COLORS.WHITE};
    border: 2px solid ${COLORS.PURPLE_MID};
    border-radius: 15px;
  }`;

export const GraveScrollBarStyle = css`::-webkit-scrollbar {
    width: 1.2rem;s
  }
   
  ::-webkit-scrollbar-track {
    background-color: ${COLORS.GRAY_DARK};
    border-radius: 15px;
  }
   
  ::-webkit-scrollbar-thumb {
    background-color: ${COLORS.WHITE};
    border: 2px solid ${COLORS.GRAY_MIDARK};
    border-radius: 15px;
  }`;
