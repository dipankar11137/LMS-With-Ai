import { useEffect } from "react";

import { useLocation } from "react-router-dom";
import Footer from "../Share/Footer";
import JoinMore from "./Home/JoinMore";
import LearnNew from "./Home/LearnNew";
import LearnNewSkill from "./Home/LearnNewSkill";
import OurMostPopulars from "./Home/OurMostPopular/OurMostPopulars";
import RunningCourses from "./Home/Running Course/RunningCourses";
import TopCategories from "./Home/TopCategories";
import Trusted from "./Home/Trusted";
import Wave from "./Home/Wave";
import WhatPeopleSay from "./Home/WhatPeopleSay";

const Home = ({ search, searchButton }) => {
  const { pathname } = useLocation();
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);


  useEffect(() => {
    if (searchButton) {
      window.scrollTo({ top: 1600, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, searchButton]);

  const handleCourse = () => {
    window.scrollTo({ top: 1600, behavior: 'smooth' });
  }


  return (
    <div className="pt-10">
      <LearnNewSkill handleCourse={handleCourse} />
      <Wave />
      <Trusted />
      <TopCategories />
      <RunningCourses search={search} />
      <OurMostPopulars />
      <WhatPeopleSay />
      <LearnNew />
      <JoinMore />
      <Footer />
    </div>
  );
};

export default Home;
