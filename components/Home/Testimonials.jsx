  
import React, { useState } from 'react';
import { ArrowCircleRightIcon, ArrowCircleLeftIcon, StarIcon } from '@heroicons/react/solid';
const SliderData = [
    {
      name: 'Lorem Ipsum',
      image: '/assets/test-1.jpg',
      rating: [1, 2, 3, 4, 5],
      quote: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur impedit odio esse.'
    },
    {
        name: 'Lorem Ipsum',
        image: '/assets/test-2.jpg',
        rating: [1, 2, 3, 4, 5],
        quote: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur impedit odio esse.'
    },
    {
        name: 'Lorem Ipsum',
        image: '/assets/test-3.jpg',
        rating: [1, 2, 3, 4, 5],
        quote: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur impedit odio esse.'
    },
    {
        name: 'Lorem Ipsum',
        image: '/assets/test-5.jpg',
        rating: [1, 2, 3, 4, 5],
        quote: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur impedit odio esse.'
    },
  ];

const Testimonials = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className='relative h-screen flex items-center justify-center'>
      <ArrowCircleLeftIcon className='absolute top-1/2 left-6 lg:left-16 h-8 w-8 text-black z-10 cursor-pointer select-none' onClick={prevSlide} />
      <ArrowCircleRightIcon className='absolute top-1/2 right-6 lg:right-16 h-8 w-8 text-black z-10 cursor-pointer select-none' onClick={nextSlide} />
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? 'opacity-1 duration-500 ease-in-out scale-105 transform' : 'opacity-0 duration-500 ease-in-out transform'}
            key={index}
          >
            {index === current && (
              <div className='image border p-8 max-w-3xl' >
                  <img className='mx-auto rounded-full w-32 mb-8' src={slide.image} alt="" />
                  <h1 className="text-center text-2xl mb-4">{slide.name}</h1>
                  <div className="flex flex-row justify-center mb-8">
                    { slide.rating.map(rat => <StarIcon key={rat} className='w-12 h-12 text-yellow-500 mr-2' />) }
                  </div>
                  <p className="text-gray-600 text-xl text-center">{ '" ' + slide.quote + ' "' }</p>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default Testimonials;
