import { useState } from "react";
import { CarouselContainer } from "./carouselStyledComponents";
import { motion } from "framer-motion";
import getRandomNum from "../../../helpers/getRandomNum";

const imgStartXTranslate = -200;
const rowTranslation = -266;
const rows = 5;
const imgsPerRow = 4;
const timesToRepeatImgsPerRow = 4;
const animationDuration = 40;

interface CarouselProps {
 preloadedImgs?: string[];   
}
export default function Carousel({preloadedImgs: imgs}:CarouselProps) {
  const imgRows = imgs 
  ?generateImageRows(imgs)
  :Array.from({ length: rows }, () => Array(imgsPerRow * timesToRepeatImgsPerRow).fill("https://static.millesima.com/s3/attachements/editorial/h630px/how-many-ounces-in-a-glass-of-wine.jpg"));

  function generateImageRows(data: any) {
    const imgRowsCopy: string[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: string[] = [];
      for (let j = 0; j < imgsPerRow; j++) {
        let randomIndex = getRandomNum(0, data.length - 1);
        row.push(data[randomIndex]);
      }
      for (let j = 0; j < timesToRepeatImgsPerRow; j++) {
        row.push(...row);
      }
      imgRowsCopy.push(row);
    }
    return imgRowsCopy;
  }

  

  
  return(
    <CarouselContainer>
      {imgRows ? 
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
            {row.map((imgUrl,i) =>(
              <img key={i}  src={imgUrl || "https://static.millesima.com/s3/attachements/editorial/h630px/how-many-ounces-in-a-glass-of-wine.jpg"}  alt="carousel-img"/>
            ))}
          </motion.div>
        ))}
      </div>
      :
      <h1>Cargando...</h1>}
      
    </CarouselContainer>
  )

  
};
