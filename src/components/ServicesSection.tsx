"use client";
import React, { useState, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import { useIsMobile } from "@/hooks/useIsMobile";

// Lazy load Three.js components to reduce initial bundle size
const Canvas = lazy(() => import("@react-three/fiber").then(module => ({ default: module.Canvas })));
const OrbitControls = lazy(() => import("@react-three/drei").then(module => ({ default: module.OrbitControls })));
const Environment = lazy(() => import("@react-three/drei").then(module => ({ default: module.Environment })));

// Import hooks directly since they can't be lazy loaded
import { useGLTF } from "@react-three/drei";

interface Service {
  title: string;
  description: string;
  icon: string;
  model?: string;
}

interface ServiceCategory {
  title: string;
  services: Service[];
}

// Enhanced 3D Model Components with Error Handling
function PC() {
  const { scene } = useGLTF("/models/PC.glb");
  return <primitive object={scene} scale={0.5} />;
}

function Drone() {
  const { scene } = useGLTF("/models/drone.glb");
  return <primitive object={scene} scale={0.5} position={[0, -0.5, 0]} />;
}

function Motherboard() {
  const { scene } = useGLTF("/models/motherboard.glb");
  return <primitive object={scene} scale={0.5} />;
}



// Error Boundary Component for 3D Models
function ModelErrorFallback({ service, icon }: { service: string; icon: string }) {
  return (
    <div className="flex items-center justify-center h-full bg-[#0F0A1F]/50 rounded-lg border border-[#2D1B69]">
      <div className="text-center">
        <Image
          src={`/icons/${icon}.png`}
          alt={`${service} icon`}
          width={64}
          height={64}
          className="w-16 h-16 object-contain mx-auto mb-2"
        />
        <p className="text-[#9B8ECF] text-sm">3D Model Unavailable</p>
      </div>
    </div>
  );
}

// Creative Loading Spinner (outside Canvas)
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className="w-8 h-8 border-2 border-[#7B4AE3]/30 rounded-full"
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
              x: Math.cos((i * 120 * Math.PI) / 180) * 8,
              y: Math.sin((i * 120 * Math.PI) / 180) * 8,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Lazy-loaded Canvas wrapper with error boundary
const LazyCanvas = ({ children, ...props }: React.ComponentProps<typeof Canvas>) => {
  return (
    <Suspense fallback={<div className="h-48 bg-[#0F0A1F]/50 rounded-lg flex items-center justify-center"><LoadingSpinner /></div>}>
      <Canvas {...props}>
        {children}
      </Canvas>
    </Suspense>
  );
};

// Lazy-loaded OrbitControls wrapper
const LazyOrbitControls = (props: React.ComponentProps<typeof OrbitControls>) => {
  return (
    <Suspense fallback={null}>
      <OrbitControls {...props} />
    </Suspense>
  );
};

// Lazy-loaded Environment wrapper
const LazyEnvironment = (props: React.ComponentProps<typeof Environment>) => {
  return (
    <Suspense fallback={null}>
      <Environment {...props} />
    </Suspense>
  );
};

// Enhanced 3D Model Component with Error Handling
function ModelWithErrorHandling({ model, service, icon }: { model: string; service: string; icon: string }) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    // Reset states when model changes
    setHasError(false);
    setIsLoading(true);
    
    // Simulate loading time and check for errors
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [model]);

  if (hasError) {
    return <ModelErrorFallback service={service} icon={icon} />;
  }

  return (
    <div className="h-48 relative mb-6">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0F0A1F]/50 rounded-lg z-10">
          <LoadingSpinner />
        </div>
      )}
      <LazyCanvas
        camera={{ 
          position: model === "drone" 
            ? [0, 0, 3] 
            : model === "pc"
              ? [0, 0, 6]
              : [0, 0, 4],
          fov: 45 
        }}
        style={{ background: 'transparent' }}
        onError={() => setHasError(true)}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <LazyEnvironment preset="city" />
        <LazyOrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          target={[0, 0, 0]}
        />
        <ErrorBoundary fallback={<ModelErrorFallback service={service} icon={icon} />}>
          {model === "pc" ? <PC /> : 
           model === "drone" ? <Drone /> :
           model === "motherboard" ? <Motherboard /> : null}
        </ErrorBoundary>
      </LazyCanvas>
    </div>
  );
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // console.error('3D Model Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const serviceCategories: ServiceCategory[] = [
  {
    title: "Technical Services",
    services: [
      {
        title: "Custom PC Building",
        description: "High-performance custom PC builds tailored to your specific needs, whether for gaming, content creation, or professional work.",
        icon: "keyboard", // Updated to use keyboard icon as fallback
        model: "pc",
      },
      {
        title: "Drone Building",
        description: "Custom drone builds for photography, racing, or specialized applications with expert assembly and configuration.",
        icon: "drone",
        model: "drone",
      },
      {
        title: "Hardware Repairs",
        description: "Expert diagnosis and repair of computers, drones, and other technical equipment.",
        icon: "motherboard", // Updated to use motherboard icon as fallback
        model: "motherboard",
      },
    ],
  },
  {
    title: "Professional Services",
    services: [
      {
        title: "Public Speaking",
        description: "Engaging technical presentations and keynote speeches for conferences, workshops, and corporate events.",
        icon: "speaking",
      },
      {
        title: "Consulting",
        description: "Technical consulting services for businesses and individuals seeking expert guidance.",
        icon: "consulting",
      },
      {
        title: "Technical Writing",
        description: "Clear and comprehensive technical documentation, guides, and content creation.",
        icon: "writing",
      },
    ],
  },
  {
    title: "Educational Services",
    services: [
      {
        title: "Tutoring",
        description: "One-on-one tutoring in STEM subjects including Math, Physics, Computer Science, Engineering, and Mechanical Engineering. Certified by Varsity Tutors in 21+ courses including AutoCAD, Microsoft Excel, and Public Speaking.",
        icon: "tutoring",
      },
      {
        title: "Student Career Coaching",
        description: "Guidance for students navigating technical career paths and professional development.",
        icon: "coaching",
      },
      {
        title: "Training Workshops",
        description: "Interactive workshops on technical skills, tools, and best practices.",
        icon: "workshop",
      },
    ],
  },
  {
    title: "Design Services",
    services: [
      {
        title: "UI/UX Design",
        description: "User-centered design solutions for web and mobile applications.",
        icon: "design",
      },
      {
        title: "Mechanical Design",
        description: "Expert mechanical design and analysis for various applications and industries.",
        icon: "mechanical",
      },
    ],
  },
];

const faqs = [
  {
    question: "How do I get started with your services?",
    answer: "Simply reach out through the contact section, and I'll schedule a consultation to discuss your needs in detail.",
  },
  {
    question: "Do you offer remote services?",
    answer: "Yes, many of my services can be provided remotely, while others may require in-person interaction. I'll discuss the best approach during our initial consultation.",
  },
  {
    question: "What areas do you service?",
    answer: "I primarily serve Northern Virginia for in-person services, but offer remote consulting and support globally.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on the scope and complexity. I'll provide a detailed timeline during our initial consultation.",
  },
];

export default function ServicesSection() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<number>>(new Set([0, 1, 2, 3])); // Start with all collapsed
  const [hasTapped, setHasTapped] = useState(false);
  const [showTapHint, setShowTapHint] = useState(true);
  const [selectedService, setSelectedService] = useState<{categoryIndex: number, serviceIndex: number} | null>(null);
  const isMobile = useIsMobile();

  // Hide tap hint after 10 seconds if user hasn't tapped yet
  React.useEffect(() => {
    if (hasTapped) return;
    const timer = setTimeout(() => setShowTapHint(false), 10000);
    return () => clearTimeout(timer);
  }, [hasTapped]);

  const toggleCategory = (categoryIndex: number) => {
    if (!hasTapped) {
      setHasTapped(true);
      setShowTapHint(false);
    }
    setCollapsedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryIndex)) {
        newSet.delete(categoryIndex);
      } else {
        newSet.add(categoryIndex);
      }
      return newSet;
    });
  };

  return (
    <section id="services" className="min-h-screen bg-[#0F0A1F] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7B4AE3] to-[#9B8ECF] mb-6">
            Services
          </h2>
          <p className="text-[#E8E6F3] text-lg max-w-2xl mx-auto">
            Comprehensive technical solutions tailored to your needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="space-y-16">
          {/* Mobile Tap Hint */}
          {isMobile && showTapHint && (
            <div className="flex flex-col items-center mb-4 animate-fade-in text-center">
              <span className="text-xs text-[#7B4AE3] font-medium mb-1">Tap category to expand</span>
              <span className="animate-pulse-arrow text-2xl text-[#7B4AE3]">▼</span>
            </div>
          )}
          {serviceCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Mobile: Collapsible Category Header */}
              {isMobile ? (
                <button
                  onClick={() => toggleCategory(categoryIndex)}
                  className="w-full flex justify-between items-center p-4 bg-[#1A1443] rounded-lg mb-4 hover:bg-[#2D1B69] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4AE3]"
                >
                  <h3 className="text-xl font-bold text-[#E8E6F3]">{category.title}</h3>
                  <motion.span
                    animate={{ rotate: collapsedCategories.has(categoryIndex) ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#7B4AE3] text-2xl"
                  >
                    ▼
                  </motion.span>
                </button>
              ) : (
                <h3 className="text-3xl font-bold text-[#E8E6F3] mb-8">{category.title}</h3>
              )}

              {/* Desktop: Clean Dropdown Menus */}
              {!isMobile ? (
                <div className="space-y-4">
                  {category.services.map((service, serviceIndex) => (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: serviceIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-[#1A1443] rounded-xl border border-[#2D1B69] hover:border-[#7B4AE3]/50 transition-all duration-300"
                    >
                      <button
                        onClick={() => setSelectedService(
                          selectedService?.categoryIndex === categoryIndex && selectedService?.serviceIndex === serviceIndex 
                            ? null 
                            : { categoryIndex, serviceIndex }
                        )}
                        className="w-full px-6 py-4 text-left flex justify-between items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4AE3] focus-visible:bg-[#2D1B69] rounded-xl"
                      >
                        <div className="flex items-center gap-4">
                          <Image
                            src={`/icons/${service.icon}.png`}
                            alt={service.title}
                            width={32}
                            height={32}
                            className="w-8 h-8 object-contain"
                          />
                          <h4 className="text-xl font-semibold text-[#E8E6F3]">{service.title}</h4>
                        </div>
                        <motion.span
                          animate={{ 
                            rotate: selectedService?.categoryIndex === categoryIndex && selectedService?.serviceIndex === serviceIndex ? 180 : 0 
                          }}
                          transition={{ duration: 0.3 }}
                          className="text-[#7B4AE3] text-xl"
                        >
                          ▼
                        </motion.span>
                      </button>
                      
                      <AnimatePresence>
                        {selectedService?.categoryIndex === categoryIndex && selectedService?.serviceIndex === serviceIndex && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6">
                              <div className="border-t border-[#2D1B69] pt-4">
                                <p className="text-[#9B8ECF] mb-6 leading-relaxed">{service.description}</p>
                                <div className="flex gap-4">
                                  <a
                                    href="#contact"
                                    className="inline-flex items-center px-6 py-3 bg-[#7B4AE3] text-white rounded-lg hover:bg-[#7B4AE3]/80 transition-colors duration-300 font-medium"
                                  >
                                    Contact to Discuss
                                  </a>
                                  {service.model && (
                                    <div className="flex-1 max-w-xs">
                                      <ModelWithErrorHandling 
                                        model={service.model} 
                                        service={service.title} 
                                        icon={service.icon}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Mobile: Original Grid Layout */
                <AnimatePresence>
                  {!collapsedCategories.has(categoryIndex) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-6">
                        {category.services.map((service, index) => (
                          <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-[#1A1443] rounded-2xl p-6 hover:bg-[#2D1B69] transition-colors duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4AE3] focus-visible:bg-[#2D1B69]"
                          >
                            <div className="text-4xl mb-4">
                              <Image
                                src={`/icons/${service.icon}.png`}
                                alt={service.title}
                                width={48}
                                height={48}
                                className="w-12 h-12 object-contain"
                              />
                            </div>
                            <h4 className="text-xl font-bold text-[#E8E6F3] mb-3">{service.title}</h4>
                            <p className="text-[#9B8ECF] mb-4 text-sm">{service.description}</p>
                            <a
                              href="#contact"
                              className="inline-block px-4 py-2 bg-[#7B4AE3] text-white rounded-lg hover:bg-[#7B4AE3]/80 transition-colors duration-300 text-sm"
                            >
                              Contact to Discuss
                            </a>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-[#E8E6F3] mb-8 text-center">Frequently Asked Questions</h3>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#1A1443] rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4AE3] focus-visible:bg-[#2D1B69]"
                >
                  <span className="text-[#E8E6F3] font-medium">{faq.question}</span>
                  <span className="text-[#7B4AE3]">
                    {expandedFaq === index ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4"
                    >
                      <p className="text-[#9B8ECF]">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 