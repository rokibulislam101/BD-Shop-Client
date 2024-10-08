import facebook from '../../../assets/Icons/facebook.png';
import youtube from '../../../assets/Icons/youtube.png';
import whatsapp from '../../../assets/Icons/whatsapp.png';
import pinterest from '../../../assets/Icons/pinterest.png';

const Footer = () => {
  return (
    <footer className="bg-amber-50 p-10">
      <div className="grid grid-cols-2 md:grid-cols-4 md:justify-items-center">
        <div>
          {/* <img src="/logo.png" alt="HB Trust BD" className="mb-4" /> */}
          <h2 className="text-2xl font-bold mb-3">BD SHOP</h2>
          <p>
            BD Shop is a leading e-commerce platform in Bangladesh,
            dedicated to providing a seamless online shopping experience.
            Offering a diverse range of products across multiple categories.
          </p>
        </div>
        <div>
          <h5 className="font-bold text-lg mb-3">CATEGORIES</h5>
          <ul>
            <li>Electronics</li>
            <li>Casual Cotton</li>
            <li>Wireless Earbuds</li>
            <li>Leather Wallet</li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-lg mb-3">QUICK LINKS</h5>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>News & Events</li>
            <li>My Account</li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-lg mb-3">CONTACT</h5>
          <ul>
            <li>📍 Hazipur, Jamalpur Sadar, Jamalpur, Mymensingh.</li>
            <li>📧 bdshop@gmail.com</li>
            <li>📞 +8801900-000000</li>
            <li>
              <a
                href="https://maps.app.goo.gl/FQCDDX9gK5mw1QTf7"
                className="text-blue-400"
                target="_blank"
              >
                Google Map
              </a>
            </li>
          </ul>
          <div className="flex space-x-3 w-48 mt-3">
            <a href="http://facebook.com" target="_blank">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="http://youtube.com" target="_blank">
              <img src={youtube} alt="YouTube" />
            </a>
            <a href="http://whatsapp.com" target="_blank">
              <img src={whatsapp} alt="YouTube" />
            </a>
            <a href="http://pinterest.com" target="_blank">
              <img src={pinterest} alt="Pinterest" />
            </a>
          </div>
        </div>
      </div>
      <hr className="my-3" />
      <p className="text-center mt-5 font-semibold">
        © 2024 BD SHOP. All Rights Reserved. Developed By Rokibul Islam
      </p>
    </footer>
  );
};

export default Footer;
