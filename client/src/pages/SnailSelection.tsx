import React, {useState} from 'react';
import styled, { css } from 'styled-components';
import ReactModal from 'react-modal';
import { CloseButton, LargeRoundedButton, PageWrapper, SnailSelectCard } from '../components';
import { GetSnailImg } from '../utils';

const FlexBoxWrapper = styled.div<{$isModalOpen: boolean}>`
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10rem;

    ${(props) => props.$isModalOpen && css`pointer-events: none`}
`;

const Radio = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5rem;
`;

const ModalContentWrapper = styled.div`
    display: flex;
    gap: 4rem;
`;

/**
 * TODOS:
 * - Close modal on escape press
 * - Fix modal console error
 */
function SnailSelection() {
    const [isModalOpen, toggleIsModalOpen] = useState(false);
    const [snailColor, setSnailColor] = useState('blue');
    return (
        <PageWrapper pageTitle="Select A Snail" header="Select A Snail!">
            <FlexBoxWrapper $isModalOpen={isModalOpen}>
                <Radio>
                    <SnailSelectCard color='blue' name="snail-color" result={snailColor} changeResult={setSnailColor}/>
                    <SnailSelectCard color='pink' name="snail-color" result={snailColor} changeResult={setSnailColor}/>
                    <SnailSelectCard color='yellow' name="snail-color" result={snailColor} changeResult={setSnailColor}/>
                </Radio>
                <LargeRoundedButton onClick={() => {
                    toggleIsModalOpen(true)
                    }}>Continue</LargeRoundedButton>
                <ReactModal isOpen={isModalOpen} className='modal-body' overlayClassName='modal-overlay'>
                <CloseButton handler={toggleIsModalOpen}/>
                    <ModalContentWrapper>
                        <img src={GetSnailImg('pink')} width="275"/>
                        <h2>{snailColor}</h2>
                    </ModalContentWrapper>
                </ReactModal>
            </FlexBoxWrapper>
        </PageWrapper>
    );
}

export default SnailSelection;