"use client";
import React, { useEffect } from "react";
import "./translater.css";
declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    const googleTranslateElementInit = () => {
      if (!window.google?.translate) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en", // Default language of the website
          includedLanguages: "en,hi", // Include English and Hindi
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    if (!window.googleTranslateElementInit) {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = googleTranslateElementInit;
    } else {
      googleTranslateElementInit();
    }
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        width: "9rem", // Fixed width for the container
        height: "3rem", // Fixed height for the container
        
        position: "relative",
        backgroundColor: "rgb(36, 48, 63)", // Background color for the parent div
      }}
    >
      
        {/* Google Translate element will be inserted here */}
     
    </div>
  );
};

export default GoogleTranslate;
