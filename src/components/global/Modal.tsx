// src/components/global/Modal.tsx
import { useState } from 'react';
import styled from 'styled-components';
import { primaryColor, secondaryColor, tertiaryColor } from '../../constants/styleConstants';
import { toast } from 'react-toastify';



interface ModalProps {
  onResolve: (data: string) => void;
  msg: string;
  title: string;
}

export default function PromptElement({ onResolve,msg,title }: ModalProps) {
  const [inputValue, setInputValue] = useState<string>('');



  return <ModalContainer>
        <div className="modalContent">
          <h3>{title}</h3>
          <p>{msg}</p>
          <input
            type="text"
            className='input'
            placeholder={title}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.trim())}
          />
          <button className="btn cancel" onClick={()=>onResolve("CANCELADO")}>
            Cancelar
          </button>
          <button className="btn" onClick={
            ()=>{
              if(inputValue.trim() === ''){
                toast.error('Debe ingresar un valor');
                return;
              }
              onResolve(inputValue);
          }}>
            Confirmar
          </button>
        </div>
      </ModalContainer>
}


const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: auto;

  background-color: ${tertiaryColor}	;
  padding: 1em;
  border-radius: 1em;
  z-index: 9999;
  color: ${primaryColor};
  display: grid;
  place-items: center;

  .modalContent{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
    max-width: 300px;
    background: ${secondaryColor};
    padding: 1em;
    border-radius: 1em;

    .input{
      padding: 0.5em;
      border-radius: 0.5em;
      border: 1px solid ${primaryColor};
      width: 100%;
      max-width: 200px;

    }
    .btn{
      padding: 0.5em 1em;
      border-radius: 0.5em;
      border: 1px solid ${primaryColor};
      background: ${primaryColor};
      color: ${tertiaryColor};
      cursor: pointer;
      transition: 0.3s;
      &:hover{
        background: ${tertiaryColor};
        color: ${primaryColor};
      }
    }
    .cancel{
      background: ${secondaryColor};
      color: ${primaryColor};
      &:hover{
        background: ${primaryColor};
        color: ${tertiaryColor};
      }
    }
  }
`;