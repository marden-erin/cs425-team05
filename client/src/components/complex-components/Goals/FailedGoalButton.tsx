import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SmallRoundedButton } from '../../simple-components';
import { useNavigate } from 'react-router-dom';
import OWServiceProvider from '../../../OuterWhorldServiceProvider';
import { useAuthUser } from 'react-auth-kit';


export const FailedGoalButton = (props: any) => {
  const navigate = useNavigate();
  const auth = useAuthUser();
  const username = auth()?.username;
 
  const loadData = async () => {
    const deleteGoal = await OWServiceProvider.deleteGoal(props.goal_id);
    const temp = await OWServiceProvider.getSnailInfo(username)
    let health = temp.health-1;
    let fail = temp.goals_failed+1;
    const updateHealth = await OWServiceProvider.updateSnailInfo(username, temp.name, temp.color, health,  temp.goals_completed, fail,temp.accessories, temp.is_active);
  };
  return (
    <SmallRoundedButton
      onClick={() => {
        loadData();
        navigate('/create-goal', {
          state: {
            cover: [props.cover],
            pageCount: [props.pageCount],
            title: [props.title],
            description: [props.description],
            author: [props.author],
          },
        });
      }}
    >
      Update Goal
    </SmallRoundedButton>
  );
};
