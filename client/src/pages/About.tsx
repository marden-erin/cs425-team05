import React from 'react';
import styled, { css } from 'styled-components';
import { H1, H2, P, PageWrapper, SubTitle } from '../components';
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
  gap: 15px;
`;

const FlexBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 100px;
  margin-right: 50px;
`;

const ProjectBox = styled.div`
  width: 999px;
  height: 500px;
  background-color: ${COLORS.PURPLE_LIGHT};
  border-radius: 22px;
  margin-top: 30px;
  margin: 10px;
  padding: 45px;
  text-align: center;
`;

const Box = styled.div`
  width: 999px;
  height: 400px;
  background-color: ${COLORS.PURPLE_LIGHT};
  border-radius: 22px;
  margin-top: 30px;
  margin: 10px;
  padding: 15px;
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
  margin: 10px;
  color: ${COLORS.PURPLE_MID};
  text-align: center;
  font-size: 2rem;
`;

const ParagraphText = styled(P)`
  padding: 20px;
  margin: 10px;
  color: ${COLORS.PURPLE_MID};
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
  padding: 15px;
  border-radius: 30px;
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
              <img src={Logo} alt="OuterWhorld" width="400" />
            </h1>
            <BoxText>
              Computer Science and Engineering - University of Nevada, Reno
            </BoxText>
            <BoxText>
              Team 5: Erin E. Marden, Andrei N. Iorgulescu, Jodi A. Hieronymus
            </BoxText>
            <BoxText>Instructed by David Feil-Seifer, Devrin Lee</BoxText>
            <BoxText>Advised by Erin Keith</BoxText>
            <ParagraphText>
              OuterWhorld is a web-based book tracking application that allows
              users to find books and set reading goals based on books from a
              database. Our project is worthwhile because it provides
              entertainment to users and encourages users to experience the
              benefits of reading. In the OuterWhorld prototype, a user can
              create clusters. Additionally, they can search for books using our
              API and add the books to their cluster. OuterWhorld gets the user
              excited for reading by greeting them with a colorful, fun UI that
              is easy to navigate.
            </ParagraphText>
          </ProjectBox>
          <WordContainer>
            <SmallHeading>
              <br />
              Meet The Brainy-ators
            </SmallHeading>
          </WordContainer>

          <Box>
            {' '}
            <H2>Erin E. Marden</H2>
            <AboutUs>
              <Img src={erinPic} alt="Photo of Erin" />
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
            <H2>Andrei N. Iorgulescu</H2>
            <AboutUs>
              <Img src={andreiPic} alt="Photo of Andrei" />
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
            <H2>Jodi A. Hieronymus</H2>
            <AboutUs>
              <Img src={jodiPic} alt="Photo of Jodi and Oster the bird" />
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
