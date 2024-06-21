import { UsSliderStyled } from "./usSliderStyledComponents";
import wineImg2 from "../../../assets/imgs/snapshot-wine-glass.jpg";
import wineImg3 from "../../../assets/imgs/side-view-woman-hand-pouring-red-wine-into-glass-different-kinds-cheese-olive-walnut-grape-white-surface-black-background.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import orderRandomizer from "../../../helpers/orderRandomizer";


export default function UsSlider() {
  const imgs = [
    wineImg2,
    wineImg3,
    "https://img.freepik.com/free-photo/vertical-shot-person-holding-glass-wine-vineyard-sunlight_181624-31406.jpg?t=st=1718920018~exp=1718923618~hmac=486e60ac416bc3add78cd5066650b246a86cd918dee3022a9a6f06acf20e4645&w=360",
    "https://img.freepik.com/free-photo/glass-wine-with-stunning-view-vineyard-sunset_23-2151514993.jpg?t=st=1718921054~exp=1718924654~hmac=26621eeb215667c8e3049701f432646a24ed4e3a78aa6b3b2bcd18d42556ca16&w=740",
    "https://img.freepik.com/free-photo/glass-red-wine-bar-counter_107420-65844.jpg?t=st=1718921114~exp=1718924714~hmac=bfa4c84ccbc44a6856978c5580a88e3c51f08f894fcc9d4035bda7003c32ae36&w=360",
    "https://img.freepik.com/free-photo/couple-hands-cheering-red-wine-glasses-dinner_140725-633.jpg?t=st=1718921278~exp=1718924878~hmac=bf2ccef3b2db32a56cb32c7f13671c7d9fbe881216343b648f7ced7bac400d8d&w=360",
    "https://img.freepik.com/free-photo/delicious-wine_144627-20742.jpg?t=st=1718921675~exp=1718925275~hmac=d56c84dbb36d9621bb63d2bec7c01dd8dabd9bbb391754f99f2226e69881d113&w=360",
    "https://img.freepik.com/free-photo/set-red-wine-glasses-with-shadow_23-2148261712.jpg?t=st=1718921719~exp=1718925319~hmac=e21874fe8f16c167642d5bd2e3bc117f3a8beac4bd35f8afd0bf955e7b5af1cc&w=360",
    "https://img.freepik.com/free-photo/red-wine-is-being-poured-glass-with-long-stem-dark_140725-593.jpg?t=st=1718921746~exp=1718925346~hmac=e9f0bea72b6d895f6be1b29ae715c156c02f2c22ae6de01b22a826371b925e5f&w=360"
  ];

  return(
    <UsSliderStyled>
      <Swiper 
        navigation={true}
        modules={[Navigation, Autoplay]}
        loop={true}
        className="imgContainer"
        autoplay={{
          delay: 2000,
          disableOnInteraction: false
        }}
      >
        {orderRandomizer(imgs).map((img, index) => (
          <SwiperSlide key={index}>
          <img className="img" src={img} alt={`wineImg${index + 1}`} />
          </SwiperSlide>  
        ))}
      </Swiper>
    </UsSliderStyled>
  )
};
