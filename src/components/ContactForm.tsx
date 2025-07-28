"use client";
import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Add keyboard support for closing modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '');
    
    // Limit to 10 digits
    const limitedNumbers = numbers.slice(0, 10);
    
    // Format the number
    if (limitedNumbers.length === 0) return '';
    if (limitedNumbers.length <= 3) return `(${limitedNumbers}`;
    if (limitedNumbers.length <= 6) return `(${limitedNumbers.slice(0, 3)}) ${limitedNumbers.slice(3)}`;
    return `(${limitedNumbers.slice(0, 3)}) ${limitedNumbers.slice(3, 6)}-${limitedNumbers.slice(6)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedNumber);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      await emailjs.sendForm(
        'service_y3cabm1',
        'template_bwr0z77',
        formRef.current,
        '6kfSgDKwQsDeIfk5c'
      );
      setSubmitStatus('success');
      formRef.current.reset();
      setContactMethod('');
      setPhoneNumber('');
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
      
      // Provide more helpful error messages
      if (error instanceof Error) {
        if (error.message.includes('network')) {
          setErrorMessage('Network connection issue. Please check your internet connection and try again.');
        } else if (error.message.includes('timeout')) {
          setErrorMessage('Request timed out. Please try again in a moment.');
        } else if (error.message.includes('service')) {
          setErrorMessage('Email service temporarily unavailable. Please try again later.');
        } else {
          setErrorMessage('Something went wrong. Please check your information and try again.');
        }
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setSubmitStatus(null);
    setErrorMessage('');
  };

  const handleContactMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setContactMethod(e.target.value);
  };

  // Creative loading spinner component
  const CreativeSpinner = () => (
    <div className="flex items-center justify-center gap-3">
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className="w-6 h-6 border-2 border-[#7B4AE3]/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#7B4AE3] rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              x: [0, 8, 0, -8, 0],
              y: [0, -8, 0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
        {/* Center dot */}
        <motion.div
          className="absolute w-1 h-1 bg-[#9B8ECF] rounded-full"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <span className="text-sm">Sending message...</span>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-gradient-to-br from-[#1A1443] to-[#0F0A1F] rounded-2xl p-4 md:p-8 max-w-sm md:max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Premium glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#7B4AE3]/20 to-[#9B8ECF]/20 rounded-2xl blur-xl" />
            
            <div className="relative">
              <div className="flex justify-between items-center mb-6 md:mb-8">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#E8E6F3] to-[#9B8ECF] bg-clip-text text-transparent">
                  Send Message
                </h3>
                <button
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="text-[#9B8ECF] hover:text-[#7B4AE3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4AE3] focus-visible:rounded-lg disabled:opacity-50 disabled:cursor-not-allowed p-2 -m-2 ml-auto"
                  aria-label="Close contact form"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[#E8E6F3] text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-[#0F0A1F]/50 border border-[#2D1B69] rounded-xl text-[#E8E6F3] focus:outline-none focus:border-[#7B4AE3] focus:ring-2 focus:ring-[#7B4AE3]/20 transition-all duration-200 hover:border-[#7B4AE3]/50 focus-visible:ring-2 focus-visible:ring-[#7B4AE3] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[#E8E6F3] text-sm font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    disabled={isSubmitting}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    className="w-full px-4 py-3 bg-[#0F0A1F]/50 border border-[#2D1B69] rounded-xl text-[#E8E6F3] focus:outline-none focus:border-[#7B4AE3] focus:ring-2 focus:ring-[#7B4AE3]/20 transition-all duration-200 hover:border-[#7B4AE3]/50 focus-visible:ring-2 focus-visible:ring-[#7B4AE3] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <p className="mt-1 text-sm text-[#9B8ECF]">Please enter a valid email address</p>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[#E8E6F3] text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-[#0F0A1F]/50 border border-[#2D1B69] rounded-xl text-[#E8E6F3] focus:outline-none focus:border-[#7B4AE3] focus:ring-2 focus:ring-[#7B4AE3]/20 transition-all duration-200 hover:border-[#7B4AE3]/50 focus-visible:ring-2 focus-visible:ring-[#7B4AE3] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[#E8E6F3] text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-[#0F0A1F]/50 border border-[#2D1B69] rounded-xl text-[#E8E6F3] focus:outline-none focus:border-[#7B4AE3] focus:ring-2 focus:ring-[#7B4AE3]/20 transition-all duration-200 hover:border-[#7B4AE3]/50 focus-visible:ring-2 focus-visible:ring-[#7B4AE3] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-[#E8E6F3] text-sm font-medium mb-2">Project Timeline</label>
                  <div className="relative">
                    <select
                      id="timeline"
                      name="timeline"
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-[#0F0A1F]/50 border border-[#2D1B69] rounded-xl text-[#E8E6F3] focus:outline-none focus:border-[#7B4AE3] focus:ring-2 focus:ring-[#7B4AE3]/20 transition-all duration-200 hover:border-[#7B4AE3]/50 focus-visible:ring-2 focus-visible:ring-[#7B4AE3] appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="" className="bg-[#0F0A1F] text-[#9B8ECF]">Select a timeline</option>
                      <option value="ASAP" className="bg-[#0F0A1F] text-[#E8E6F3]">ASAP</option>
                      <option value="1-2 weeks" className="bg-[#0F0A1F] text-[#E8E6F3]">1-2 weeks</option>
                      <option value="1-3 months" className="bg-[#0F0A1F] text-[#E8E6F3]">1-3 months</option>
                      <option value="3+ months" className="bg-[#0F0A1F] text-[#E8E6F3]">3+ months</option>
                      <option value="Not sure" className="bg-[#0F0A1F] text-[#E8E6F3]">Not sure</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                      <svg className="w-4 h-4 text-[#7B4AE3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact_method" className="block text-[#E8E6F3] text-sm font-medium mb-2">Preferred Contact Method</label>
                  <div className="relative">
                    <select
                      id="contact_method"
                      name="contact_method"
                      required
                      value={contactMethod}
                      onChange={handleContactMethodChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-[#0F0A1F]/50 border border-[#2D1B69] rounded-xl text-[#E8E6F3] focus:outline-none focus:border-[#7B4AE3] focus:ring-2 focus:ring-[#7B4AE3]/20 transition-all duration-200 hover:border-[#7B4AE3]/50 focus-visible:ring-2 focus-visible:ring-[#7B4AE3] appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="" className="bg-[#0F0A1F] text-[#9B8ECF]">Select a method</option>
                      <option value="Email" className="bg-[#0F0A1F] text-[#E8E6F3]">Email</option>
                      <option value="Phone" className="bg-[#0F0A1F] text-[#E8E6F3]">Phone</option>
                      <option value="Video Call" className="bg-[#0F0A1F] text-[#E8E6F3]">Video Call</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                      <svg className="w-4 h-4 text-[#7B4AE3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {contactMethod === 'Phone' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div>
                        <label htmlFor="phone" className="block text-[#E8E6F3] text-sm font-medium mb-2">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={phoneNumber}
                          onChange={handlePhoneChange}
                          disabled={isSubmitting}
                          maxLength={14} // (123) 456-7890
                          className="w-full px-4 py-3 bg-[#0F0A1F]/50 border border-[#2D1B69] rounded-xl text-[#E8E6F3] focus:outline-none focus:border-[#7B4AE3] focus:ring-2 focus:ring-[#7B4AE3]/20 transition-all duration-200 hover:border-[#7B4AE3]/50 focus-visible:ring-2 focus-visible:ring-[#7B4AE3] disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <p className="mt-1 text-sm text-[#9B8ECF]">Please enter a 10-digit phone number</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-[#7B4AE3] to-[#9B8ECF] text-white rounded-xl font-semibold hover:from-[#9B8ECF] hover:to-[#7B4AE3] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-[#7B4AE3]/20 focus-visible:ring-2 focus-visible:ring-[#7B4AE3]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <CreativeSpinner />
                  ) : (
                    'Send Message'
                  )}
                </motion.button>

                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4 text-center"
                    >
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      </div>
                      <p className="text-green-400 font-medium">
                        Message sent successfully! I&apos;ll get back to you within 48 hours.
                      </p>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/30 rounded-xl p-4 text-center"
                    >
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </motion.div>
                      </div>
                      <p className="text-red-400 font-medium mb-3">
                        {errorMessage || 'Failed to send message. Please try again.'}
                      </p>
                      <motion.button
                        onClick={handleRetry}
                        className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors focus-visible:ring-2 focus-visible:ring-red-500"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Try Again
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 