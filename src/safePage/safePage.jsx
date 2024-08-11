import React, { useState } from "react";
import "./safePage.css";
import { FiExternalLink } from "react-icons/fi";
import { TbShieldSearch } from "react-icons/tb";


const SafePage = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const safePageData = [
    {
      title: "PASSWORD MANAGER",
      heading: "Use strong passwords on every site.",
      image:
        "https://www.google.com/chrome/static/images/v2/gallery/passwords-fill.webp",
      clickImg:
        "https://www.google.com/chrome/static/images/v2/gallery/save-password.webp",
      content:
        "A prompt asks the user if they want to save their password to Google Password Manager.Chrome has Google Password Manager built in, which makes it simple to save, manage and protect your passwords online. It also helps you create stronger passwords for every account you use.",
      link: "Learn more about Password Manager",
    },
    {
      title: "SAFETY CHECK",
      heading:
        "Check your safety level in real time with just one click.",
      clickImg:
        "https://www.google.com/chrome/static/images/v2/gallery/safety-check.webp",
      content:
        "Chrome's Safety Check confirms the overall security and privacy of your browsing experience, including your saved passwords, extensions and settings. If something needs attention, Chrome will help you fix it.",
      link: "Learn more about safety on Chrome",
    },
    {
      title: "ENHANCED SAFE BROWSING",
      heading: "Browse with the confidence that you're staying safer online.",
      clickImg:
        "https://www.google.com/chrome/static/images/v2/gallery/malware-alert.webp",
      content:
        "Chrome's Safe Browsing warns you about malware or phishing attacks. Turn on Enhanced Safe Browsing for even more safety protections.",
      link: "Learn more about Safe Browsing",
    },
    {
      title: "PRIVACY GUIDE",
      heading:
        "Keep your privacy under your control with easy-to-use settings.",
      image:
        "https://www.google.com/chrome/static/images/v2/gallery/google-safety.webp",
      clickImg:
        "https://www.google.com/chrome/static/images/v2/gallery/privacy-guide.webp",
      content:
        "Chrome makes it easy to understand exactly what you’re sharing online and who you’re sharing it with. Simply use the Privacy Guide, a step-by-step tour of your privacy settings.",
      link: "Learn more about intuitive safety controls",
    },
  ];

  const toggleCard = (index) => {
    setActiveCardIndex(activeCardIndex === index ? null : index);
  };

  return (
    <div className="safe-container">
      <div className="safe-box">
        <div className="safe-heading" id="safe-page">
          <p>
            Stay <span className="safeAnimation">
            <span><TbShieldSearch/></span> <span>s</span>
                <span>a</span>
                <span>f</span>
                <span>e</span>
            </span>
            <br />
            <span>while you browse</span>
          </p>
        </div>

        <div className="safe-cards">
          {safePageData.map((data, index) => (
            <div
              key={index}
              className={`safe-cards-${index + 1}`}
              onClick={() => toggleCard(index)}
            >
              {activeCardIndex === index ? (
                <div className={`clickOn-${index + 1}`} style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"25px"}}>
                  <img src={data.clickImg} alt="" style={{width:"85%", borderRadius:"20px", transform:"scale(1)"}} />
                  <p style={{fontSize:"18px", fontWeight:600, letterSpacing:"0.5px"}}>{data.content}</p>
                  <a href="#" style={{textDecoration:"none"}}>{data.link} <FiExternalLink/></a>
                </div>
              ) : (
                <>
                  <p>{data.title}</p>
                  <h1>{data.heading}</h1>
                  <img src={data.image} alt="" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SafePage;
