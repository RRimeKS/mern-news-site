import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/pages/Home";
import CategoryList from "./components/pages/category/CategoryList";
import UpdateCategory from "./components/pages/category/UpdateCategory";
import CreateNews from "./components/pages/news/CreateNews";
import CreateCategory from "./components/pages/category/CreateCategory";
import { Toaster } from "react-hot-toast";
import NewsList from "./components/pages/news/NewsList";
import NewsDetails from "./components/pages/news/NewsDetails";
import CategoryOfNews from "./components/pages/news/CategoryOfNews";
import SearchNews from "./components/pages/news/SearchNews";
import UserList from "./components/pages/user/UserList";
import UpdateNews from "./components/pages/news/UpdateNews";
import UserUpdate from "./components/pages/user/UserUpdate";
import Login from "./components/auth/Login";
import UserCreate from "./components/pages/user/UserCreate";
import NotFound from "./components/layouts/NotFound";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Header />
     <div className='max-sm:px-4 sm:px-8 md:px-32 font-noto'>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/yetkiligiris" element={<Login />} />
        <Route path="/haber/:category/:slug" element={<NewsDetails />} />
        <Route path="/haber/:category" element={<CategoryOfNews />} />
        <Route path="/arama" element={<SearchNews />} />

        <Route path="/admin">
          <Route path="kullanicilar" element={<UserList />} />
          <Route path="kullanici-guncelle/:id" element={<UserUpdate />} />
          <Route path="kullanici-ekle" element={<UserCreate />} />
          <Route path="kategoriler" element={<CategoryList />} />
          <Route path="kategori-ekle" element={<CreateCategory />} />
          <Route path="kategori-guncelle" element={<UpdateCategory />} />
          <Route path="haber-ekle" element={<CreateNews />} />
          <Route path="haberler" element={<NewsList />} />
          <Route path="haber-guncelle/:slug" element={<UpdateNews />} />
        </Route>
        <Route path="*" element={<NotFound />} />

      </Routes>
      </div> 
      <Footer />
    </Router>
  );
}

export default App;
