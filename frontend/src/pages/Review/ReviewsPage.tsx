import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import FooterComponent from "../../components/footer/FooterComponent";
import { CommonContext } from "../../context";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Rating from "@mui/material/Rating";
import Bg_10 from "/assets/bg/bg_10.jpg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ReviewsPage: React.FC = () => {
  const { setCurrentLink } = useContext(CommonContext);
  useEffect(() => {
    setCurrentLink(2);
    document.title = "Reviews | Lendors";
  }, []);
  const reviews = [
    {
      review:
        "“I read multiple accounts of other users' experiences, and found mostly positive reviews. Of course, as with using any new service for the first time, we had our reservations: What if the car didn't match the photos or description and was in bad shape? What if we had car trouble during the trip or got into an accident — what was covered and what wasn't? What if we somehow couldn't reach the owner to pick up or drop off the car, or we had to change plans and end up returning earlier or later than originally requested?”",
      image: "https://avatars.githubusercontent.com/u/97700182?v=4",
      name: "Patrick NDAYAMBAJE",
      rating: 4
    },
    {
      review:
        "”I read multiple accounts of other users' experiences, and found mostly positive reviews. Of course, as with using any new service for the first time, we had our reservations: What if the car didn't match the photos or description and was in bad shape? What if we had car trouble during the trip or got into an accident — what was covered and what wasn't? What if we somehow couldn't reach the owner to pick up or drop off the car, or we had to change plans and end up returning earlier or later than originally requested?”",
      image: "https://avatars.githubusercontent.com/u/97700182?v=4",
      name: "Patrick NDAYAMBAJE",
      rating: 5
    }
  ];
  return (
    <div className={`h-[calc(100vh_-_5rem)] w-full`}>
      <div
        className="w-full h-44 font-bold text-white text-2xl flex items-center justify-center  relative"
        style={{
          backgroundImage: `url('${Bg_10}')`
        }}
      >
        <div className="w-full absolute top-0 left-0 h-full flex items-center justify-center bg-gradient-to-t from-black via-transparent to-transparent z-20">
          <span className="absolute bottom-8 font-bold text-2xl left-auto z-10">
            Reviews
          </span>
        </div>
      </div>
      <div className="w-full bg-slate-200 px-24 h-16 text-slate-500 flex items-center">
        <Link to="/review" className="hover:underline">
          Home / Reviews
        </Link>
      </div>
      <div className="my-32 w-full flex items-center justify-center">
        <Swiper
          className="z-1 w-1/2"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 1, disableOnInteraction: false }}
        >
          {reviews.map((image, index) => (
            <SwiperSlide
              key={index}
              className="m-auto w-1/2 flex-col flex h-full items-center justify-center"
            >
              <span className="w-2/3 font-medium text-lg text-slate-600 italic font-poppins my-3">
                {image.review}
              </span>
              <img
                alt={Math.random().toString()}
                src={image.image}
                className="w-16 my-3 rounded-full object-cover"
              />
              <span className="w-full text-center font-semibold text-xl font-poppins my-3">
                {image.name}
              </span>

              <Rating
                name="read-only"
                value={image.rating}
                readOnly
                className="my-2"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <FooterComponent />
    </div>
  );
};

export default ReviewsPage;
