import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants';
import { H2, SmallHalfRoundedButton } from '../../simple-components';
import OWServiceProvider from '../../../OuterWhorldServiceProvider';
import { Book } from '../../../../../server/src/utils/Types';
import { render } from '@testing-library/react';
import {useAuthUser} from 'react-auth-kit'

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
  transition: background-color 0.75s ease-out;

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
const OutPut = styled(H2)`
  font-size: 1.5rem;
  font-weight: 100;
  color: ${COLORS.PURPLE_MID};
  margin-top: 8%;
`;

const OutputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3px;
  gap: 10px;
`;

export const ClusterDropDown = (props: any) => {
  const auth = useAuthUser();
  const [bookInfo, setBookInfo] = useState({} as Book);
  const { title, authors, description, pageCount, cover } = props.children;
  console.log(title);
  const [output, setOutput] = useState('');

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
  }, []);

  //set selected cluster when clicked then load and add book to chosen cluster
  let tempSelect: string;
  const loadAddBook = async (e: any) => {
    e.preventDefault();
    console.log('in loAD');
    console.log(selected);
    tempSelect = selected;
    console.log('TEMP SELECT ' + tempSelect);

    const data = await OWServiceProvider.getBookInfo(title);
    console.log('in data');
    setBookInfo(data[0]);
    console.log(data[0]);

    const addBook = async () => {
      const clusterInfo = await OWServiceProvider.addBookToCluster(
        tempSelect,
        username,
        data[0]
      );

      console.log(clusterInfo);
      setSelected('');
      setOutput(clusterInfo);
    };
    addBook();
  };

  const handleChange = (e: any) => {
    let newSelect = e.target.value;
    console.log('MADE IT INTO HERE');
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
                id="Add to Cluster"
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

        <OutPut>{output}</OutPut>
      </OutputWrapper>
    </Wrapper>
  );
};

export default ClusterDropDown;
