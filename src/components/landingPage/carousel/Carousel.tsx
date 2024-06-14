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
  const [imgRows, setimgRows] = useState<string[][]>([]);

  useEffect(() => {
    // get imgs from local storage
    // const imgs = localStorage.getItem("imgs");
    // if (imgs) {
    //   setimgRows(JSON.parse(imgs));
    //   return;
    // }

    fetch(API + "/imgs")
      .then(res => res.json())
      .then(data => {
        
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
        setimgRows(imgRowsCopy);
        // save imgs to local storage
        localStorage.setItem("imgs", JSON.stringify(imgRowsCopy));
        console.log(imgRowsCopy);
      })
      .catch(err => console.log(err + " carousel"));

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
            {row.map((imgUrl,i) =>(
              <img key={i}  src={imgUrl || "https://static.millesima.com/s3/attachements/editorial/h630px/how-many-ounces-in-a-glass-of-wine.jpg"}  alt="carousel-img"/>
            ))}
          </motion.div>
        ))}
      </div>
    </CarouselContainer>
  )
};
