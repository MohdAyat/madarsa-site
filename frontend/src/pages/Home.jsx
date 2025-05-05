import Header from '../components/Header.jsx';
import ImageTitleHeader from '../components/ImageTitleHeader.jsx'
import Navbar from '../components/Navbar.jsx';
import HomeMainComp2 from '../components/HomeMainComp2.jsx';
import HomeTombComp from '../components/HomeTombComp.jsx';
import OtherLinks from '../components/OtherLinks.jsx';
import Footer from '../components/Footer.jsx';
import Carousel from '../components/Carousel.jsx';

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <div className="bg-black h-0.5 pt-0"></div>
            <HomeMainComp2></HomeMainComp2>
            <HomeTombComp></HomeTombComp>
        </div>
    )
}

export default Home;