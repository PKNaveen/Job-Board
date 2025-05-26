import MainNavbar from "@/components/ui/MainNavbar";

import {Container} from "@/components/ui/Container";
import {Hero, HeroSubtitle, HeroTitle} from "@/components/ui/Hero";



export default function Home() {
  return (
      <>
          <MainNavbar/>
          {/*Check overflow status in layout*/}
          <Container>

          <Hero>
              <HeroTitle>
                  Your Job Hunt,
                  <br/> Streamlined
              </HeroTitle>
              <HeroSubtitle>All Your Applications in One Powerful Dashboard</HeroSubtitle>
          </Hero>
          </Container>
          {/*    https://www.youtube.com/watch?v=ls_b-1a0ZUc  -- check this for animations*/}
      </>
  );
}
