import { useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';

import {
  SmallRoundedButton,
  VisuallyHiddenSpan,
} from '../../simple-components';

// onClick referenced from here: https://stackoverflow.com/questions/74067196/how-play-pause-all-animation-css-with-components-react-js
const AnimationPauseButton = ({}) => {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <SmallRoundedButton
      onClick={() => {
        setIsPaused(!isPaused);
        const animations = Array.from(
          document.querySelectorAll(
            '.animated'
          ) as unknown as HTMLCollectionOf<HTMLElement>
        );
        animations.forEach((animation) => {
          const running = animation.style.animationPlayState || 'running';
          animation.style.animationPlayState =
            running === 'running' ? 'paused' : 'running';
        });
      }}
    >
      {isPaused ? <FaPause /> : <FaPlay />}
      <VisuallyHiddenSpan>
        {isPaused ? 'Play Animations' : 'Pause Animations'}
      </VisuallyHiddenSpan>
    </SmallRoundedButton>
  );
};

export { AnimationPauseButton };
