import { PricingDataProps } from "./types";

export const featureCards = [
    {
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of experience",
      gradient: "from-purple-100 to-purple-50",
    },
    {
      title: "Flexible Learning",
      description: "Study at your own pace, anytime and anywhere",
      gradient: "from-blue-100 to-blue-50",
    },
    {
      title: "Practical Projects",
      description: "Apply your knowledge with hands-on exercises",
      gradient: "from-pink-100 to-pink-50",
    },
    {
      title: "Community Support",
      description: "Connect with fellow learners and instructors",
      gradient: "from-yellow-100 to-yellow-50",
    },
    {
      title: "Completion Certificates",
      description: "Earn recognized certificates to showcase your skills",
      gradient: "from-green-100 to-green-50",
    },
    {
      title: "Regular Updates",
      description: "Access new content and stay up-to-date with industry trends",
      gradient: "from-orange-100 to-orange-50",
    },
  ]


  
  export const pricingData: PricingDataProps[] = [
    {
      id: 1,
      title: "Basic",
      suscriptionMonth: "$9.99",
      suscriptionYear: "$99.99",
      features: [
        "Access to 50+ courses",
        "Basic course completion certificates",
        "7-day free trial",
      ],
      popular: false,
      buttonText: "Get started",
      href:'/checkout/basic'
    },
    {
      id: 1,
      title: "Custom",
      suscriptionMonth: "$19.99",
      suscriptionYear: "$199.99",
      features: [
        "Access to 50+ courses",
        "Basic course completion certificates",
        "7-day free trial",
      ],
      popular: true,
      buttonText: "Get started",
      href:'/checkout/custom'
    },
    {
      id: 1,
      title: "Pro",
      suscriptionMonth: "$19.99",
      suscriptionYear: "$199.99",
      features: [
        "Access to 50+ courses",
        "Basic course completion certificates",
        "7-day free trial",
      ],
      popular: false,
      buttonText: "Get started",
      href:'/checkout/pro'
    },
  ];
  