// ============================================================
// src/data/reviewsData.ts
// Student reviews + avatar colour palette.
// ============================================================

import type { Review } from "../../../../types/review";


export const REVIEWS: readonly Review[] = [
  {
    name: "Debjeet Roy",
    role: "Senior SDE at Standard Chartered",
    quote:
      "It was a great learning experience overall. The deadline-driven structure really pushed me to stay on track, and the weekend doubt sessions cleared so many concepts. I'm truly thankful to Anuj for explaining everything in a way anyone can understand.",
  },
  {
    name: "Gautam Batra",
    role: "SDE at Bank of America",
    quote:
      "Amazing course by Anuj Bhaiya — hands down one of the best Spring Boot courses in the industry. The depth of content, practical examples, and structured progression make it stand out from everything else I've tried.",
  },
  {
    name: "Gagan Khurana",
    role: "Software Consultant at Morgan Stanley",
    quote:
      "Loved the Spring Boot 0 to 100 course. It covers concepts at a depth I hadn't found anywhere else, and the real-world focus makes it directly applicable to what we deal with on the job.",
  },
  {
    name: "Hindol Roy",
    role: "SDE at JPMC",
    quote:
      "I found this course really helpful — thorough explanation of concepts, plus a lot of industry-ready material in one place. This covers so much more than what's genuinely available for free.",
  },
  {
    name: "Abhilash Vellanki",
    role: "Senior SDE at Oracle",
    quote:
      "Superb course! Each module is well-structured and easy to follow. The hands-on projects are particularly valuable — I was able to apply concepts to real-world scenarios immediately.",
  },
  {
    name: "Vedant Kumbhalkar",
    role: "Senior SDE at Nomura",
    quote:
      "Learning Spring Boot after Java is a must if you want to go advanced — and this is the course to do it with. It's fast, efficient, and used across companies like ours.",
  },
  {
    name: "Om Singh",
    role: "Graduate Engineer at Yamaha",
    quote:
      "I used to think I was good at Spring Boot after YouTube and Udemy, but after enrolling here I found my basics were not strong, and I wasn't even aware of advanced practices used in the industry.",
  },
  {
    name: "Abhishek Suvarnakar",
    role: "SDE at Equilend",
    quote:
      "Coding Shuttle is an excellent platform. As a working professional with limited Spring Boot experience, the teaching methodology here is clear and structured — complex concepts become easy to grasp.",
  },
  {
    name: "Jayesh Chaudhari",
    role: "SDE at Jio",
    quote:
      "The weekly homework assignments after each session are what really make this course click. Whenever I felt stuck, the Discord community had answers to most of my issues.",
  },
  {
    name: "Rounak Kumar",
    role: "SDE at Maersk",
    quote:
      "The course teaches the latest industry-wide technologies and trends. The Uber clone project ties everything together — from UML diagrams to security, real-time features, and deployment.",
  },
  {
    name: "Harsh Vaghani",
    role: "SDE-1 at Medallia",
    quote:
      "Before the course I had zero Spring Boot experience. After it, I completed 3 real projects. This course provides more value than its actual cost.",
  },
  {
    name: "Souvik Das",
    role: "SDE at Finastra",
    quote:
      "Well-structured for both beginners and intermediate developers — covering REST APIs, Spring Data JPA, Spring Security, Testing, and CI/CD deployment.",
  },
  {
    name: "Rahul Kumar",
    role: "SDE at BPCE Natixis",
    quote:
      "Anuj Bhaiya has a unique way of making complex topics feel simple. The course is beginner-friendly, well-structured, and packed with real-world examples.",
  },
  {
    name: "Ayush Raje",
    role: "SDE at Nutanix",
    quote:
      "Loved both the teaching style and course structure. It exposes you to industry practices — how to design scalable applications and approach real-world architecture.",
  },
  {
    name: "Jyoti Bharti",
    role: "SDE at Johnson Controls",
    quote:
      "The project-based learning kept me deeply engaged, and the weekly assignments reinforced every concept effectively. The doubt forum and mentor support have been exceptional.",
  },
  {
    name: "Omkar Gujar",
    role: "SDE-3 at Entegris",
    quote:
      "The course is detailed, well-structured, and covers everything from basics to advanced concepts. Even at SDE-3 I still found real depth here I hadn't seen elsewhere.",
  },
  {
    name: "Gokul Nair",
    role: "SDE at General Electric",
    quote:
      "If you want hands-on experience covering almost every concept the current industry demands, this course is for you. Low cost, high output.",
  },
  {
    name: "Viney Gautam",
    role: "Senior SDE at Albertsons Companies",
    quote:
      "I found the Spring Boot 0 to 100 course particularly effective. The content helped me develop practical skills that directly and positively impacted my career growth.",
  },
  {
    name: "Puneet Panjwani",
    role: "SDE at RxLogix",
    quote:
      "This course has been incredibly valuable! I've gained a strong grasp of key concepts and I'm confident it'll help me land my dream job.",
  },
  {
    name: "Satish Diwakar",
    role: "SDE at HIKVISION",
    quote:
      "Perfect for both beginners and those leveling up — covers everything from basics to REST APIs, JPA, Hibernate, and Spring Security. The pace is just right.",
  },
];

/**
 * Avatar background colours, cycled by review index.
 *
 * In the original inline script these are applied via:
 *     avatarColors[i % avatarColors.length]
 * The reviews grid component will use the same formula so
 * every reviewer's initial-circle has a stable, distinct colour.
 */
export const AVATAR_COLORS: readonly string[] = [
  "#4F46E5",
  "#E11D48",
  "#059669",
  "#D97706",
  "#0891B2",
  "#7C3AED",
  "#DB2777",
  "#65A30D",
] as const;