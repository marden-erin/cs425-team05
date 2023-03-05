//Erin TODO: Format and show all clusters made

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import ReactModal from 'react-modal';
import {
  COLORS,
  FONTS_MAIN,
  FONTS_SECONDARY,
  ScrollBarStyle,
  GRADIENTS,
} from '../constants';
import {
  PageWrapper,
  H1,
  Box,
  Box_Wrapper,
  Label,
  CloseButton,
  H2,
  P,
  ThickInput,
  SmallRoundedButton,
  LargeBookCard,
} from '../components';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { Book } from '../../../server/src/utils/Types';
import { useAuthUser } from 'react-auth-kit';
import { CreateGoalButton } from './../components/complex-components/Goals';

const FlexBoxWrapper = styled.div<{
  $isModalOpen: boolean;
  $isModalOpen2: boolean;
}>`
  height: 85vh;
  padding: 3vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 35px;

  ${(props) =>
    props.$isModalOpen &&
    css`
      pointer-events: none;
    `}

  ${(props) =>
    props.$isModalOpen2 &&
    css`
      pointer-events: none;
    `}
`;
const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const PageTitle = styled(H1)`
  color: ${COLORS.WHITE};
  justify-content: center;
  text-align: center;
`;
const ClusterBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.PURPLE_LIGHT};
`;

const ClusterName = styled.h2`
  ${FONTS_MAIN};
  font-weight: 600;
  font-size: 4rem;
  line-height: 2.5rem;
  text-align: center;
  color: ${COLORS.WHITE};
  text-align: left;
`;

const NameWrapper = styled.div`
  display: flex;
  border-radius: 5px;
  background: ${GRADIENTS.PURPLE};
  padding: 15px;
`;
const ScrollableDiv = styled.div`
  height: 27rem;
  width: 75rem;
  padding: 3rem;
  margin-top: 5px;
  background-color: ${COLORS.PURPLE_LIGHT};
  overflow-y: hidden;
  overflow-x: scroll;
  ${ScrollBarStyle}
`;

const ImgWrapper = styled.div`
  padding: 10px;
  margin-top: -20px;
  background-color: ${COLORS.WHITE};
  box-shadow: 0px 2px 2px 2px rgba(67, 35, 157, 0.3);
  border-radius: 5px;
  display: inline-flex;
  min-width: 100%;
  min-height: 100%;
  align-content: center;
  align-items: center;
  justify-content: center;
  gap: 25px;
  overflow-x: scroll;
`;
const Img = styled.div`
  width: 133.3px;
  height: 200px;
  background-color: ${COLORS.PURPLE_DARK};
  border: 1px solid ${COLORS.PURPLE_MID};
  max-width-inline: 100%;
  object-fit: scale-down;
`;
const Title = styled.h2`
  ${FONTS_SECONDARY};
  font-style: italic;
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2rem;
  color: ${COLORS.PURPLE_DARK};
  overflow: hidden;
  white-space: normal;
  width: 180px;
  text-align: center;
`;
const Options = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 80rem;
  margin-top: -40px;
  gap: 30px;
`;
const ModalContentWrapper = styled.div`
  display: flex;
  padding: 20px;
  gap: 4rem;
  align-items: center;
  justify-content: center;
`;
const ModalContentWrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  gap: 4rem;
  align-items: center;
  justify-content: center;
  background: ${COLORS.PURPLE_LIGHT};
`;

const RightModalContentWrapper = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h2 {
    text-align: center;
  }
`;
const InputWrapper = styled.div`
  background-color: ${COLORS.PURPLE_LIGHT};
  padding: 2rem 4rem 3rem;
  align-items: center;
`;

const VisibilityButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px;
  gap: 15px;
`;
const VisibilityWrapper = styled.div`
  display: flex;
  display: column;
  justify-content: center;
  margin-top: 30px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Input = styled.input`
  appearance: none;
  width: 14px;
  height: 14px;
  border: 2px solid ${COLORS.PURPLE_MID};
  border-radius: 50%;
  padding: 2px;
  background-clip: content-box;
  margin-bottom: -1px;
  cursor: pointer;

  :checked {
    background-color: ${COLORS.PURPLE_MID};
  }

  :hover {
    background-color: ${COLORS.PURPLE_MID};
  }
`;

const ImgButton = styled.button`
  background: ${COLORS.PURPLE_MID};
`;

const DeleteWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-left: -30px;
`;
const SmallBoxWords = styled.span`
  font-size: 1.6rem;
  font-weight: 200;
  color: ${COLORS.WHITE};
  text-align: center;
`;

function ViewClusters() {
  const auth = useAuthUser();
  const [cluster, setCluster] = useState([
    { cluster_id: ' ', clusterName: ' ', user_id: '', visibility: '' },
  ]);
  const [clusterBooks, setClusterBooks] = useState<any>([]);
  const [isModalOpen, toggleIsModalOpen] = useState(false);
  const [isModalOpen2, toggleIsModalOpen2] = useState(false);
  const [modalBooks, setModalBooks] = useState('');
  const [modalAuthors, setModalAuthors] = useState('');
  const [modalDes, setModalDes] = useState('');
  const [modalCover, setModalCover] = useState('');
  const [modalPage, setModalPage] = useState<number>(0);
  let [cardBooks, setCardBooks] = useState({} as Book);

  const [visibility, setVisibilty] = useState(false);
  const [newName, setNewName] = useState('');
  const [tempCluster, setTempCluster] = useState('');

  ReactModal.setAppElement('*');

  const username = auth()?.username;

  useEffect(() => {
    const loadData = async () => {
      console.log('IN');
      const clusterInfo = await OWServiceProvider.getAllClustersFromUser(
        username
      );
      setCluster(clusterInfo);
      const clusterArray: any[] = [];
      for (const temp of clusterInfo) {
        const info: Book = await OWServiceProvider.getClusterInformation(
          temp.clusterName,
          username
        );
        clusterArray.push({ clusterName: temp.clusterName, books: info });
        setClusterBooks([...clusterArray]);
      }
    };
    loadData();
  }, []);

  const deleteCluster = async (e: any) => {
    const temp = await OWServiceProvider.deleteCluster(e, username);
    return temp;
  };

  const handleUpdate = async (e: any) => {
    const update = await OWServiceProvider.updateClusterInformation(
      e,
      username,
      newName,
      visibility
    );
    console.log(update);
    const temp = { toggleIsModalOpen };
  };

  const handleDeleteBook = async (e: any) => {
    console.log('HERE');
    const deleteBook = await OWServiceProvider.deleteBookFromCluster(
      tempCluster,
      username,
      e
    );
    console.log(deleteBook);
  };
  const bookCard = (a: string, b: [], c: number, d: string, e: string) => {
    const bookTemp: Book = {
      title: a,
      authors: b,
      pageCount: c,
      description: d,
      cover: e,
    };
    setCardBooks(bookTemp);
  };
  let propsToGoalPage = {
    cover: modalCover,
    pageCount: modalPage,
    author: [modalAuthors],
    description: modalDes,
    title: modalBooks,
  };
  const temp2 = clusterBooks.map((item: any, index: any) => {
    return (
      <div key={index}>
        <Box_Wrapper>
          <ClusterBox>
            <NameWrapper>
              <ClusterName> {item.clusterName}</ClusterName>
            </NameWrapper>
            <Options>
              <SmallRoundedButton
                className="Delete Cluster"
                onClick={() => {
                  const confirmBox = window.confirm(
                    'Do you really want to delete cluster ' +
                      item.clusterName +
                      '?'
                  );
                  if (confirmBox === true) {
                    deleteCluster(item.clusterName);
                    window.location.reload();
                  }
                }}
              >
                <SmallBoxWords>Delete</SmallBoxWords>
              </SmallRoundedButton>

              <SmallRoundedButton
                onClick={() => {
                  setTempCluster(item.clusterName);
                  toggleIsModalOpen(true);
                }}
              >
                {' '}
                <SmallBoxWords>Edit</SmallBoxWords>
              </SmallRoundedButton>

              <ReactModal
                isOpen={isModalOpen}
                className="modal-body"
                overlayClassName="modal-overlay2"
              >
                <CloseButton handler={toggleIsModalOpen} />
                <ModalContentWrapper>
                  <RightModalContentWrapper>
                    <form
                      onSubmit={() => {
                        const confirmBox = window.confirm(
                          'Do you really want to update cluster ' +
                            tempCluster +
                            '?'
                        );
                        if (confirmBox === true) {
                          handleUpdate(tempCluster);
                          window.location.reload();
                        }
                      }}
                    >
                      <H2>Edit Cluster</H2>
                      <InputWrapper>
                        <FormWrapper>
                          <Label htmlFor="new-name">
                            New Name For Your Cluster:
                          </Label>
                          <ThickInput
                            name="cluster-name"
                            placeholder="New cluster name...."
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                          />
                        </FormWrapper>
                        <VisibilityWrapper>
                          <Label htmlFor="new-visibility">
                            New Cluster Visibility
                          </Label>
                        </VisibilityWrapper>
                        <VisibilityButtonWrapper>
                          <P>
                            <Input
                              type="radio"
                              value="true"
                              name="visibility"
                              onClick={() => setVisibilty(true)}
                            />
                            Public
                          </P>
                          <P>
                            <Input
                              type="radio"
                              value="false"
                              name="visibility"
                              onClick={() => setVisibilty(false)}
                            />
                            Private
                          </P>
                        </VisibilityButtonWrapper>
                        <FormWrapper>
                          <SmallRoundedButton
                            onSubmit={() => handleUpdate(item.clusterName)}
                          >
                            Submit
                          </SmallRoundedButton>
                        </FormWrapper>
                      </InputWrapper>
                    </form>
                  </RightModalContentWrapper>
                </ModalContentWrapper>
              </ReactModal>
            </Options>
            <ScrollableDiv>
              <ImgWrapper>
                {item.books.map((t: any, i: any) => {
                  return (
                    <div key={i}>
                      <ImgButton
                        onClick={() => {
                          setTempCluster(item.clusterName);
                          setModalBooks(t.title);
                          setModalAuthors(t.authors);
                          setModalDes(t.description);
                          setModalCover(t.cover);
                          setModalPage(t.pageCount);
                          bookCard(
                            t.title,
                            t.authors,
                            t.pageCount,
                            t.description,
                            t.cover
                          );
                          toggleIsModalOpen2(true);
                        }}
                      >
                        <Img>
                          <img
                            src={t.cover}
                            style={{ maxWidth: '100%' }}
                            alt={t.title + ' book cover'}
                          />
                        </Img>
                      </ImgButton>
                      <Title>{t.title}</Title>
                      <ReactModal
                        isOpen={isModalOpen2}
                        className="modal-body"
                        overlayClassName="modal-overlay2"
                      >
                        <CloseButton handler={toggleIsModalOpen2} />
                        <ModalContentWrapper2>
                          <LargeBookCard
                            bookTitle={modalBooks}
                            authorName={[modalAuthors]}
                            bookCover={
                              <img
                                src={modalCover}
                                style={{ maxWidth: '100%' }}
                                alt={modalBooks + ' cover'}
                              />
                            }
                            description={modalDes}
                            AddClusterFunction=""
                            CreateGoalFunction={
                              <CreateGoalButton
                                {...propsToGoalPage}
                              ></CreateGoalButton>
                            }
                            showButtons={true}
                            tempFunction={
                              <DeleteWrapper>
                                <SmallRoundedButton
                                  onClick={() => {
                                    const confirmBox = window.confirm(
                                      'Do you really want to delete ' +
                                        modalBooks +
                                        ' from this cluster?'
                                    );
                                    if (confirmBox === true) {
                                      console.log(cardBooks);
                                      handleDeleteBook(cardBooks);
                                      window.location.reload();
                                    }
                                  }}
                                >
                                  {'Delete Book From Cluster'}
                                </SmallRoundedButton>
                              </DeleteWrapper>
                            }
                          />
                        </ModalContentWrapper2>
                      </ReactModal>
                    </div>
                  );
                })}
              </ImgWrapper>{' '}
            </ScrollableDiv>
          </ClusterBox>
        </Box_Wrapper>
      </div>
    );
  });

  return (
    <div>
      <PageWrapper pageTitle="View Clusters">
        <FlexBoxWrapper $isModalOpen={isModalOpen} $isModalOpen2={isModalOpen2}>
          <HeadingWrapper>
            <PageTitle>View Your Clusters</PageTitle>

            <div>{temp2}</div>
          </HeadingWrapper>
        </FlexBoxWrapper>
      </PageWrapper>
    </div>
  );
}
export default ViewClusters;
