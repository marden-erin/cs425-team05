import React from 'react';
import styled, { css } from 'styled-components';
import {
  H1,
  H2,
  P,
  PageWrapper,
  SubTitle,
} from '../components';
import { COLORS } from '../constants';
import Logo from '../imgs/logo.png';
import erinPic from '../imgs/erinPic.png';
import andreiPic from '../imgs/andreiPic.png';
import jodiPic from '../imgs/jodiPic.png';

const Box_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-top: 1900px;
  gap: 15px;
`;

const FlexBoxWrapper = styled.div`
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 100px;
  margin-right: 50px;
`;

const ProjectBox = styled.div`
  width: 999px;
  height: 850px;
  background-color: ${COLORS.PURPLE_LIGHT};
  border-radius: 22px;
  margin-top: 30px;
  margin: 5px;
  text-align: center;
`;

const Box = styled.div`
  width: 999px;
  height: 400px;
  background-color: ${COLORS.PURPLE_LIGHT};
  border-radius: 22px;
  margin-top: 30px;
  margin: 5px;
  text-align: center;
`;

const WordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  gap: 20px;
  margin-top: 25px;
`;

const PageTitle = styled(H1)`
  color: ${COLORS.WHITE};
  position: relative;
  text-align: center;
`;
const SmallHeading = styled(SubTitle)`
  font-size: 5rem;
`;

const BoxText = styled(P)`
  padding: 10px;
  color: ${COLORS.BLURPLE};
  text-align: center;
  font-size: 2rem;
`;

const ParagraphText = styled(P)`
  padding: 20px;
  color: ${COLORS.BLURPLE};
  text-align: left;
  font-size: 2rem;
`;

const AboutUs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-left: 20px;
  margin-top: -5px;
`;
const Img = styled.img`
  align-items: center;
  width: 290px;
  height: 325px;
  border-radius: 8px;
`;

function About() {
  return (
    <PageWrapper pageTitle="About">
      <FlexBoxWrapper>
        <Box_Wrapper>
          <WordContainer>
            <PageTitle>About Us</PageTitle>
          </WordContainer>
          <WordContainer>
            <SmallHeading>
              <br />
              Our Project
            </SmallHeading>
          </WordContainer>
          <ProjectBox>
            <h1>
              <br />
              <br /> <img src={Logo} alt="OuterWhorld" width="400" />
            </h1>
            <BoxText>
              <br /> Computer Science and Engineering - University of Nevada,
              Reno
            </BoxText>
            <BoxText>
              <br />
              Team 5: Erin E. Marden, Andrei N. Iorgulescu, Jodi A. Hieronymus
            </BoxText>
            <BoxText>
              <br />
              Instructed by David Feil-Seifer, Devrin Lee
            </BoxText>
            <BoxText>
              <br />
              Advised by Erin Keith
            </BoxText>
            <ParagraphText>
              <br />
              <br />
              OuterWhorld is going to be an interactive web-based application
              that will target readers of all levels, and will have a large
              focus on user accessibility and visual aesthetics. OuterWhorld
              will provide users with an interactive and enjoyable reading
              experience by providing features such as: being able to create
              custom reading goals, having a virtual pet snail accompany the
              user and motivate them throughout their reading, a book
              recommendation system, and the ability to store a collection of
              books in one place called a cluster. They will then have an option
              to share their clusters with friends. OuterWhorld’s theme will be
              a mixture of space and snails, which will provide the user with a
              fun, friendly, and visually appealing experience. OuterWhorld’s
              user interface will be built using Typescript and React. We will
              be creating styled components with custom CSS built from the
              ground up. Outerwhorld’s business logic will be built using
              Node/Express, and data will be stored in a database. OuterWhorld
              will use an existing API to retrieve book data which includes its
              title, author, page length, and reviews. Since the previous
              project, we have placed more focus and thought on OuterWhorld’s
              design, and have begun ironing out the high and low level design
              aspects of the application. We also have continued creating UI
              snapshots in addition to diagrams describing how OuterWhorld’s UI
              will interact with the backend to retrieve and display data for
              the user. Finally, we decided on a color scheme and theme for our
              UI that will be standardized throughout all of OuterWhorld’s
              components to maintain consistency and quality.
            </ParagraphText>
          </ProjectBox>
          <WordContainer>
            <SmallHeading>
              <br />
              Meet The Creators
            </SmallHeading>
          </WordContainer>

          <Box>
            {' '}
            <H2>
              <br /> Erin E. Marden
            </H2>
            <AboutUs>
              <Img src={erinPic} />
              <ParagraphText>
                Erin Marden is a senior undergraduate at UNR expecting to
                graduate in May 2023. She has prior experience in graphic
                design, which she hopes to use in this project by contributing
                to the design and implementation of the space/snail theme. She
                is excited to expand her knowledge and gain experience in the
                development processess from her involvement in OuterWhorld.
              </ParagraphText>
            </AboutUs>
          </Box>
          <Box>
            <H2>
              <br /> Andrei N. Iorgulescu
            </H2>
            <AboutUs>
              <Img src={andreiPic} />
              <ParagraphText>
                Andrei Iorgulescu is a senior undergraduate student at UNR
                expected to graduate in Spring of 2023. He has professional
                frontend experience and has interned at StartUpNV and Amazon. He
                is especially excited to focus on the backend development of
                OuterWhorld to expand his knowledge and experience in backend
                technologies.
              </ParagraphText>
            </AboutUs>
          </Box>
          <Box>
            <H2>
              <br /> Jodi A. Hieronymus
            </H2>
            <AboutUs>
              <Img src={jodiPic} />
              <ParagraphText>
                Jodi Hieronymus is a senior undergraduate student at UNR
                expected to graduate in Spring, 2023. She has prior experience
                in the visual arts, which she hopes to put to use in her career
                with user experience and accessibility. Jodi is currently an
                intern on the Core UI and Accessibility team at Figure and hopes
                to use her experience to fuel frontend development on
                OuterWhorld.
              </ParagraphText>
            </AboutUs>
          </Box>
        </Box_Wrapper>
      </FlexBoxWrapper>
    </PageWrapper>
  );
}

export default About;
