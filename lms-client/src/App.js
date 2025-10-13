import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./Pages/Home/Home";
import CreateAccount from "./Pages/Login/CreateAccount";
import Login from "./Pages/Login/Login";
import Navbar from "./Pages/Share/Navbar";
import NotFound from "./Pages/Share/NotFound";

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useState } from "react";
import BlockOne from "./Pages/Blog/BlogOne";
import FAQSection from "./Pages/Blog/FAQSection";
import Certificate from "./Pages/Courses/Certificate/Certificate";
import CoursePage from "./Pages/Courses/CoursePage";
import DataScience from "./Pages/Courses/Data Science/DataScience";
import Digital from "./Pages/Courses/Digital Marketing/Digital";
import Finance from "./Pages/Courses/Finance/Finance";
import GraphicDesign from "./Pages/Courses/Graphic Design/GraphicDesign";
import LessonList from "./Pages/Courses/LessonList";
import Mobile from "./Pages/Courses/Mobile/Mobile";
import WebDevelopment from "./Pages/Courses/Web Development/WebDevelopment";
import AddClass from "./Pages/Dashboard/Add Class/AddClass";
import AddQuestion from "./Pages/Dashboard/AddQuestion/AddQuestion";
import AllClass from "./Pages/Dashboard/All Class/AllClass";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardIndex from "./Pages/Dashboard/Dashboard Initial/DashboardIndex";
import Scores from "./Pages/Dashboard/Quiz Score/Scores";
import ShowQuestion from "./Pages/Dashboard/Show Question/ShowQuestion";
import Users from "./Pages/Dashboard/User/Users";
import EventOne from "./Pages/Event/EventOne";
import DataScienceQuestion from "./Pages/Exam Question/DataScienceQuestion";
import DigitalMarketingQuestion from "./Pages/Exam Question/DigitalMarketingQuestion";
import FinanceAccountingQuestion from "./Pages/Exam Question/FinanceAccountingQuestion";
import GraphicDesignQuestion from "./Pages/Exam Question/GraphicDesignQuestion";
import MobileAppDevelopmentQuestion from "./Pages/Exam Question/MobileAppDevelopmentQuestion";
import WebDevelopmentQuestion from "./Pages/Exam Question/WebDevelopment/WebDevelopmentQuestion";
import DataPayment from "./Pages/Home/Home/Payment/DataPayment";
import DigitalPayment from "./Pages/Home/Home/Payment/DigitalPayment";
import FinancePayment from "./Pages/Home/Home/Payment/FinancePayment";
import GraphicPayment from "./Pages/Home/Home/Payment/GraphicPayment";
import MobilePayment from "./Pages/Home/Home/Payment/MobilePayment";
import WebPayment from "./Pages/Home/Home/Payment/WebPayment";
import RequireAuth from "./Pages/Login/RequireAUth";
import About from "./Pages/Page/About/About";
import ContactPage from "./Pages/Page/Contact/ContactPage";
// ..
AOS.init();

function App() {
  const [searchButton, setSearchButton] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <div>
      {/* <CreateAccount /> */}
      <div className="fixed w-full z-50 top-0">
        <Navbar
          searchButton={searchButton}
          setSearchButton={setSearchButton}
          setSearch={setSearch}
        />
        <div className="bg-neutral">
          <hr className="mx-4 border-slate-500" />
        </div>
      </div>

      <Routes>
        <Route
          path="/"
          element={<Home search={search} searchButton={searchButton} />}
        ></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
        <Route path="/blockOne" element={<BlockOne />}></Route>
        <Route path="/event" element={<EventOne />}></Route>
        <Route path="/lesson" element={<LessonList />}></Route>
        <Route path="/course" element={<CoursePage />}></Route>
        <Route path="/showQuestion/:id" element={<ShowQuestion />}></Route>
        <Route
          path="/course/webDevelopment"
          element={<WebDevelopment />}
        ></Route>
        <Route path="/course/dataScience" element={<DataScience />}></Route>
        <Route path="/course/graphicDesign" element={<GraphicDesign />}></Route>
        <Route path="/course/mobile" element={<Mobile />}></Route>
        <Route path="/course/digital" element={<Digital />}></Route>
        <Route path="/course/finance" element={<Finance />}></Route>
        <Route path="/faq" element={<FAQSection />}></Route>
        <Route path="/certificate" element={<Certificate />}></Route>
        <Route
          path="/course/webQuiz"
          element={<WebDevelopmentQuestion />}
        ></Route>
        <Route
          path="/course/dataQuiz"
          element={<DataScienceQuestion />}
        ></Route>
        <Route
          path="/course/graphicQuiz"
          element={<GraphicDesignQuestion />}
        ></Route>
        <Route
          path="/course/mobileQuiz"
          element={<MobileAppDevelopmentQuestion />}
        ></Route>
        <Route
          path="/course/digitalQuiz"
          element={<DigitalMarketingQuestion />}
        ></Route>
        <Route
          path="/course/financeQuiz"
          element={<FinanceAccountingQuestion />}
        ></Route>
        
        {/* <Route
          path="/course/graphicQuiz"
          element={<GraphicDesignQuiz />}
        ></Route>
        <Route path="/course/dataQuiz" element={<DataScienceQuiz />}></Route>
        <Route path="/course/mobileQuiz" element={<MobileQuiz />}></Route>
        <Route path="/course/digitalQuiz" element={<DigitalQuiz />}></Route>
        <Route path="/course/financeQuiz" element={<FinanceQuiz />}></Route> */}
        {/* <Route path="/course/webQuiz" element={<Quiz />}></Route>
        <Route
          path="/course/graphicQuiz"
          element={<GraphicDesignQuiz />}
        ></Route>
        <Route path="/course/dataQuiz" element={<DataScienceQuiz />}></Route>
        <Route path="/course/mobileQuiz" element={<MobileQuiz />}></Route>
        <Route path="/course/digitalQuiz" element={<DigitalQuiz />}></Route>
        <Route path="/course/financeQuiz" element={<FinanceQuiz />}></Route> */}
        <Route path="/webPayment/:id" element={<WebPayment />}></Route>
        <Route path="/dataPayment/:id" element={<DataPayment />}></Route>
        <Route path="/graphicPayment/:id" element={<GraphicPayment />}></Route>
        <Route path="/mobilePayment/:id" element={<MobilePayment />}></Route>
        <Route path="/digitalPayment/:id" element={<DigitalPayment />}></Route>
        <Route path="/financePayment/:id" element={<FinancePayment />}></Route>

        <Route path="/course/quizScore" element={<Scores />}></Route>
        <Route path="/createAccount" element={<CreateAccount />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/*" element={<NotFound />}></Route>

        {/* Dashboard Start */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<DashboardIndex />} />
          <Route path="user" element={<Users />} />
          <Route path="addClass" element={<AddClass />} />
          <Route path="addQuestion" element={<AddQuestion />} />
          <Route path="class" element={<AllClass />} />
          <Route path="score" element={<Scores />} />
        </Route>
        {/* Dashboard End */}
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
