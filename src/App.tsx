import { Router, Route } from '@solidjs/router';
import Layout from './Layout/Layout';
import './App.css';
import homePage from './pages/homePage';
import servicesPage from './pages/servicesPage';
import aboutPage from './pages/aboutPage';
import gallery from './pages/Gallery';
import Blogs from './pages/blogsPage';

function App() {
  return (
    <Router root={Layout}>
      <Route path="/" component={homePage} />
      <Route path="/services" component={servicesPage} />
      <Route path="/about" component={aboutPage} />
      <Route path="/gallery" component={gallery} />
      <Route path="/blog" component={Blogs} />
    </Router>
  );
}

export default App;