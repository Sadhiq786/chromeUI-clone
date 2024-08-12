import React, { useState, useEffect, useRef } from "react";
import "./Body-header.css";
import YoursPage from "../yoursPage/yoursPage";
import SafePage from "../safePage/safePage";
import { PiClockClockwiseFill } from "react-icons/pi";
import { MdOutlineSpeed } from "react-icons/md";
import backgroundImgScroll from "../images/scroll-image.jpg"
import backgroundImgScroll_3 from "../images/scroll-image3.jpg";
import { TbShieldSearch } from "react-icons/tb";
import { AiFillFormatPainter } from "react-icons/ai";

const BodyContent = () => {
  const prevScrollTop = useRef(0);
  const [isSticky, setIsSticky] = useState(false);
  const [fastMove, setFastMove] = useState({
    x: 0,
    overflow: "hidden",
    scale: 1.7,
  });


  const words = ["fast", "safe", "yours"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);


  const [translate, setTranslate] = useState({
    box_1: {
      x: "70%",
      y: "0%",
      scale: 1,
      opacity: 1,
    },
    box_2: {
      x: "-120%",
      y: "3%",
      scale: 2,
      opacity: 1,
    },
    box_3: {
      x: "-30%",
      y: 0,
      scale: 1.6,
      opacity: 1,
    },
    box_4: {
      x: "70%",
      y: "3%",
      scale: 2,
      opacity: 1,
    },
    box_5: {
      x: "100%",
      y: 0,
      scale: 1,
      opacity: 0,
    },
  });



  useEffect(() => {
    if (isAnimating && currentLetterIndex < words[currentWordIndex].length) {
      const timeout = setTimeout(() => {
        setCurrentLetterIndex((prev) => prev + 1);
      }, 300); // Adjust delay for each letter here
      return () => clearTimeout(timeout);
    } else if (isAnimating && currentLetterIndex === words[currentWordIndex].length) {
      const timeout = setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setCurrentLetterIndex(0);
      }, 4000); // Adjust delay between words here
      return () => clearTimeout(timeout);
    }
  }, [currentLetterIndex, currentWordIndex, isAnimating, words]);

  useEffect(() => {
    const totalDuration = words.reduce(
      (acc, word) => acc + word.length * 300 + 1000,
      0
    );
    const stopAnimation = setTimeout(() => {
      setIsAnimating(false);
    }, totalDuration);

    return () => clearTimeout(stopAnimation);
  }, [words]);

  const renderWord = () => {
    return words[currentWordIndex]
      .split("")
      .slice(0, currentLetterIndex)
      .map((letter, index) => (
        <span key={index} className="letter">
          {letter}
        </span>
      ));
  };
  
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

    // Toggle sticky class
    const tabsOffsetTop = document.querySelector(".Tabs-navigate").offsetTop;
    setIsSticky(scrollTop >= tabsOffsetTop);

    // Other scroll logic
    let fastBox = document.getElementsByClassName("box1")[0];
    let fastBoxPosition = fastBox.getBoundingClientRect().top;
    const maxScale = 1.7;
    const minScale = 1.5;

    // Calculate the scale proportionally based on the amount of scroll
    let scale = 1 + ((120 - fastBoxPosition) / 120) * 0.7;

    // Ensure that the scale stays within the specified range
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
      box_1: {
        scrollDown: { x: "125%", y: "0%", scale: 1.4, opacity: 1 },
        scrollUp: { x: "-70%", y: "0%", scale: 1.9, opacity: 0 },
      },
      box_2: {
        scrollDown: { x: "-127%", y: "0%", scale: 1.4
         },
        scrollUp: { x: "-125%", y: "3%", scale: 2 },
      },
      box_3: {
        scrollDown: { x: '-40%', y: 0, scale: 1.4 },
        scrollUp: { x: "-30%", y: 0, scale: 1.7 },
      },
      box_4: {
        scrollDown: { x: "-45%", y: "0%", scale: 1.4 },
        scrollUp: { x: "70%", y: "3%", scale: 2 },
      },
      box_5: {
        scrollDown: { x: "13%", y: "0%", scale: 1.4 },
        scrollUp: { x: "120%", y: "3%", scale: 2 },
      },
    };

    // const transformations = {
    //     box_1: {
    //       scrollDown: { x: "338%", y: "0%", scale: 1, opacity: 1 },
    //       scrollUp: { x: "-70%", y: "0%", scale: 1, opacity: 0 },
    //     },
    //     box_2: {
    //       scrollDown: { x: "-36%", y: "0%", scale: 1 },
    //       scrollUp: { x: "-120%", y: "3%", scale: 2 },
    //     },
    //     box_3: {
    //       scrollDown: { x: 0, y: 0, scale: 1 },
    //       scrollUp: { x: "-30%", y: 0, scale: 1.6 },
    //     },
    //     box_4: {
    //       scrollDown: { x: "0%", y: "0%", scale: 1 },
    //       scrollUp: { x: "70%", y: "3%", scale: 2 },
    //     },
    //     box_5: {
    //       scrollDown: { x: "0%", y: "0%", scale: 1 },
    //       scrollUp: { x: "120%", y: "3%", scale: 2 },
    //     },
    //   };

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

  const handleLeft = () => {
    const currentX = parseInt(fastMove.x, 10);
    if (currentX === 0) return;
    setFastMove((prev) => ({
      ...prev,
      x: `${currentX + 100}`,
    }));
  };

  const handleRight = () => {
    if (parseInt(fastMove.x, 10) === -200) return;
    setFastMove((prev) => ({
      ...prev,
      x: `${prev.x - 100}`,
    }));
  };

  const navsection = [
    {
      chromeLogo: "https://www.google.com/chrome/static/images/chrome-logo-m100.svg",
    },
  ];


  const updateData=[
    {
        title:"UPDATES",
        heading: "Automatic Updates",
        content: "There’s a new Chrome release every four weeks, making it easy to have the newest features and a faster, safer web browser.",
        link:"Learn about automatic updates",
        image:"https://www.google.com/chrome/static/images/engagement-homepage/updates/updates.png"
    },
    {
        title:"LATEST",
        heading: "New from Chrome",
        content: "Chrome regularly updates with tools and features that make it faster and easier to use.",
        link:"Learn what’s new on Chrome",
        logo:"https://www.google.com/chrome/static/images/chrome-logo-m100.svg"
    },
    {
      backgroundImgScroll:"https://www.google.com/chrome/static/images/homepage/fast/tabs-groups_desktop.webp"
    }
  ]

  return (
    <>
    <div className="title">
    <div>
      <img
        src="https://www.google.com/chrome/static/images/chrome-logo-m100.svg"
        alt="chrome logo"
        width={65}
      />
    </div>
    <div>
      <p>
        The browser <br /> built to be <span className={`animatedWord ${isAnimating ? "" : "hidden"}`}>
          {currentWordIndex === 0 && (
            <span className="fastAnimation">
              <MdOutlineSpeed />
              {renderWord()}
            </span>
          )}
          {currentWordIndex === 1 && (
            <span className="safeAnimation">
              <TbShieldSearch />
              {renderWord()}
            </span>
          )}
          {currentWordIndex === 2 && (
            <span className="yoursAnimation">
              <AiFillFormatPainter />
              {renderWord()}
            </span>
          )}
        </span>
      </p>
    </div>
  </div>

      <div className="Tabs-navigate">
        <div className={`Tabs ${isSticky ? "sticky" : ""}`}>
          <div>
            <a href="#updates">Updates</a>
          </div>
          <div>
            <a href="#yours">Yours</a>
          </div>
          <div>
            <a href="#safe-page">Safe</a>
          </div>
          <div>
            <a href="#fast-page">Fast</a>
          </div>
          <div>
            <a href="#">By Google</a>
          </div>
        </div>
      </div>
      <div className="downloadLink">
            <span>Need the Chrome installer?</span>
            <a href="https://www.google.com/chrome/index.html#updates">Download here.</a>
      </div>
  
      <div className="parent">
        <div className="container">
          <div
            className="box"
            style={{
              transform: `translate(${translate.box_1.x}, ${translate.box_1.y}) scale(${translate.box_1.scale})`,
              opacity: translate.box_1.opacity,
            }}
          >
            <img
              src={require("../images/chrome-gallery-2-2x.webp")}
              style={{ height: "100%" }}
              alt=""
            />
          </div>
          <div
            className="box"
            style={{
              transform: `translate(${translate.box_2.x}, ${translate.box_2.y}) scale(${translate.box_2.scale})`,
              opacity: translate.box_2.opacity,
            }}
          >
            <img
              src={require("../images/chrome-gallery-1-2x.webp")}
              style={{ height: "100%" }}
              alt=""
            />
          </div>
          <div
            className="box"
            style={{
              transform: `translate(${translate.box_3.x}, ${translate.box_3.y}) scale(${translate.box_3.scale})`,
              opacity: translate.box_3.opacity,
            }}
          >
            <img
              src={require("../images/chrome-gallery-3-2x.webp")}
              style={{ height: "100%" }}
              alt=""
            />
          </div>
          <div
            className="box"
            style={{
              transform: `translate(${translate.box_4.x}, ${translate.box_4.y}) scale(${translate.box_4.scale})`,
              opacity: translate.box_4.opacity,
            }}
          >
            <img
              src={require("../images/chrome-gallery-4-2x.webp")}
              style={{ height: "100%" }}
              alt=""
            />
          </div>

          <div
            className="box"
            style={{
              transform: `translate(${translate.box_5.x}, ${translate.box_5.y}) scale(${translate.box_5.scale})`,
              opacity: translate.box_5.opacity,
            }}
          >
            <img
              src={require("../images/chrome-gallery-5-2x.webp")}
              style={{ height: "100%" }}
              alt=""
            />
          </div>
        </div>
      </div>
    
      <div className="updatesContent" id="updates">
        <div className="update" >
          <p>
            Discover the latest <br /> 
            <span className="updateAnimation">
              <span><PiClockClockwiseFill/></span> <span>u</span>
              <span>p</span>
              <span>d</span>
              <span>a</span>
              <span>t</span>
              <span>e</span>
              <span>s</span>
            </span> 
             <span> from Chrome</span>
          </p>
        </div>
            <br/><br/>
        <div className="updateCardsContent">
            <div className="cards">
                <div className="updateCards-1">
                    <div className="dataPart">
                        <p>{updateData[0].title}</p>
                        <p className="headingFont-1">{updateData[0].heading}</p>
                        <p style={{fontSize:"17px", color:"#5f6368"}}>{updateData[0].content}</p>
                        <a href="#" style={{textDecoration:"none", fontSize:"17px", fontWeight:600}}>{updateData[0].link}</a>
                    </div>
                    <div className="imageBackground">
                        <img src={updateData[0].image} alt=""/>
                    </div>
                </div>

                <div className="updateCards-2">
                    <p>{updateData[1].title}</p>
                    <p className="headingFont-2">{updateData[1].heading}</p>
                    <p style={{fontSize:"17px", color:"#5f6368"}}>{updateData[1].content}</p>
                    <a href="#" style={{textDecoration:"none", fontSize:"17px", fontWeight:600}}>{updateData[1].link}</a>
                    <p>
                        <img src={updateData[1].logo} alt="" className="updateChromeLogo"/>
                    </p>
                </div>
            </div>
        </div>
      </div>

      <br/><br/>
      <YoursPage/>
      <br/><br/>

      <SafePage/>
      <br/><br/>
      <div>
        <div className="fast-heading" id="fast-page">
          <p>
              The 
              <span className="fastAnimation">
                <span><MdOutlineSpeed/></span> <span>f</span>
                <span>a</span>
                <span>s</span>
                <span>t</span>
              </span> 
              way to do
              <br/>
              things online
          </p>
        </div>
      </div>

      <div className="fast" style={{ position: "relative", overflowX: `${fastMove.overflow}` }}>
          <div className="box1"style={{transform: `translate(${fastMove.x + 40}%, ${fastMove.x + 40}%) scale(${fastMove.scale})`}}>
            <div>
               <img src={backgroundImgScroll} alt="Background" style={{ width: "100%", height: "auto" }}/>
            </div>
          </div>
          <div className="box1"style={{position: "absolute", left: "100%",transform: `translateX(${fastMove.x}%)`}}>
            <div className="box-content">
                <div className="box-heading">
                  <h3>Stay on top of tabs</h3>
                </div>
                <div className="box-paragraph">
                  <p>Chrome has tools to help you manage the tabs you’re not quite ready to close. Group, label, and colour-code your tabs to stay organised and work faster.</p>
                </div>
            </div>
            <img src={updateData[2].backgroundImgScroll} alt="" className="backgroundImgScroll"/>
          </div>
          <div className="box1" style={{ position: "absolute", left: "160%", transform: `translateX(${fastMove.x}%)`}}>
            <img src={backgroundImgScroll_3} alt="" className="backgroundImgScroll-3"/>
          </div>
      </div>

      <div style={{ padding: "50px 70px", marginTop:"-120px" }}>
        <button onClick={handleLeft} style={{borderRadius:"50px"}}>&lt;</button>
        <button onClick={handleRight} style={{ marginLeft: "20px", borderRadius:"50px"}}>
          &gt;
        </button>
      </div>
      <div style={{ height: "200px" }}></div>
    </>
  );
};

export default BodyContent;
