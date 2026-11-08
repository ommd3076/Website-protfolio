export interface PublicRepo {
  name: string;
  category:
    | "Systems & Architecture"
    | "AI & Machine Learning"
    | "Algorithms & Data Structures"
    | "Web & Full-Stack"
    | "Automation & CI/CD";
  description: string;
  language: string;
  stars: number;
  url: string;
}

export const VERIFIED_PUBLIC_REPOS: readonly PublicRepo[] = [
  {
    name: "atlas-journey-trip-planner",
    category: "Algorithms & Data Structures",
    description:
      "Full-stack collaborative trip planning application that demonstrates Dijkstra's Algorithm, 0-1 Knapsack, and Heap Sort through route optimization, budget-aware itinerary generation, and attraction ranking.",
    language: "JavaScript",
    stars: 1,
    url: "https://github.com/ommd3076/atlas-journey-trip-planner",
  },
  {
    name: "silver-computing-machine",
    category: "AI & Machine Learning",
    description:
      "DebugLeaf / Q-VANTIS: Prototype developed for the Quant-A-Maze 3.0 challenge evaluating logistics dispatch.",
    language: "Python",
    stars: 0,
    url: "https://github.com/ommd3076/silver-computing-machine",
  },
  {
    name: "fluffy-couscous",
    category: "AI & Machine Learning",
    description:
      "AR Portal: In-browser Augmented Reality and hand tracking built with React 19, Three.js (WebGL), and MediaPipe Tasks Vision.",
    language: "JavaScript",
    stars: 0,
    url: "https://github.com/ommd3076/fluffy-couscous",
  },
  {
    name: "SIH-123",
    category: "Systems & Architecture",
    description:
      "Distributed Fleet Coordination (SIH26123): Simulation of ten autonomous mobile robots coordinating routes in smart warehouses without a central controller.",
    language: "Python",
    stars: 0,
    url: "https://github.com/ommd3076/SIH-123",
  },
  {
    name: "frontend-fleetio",
    category: "Web & Full-Stack",
    description:
      "FleetIO: A browser visual simulation of ten warehouse AGVs using React, Three.js, and a Web Worker to coordinate warehouse routing.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/ommd3076/frontend-fleetio",
  },
  {
    name: "nmit-frontend",
    category: "Web & Full-Stack",
    description:
      "arQ: Frontend dispatch interface for reviewing routes, vehicle proposals, and solver outputs (Quant-A-Maze 3.0).",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/ommd3076/nmit-frontend",
  },
  {
    name: "ArcadeO",
    category: "Web & Full-Stack",
    description:
      "ArcadeO V1: Installable arcade supporting remote and together play with server-authoritative rules and offline input pause.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/ommd3076/ArcadeO",
  },
  {
    name: "Sports-prediction-model-2026",
    category: "AI & Machine Learning",
    description:
      "Sports match outcome, win probability, and score prediction application built with Python (Flask) and Scikit-Learn.",
    language: "Python",
    stars: 0,
    url: "https://github.com/ommd3076/Sports-prediction-model-2026",
  },
  {
    name: "carbon-tracker",
    category: "Systems & Architecture",
    description:
      "Household carbon emissions tracking web application built with Python (Flask), Supabase (PostgreSQL), and vanilla frontend.",
    language: "Python",
    stars: 0,
    url: "https://github.com/ommd3076/carbon-tracker",
  },
  {
    name: "wll-hx",
    category: "Web & Full-Stack",
    description:
      "wxll.hx: Live visual instrument and face-tracked synthesizer rendering real-time graphic filters in JavaScript.",
    language: "JavaScript",
    stars: 0,
    url: "https://github.com/ommd3076/wll-hx",
  },
  {
    name: "devops-internals",
    category: "Automation & CI/CD",
    description:
      "DevOps Internals & Lab Practicals: Collection of laboratory practicals, containerization experiments, and continuous integration exercises.",
    language: "HTML",
    stars: 0,
    url: "https://github.com/ommd3076/devops-internals",
  },
  {
    name: "DSA",
    category: "Algorithms & Data Structures",
    description: "Data Structures and Algorithms practice problems and solutions in Python.",
    language: "Python",
    stars: 0,
    url: "https://github.com/ommd3076/DSA",
  },
  {
    name: "Stegnography",
    category: "Algorithms & Data Structures",
    description: "Image steganography and data concealment scripts in Python.",
    language: "Python",
    stars: 0,
    url: "https://github.com/ommd3076/Stegnography",
  },
  {
    name: "Cerenetics",
    category: "Systems & Architecture",
    description: "Cerenetics organization repository and frontend application workspace.",
    language: "JavaScript",
    stars: 0,
    url: "https://github.com/ommd3076/Cerenetics",
  },
  {
    name: "cerenetics-core",
    category: "Systems & Architecture",
    description: "Cerenetics core foundational library in JavaScript.",
    language: "JavaScript",
    stars: 0,
    url: "https://github.com/ommd3076/cerenetics-core",
  },
  {
    name: "Website-protfolio",
    category: "Web & Full-Stack",
    description:
      "Personal portfolio and web application workspace built with TanStack Start, React 19, and Vite.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/ommd3076/Website-protfolio",
  },
  {
    name: "Jenkins-CLG",
    category: "Automation & CI/CD",
    description: "Jenkins CI/CD build automation and laboratory practicals in Java.",
    language: "Java",
    stars: 0,
    url: "https://github.com/ommd3076/Jenkins-CLG",
  },
  {
    name: "Leetcode-solutions",
    category: "Algorithms & Data Structures",
    description: "LeetCode problem solutions and algorithmic implementations in Java.",
    language: "Java",
    stars: 0,
    url: "https://github.com/ommd3076/Leetcode-solutions",
  },
  {
    name: "geek-for-geeks-problems",
    category: "Algorithms & Data Structures",
    description:
      "GeeksforGeeks practice problem solutions and algorithmic implementations in Java.",
    language: "Java",
    stars: 0,
    url: "https://github.com/ommd3076/geek-for-geeks-problems",
  },
  {
    name: "python-programs-L-",
    category: "Algorithms & Data Structures",
    description:
      "Collection of Python programming scripts, academic assignments, and laboratory exercises.",
    language: "Python",
    stars: 0,
    url: "https://github.com/ommd3076/python-programs-L-",
  },
  {
    name: "CLG-FSD-BASICS",
    category: "Web & Full-Stack",
    description: "Full-stack development laboratory assignments and foundational web exercises.",
    language: "HTML",
    stars: 0,
    url: "https://github.com/ommd3076/CLG-FSD-BASICS",
  },
  {
    name: "CLG-GIT-BASICS",
    category: "Automation & CI/CD",
    description: "College Git laboratory exercises and version control practicals.",
    language: "Python",
    stars: 0,
    url: "https://github.com/ommd3076/CLG-GIT-BASICS",
  },
  {
    name: "college-git-basics",
    category: "Automation & CI/CD",
    description: "College version control and Git laboratory fundamentals.",
    language: "Python",
    stars: 0,
    url: "https://github.com/ommd3076/college-git-basics",
  },
  {
    name: "OM",
    category: "Web & Full-Stack",
    description: "Personal portfolio repository.",
    language: "Markdown",
    stars: 0,
    url: "https://github.com/ommd3076/OM",
  },
  {
    name: "Medico",
    category: "Web & Full-Stack",
    description: "Healthcare informatics portal repository.",
    language: "JavaScript",
    stars: 0,
    url: "https://github.com/ommd3076/Medico",
  },
  {
    name: "DAA-programs-practice",
    category: "Algorithms & Data Structures",
    description: "Design and Analysis of Algorithms laboratory programs and practice exercises.",
    language: "C/C++",
    stars: 0,
    url: "https://github.com/ommd3076/DAA-programs-practice",
  },
  {
    name: "agy-mux",
    category: "Systems & Architecture",
    description: "Developer workflow and session multiplexer repository.",
    language: "Shell",
    stars: 0,
    url: "https://github.com/ommd3076/agy-mux",
  },
] as const;
