import React from 'react';

import { HalfSection } from './styled';

const AboutHalf = () => (
  <HalfSection type="about">
    <HalfSection.Title>About Me</HalfSection.Title>
    <HalfSection.Description>Full Stack Engineer</HalfSection.Description>
    <HalfSection.Paragraph>
      I'm Victor Evangelista, a Web Developer focused on MERN development. I make cool things with the latest technologies the ever fast changing web has to offer. I love to create smart and dynamic user interfaces, develop rich web experiences, and think creatively to solve design problems. Available for hire.
    </HalfSection.Paragraph>
  </HalfSection>
);

export default AboutHalf;