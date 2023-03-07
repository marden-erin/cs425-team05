import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../../../constants';
import { SmallHalfRoundedButton } from '../../simple-components';
import OWServiceProvider from '../../../OuterWhorldServiceProvider';
import { render } from '@testing-library/react';
import { useAuthUser } from 'react-auth-kit';

const Wrapper = styled.div`
  width: 18rem;
  padding: 3px;
`;

const DropdownWrapper = styled.div`
  width: 13rem;
  height: 3rem;
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: center;
`;

const Select = styled.select`
font-size: 1.6rem;
  color: ${COLORS.PURPLE_MID};
 border: 2px solid ${COLORS.PURPLE_MID};
  
  border-radius: 5px;
  margin:-4px;
  padding: 2px 5px;
  background-color: transparent;
  width: 140px;
height: 10px
  transition: background-color 0.3s ease-out;

  :hover {
    background-color: ${COLORS.PURPLE_LIGHT};
  }

  option {
    font-size: 1.6rem;
  }
`;
const SubmitButton = styled(SmallHalfRoundedButton)`
  height: 38px;
`;
const SubmitWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100px;
  height: 20px;
  justify-content: center;
  align-items: baseline;
  margin-left: 13%;
  gap: 15px;
`;

const OutputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3px;
  gap: 10px;
`;

export const ClusterDropDown = (props: any) => {
  const navigate = useNavigate();
  const auth = useAuthUser();

  const { title } = props.children;
  console.log(title);

  const [cluster, setCluster] = useState([
    { cluster_id: ' ', clusterName: ' ', user_id: '', visibility: '' },
  ]);
  const [selected, setSelected] = useState<any>();

  const username = auth()?.username;

  useEffect(() => {
    const loadData = async () => {
      const clusterInfo = await OWServiceProvider.getAllClustersFromUser(
        username
      );
      setCluster(clusterInfo);
    };
    loadData();
  });

  //set selected cluster when clicked then load and add book to chosen cluster
  let tempSelect: string;
  const loadAddBook = async (e: any) => {
    e.preventDefault();
    tempSelect = selected;

    const data = await OWServiceProvider.getBookInfo(title);

    const addBook = async () => {
      await OWServiceProvider.addBookToCluster(tempSelect, username, data[0]);

      setSelected('');
      navigate('/view-clusters');
    };
    addBook();
  };

  const handleChange = (e: any) => {
    let newSelect = e.target.value;
    setSelected(newSelect);
    console.log(selected);
    render(<>{selected}</>);
  };

  return (
    <Wrapper>
      <OutputWrapper>
        <form onSubmit={loadAddBook}>
          <SubmitWrapper>
            <DropdownWrapper>
              <Select
                onChange={handleChange}
                name="Add to Cluster"
                id="Add-to-Cluster"
              >
                <option value={''}>Add to Cluster</option>
                {cluster.map((item) => (
                  <option value={item.clusterName}>{item.clusterName}</option>
                ))}
              </Select>
            </DropdownWrapper>
            <SubmitButton type="submit"> Submit</SubmitButton>
          </SubmitWrapper>
        </form>
      </OutputWrapper>
    </Wrapper>
  );
};

export default ClusterDropDown;
