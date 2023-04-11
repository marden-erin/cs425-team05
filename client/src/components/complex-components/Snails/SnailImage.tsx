import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import OWServiceProvider from '../../../OuterWhorldServiceProvider';
import { GetSnailImg, GetHatImg, GetGlassesImg } from '../../../utils';
import { VisuallyHiddenSpan } from '../../simple-components';

type SnailImageProps = {
  /**
   * The username from which to pull snail info from
   */
  username: string;
  /**
   * Optional width of image in rem: default 30rem
   */
  width?: number;
};

const InnerWrapper = styled.span<{ width: number }>`
  ${(props) =>
    css`
        width: ${props.width}rem;
        height ${props.width}rem;
    `}
`;

const SnailImg = styled.img<{ width: number }>`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-items: center;
  width: 90.9%;
  position: absolute;

  ${(props) =>
    css`
      width: ${props.width * 0.909}rem;
    `}
`;

const AccessoryImg = styled.img<{ width: number }>`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-items: center;
  width: 100%;
  position: absolute;

  ${(props) =>
    css`
      width: ${props.width}rem;
    `}
`;

export const SnailImage = ({ username, width = 30 }: SnailImageProps) => {
  const [snailName, setSnailName] = useState('');
  const [snailBaseImage, setSnailBaseImage] = useState('');
  const [snailColor, setSnailColor] = useState('');
  const [snailHealth, setSnailHealth] = useState(3);

  const [hat, setHat] = useState('');
  const [glasses, setGlasses] = useState('');

  useEffect(() => {
    const loadData = async () => {
      let snailInfo = await OWServiceProvider.getSnailInfo(username);
      setSnailName(snailInfo.name);
      setSnailColor(snailInfo.color);
      setSnailHealth(snailInfo.health);
      setSnailBaseImage(GetSnailImg(snailColor, snailHealth));

      // TODO: Pull from Snail
      setHat('Astronaut');
      setGlasses('Square');
    };
    loadData();
  }, []);
  return (
    <InnerWrapper width={width}>
      <VisuallyHiddenSpan>Your snail, {snailName}</VisuallyHiddenSpan>
      <SnailImg src={snailBaseImage} role="presentation" width={width} />
      <AccessoryImg
        src={GetGlassesImg(glasses)}
        role="presentation"
        width={width}
      />
      <AccessoryImg src={GetHatImg(hat)} role="presentation" width={width} />
    </InnerWrapper>
  );
};
