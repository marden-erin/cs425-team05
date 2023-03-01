import { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import styled, {
  createGlobalStyle,
  DefaultTheme,
  ThemedCssFunction,
} from 'styled-components';

import { H1, SemiHiddenLink } from '../../simple-components';
import { COLORS, FONTS_SECONDARY } from '../../../constants';
import Moon from './../../../imgs/graveyard/Moon.png';
type WrapperProps = {
  /**
   * Any props that come in the component (Actual page content)
   */
  children?: ReactNode;
  /**
   * The name of the page to be shown on the browser tab
   */
  pageTitle: string;
  /**
   * The optional text to be shown in the H1
   */
  header?: string;
  /**
   * The color of the site's background
   */
  backgroundColor?: string;
  /**
   * The color of the h1 text
   */
  titleColor?: string;
  /**
   * Other css
   */
  $css?: ThemedCssFunction<DefaultTheme>;
};

// Adding FONTS_SECONDARY as fallback in case we didn't set a font
const GlobalStyle = createGlobalStyle<{ backgroundColor?: string }>`
    html {
        background: ${(props) =>
          props.backgroundColor ? props.backgroundColor : COLORS.GRAY_MIDARK};
        ${FONTS_SECONDARY}
    }
`;

// TODO: Allow custom css to be passed in
const Wrapper = styled.div<{ $css?: ThemedCssFunction<DefaultTheme> }>`
  background-image: url(${Moon});

  background-position: 20% 80%;
  background-repeat: no-repeat;
`;

const Header = styled(H1)<{ fontColor?: string }>`
  text-align: center;
  color: ${(props) => (props.fontColor ? props.fontColor : COLORS.WHITE)};
  padding-top: 5rem;
`;

export const GraveAdoptionPageWrapper = ({
  children,
  pageTitle,
  header,
  backgroundColor,
  titleColor,
  $css,
}: WrapperProps) => {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <GlobalStyle backgroundColor={backgroundColor} />
      <Wrapper $css={$css}>
        <SemiHiddenLink href="#main">Skip to Content</SemiHiddenLink>
        {header && <Header fontColor={titleColor}>{header}</Header>}
        <div id="main">{children}</div>
      </Wrapper>
    </>
  );
};

export default GraveAdoptionPageWrapper;