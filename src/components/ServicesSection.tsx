"use client";
import React, { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import Image from 'next/image';

// Mobile detection hook
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

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

// Three.js compatible loading component
function ModelLoader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#7B4AE3" />
    </mesh>
  );
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
              x: [0, 6, 0, -6, 0],
              y: [0, -6, 0, 6, 0],
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
    </div>
  );
}

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
      <Canvas
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
        <Suspense fallback={<ModelLoader />}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <Environment preset="city" />
          <OrbitControls
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
        </Suspense>
      </Canvas>
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
        description: "One-on-one tutoring in technical subjects, programming, and engineering concepts.",
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
    answer: "Simply reach out through the contact section, and we'll schedule a consultation to discuss your needs in detail.",
  },
  {
    question: "Do you offer remote services?",
    answer: "Yes, many of our services can be provided remotely, while others may require in-person interaction. We'll discuss the best approach during our initial consultation.",
  },
  {
    question: "What areas do you service?",
    answer: "We primarily serve the local area for in-person services, but offer remote consulting and support globally.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on the scope and complexity. We'll provide a detailed timeline during our initial consultation.",
  },
];

export default function ServicesSection() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const isMobile = useIsMobile();

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
          {serviceCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-[#E8E6F3] mb-8">{category.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-[#1A1443] rounded-2xl p-8 hover:bg-[#2D1B69] transition-colors duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4AE3] focus-visible:bg-[#2D1B69]"
                    onMouseEnter={() => { }}
                    onMouseLeave={() => { }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        // Optional: Add any card interaction here
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${service.title} - ${service.description}`}
                  >
                    {service.model && !isMobile ? (
                      <ModelWithErrorHandling 
                        model={service.model} 
                        service={service.title} 
                        icon={service.icon}
                      />
                    ) : (
                      <div className="text-4xl mb-6">
                        <Image
                          src={`/icons/${service.icon}.png`}
                          alt={service.title}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                    )}
                    <h4 className="text-2xl font-bold text-[#E8E6F3] mb-4">{service.title}</h4>
                    <p className="text-[#9B8ECF] mb-6">{service.description}</p>
                    <a
                      href="#contact"
                      className="inline-block px-6 py-3 bg-[#7B4AE3] text-white rounded-lg hover:bg-[#9B8ECF] transition-colors duration-300"
                    >
                      Contact to Discuss
                    </a>
                  </motion.div>
                ))}
              </div>
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