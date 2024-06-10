import { useEffect, useState } from "react";
import { CarouselContainer } from "./carouselStyledComponents";
import { API } from "../../../constants/appConstants";
import { imgResponse } from "../../../interfaces/imgResponse";
import { motion } from "framer-motion";
import getRandomNum from "../../../helpers/getRandomNum";

const imgStartXTranslate = -200;
const rowTranslation = -266;
const rows = 5;
const imgsPerRow = 4;
const timesToRepeatImgsPerRow = 4;
const animationDuration = 40;
export default function Carousel() {
  const [imgRows, setimgRows] = useState<imgResponse[][]>([]);

  useEffect(() => {
    fetch(API + "/imgs")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        
        const imgRowsCopy = []
        for (let i = 0; i < rows; i++) {
          const row = [];
          for (let j = 0; j < imgsPerRow; j++) {
            let randomIndex = getRandomNum(0, data.length - 1);
            row.push(data[randomIndex]);
          }
          for (let j = 0; j < timesToRepeatImgsPerRow; j++) {
            row.push(...row);
          }
          
          imgRowsCopy.push(row);
        }
        setimgRows(imgRowsCopy);
        console.log(imgRowsCopy);
        
      });
  }, []);

  

  
  return(
    <CarouselContainer>
      <div className="rowsContainer">
        {imgRows && imgRows.map( (row,i) => (
          <motion.div key={i} className="row" 
          animate={{
            transform: [
              `translateX(${imgStartXTranslate}%)`,
              `translateX(${imgStartXTranslate+rowTranslation}%)`,
            ],
          }}
          transition={{duration: animationDuration,repeat: Infinity,ease: "linear"}}
          >
            {row.map((imgObj,i) => <img key={i} src={API+"/image/"+imgObj.image_url} alt="carousel-img"/>)}
          </motion.div>
        ))}
      </div>
    </CarouselContainer>
  )
};
