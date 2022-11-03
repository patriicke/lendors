import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/404/NotFoundPage";
import AboutPage from "./pages/About/AboutPage";
import ContactPage from "./pages/Contact/ContactPage";
import GalleryPage from "./pages/Gallery/GalleryPage";
import HomePage from "./pages/Home/HomePage";
import ReviewsPage from "./pages/Review/ReviewsPage";
import { store } from "./redux/store";
const App: React.FC = () => {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/review" element={<ReviewsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Provider>
    </Router>
  );
};

export default App;
