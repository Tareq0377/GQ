// HeroCarousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Carousel1 from "../assets/carousel-1.svg";
import Carousel2 from "../assets/carousel-2.svg";
import Carousel3 from "../assets/carousel-3.svg";

const slides = [
  {
    title: "Empower Your Future",
    subtitle: "Start your end-of-life planning today.",
    image: Carousel1,
  },
  {
    title: "Have the Conversation",
    subtitle: "Encourage family dialogue with confidence.",
    image: Carousel2,
  },
  {
    title: "Know Your Options",
    subtitle: "Learn about palliative care and legal rights.",
    image: Carousel3,
  },
];

export default function HeroCarousel() {
  return (
    <div className="w-full bg-[#fefcf9] py-12 px-4">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={40}
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="max-w-6xl mx-auto"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex flex-col md:flex-row items-center bg-white/60 backdrop-blur-md rounded-3xl shadow-lg p-6 md:p-10 space-y-6 md:space-y-0 md:space-x-10 animate-fade-slide border border-white/40">
              <img
                src={slide.image}
                alt="Slide visual"
                className="w-full md:w-1/2 max-h-80 object-contain rounded-xl drop-shadow-sm"
              />
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-[#1f3d3d] mb-2">
                  {slide.title}
                </h3>
                <p className="text-[#445555] text-base md:text-lg">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
