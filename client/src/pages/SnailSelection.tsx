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

function getRadioResult() {
    var radioElement = [...document.getElementsByName('snail-color-radio')];
      
    for(let i = 0; i < radioElement.length; i++) {
        if(radioElement[i].checked){
            console.log(radioElement[i].value);
        }
    }
}

/**
 * TODOS:
 * - Close modal on escape press
 * - Check for choice before opening modal
 */
function SnailSelection() {
    const [isModalOpen, toggleIsModalOpen] = useState(false);
    const [snailColor, setSnailColor] = useState('none');
    return (
        <PageWrapper pageTitle="Select A Snail" header="Select A Snail!">
            <FlexBoxWrapper $isModalOpen={isModalOpen}>
                <Radio>
                    <SnailSelectCard color='blue' name="snail-color"/>
                    <SnailSelectCard color='pink' name="snail-color"/>
                    <SnailSelectCard color='yellow' name="snail-color"/>
                </Radio>
                <LargeRoundedButton onClick={() => {
                    console.log('Snail color:');
                    toggleIsModalOpen(true)
                    }}>Continue</LargeRoundedButton>
                <ReactModal isOpen={isModalOpen} className='modal-body' overlayClassName='modal-overlay'>
                <CloseButton handler={toggleIsModalOpen}/>
                    <ModalContentWrapper>
                        <img src={GetSnailImg('pink')} width="275"/>
                    </ModalContentWrapper>
                </ReactModal>
            </FlexBoxWrapper>
        </PageWrapper>
    );
}

export default SnailSelection;