import { UsSliderStyled } from "./usSliderStyledComponents";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';


export default function UsSlider() {
  // important 1/1 ratio images
  const imgs = [
    "https://res.cloudinary.com/db8fpml9m/image/upload/v1727465469/memorable_empaque_ibague_rsobci.png",
    "https://res.cloudinary.com/db8fpml9m/image/upload/v1727468677/usefullllll_slopv0.png",
    "https://res.cloudinary.com/db8fpml9m/image/upload/v1727466238/real_bottle_1_bewhse.png",
    "https://res.cloudinary.com/db8fpml9m/image/upload/v1727465469/memorable_empaque_nacional_doqya2.png",
    "https://instagram.feoh3-1.fna.fbcdn.net/v/t39.30808-6/455282374_908679254618755_85276274797711690_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4yMDQ4eDIwNDguc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.feoh3-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=wrh38w1NuyoQ7kNvgEeQpTt&_nc_gid=4bc495eefe7f4a71807d65a6a4fbe781&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzQzMzg2MzE3NjE0MTIzNzM1NQ%3D%3D.3-ccb7-5&oh=00_AYCxTI-LCaU20cKe6K7FmBWAOG_jhsDe2pi9QV4X2I7sUQ&oe=66FCC0A6&_nc_sid=22de04",
    "https://res.cloudinary.com/db8fpml9m/image/upload/v1727466619/artwork_3_qiql9v.png",
    "https://instagram.feoh3-1.fna.fbcdn.net/v/t39.30808-6/459135026_927492109404136_2826087741824689797_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi45NjB4OTYwLnNkci5mMzA4MDguZGVmYXVsdF9pbWFnZSJ9&_nc_ht=instagram.feoh3-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=w-D84FjVLv4Q7kNvgGc6nad&_nc_gid=15444728fdb946a695b63fb1164f15df&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzQ1NDA0NzE1MDU2MjIxMDI1NA%3D%3D.3-ccb7-5&oh=00_AYAp5o25AU3p5Hz68vDhzCkfISfnhRsud2m4ro5cvbqunQ&oe=66FCE269&_nc_sid=22de04",
    "https://res.cloudinary.com/db8fpml9m/image/upload/v1727467196/artwork_4_x4uozl.png",
    "https://instagram.feoh3-1.fna.fbcdn.net/v/t39.30808-6/452948819_896574695829211_4116692525076950068_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4yMDQ4eDIwNDguc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.feoh3-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=Dokpby80NbsQ7kNvgEMx2At&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzQyMDMzNDE3OTE1NTg4NTAyNA%3D%3D.3-ccb7-5&oh=00_AYDAw5vTNuu4vRcXySlXwtDSjyhMmjM_RbZmw6ZXYRhh0g&oe=66FCB912&_nc_sid=22de04",
  ];

  return(
    <UsSliderStyled>
      <Swiper 
        navigation={true}
        modules={[Navigation, Autoplay]}
        loop={true}
        className="imgContainer"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
      >
        {imgs.map((img, index) => (
          <SwiperSlide key={index}>
          <img className="img" src={img} alt={`wineImg${index + 1}`} />
          </SwiperSlide>  
        ))}
      </Swiper>
    </UsSliderStyled>
  )
};
