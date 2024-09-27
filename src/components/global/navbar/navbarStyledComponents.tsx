import styled, { keyframes } from "styled-components";
import { mdScreen, primaryColor, secondaryColor, tertiaryColor } from "../../../constants/styleConstants";

const afraidShake = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(1deg); }
  50% { transform: rotate(-1deg); }
  75% { transform: rotate(1deg); }
  100% { transform: rotate(-1deg); }
`;

const reallyAfraidShake = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(3deg); }
  50% { transform: rotate(-3deg); }
  75% { transform: rotate(3deg); }
  100% { transform: rotate(-3deg); }
`;

export const Nav = styled.nav`
  /* make it sticky on top */
  /* overflow: hidden; */
  position: sticky;
  top: 0;
  overflow: hidden;
  

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
    transition: all 0.2s ease-in-out;
    &:hover{
      transform: scale(1.06);
    }
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
    z-index: 9;
  }

  aside{
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    max-height: 100vh;
    width: 300px;
    max-width:60vw;
    background-color: white;
    padding: 0 0 0 1rem ;
    z-index: 10;
    color: ${primaryColor};
    font-size: 2.1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    overflow-y: auto;

    &>div:first-child{
      padding-right: .3em;
    }

    &::-webkit-scrollbar {
     display: none;
    }


    h1{
      margin-top: .5rem;
      margin-bottom: 1em;
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

    details.btn[open] summary{
      text-decoration: underline;
    }

    .btn{
      width: 100%;
      background: ${tertiaryColor};
      color: ${primaryColor};
      border-radius: .2rem;
      border: none;
      box-sizing: border-box;
      cursor: pointer;
      transition: all 0.1s ease-in-out;
      &:hover{
        transform: scale(1.05);
      }
      &.closeSession{
        background: ${primaryColor};
        color: ${secondaryColor};
        padding: .5rem;
      }
      summary{
        display: flex;
        justify-content: center;
        padding: .5rem;
        cursor: pointer;
        list-style: none;
        outline: none;
        font-size: .9rem;
        box-sizing: border-box;
        width: 100%;
        &:focus{
          outline: none;
        }
      }
      ul{
        display: flex;
        flex-direction: column;
        gap: .2rem;
        align-items: start;
        justify-content: start;
        padding: 0;
        list-style: none;
        li{
          padding: 0;
          padding: .2rem;
          text-align: center;
          font-size: .8rem;
          word-break: break-all;
          display: flex;
          gap: .2rem;
          i{
            font-size: .8rem;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            &:hover{
              transform: scale(1.2);
              color: #f00;
            }
          }
        }
      }
      .deleteAccountBtn{
        background: #f00;
        color: #fff;
        border: none;
        padding: .5rem;
        border-radius: .2rem;
        margin-left: clamp(.2em, 2vw, 1em);
        margin-bottom: clamp(.2em, 2vw, 1em);;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
        &:hover{
          transform: scale(1.05);
          animation: ${afraidShake} 0.2s infinite;
        }
        &.reallyShaking{
          border: 2px solid #8b0000;
          animation: ${reallyAfraidShake} 0.2s infinite;
        }
      
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
      margin-bottom: .3em;
    }
    .menu{
      width: 100%;
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: .05em;
      margin: .2em;
      a{
          border-radius: .4em;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          color: var(--primaryColor);
          text-decoration: none;
          transition: all 0.2s ease-in-out;
          background: var(--tertiaryColor);
          box-shadow:  .25em .25em .2em #808080,
                      -.25em -.25em .2em #ffffff;

        &:hover{
          transform: scale(1.1);
          box-shadow:  22px 22px 44px #808080,
                      -22px -22px 44px #ffffff;
        }

        &:active {
          transform: scale(1);
          box-shadow: 0.75em 0.75em 1.3em #808080,
                      -0.75em -0.75em 1.3em #ffffff;
        }
        
      }
      li{
        

        /* border: 1px solid ${primaryColor}; */
        border-radius: .2rem;
        text-align: center;
        padding: .2rem 0;

        transition: all 0.2s ease-in-out;

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