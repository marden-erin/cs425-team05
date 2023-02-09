import React, {useState} from 'react';
import styled, { css } from 'styled-components';
import ReactModal from 'react-modal';
import { LargeRoundedButton, PageWrapper, SnailSelectCard } from '../components';

const FlexBoxWrapper = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10rem;
`;

const Radio = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5rem;
`;

function SnailSelection() {
    const [isModalOpen, toggleIsModalOpen] = useState(false);
    return (
        <PageWrapper pageTitle="Select A Snail" header="Select A Snail!">
            <FlexBoxWrapper>
                <Radio>
                    <SnailSelectCard color='blue' name="snail-color"/>
                    <SnailSelectCard color='pink' name="snail-color"/>
                    <SnailSelectCard color='yellow' name="snail-color"/>
                </Radio>
                <LargeRoundedButton onClick={() => {toggleIsModalOpen(true)}}>Continue</LargeRoundedButton>
                <ReactModal isOpen={isModalOpen} className='modal-body' overlayClassName='modal-overlay'>Testing</ReactModal>
            </FlexBoxWrapper>
        </PageWrapper>
    );
}

export default SnailSelection;