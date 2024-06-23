import styled from 'styled-components';
import { primaryColor, secondaryColor } from '../../constants/styleConstants';
import { useEffect, useState } from 'react';
import { fetchSpecificExtrainfo } from '../../helpers/provider';

export default function Footer () {
  const [facebookId, setFacebookId] = useState<string | undefined>();
  const [instagramPageName, setInstagramPageName] = useState<string | undefined>();

  useEffect(() => {
    Promise.all([
      fetchSpecificExtrainfo("facebook_id"),
      fetchSpecificExtrainfo("instagram_name")
    ])
      .then(([facebookLink, instagramLink]) => {
        setFacebookId(facebookLink.value);
        setInstagramPageName(instagramLink.value);
        
      })
      .catch((error) => {
        console.error("Error fetching extra info:", error);
      });

  }
  , []);

  return (
    <StyledFooter>
      <div className="content">
        {facebookId && (
          <div className="social-links">
            <a href={
              `https://www.facebook.com/profile.php?id=${facebookId}`} target="_blank" rel="noopener noreferrer">
              <i className="fi fi-brands-facebook"></i>
              Facebook
            </a>
          </div>
        )}
        {instagramPageName && (
          <div className="social-links">
            <a href={`https://www.instagram.com/${instagramPageName}`} target="_blank" rel="noopener noreferrer">
              <i className="fi fi-brands-instagram"></i>
              Instagram
            </a>
          </div>
        )}
        <div className="rights-reserved">© 2023 Memorable. Todos los derechos reservados.</div>
      </div>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  background-color: ${primaryColor};
  color: ${secondaryColor};
  padding: 20px 0;
  text-align: center;

  .content {
    display: flex;
    flex-direction: column;
    gap: .6em;
    justify-content: space-between;
    align-items: start;
    padding-left: 1em;
    
  }

  .social-links {
    a {
      display: flex;
      gap: 5px;
      color: #fff;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .rights-reserved {
    font-size: 0.8rem;
    margin-top: 10px; /* Add margin for spacing */
  }
`;
