import { Helmet } from 'react-helmet-async';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import AllProducts from '../SomeProducts/SomeProducts';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>BD Shop | Home</title>
      </Helmet>
      <Banner></Banner>
      <Categories></Categories>
      <AllProducts></AllProducts>
    </div>
  );
};

export default Home;
