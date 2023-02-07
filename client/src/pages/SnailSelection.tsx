import React from 'react';
import styled, { css } from 'styled-components';
import { PageWrapper, SnailSelectCard } from '../components';

const FlexBoxWrapper = styled.div`
    height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Radio = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5rem;
`;

function SnailSelection() {
    return (
        <PageWrapper pageTitle="Select A Snail">
            <FlexBoxWrapper>
                <Radio>
                    <SnailSelectCard color='blue' name="snail-color"/>
                    <SnailSelectCard color='pink' name="snail-color"/>
                    <SnailSelectCard color='yellow' name="snail-color"/>
                </Radio>
            </FlexBoxWrapper>
        </PageWrapper>
    );
}

export default SnailSelection;