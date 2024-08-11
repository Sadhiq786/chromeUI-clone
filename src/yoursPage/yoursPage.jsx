import React, { useState, useEffect, useRef } from "react";
import "./yoursPage.css";
import { MdOutlineArrowOutward } from "react-icons/md";
import { AiFillFormatPainter } from "react-icons/ai";

const YoursPage = () => {
  const prevScrollTop = useRef(0);
  const [fastMove, setFastMove] = useState({
    x: 0,
    overflow: "hidden",
    scale: 1.7,
  });

  const [translate, setTranslate] = useState({
    box_3: {
      x: 0,
      y: 0,
      scale: 2,
      opacity: 1,
    },
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(null);
  const [hoveredAccordionIndex, setHoveredAccordionIndex] = useState(null);

  // Images to change every 3 seconds
  const changeImg = [
    {
      image: "https://www.google.com/chrome/static/images/dev-components/chrome-gallery-1.webp",
    },
    {
      image: "https://www.google.com/chrome/static/images/dev-components/chrome-gallery-5.webp",
    },
  ];

  useEffect(() => {
    const imageChangeInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % changeImg.length);
    }, 3000); // Change images every 3 seconds

    return () => clearInterval(imageChangeInterval);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const isScrollingDown = scrollTop > prevScrollTop.current;
    prevScrollTop.current = scrollTop;
    let fastBox = document.getElementsByClassName("box1")[0];
    let fastBoxPosition = fastBox.getBoundingClientRect().top;
    const maxScale = 1.7;
    const minScale = 1;

    let scale = 1 + ((120 - fastBoxPosition) / 120) * 0.7;
    scale = Math.max(minScale, Math.min(maxScale, scale));

    const fastBoxScrollDown = 120 > fastBoxPosition;
    if (fastBoxScrollDown) {
      scale = Math.min(maxScale, scale - 0.2);
    } else {
      scale = Math.max(minScale, scale + 0.2);
    }

    if (fastBoxScrollDown) {
      setFastMove((prev) => ({
        ...prev,
        overflow: "auto",
        scale: scale,
      }));
    }

    const transformations = {
      box_3: {
        scrollDown: { x: "135%", y: 0, scale: 2 },
        scrollUp: { x: "135%", y: 0, scale: 1.7 },
      },
    };

    const newTransforms = {};

    Object.keys(transformations).forEach((boxKey) => {
      const { x, y, scale, opacity } = transformations[boxKey][
        isScrollingDown ? "scrollDown" : "scrollUp"
      ];
      newTransforms[boxKey] = { x, y, scale, opacity };
    });

    setTranslate((prev) => ({
      ...prev,
      ...newTransforms,
    }));
  };

  const YoursImages = [
    {
      image:
        "https://www.google.com/chrome/static/images/v2/accordion-timed/themes-mobile.webp",
    },
    {
      image:
        "https://www.google.com/chrome/static/images/v2/accordion-timed/tab-sync.webp",
    },
    {
      image:
        "https://www.google.com/chrome/static/images/v2/accordion-timed/autofill.webp",
    },
  ];

  const YoursPageData = [
    {
      heading: "Customise your Chrome",
      content:
        "Personalise your web browser with themes, dark mode and other options built just for you.",
    },
    {
      heading: "Browse across devices",
      content:
        "Sign in to Chrome on any device to access your bookmarks, saved passwords and more.",
    },
    {
      heading: "Save time with autofill",
      content:
        "Use Chrome to save addresses, passwords and more to quickly autofill your details.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveAccordionIndex(index === activeAccordionIndex ? null : index);
  };

  const handleMouseEnter = (index) => {
    setHoveredAccordionIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredAccordionIndex(null);
  };

  return (
    <div className="yours-container">
      <div className="yours-page">
        <div className="yours-heading" id="yours">
          <p>
            Make it <span className="yoursAnimation">
                <span><AiFillFormatPainter/></span>
                <span> y</span>
                <span>o</span>
                <span>u</span>
                <span>r</span>
                <span>s</span>
              </span> <span>and take</span>
            <br />
            <span>it with you</span>
          </p>
        </div>

        <div className="yoursPage-bg">
          <div className="yoursPage-container">
            <div
              className="box"
              style={{
                transform: `translate(${translate.box_3.x}, ${translate.box_3.y}) scale(${translate.box_3.scale})`,
                opacity: translate.box_3.opacity,
              }}
            >
              <img
                src={changeImg[currentImageIndex].image}
                style={{ height: "100%" }}
                alt="Dynamic"
              />
            </div>
          </div>
        </div>

        <div className="yoursPagecards">
          <div className="yoursPageCards-1">
            {YoursImages.map((Img, index) => (
              <div
                key={index}
                style={{
                  display: index === currentImageIndex ? "block" : "none",
                }}
              >
                <img src={Img.image} alt="" />
              </div>
            ))}
          </div>
          <div className="yoursPageCards-2">
            {YoursPageData.map((data, index) => (
              <div
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="accordion"
                  onClick={() => toggleAccordion(index)}
                >
                  <h3>{data.heading}</h3>
                </button>
                <div
                  className={`panel ${
                    index === activeAccordionIndex || index === hoveredAccordionIndex
                      ? "active"
                      : ""
                  }`}
                >
                  <p>{data.content}</p>
                </div>
              </div>
            ))}
            <br /><br />
            <br /><br />

            <button className="signIn">Sign in to get started <MdOutlineArrowOutward/></button>
          </div>
          <div className="yoursPageCards-3">
            <h3>Extend your</h3>
            <h3>experience</h3>
            <p>
              From shopping and entertainment to productivity, find extensions
              to improve your experience in the Chrome Web Store.
            </p>
            <br />
            <button>Explore extensions <MdOutlineArrowOutward/> </button>
          </div>
          <div className="yoursPageCards-4">
            <img
              src={require("../images/chrome-gallery-5-2x.webp")}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoursPage;
