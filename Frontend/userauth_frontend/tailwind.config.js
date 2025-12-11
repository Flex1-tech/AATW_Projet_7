/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors : {
      ButtonAppBackgroundColor : "#4045EF",
      ButtonAppBorderColorA : "#4045EF",
      ButtonAppBorderColorB : "#D3E0FE",
      SideBackgroundColor : "#F8F5F5",
      TextColorBlack : "#2E3139",
      TextColorGray : "#425583",
      TextColorPlaceholder: "#A7B5D6",
      TextColorWhite : "#FFFFFF" ,
      TextColorBlue : "#4045EF",
      IconAppColor : "#899CC9"
    },
     fontSize : {
      HeadingFont : "32px", /*Bold*/
      BigHeadingFont : "40px", /*Bold*/
      ParagraphFont : "14px",/*Regular*/
      LabelFont : "12px"/*Regular*/
    },
    screens : {
      customBreakpoint : "900px"
    }
    }, 
  },

  plugins: [],
}