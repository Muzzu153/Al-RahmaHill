import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10 ">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* -------- Left Side ------------ */}
        <div>
          <img className="w-40 mb-5" src={assets.logo2} alt="logo image" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
            asperiores nemo at labore ipsam sit aperiam, mollitia amet obcaecati
            totam excepturi numquam iste in. Blanditiis ipsum porro amet? Odio,
            dolorum!
          </p>
        </div>

        {/* -------------- Center Side ------------- */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>About us</li>
            <li>Contact us</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* --------------- RIght Side -------------- */}
        <div>
          <p className="text-xl font-medium mb-5">SOCIAL</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>LinkedIn</li>
            <li>Facebook</li>
            <li>X</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>

      {/* ------------ Copyright Text ------------ */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025 @Muzzu153 - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
