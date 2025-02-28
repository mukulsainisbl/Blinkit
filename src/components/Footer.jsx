import { FaLinkedin, FaSquareInstagram, FaFacebook } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto pt-5 text-center flex flex-col  lg:flex-row lg:justify-between gap-2 ">
        <p>©️ All Right Reserved 2024</p>
        <div className="flex items-center gap-4 justify-center text-2xl ">
          <a href="" className="hover:text-red-600">
            {" "}
            <FaSquareInstagram />
          </a>
          <a href="" className="hover:text-blue-300">
            {" "}
            <FaFacebook />{" "}
          </a>
          <a href="" className="hover:text-blue-300">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
