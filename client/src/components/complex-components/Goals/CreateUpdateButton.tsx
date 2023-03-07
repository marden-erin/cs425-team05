import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SmallRoundedButton } from '../../simple-components';
import { useNavigate } from 'react-router-dom';

export const CreateUpdateButton = (props: any) => {
  const navigate = useNavigate();
  return (
    <SmallRoundedButton
      onClick={() => {
        navigate('/update-goal', {
          state: {
            cover: [props.cover],
            pageCount: [props.pageCount],
            title: [props.title],
            description: [props.description],
            author: [props.author],
            goalID: [props.goalID],
            deadline: [props.deadline],
            pagesRead: [props.pagesRead],
            goalNotes: [props.goalNotes],
          },
        });
      }}
    >
      Update Goal
    </SmallRoundedButton>
  );
};
