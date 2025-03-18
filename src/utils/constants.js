import { IoRibbonOutline, IoAnalyticsOutline, IoRocketOutline, IoCheckmarkDone, IoBagCheckOutline, IoCheckmarkOutline, IoFlashOutline, IoTimerOutline, IoAnalytics} from "react-icons/io5";

export const EASING = [0.25, 1, 0.5, 1];
export const Y_TRANSFORM = -15;
export const BLUR = 'blur(8px)';
export const SCALE_LG = 1.2;
export const SCALE_XL = 1.5;
export const TRANSITION_SPEED_FAST = 0.4;
export const TRANSITION_SPEED_REG = 0.7;
export const TRANSITION_SPEED_SLOW = 1;

export const SLIDE_UP_ANIMATION = {
  hidden: { opacity: 0, y: 15, filter: "blur(8px)" },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    filter: `blur(${custom.blurValue || 0}px) grayscale(${custom.grayscaleValue || 0}%)`,
    transition: { delay: custom * 0.12, duration: 1.5 },
  }),
};

export const PARTICLE_BASE_COLOR = "#999999";

export const stepsByService = {
  Development: [
    { icon: "🛠", title: "Project Kickoff", description: "Understanding your needs and defining scope." },
    { icon: "💻", title: "Development", description: "Coding the core functionality and building the UI." },
    { icon: "🚀", title: "Deployment", description: "Launching the project and ensuring a smooth rollout." },
  ],
  Design: [
    { icon: "🎨", title: "Concept Creation", description: "Defining the brand and visual direction." },
    { icon: "🖌", title: "Wireframing", description: "Creating sketches and prototypes." },
    { icon: "🖼", title: "Final Design", description: "Polishing and refining visuals for development." },
  ],
  AI: [
    { icon: "🤖", title: "Problem Analysis", description: "Understanding your needs and defining AI goals." },
    { icon: "📊", title: "Data Processing", description: "Cleaning and preparing data for training." },
    { icon: "⚙️", title: "Model Training", description: "Training and optimizing AI models." },
    { icon: "🚀", title: "Deployment", description: "Integrating AI into your application." },
  ],
};

export const services = [
  {
    title: "Web Design",
    description: "Craft a stunning website that captures your brand's essence and converts visitors into customers.",
    price: "$2500",
    features: [
      "Custom UI/UX tailored for engagement",
      "Mobile-friendly, responsive design",
      "Optimized for speed and conversions",
    ],
    timeframe: "~1 Month",
    badge: "Best Seller",
    badgeIcon: IoRibbonOutline
  },
  {
    title: "Custom Web Development",
    description: "Scalable, high-performance web applications built to grow with your business.",
    price: "$5000",
    features: [
      "Powered by modern, cutting-edge technologies",
      "Fully scalable and optimized for performance",
      "Seamless third-party integrations",
      "Full CMS integration"
    ],
    timeframe: "2+ Months",
    badge: "Most Comprehensive",
    badgeIcon: IoCheckmarkDone
  },
  {
    title: "Website Facelift",
    description: "Give your outdated website a modern, high-performing makeover that attracts and retains visitors.",
    price: "$1500",
    features: [
      "Fresh, modern redesign",
      "Performance and speed optimization",
      "SEO improvements for better rankings",
    ],
    timeframe: "1-2 weeks",
    badge: "Quick Win",
    badgeIcon: IoFlashOutline
  },
  {
    title: "AI-Powered Integrations",
    description: "Leverage AI to automate workflows, personalize user experiences, and boost engagement.",
    price: "Custom Pricing",
    features: [
      "AI-driven chatbots and automation",
      "Seamless integration with existing platforms",
      "Improves engagement and user retention",
    ],
    timeframe: "2-4 weeks",
    badge: "Easy Automation",
    badgeIcon: IoRocketOutline
  },
  {
    title: "SEO & Performance Optimization",
    description: "Rank higher on Google, drive organic traffic, and improve website speed with expert SEO strategies.",
    price: "$1500",
    features: [
      "Comprehensive keyword strategy",
      "Technical SEO & site speed enhancements",
      "Ongoing performance monitoring",
    ],
    timeframe: "2 weeks + ongoing",
    badge: "Track Your Clicks",
    badgeIcon: IoAnalyticsOutline
  },
  {
    title: "E-Commerce Solutions",
    description: "Build a seamless online store that converts visitors into loyal customers.",
    price: "$3000",
    features: [
      "Custom storefront design with intuitive UX",
      "Secure payment gateway integration",
      "Optimized for conversions and repeat sales",
      "Full CMS integration"
    ],
    timeframe: "1-2 Months + Ongoing",
    badge: "Revenue Generator",
    badgeIcon: IoBagCheckOutline
  },
];

export const MINI_SERVICES = [
  { 
    title: "AI Integrations", 
    description: [
      "Automate tasks with AI.",
      "Gain actionable insights.",
      "Enhance personalization.",
    ],
  },
  { 
    title: "Custom Development", 
    description: [
      "Robust web applications.",
      "Scalable and maintainable codebase.",
      "Seamless user interactions.",
    ],
  },
  { 
    title: "E-commerce Solutions", 
    description: [
      "Automate tasks with AI.",
      "Gain actionable insights.",
      "Enhance personalization.",
    ],
  },
  { 
    title: "SEO Optimization", 
    description: [
      "Higher search rankings.",
      "Faster website performance.",
      "Enhanced user engagement.",
    ],
  },
  { 
    title: "Web Design", 
    description: [
      "Visually stunning, responsive designs.",
      "Tailored to your brand identity.",
      "Optimized for modern user experience.",
    ],
  },
];