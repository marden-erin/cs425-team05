import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { COLORS, FONTS_MAIN } from '../../constants';
import { Label } from './TextComponents';
import { ThinInput } from './Inputs';

// Referenced https://www.w3schools.com/howto/howto_js_rangeslider.asp
const ThumbCss = css`
  -webkit-appearance: none; // Override default CSS styles
  appearance: none;
  width: 20px;
  height: 20px;
  background: ${COLORS.PURPLE_MID};
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid ${COLORS.PURPLE_DARK};
  transition: background-color 0.75s ease-out;
  :hover {
    background: ${COLORS.BLUE_DARK};
  }
`;

const Slider = styled.input`
  -webkit-appearance: none; // Override default CSS styles
  appearance: none;
  width: 100%;
  height: 10px;
  border: 2px solid ${COLORS.PURPLE_MID};
  border-radius: 5px;
  background: ${COLORS.WHITE};
  outline: none;
  ::-webkit-slider-thumb {
    ${ThumbCss};
  }
  ::-moz-range-thumb {
    ${ThumbCss};
  }
`;

type PageSliderType = {
  /**
   * The label for the slider
   */
  label: string;
  /**
   * The minimum number of pages; Default 0
   */
  min?: number;
  /**
   * The maximum number of pages
   */
  max: number;
};

const SliderWrapper = styled.div`
  display: grid;
  grid: auto / 25rem auto;
  align-items: end;
  gap: 10px;
  .slider-div {
    display: flex;
    flex-direction: column;
    gap: 2px;
    label {
      white-space: nowrap; // Prevents text wrapping
      font-weight: bold;
    }
  }
  .number-div {
    grid-area: 1 / 2 / 2 / 3;
    white-space: nowrap; // Prevents text wrapping
    input {
      width: 3ch;
      height: 2ch;
      padding: 0.2rem;
      border: 2px solid ${COLORS.PURPLE_MID};
      border-radius: 5px;
    }
    span {
      font-weight: bold;
      ${FONTS_MAIN};
      color: ${COLORS.PURPLE_MID};
      font-size: 1.4rem;
      letter-spacing: 0.02em;
      margin-inline-end: 3px;
    }
  }
`;

const PageSlider = ({ label, min = 0, max }: PageSliderType) => {
  const labelWithDashes = label.replace(/\s+/g, '-').toLowerCase();
  const [sliderValue, setSliderValue] = useState(min);
  const [inputValue, setInputValue] = useState(min);

  const onInputChange = (value: any) => {
    if (value) {
      // Update slider with new value only if it’s within the sliders domain
      if (value >= min && value <= max) {
        setSliderValue(value);
        setInputValue(value);
      }
    }
  };
  const onSliderChange = (value: any) => {
    if (value) {
      // Update slider with new value only if it’s within the sliders domain
      if (value >= min && value <= max) {
        setSliderValue(value);
        setInputValue(value);
      }
    }
  };
  return (
    <SliderWrapper>
      <div className="slider-div">
        <Label htmlFor={labelWithDashes + '-slider'}>{label}</Label>
        <Slider
          type="range"
          id={labelWithDashes + '-slider'}
          name={labelWithDashes + '-slider'}
          min={min}
          max={max}
          value={sliderValue}
          onChange={(e) => onInputChange(e.target.value)}
        />
      </div>
      <div className="number-div">
        <ThinInput
          className="number-input"
          id={labelWithDashes + '-input'}
          name={labelWithDashes + '-input'}
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
        />
        <span> /{max}</span>
      </div>
    </SliderWrapper>
  );
};

export { Slider, PageSlider };
