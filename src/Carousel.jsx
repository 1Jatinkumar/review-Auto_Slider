import React, { useEffect, useState } from "react";
import { shortList, list, longList } from "./data";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Carousel = () => {
  const [people, setPeople] = useState(longList);
  const [currentPerson, setCurrentPerson] = useState(0);

  const lists = ["shortList", "list", "longList"];
  const slides= [shortList, list, longList];

  const prevSlide = () => {
    setCurrentPerson((oldPerson) => {
      const result = (oldPerson + people.length - 1) % people.length;
      return result;
    });
  };
  const nextSlide = () => {
    setCurrentPerson((oldPerson) => {
      const result = (oldPerson + 1) % people.length;
      return result;
    });
  };

  const changeList=(listIndex)=>{
    console.log(listIndex);
    setPeople(slides[listIndex]);
  }

  useEffect(() => {
    const sliderId = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => {
      clearInterval(sliderId);
    };
  }, [currentPerson, people]);

  return (
    <div style={{alignItems:"center", display:'flex', flexDirection:"column"}} >
      <section className="slider-container">
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;
          return (
            <article
              key={id}
              className="slide"
              style={{
                transform: `translateX(${
                  100 * (personIndex - currentPerson)
                }%)`,
                opacity: personIndex === currentPerson ? 1 : 0,
                visibility:
                  personIndex === currentPerson ? "visible" : "hidden",
              }}
            >
              <img src={image} alt={name} className="person-img" />
              <h5 className="name">{name}</h5>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button type="button" className="prev" onClick={prevSlide}>
          <FiChevronLeft />
        </button>
        <button type="button" className="next" onClick={nextSlide}>
          <FiChevronRight />
        </button>
      </section>
      <div>
        {lists.map((item, index) => {
          return <button key={item} className="btn" onClick={()=>{changeList(index)}} style={{marginLeft:'1rem'}} >{item}</button>;
        })}
      </div>
    </div>
  );
};

export default Carousel;
