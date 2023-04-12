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
} from '../constants';
import {
  PageWrapper,
  H1,
  Box,
  Box_Wrapper,
  Label,
  H2,
  ThinInput,
  SmallHalfRoundedButton,
  SmallRoundedButton,
  LargeBookCard,
  BookSearchCard,
  LargeRoundedButton,
  SmallCloseButton,
} from '../components';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { Book } from '../../../server/src/utils/Types';
import { useAuthUser } from 'react-auth-kit';
import { CreateGoalButton } from './../components/complex-components/Goals';

const FlexBoxWrapper = styled.div<{
  $isModalOpen: boolean;
  $isModalOpen2: boolean;
  $isModalOpen3: boolean;
}>`
  margin-block-start: 2rem;
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
    ${(props) =>
    props.$isModalOpen3 &&
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
  width: 90rem;
`;

const ClusterName = styled.h2`
  ${FONTS_MAIN};
  font-weight: 600;
  font-size: 4rem;
  line-height: 2.5rem;
  text-align: center;
  color: ${COLORS.PURPLE_DARK};
  text-align: left;
`;

const NameWrapper = styled.div`
  display: flex;
  border-radius: 5px;
  padding: 10px 5px 15px 10px;
`;
const ScrollableDiv = styled.div`
  display: flex;
  height: 27rem;
  width: 75rem;
  padding: 3rem;
  margin-top: 5px;
  overflow-y: hidden;
  overflow-x: auto;
  ${ScrollBarStyle}
`;

const ImgWrapper = styled.div`
  padding: 10px;
  margin-top: -20px;
  background-color: ${COLORS.WHITE};
  box-shadow: 0px 2px 2px 2px rgba(67, 35, 157, 0.3);
  border-radius: 5px;
  display: inline-flex;
  min-height: 100%;
  align-content: center;
  align-items: center;
  justify-content: center;
  gap: 25px;
`;
const Img = styled.div`
  width: 133.3px;
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: center;
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
  margin-left: 75rem;
  margin-top: -50px;
  gap: 20px;
`;

const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 35px;
  align-items: center;
  justify-content: center;
  background: ${COLORS.PURPLE_LIGHT};
  border-radius: 15px;
`;

const ImgButton = styled.button`
  background: ${COLORS.PURPLE_MID};
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease-out;

  :hover {
    background-color: ${COLORS.PURPLE_DARK};
  }
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

const CreateButtonWrapper = styled.div`
  margin-left: 30%;
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 4rem;
`;
const InputBarWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 30px 30px;
`;

const CustomLabel = styled(Label)`
  font-size: 2.4rem;
  font-weight: bold;
  text-align: left;
  margin-right: 18rem;
  color: ${COLORS.PURPLE_DARK};
`;

const Modal3Title = styled(H2)`
  font-size: 3rem;
`;
const Modal3Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.PURPLE_XTRALIGHT};
  padding: 2rem 3rem;
  border-radius: 15px;
`;

function ViewClusters() {
  const auth = useAuthUser();
  const [cluster, setCluster] = useState([
    { cluster_id: ' ', clusterName: ' ', user_id: '', visibility: '' },
  ]);
  const [clusterBooks, setClusterBooks] = useState<any>([]);
  const [isModalOpen, toggleIsModalOpen] = useState(false);
  const [isModalOpen2, toggleIsModalOpen2] = useState(false);
  const [isModalOpen3, toggleIsModalOpen3] = useState(false);

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
    const temp = { toggleIsModalOpen };
  };

  const handleDeleteBook = async (e: any) => {
    const deleteBook = await OWServiceProvider.deleteBookFromCluster(
      tempCluster,
      username,
      e
    );
    console.log(deleteBook);
  };
  const HandleCreate = () => {
    const [input, setInput] = useState('');

    const loadData = async (e: any) => {
      e.preventDefault();
      const create = await OWServiceProvider.createCluster(
        input,
        username,
        visibility
      );
      toggleIsModalOpen3(false);
      setInput('');
      window.location.reload();
    };

    return (
      <div>
        {' '}
        <LargeRoundedButton
          id="create-cluster-button"
          onClick={() => toggleIsModalOpen3(true)}
        >
          {' '}
          + Create a Cluster
        </LargeRoundedButton>
        <ReactModal
          isOpen={isModalOpen3}
          className="modal-body"
          overlayClassName="modal-overlay"
        >
          <SmallCloseButton handler={toggleIsModalOpen3} />
          <ModalContentWrapper>
            <Modal3Title>Create a New Cluster</Modal3Title>
            <QuestionWrapper>
              <form onSubmit={loadData}>
                <Modal3Box>
                  <CustomLabel htmlFor="cluster-name">Name</CustomLabel>
                  <InputBarWrapper>
                    <ThinInput
                      name="cluster-name"
                      placeholder="Enter Cluster Name"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    ></ThinInput>
                    <SmallHalfRoundedButton
                      type="submit"
                      onSubmit={() => loadData}
                    >
                      Create
                    </SmallHalfRoundedButton>
                  </InputBarWrapper>
                </Modal3Box>
              </form>
            </QuestionWrapper>
          </ModalContentWrapper>
        </ReactModal>
      </div>
    );
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
  const Books = clusterBooks.map((item: any, index: any) => {
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
                <SmallCloseButton handler={toggleIsModalOpen} />
                <ModalContentWrapper>
                  <Modal3Title>Update Cluster Name</Modal3Title>
                  <QuestionWrapper>
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
                      <Modal3Box>
                        <CustomLabel htmlFor="cluster-name">Name</CustomLabel>
                        <InputBarWrapper>
                          <ThinInput
                            name="cluster-name"
                            placeholder="Enter New Cluster Name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                          ></ThinInput>
                          <SmallHalfRoundedButton
                            type="submit"
                            onSubmit={() => handleUpdate(item.clusterName)}
                          >
                            Update
                          </SmallHalfRoundedButton>
                        </InputBarWrapper>
                      </Modal3Box>
                    </form>{' '}
                  </QuestionWrapper>
                </ModalContentWrapper>
              </ReactModal>
            </Options>
            {item.books.length === 0 ? (
              <BookSearchCard
                cardKey={index}
                additionalText="You don't have any books in this cluster."
              />
            ) : (
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
                              style={{ maxWidth: '100%', height: '100%' }}
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
                          <SmallCloseButton handler={toggleIsModalOpen2} />
                          <ModalContentWrapper>
                            <LargeBookCard
                              bookTitle={modalBooks}
                              authorName={[modalAuthors]}
                              bookCover={
                                <img
                                  src={modalCover}
                                  style={{ maxWidth: '100%', height: '100%' }}
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
                          </ModalContentWrapper>
                        </ReactModal>
                      </div>
                    );
                  })}
                </ImgWrapper>{' '}
              </ScrollableDiv>
            )}
          </ClusterBox>
        </Box_Wrapper>
      </div>
    );
  });

  return (
    <div>
      <PageWrapper pageTitle="View Clusters">
        <FlexBoxWrapper
          $isModalOpen={isModalOpen}
          $isModalOpen2={isModalOpen2}
          $isModalOpen3={isModalOpen3}
        >
          <HeadingWrapper>
            <PageTitle>View Your Clusters</PageTitle>
            <CreateButtonWrapper> {HandleCreate()}</CreateButtonWrapper>
          </HeadingWrapper>
          <div>{Books}</div>
        </FlexBoxWrapper>
      </PageWrapper>
    </div>
  );
}
export default ViewClusters;
