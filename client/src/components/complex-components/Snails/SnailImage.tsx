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
  /**
   * Optional color - Otherwise uses whatever color the snail has
   */
  overrideColor?: string;
  /**
   * Optional hat - Otherwise uses whatever hat the snail has
   */
  overrideHat?: string;
  /**
   * Optional glasses - Otherwise uses whatever glasses the snail has
   */
  overrideGlasses?: string;

  snailHealth?: number;
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

export const SnailImage = ({
  username,
  overrideColor,
  overrideHat,
  overrideGlasses,
  snailHealth,
  width = 30,
}: SnailImageProps) => {
  const [snailName, setSnailName] = useState('');
  const [snailColor, setSnailColor] = useState('');
  // const [snailHealth, setSnailHealth] = useState(3);

  const [hat, setHat] = useState('');
  const [glasses, setGlasses] = useState('');

  useEffect(() => {
    const loadData = async () => {
      let snailInfo = await OWServiceProvider.getSnailInfo(username);
      let savedHat = snailInfo.accessories.hat;
      savedHat = savedHat === undefined ? '' : savedHat; // Fix if undefined
      let savedGlasses = snailInfo.accessories.glasses;
      savedGlasses = savedGlasses === undefined ? '' : savedGlasses; // Fix if undefined
      setSnailName(snailInfo.name);

      overrideColor
        ? setSnailColor(overrideColor)
        : setSnailColor(snailInfo.color);
      overrideHat ? setHat(overrideHat) : setHat(savedHat);
      overrideGlasses ? setGlasses(overrideGlasses) : setGlasses(savedGlasses);
    };
    loadData();
  }, []);
  return (
    <InnerWrapper width={width}>
      <VisuallyHiddenSpan>Your snail, {snailName}</VisuallyHiddenSpan>
      <SnailImg
        src={GetSnailImg(snailColor, snailHealth)}
        role="presentation"
        width={width}
      />
      {snailHealth! > 1 && (
        <>
          <AccessoryImg
            src={GetGlassesImg(glasses)}
            role="presentation"
            width={width}
          />
          <AccessoryImg
            src={GetHatImg(hat)}
            role="presentation"
            width={width}
          />
        </>
      )}
    </InnerWrapper>
  );
};
