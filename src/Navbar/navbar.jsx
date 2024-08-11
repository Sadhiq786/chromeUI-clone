import React from "react";
import "./navbar.css";

const Naviagtionbar = () => {
  const navsection = [
    { title: "Home" },
    { title: "The Browser by Google" },
    {
      Dropdown: "Features",
      Features: [
        'Overview',
        "Google address bar",
        "Password check",
        "Use across devices",
        "Dark mode",
        "Tabs",
        "Articles for you",
        "Extensions",
      ],
    },
    {
      Dropdown: "Support",
      SupportValues: [
        "Helpful tips for Chrome",
        "Support",
      ],
    },
    {
      chromeLogo: "https://www.google.com/chrome/static/images/chrome-logo-m100.svg",
    },
    {
        dropdownLogo: "https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-down-01-512.png"
    }
  ];

  return (
    <div className="navContainer">
      <div className="navSection">
        <div className="main-logoInfo">
          <div className="chromeLogo">
            <img src={navsection[4].chromeLogo} width={35} alt="Chrome Logo" />
          </div>
          <div className="chromeName">
            <span>chrome</span>
          </div>
        </div>

        <div className="navLinks">
          {navsection.map((item, index) => (
            <div key={index} className="navLink">
              <div className="navItem">
                {item.title}
              </div>
              {item.Dropdown && (
                <div className="dropdownContainer">
                  <div className="dropdownValues">{item.Dropdown} <img src={navsection[5].dropdownLogo} width={10}/></div>
                  <div className="dropdown-content">
                    {item.Features && item.Features.map((feature, i) => (
                      <p key={i} className="dropdown-item">{feature}</p>
                    ))}
                    {item.SupportValues && item.SupportValues.map((support, i) => (
                      <p key={i} className="dropdown-item">{support}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Naviagtionbar;
