import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import { Tooltip, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEnvelope,
  // faShoppingCart,
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
    color: ${(props) => props.hovercolor || "#ffffff"};
  }
`;

const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate instead of useHistory
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Add a function to handle "Store" icon click
  const handleStoreIconClick = () => {
    navigate("/products"); // Use navigate to navigate to "/products"
  };

  const handleSearchIconClick = () => {
    navigate("/search");
  };


  const handleAccountIconClick = () => {
    navigate("/login");
  };
  return (
    <Wrapper>
      <IconWrapper>
        <Tooltip title="Menu">
          <HoverableIconButton
            color="inherit"
            hovercolor="#000000"
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
            <HoverableIconButton color="inherit" hovercolor="#ffb6c1">
              <FontAwesomeIcon icon={faHome} />
            </HoverableIconButton>
          </Tooltip>
        </IconWrapper>
        <IconWrapper>
          <Tooltip title="Contact">
            <HoverableIconButton color="inherit" hovercolor="#90ee90">
              <FontAwesomeIcon icon={faEnvelope} />
            </HoverableIconButton>
          </Tooltip>
        </IconWrapper>
        <IconWrapper>
          <Tooltip title="Store">
            {/* Add onClick event for the "Store" icon */}
            <HoverableIconButton
              color="inherit"
              hovercolor="#add8e6"
              onClick={handleStoreIconClick} // Add onClick event handler
            >
              <FontAwesomeIcon icon={faStore} />
            </HoverableIconButton>
          </Tooltip>
        </IconWrapper>
        <IconWrapper>
          <Tooltip title="Search">
            <HoverableIconButton color="inherit" hovercolor="#b38f00"
              onClick ={handleSearchIconClick }>
              <FontAwesomeIcon icon={faSearch} />
            </HoverableIconButton>
          </Tooltip>
        </IconWrapper>
        <IconWrapper>
          <Tooltip title="About Me">
            <HoverableIconButton color="inherit" hovercolor="#ffa07a" onClick ={handleAccountIconClick }>
              <FontAwesomeIcon icon={faUser} />
            </HoverableIconButton>
          </Tooltip>
        </IconWrapper>
        <IconWrapper>
          <Tooltip title="Cart">
            <HoverableIconButton color="inherit" hovercolor="#87cefa">
              <FontAwesomeIcon icon={faShoppingBag} />
            </HoverableIconButton>
          </Tooltip>
        </IconWrapper>
      </NavMenu>
    </Wrapper>
  );
};

export default Header;
