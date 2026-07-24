export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  thumbnailUrl: string; 
  githubUrl?: string;
  liveUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details: string[];
}

export const educationData: Education[] = [
  {
    id: "1",
    degree: "B.Tech in Computer Science Engineering",
    institution: "Raghu Institute of Technology",
    period: "2022 — 2026",
    details: ["Batch CSE-D", "Focus on Full-Stack Architecture, AI APIs, and System Design"],
  }
];

export const projectsData: Project[] = [
  {
    id: "1",
    title: "MedShare Chain",
    description: "Decentralized secure healthcare data sharing system utilizing blockchain and IPFS for immutable file storage.",
    techStack: ["Blockchain", "IPFS", "React", "Node.js"],
    thumbnailUrl: "/assets/medshare.jpg", // Create an empty 'assets' folder in 'public' and add placeholder images later
    githubUrl: "#",
  },
  {
    id: "2",
    title: "LeukAI",
    description: "Full-stack diagnostic platform employing deep learning models for medical image classification.",
    techStack: ["Python", "Deep Learning", "React", "FastAPI"],
    thumbnailUrl: "/assets/leukai.jpg",
    githubUrl: "#",
  },
  {
    id: "3",
    title: "SARA (AI Companion)",
    description: "Personal AI companion featuring voice interaction, text-to-speech, and desktop automation capabilities.",
    techStack: ["Python", "LLMs", "Speech Recognition"],
    thumbnailUrl: "/assets/sara.jpg",
    githubUrl: "#",
  },
  {
    id: "4",
    title: "PulseStream",
    description: "MERN stack web application engineered with real-time Socket.io features.",
    techStack: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
    thumbnailUrl: "/assets/pulsestream.jpg",
    liveUrl: "#",
  }
];

export const experienceData: Experience[] = [
  {
    id: "1",
    role: "Virtual Intern",
    company: "Deloitte",
    period: "2025",
    description: "Solved real-world coding challenges and authored comprehensive client proposal documents.",
  }
];