import styled, { css } from 'styled-components';

import { COLORS} from '../../constants';

// NOTE: ThinInputs stretch to fill width of container.

const InputCss = css`
    width: auto;
    flex-grow: 1;

    font-size: 1.6rem;
    
    border: 1px solid ${COLORS.PURPLE_DARK};

    :focus {
        outline-style: 2px solid ${COLORS.WHITE};
        border: 4px solid ${COLORS.PURPLE_MID};
    }
`;

// TODO: Thick Inputs will have padding
const ThinInput = styled.input`
    ${InputCss}
`;

export { ThinInput };