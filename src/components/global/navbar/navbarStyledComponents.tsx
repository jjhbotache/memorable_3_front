import styled from "styled-components";
import { mdScreen, primaryColor, secondaryColor, tertiaryColor } from "../../../constants/styleConstants";


export const Nav = styled.nav`
  /* make it sticky on top */
  /* overflow: hidden; */
  position: sticky;
  top: 0;
  

  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${primaryColor};
  color: white;
  padding: 1rem;
  margin: 0;
  height: 40px;
  z-index: 10;

  .logo{
    max-width: 200px;
    width: 60vw;
    filter: brightness(9999%);
    cursor: pointer;
    flex-basis: auto;
  }

  .menu{
    display: flex;
    justify-content: space-between;
    max-width: 400px;
    list-style: none;
    flex-basis: 100%;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: 4vw;
    padding-top: .8em;

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
    gap: .6rem;
    flex-basis: 100%;
    max-width: 100px;
    .ico,a{
      display: grid;
      place-items: center;
      text-decoration: none;
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
  
  z-index: 9999;
  .background{
    opacity: 0.5;
    background: #000;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 3;
  }

  aside{
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    max-height: 100vh;
    width: 300px;
    max-width:60vw;
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
    .ico,a{
      text-decoration: none;
    }
    .menu{
      width: 100%;
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: .2rem;
      margin: .2em;
      a{
          color: ${primaryColor};
          text-decoration: none;
        }
      li{
        background: ${tertiaryColor};
        border: 1px solid ${primaryColor};
        border-radius: .2rem;
        text-align: center;
        padding: .2rem 0;
        
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