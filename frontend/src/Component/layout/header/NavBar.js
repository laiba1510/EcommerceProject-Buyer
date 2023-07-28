import React, { useState } from "react";
import { Tooltip, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEnvelope,
  faShoppingCart,
  faSearch,
  faUser,
  faBars,
  faStore,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  position: relative;
`;

const IconWrapper = styled.div`
  /* Styles for individual icon wrappers */
  margin-right: 10px;
`;

const NavMenu = styled.div`
position: absolute;
  top: ${(props) => (props.isOpen ? "0" : "-200px")};
  left: 50%;
  transform: translateX(-50%);
  background-color: transparent; /* Set background color to transparent */
  padding: 10px;
  display: flex;
  align-items: center;
  // box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: top 0.3s ease-in-out;
  z-index: 1;
  width: 50%;
  justify-content: center;
`;

const HoverableIconButton = styled(IconButton)`
  /* Styles for hover effect */
  &:hover {
    color: ${(props) => props.hoverColor || "#ffffff"};
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Wrapper>
      <IconWrapper>
        <Tooltip title="Menu">
          <HoverableIconButton
            color="inherit"
            hoverColor="#000000"
            active={isMenuOpen}
            onClick={handleMenuToggle}
          >
            <FontAwesomeIcon icon={faBars} />
          </HoverableIconButton>
        </Tooltip>
      </IconWrapper>
      {/* Other icons */}
      <NavMenu isOpen={isMenuOpen}>
        <IconWrapper>
          <Tooltip title="Home">
            <HoverableIconButton color="inherit" hoverColor="#ffb6c1">
              <FontAwesomeIcon icon={faHome} />
            </HoverableIconButton>
          </Tooltip>
        </IconWrapper>
        <IconWrapper>
          <Tooltip title="Contact">
            <HoverableIconButton color="inherit" hoverColor="#90ee90">
              <FontAwesomeIcon icon={faEnvelope} />
            </HoverableIconButton>
          </Tooltip>
        </IconWrapper>
        <IconWrapper>
          <Tooltip title="Store">
            <HoverableIconButton color="inherit" hoverColor="#add8e6">
              <FontAwesomeIcon icon={faStore} />
            </HoverableIconButton>
          </Tooltip>
        </IconWrapper>
        <IconWrapper>
          <Tooltip title="Search">
            <HoverableIconButton color="inherit" hoverColor="#b38f00">
              <FontAwesomeIcon icon={faSearch} />
            </HoverableIconButton>
          </Tooltip>
        </IconWrapper>
        <IconWrapper>
          <Tooltip title="About Me">
            <HoverableIconButton color="inherit" hoverColor="#ffa07a">
              <FontAwesomeIcon icon={faUser} />
            </HoverableIconButton>
          </Tooltip>
        </IconWrapper>
        <IconWrapper>
          <Tooltip title="Cart">
            <HoverableIconButton color="inherit" hoverColor="#87cefa">
              <FontAwesomeIcon icon={faShoppingBag} />
            </HoverableIconButton>
          </Tooltip>
        </IconWrapper>
      </NavMenu>
    </Wrapper>
  );
};

export default Header;
