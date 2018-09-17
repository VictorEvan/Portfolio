import styled from 'styled-components';

const HalfSection = styled.section`
  ${({ type }) => {
    if (type === 'about') return `
      background-color: #ecf0f1;
      color: black;`
    else if (type === 'form') return `
      background-color: rgba(28, 29, 37, .985);
      color: white;`
  }}

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10%;
`;

HalfSection.Title = styled.h2`
  padding-top: .50rem;
  font-weight: bold;
  font-size: 1.79rem;
`;

HalfSection.Description = styled.h3`
  padding-top: .50rem;
  font-weight: 300;
  font-size: 1.32rem;
`;

HalfSection.Paragraph = styled.p`
  padding: 1rem 0;
  font-size: 1rem;
`;

export { HalfSection };