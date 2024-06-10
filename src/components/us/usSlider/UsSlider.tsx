import { UsSliderStyled } from "./usSliderStyledComponents";
import wineImg1 from "../../../assets/imgs/beautiful-thanksgiving-meal-concept.jpg";
import wineImg2 from "../../../assets/imgs/snapshot-wine-glass.jpg";
import wineImg3 from "../../../assets/imgs/side-view-woman-hand-pouring-red-wine-into-glass-different-kinds-cheese-olive-walnut-grape-white-surface-black-background.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';


export default function UsSlider() {
  const imgs = [wineImg1, wineImg2, wineImg3];
  return(
    <UsSliderStyled>
      <Swiper navigation={true} modules={[Navigation]} loop={true} className="imgContainer">
        {imgs.map((img, index) => (
          <SwiperSlide key={index}>
          <img className="img" src={img} alt={`wineImg${index + 1}`} />
          </SwiperSlide>  
        ))}
      </Swiper>
    </UsSliderStyled>
  )
};
