import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SmallRoundedButton } from '../../simple-components';
import { useNavigate } from 'react-router-dom';
import { title } from 'process';



export const CreateGoalButton = (props:any)=> {
    const navigate = useNavigate();
return(

    <SmallRoundedButton
    onClick={() => {
      navigate('/create-goal', {state: {cover:[props.cover], pageCount:[props.pageCount], title:[props.title], description:[props.description], author:[props.author]}});
    }}
  >
    Set Goal
  </SmallRoundedButton>
)

}