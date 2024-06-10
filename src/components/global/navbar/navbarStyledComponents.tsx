import styled from "styled-components";
import { mdScreen, primaryColor, secondaryColor, tertiaryColor } from "../../../constants/styleConstants";


export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${primaryColor};
  color: white;
  padding: 1rem;
  margin: 0;
  height: 40px;

  .logo{
    max-width: 200px;
    width: 60vw;
    filter: brightness(9999%);
  }

  .menu{
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    width: 40%;
    max-width: 300px;
    list-style: none;
    margin-right: auto;
    & li{
      padding: 0.5rem;
      & a{
        text-decoration: none;
        color: ${secondaryColor};
      }
      transition: all 0.2s ease-in-out;
      &:hover{
        transform: scale(1.2);
      }
    }
    @media screen and (max-width: ${mdScreen}px){ display: none; }
  }

  .icons{
    display: flex;
    @media screen and (max-width: ${mdScreen}px){ display: none; }
    justify-content: space-between;
    width: 10%;
    gap: .6rem;
    .ico{
      color: ${secondaryColor};
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover{
        transform: scale(1.2);
      }
    }
    img{
      border-radius: 50%;
      width: 30px;
      height: 30px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover{
        transform: scale(1.2);
      }
    }
  }

  .compactMenu{
    display: none;
    @media screen and (max-width: ${mdScreen}px){
      display: flex;
      justify-content: center;
      align-items: center;
      .fi-rr-menu-burger{
        font-size: 2rem;
        color: ${secondaryColor};
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        &:hover{
          transform: scale(1.2);
        }
      }
    }
  }

`;

export const Sidebar = styled.div`
  .background{
    opacity: 0.5;
    background: #000;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 1;
  }

  aside{
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    background-color: ${secondaryColor};
    padding: 0 1rem;
    z-index: 10;
    color: ${primaryColor};
    font-size: 2.1rem;
    display: flex;
    flex-direction: column;
    gap: 1em;
    h1{
      margin-top: .5rem;
    }
    .small{
      font-size: .7em;
      margin: .7rem 0;
    }
    .welcome{
      display: flex;
      align-items: center;
      justify-content: space-between;
      img{
        border-radius: 50%;
        width: 50px;
        height: 50px;
      
      }
      .name{
        font-size: 1.2rem;
        font-weight: bold;
      }
    }
    .btn{
      width: 100%;
      padding: .5rem;
      background: ${tertiaryColor};
      color: ${primaryColor};
      border: ${primaryColor} solid 1px;
      border-radius: .2rem;
      cursor: pointer;
      transition: all 0.1s ease-in-out;
      &:hover{
        transform: scale(1.05);
      }
      &.closeSession{
        background: ${primaryColor};
        color: ${secondaryColor};
      }
    }
  }

  .onCompactedOptions{
    display: none;
    @media screen and (max-width: ${mdScreen}px){
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      gap: .2em;
      padding: 1rem 0;
      .fi{
        font-size: 2rem;
        cursor: pointer;
        color: ${primaryColor};
        transition: all 0.2s ease-in-out;
        &:hover{
          transform: scale(1.2);
        }
      }
    }
    .menu{
      width: 100%;
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: .2rem;
      li{
        background: ${tertiaryColor};
        border: 1px solid ${primaryColor};
        border-radius: .2rem;
        text-align: center;
        padding: .2rem 0;
        a{
          color: ${primaryColor};
          text-decoration: none;
        }
        transition: all 0.2s ease-in-out;
        &:hover{
          transform: scale(1.1);
        }
      }
    }
    .divider{
      width: 100%;
      border: 4px solid ${primaryColor};
      border-radius: 9999px;
      margin: 1rem 0;
    }
  }
`;