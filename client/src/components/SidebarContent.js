import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavLinkContainer = styled.li`
  ${({ sublink }) => sublink && 'margin-left: 5px' }
  height: auto;
  min-height: 50px;
  width: 100%;
  justify-content: space-between;
`;

class SideNavLinkContainer extends Component {
  state = {
    sublinksOpen: false
  };

  openSubLink = (open) => this.setState(({ sublinksOpen: prev }) => ({sublinksOpen: !prev }));

  render() {
    const { label, to, sublinks, closeSidebar } = this.props;
    const { sublinksOpen } = this.state;
    return (
      <NavLinkContainer>
        <NavLink closeSidebar={closeSidebar} to={to}>
          {label}
        </NavLink>
        {sublinks && <button onClick={this.openSubLink}>Toggle</button>}
        {sublinksOpen && 
          <ul>
            {sublinks.map(({ label, to }) => (
              <SideNavLinkContainer
                key={label}
                label={label}
                to={to}
              />
            ))}
          </ul>
        }
      </NavLinkContainer>
    );
  }
}

SideNavLinkContainer.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  sublinks: PropTypes.array,
  closeSidebar: PropTypes.func.isRequired
};

const SideNav = styled.nav`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

SideNav.Header = styled.div`
  height: 150px;
  background: #5271ff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

SideNav.ListContainer = styled.ul`
  height: 100%;
`;

const SidebarContent = ({ links, closeSidebar }) => (
  <SideNav>
    <SideNav.Header>Menu</SideNav.Header>
    <SideNav.ListContainer>
      {links.map(({ label, to, sublinks }) => (
        <SideNavLinkContainer
          key={label}
          label={label}
          to={to}
          sublinks={sublinks}
          closeSidebar={closeSidebar}
        />
      ))}
    </SideNav.ListContainer>
  </SideNav>
);

SidebarContent.defaultProps = {
  links: [
    {
      label: 'home',
      to: '/'
    },
    {
      label: 'projects',
      to: '/projects',
      sublinks: [
        {
          label: 'front end projects',
          to: '/projects?tag=front-end'
        },
        {
          label: 'back end projects',
          to: '/projects?tag=back-end'
        }
      ]
    },
    {
      label: 'contact',
      to: '/contact'
    }
  ]
};

SidebarContent.propTypes = {
  links: PropTypes.array.isRequired,
  closeSidebar: PropTypes.func.isRequired
};

export default SidebarContent;