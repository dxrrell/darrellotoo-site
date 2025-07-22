"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import FlowingMenu from "./FlowingMenu";
import ContactForm from "./ContactForm";

const contactItems = [
  {
    link: "#contact-form",
    text: "Email",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyfjXOVID6DRPO0w3mlML17EVEB4Xxg-AknMRTz2vrNQ6Uw_jbNqP1YZaSDEJShyfBTG4&usqp=CAU",
    type: "form"
  },
  {
    link: "https://www.linkedin.com/in/otood/",
    text: "LinkedIn",
    image: "https://blog.waalaxy.com/wp-content/uploads/2021/01/3-1.png",
    type: "social"
  },
  {
    link: "https://www.instagram.com/darrell.otoo/",
    text: "Instagram",
    image: "https://w0.peakpx.com/wallpaper/293/690/HD-wallpaper-instagram-clean-colourfull-insta-instagram-colours-instagram-logo-minimal-minimalist-premium.jpg",
    type: "social"
  },
  {
    link: "https://discord.com/users/dxrrell",
    text: "Discord",
    image: "https://www.internetmatters.org/wp-content/uploads/2024/10/discord-logo.webp",
    type: "social"
  },
  {
    link: "https://calendly.com/darrell-otoo",
    text: "Schedule",
    image: "https://cdn.mos.cms.futurecdn.net/G72uhCqq7DbtFofrgLrMcn.jpeg",
    type: "calendar"
  }
];

export default function ContactSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleItemClick = (type: string) => {
    if (type === 'form') {
      setIsFormOpen(true);
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-[#0F0A1F] py-20">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 px-6"
        >
          <h2 className="text-6xl md:text-7xl font-bold text-gradient mb-6">
            Contact
          </h2>
          <p className="text-[#E8E6F3] text-lg max-w-2xl mx-auto">
            Let&apos;s connect and discuss your next project
          </p>
        </motion.div>

        <div style={{ height: "500px", position: "relative" }}>
          <FlowingMenu 
            items={contactItems} 
            onItemClick={handleItemClick}
          />
        </div>

        <ContactForm 
          isOpen={isFormOpen} 
          onClose={() => setIsFormOpen(false)} 
        />
      </div>
    </section>
  );
} 