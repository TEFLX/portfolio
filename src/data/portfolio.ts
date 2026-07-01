import missingComponentImg from "@/assets/missing component.jpg";
import teflxImg from "@/assets/teflx.png";
import snapcraftImg from "@/assets/snapcraft.png";
import senworxLogo from "@/assets/senworx.png";
import cetpaLogo from "@/assets/cetpa.jfif";
import csirLogo from "@/assets/csir.png";
import spicemoneyLogo from "@/assets/spicemoney.jfif";
import orqelixLogo from "@/assets/orqelix.png";

export const profile = {
  name: "Ritik Kashyap",
  first: "RITIK",
  last: "KASHYAP",
  location: "Noida, India",
  status: "Open to opportunities",
  email: "ritikteflx@gmail.com",
  github: "https://github.com/teflx/",
  githubHandle: "teflx",
  linkedin: "https://www.linkedin.com/in/ritik-kashyap-290688146/",
  linkedinHandle: "linkedin.com/in/ritik-kashyap",
  company: "Orqelix",
  tagline:
    "Computer Science graduate and Founder of Orqelix, building AI-powered software with Python, Data Science, Machine Learning, and Computer Vision—turning industrial data into intelligent real-time systems.",
  quote: "Building technology that transforms ideas into practical solutions.",
  titles: [
    "Python Developer",
    "AI Engineer",
    "ML Engineer",
    "Flutter Developer",
    "Founder · Orqelix",
  ],
  mailUrl: "https://mail.google.com/mail/?view=cm&fs=1&to=ritikteflx@gmail.com",
  repoSearch: "https://github.com/teflx?tab=repositories",
};

export const stats = [
  { label: "Repos", value: 12, suffix: "" },
  { label: "Images processed", value: 15, suffix: "K+" },
  { label: "CGPA", value: 8.2, decimals: 1, suffix: "" },
  { label: "Internships", value: 4, suffix: "" },
];

export const projects = [
  {
    title: "Missing Component Detection",
    summary:
      "YOLOv8-powered industrial visual inspection system with automated QR tagging, defect classification, and report generation. Processes 15K+ images for real manufacturing clients.",
    tags: ["YOLOv8", "OpenCV", "PyQt5", "Python", "Computer Vision"],
    url: "https://github.com/TEFLX/Missing-componet-detection.git",
    status: "Production",
    featured: true,
    image: missingComponentImg,
    metrics: [
      { label: "Core Tech", value: "YOLOv8 + OpenCV", tone: "purple" },
      { label: "Scale", value: "15K+ images", tone: "cyan" },
      { label: "Confidence", value: "85% threshold", tone: "blue" },
    ],
  },
  {
    title: "TEFLX Shop Management",
    summary:
      "Inventory, billing, backup/restore and customer management POS system with face-recognition attendance. Delivered for a real client via Orqelix (Jan 2026).",
    tags: ["Face Recognition", "OpenCV", "Python", "SQLite"],
    url: "https://github.com/TEFLX/Teflx-shop-management.git",
    status: "Client live",
    featured: true,
    image: teflxImg,

    metrics: [
    { label: "Core Tech", value: "Python + SQLite", tone: "purple" },
    { label: "Modules", value: "POS + Inventory", tone: "cyan" },
    { label: "Client", value: "Real Business", tone: "blue" },
  ],

  },
  {
    title: "SnapCraft Nexus",
    summary:
      "Linux GUI for Snapcraft package management — reduced software setup time by 50% for new users with live terminal log output and intuitive interface.",
    tags: ["PyQt5", "Snapcraft", "Linux", "Python"],
    url: "https://github.com/TEFLX/LINUX-APPLICATION-GUI-INSTALLER-WITH-TERMINAL-LOG.git",
    status: "Open source",
    featured: true,
    image: snapcraftImg,

    metrics: [
    { label: "Core Tech", value: "PyQt5 + Linux", tone: "purple" },
    { label: "Platform", value: "Snapcraft", tone: "cyan" },
    { label: "Impact", value: "50% Faster Setup", tone: "blue" },
  ],

  },
];

const VERIFY_URL = "https://www.linkedin.com/in/ritik-kashyap-290688146/";

export const experience = [
  {
    role: "Founder & Self-Employed",
    company: "Orqelix",
    period: "Sep 2025 – Present",
    location: "Noida, India",
    current: true,
    color: "#d4d4d8",
    logo: orqelixLogo,
    bullets: [
      "Founded Orqelix, an independent software and AI venture.",
      "Delivered TEFLX Shop Management for a real client in Jan 2026.",
      "Built applications using Python, Flutter and SQLite.",
      "Managed end-to-end product development and support.",
    ],
    metrics: [
      { label: "Core Tech", value: "Python, Flutter, React", tone: "purple" },
      { label: "Platform", value: "Desktop, Mobile, web", tone: "cyan" },
      { label: "Impact", value: "client delivery", tone: "blue" },
    ],
    links: {
      linkedin: "https://www.linkedin.com/company/orqelix/",
      instagram: "https://www.instagram.com/orqelix.tech",
      github: "https://github.com/orqelix",
      gmail: "https://mail.google.com/mail/?view=cm&fs=1&to=orqelix@gmail.com",
    },
  },
  {
    role: "Data Science Intern",
    company: "Senworx Tangible Pvt. Ltd.",
    period: "Jan 2025 – Jun 2025",
    location: "Chandigarh, India",
    color: "#a1a1aa",
    verifyUrl: VERIFY_URL,
    logo: senworxLogo,
    bullets: [
      "Built YOLOv8 and OpenCV computer vision solutions.",
      "Contributed to Missing Component Detection project.",
      "Optimized models and image preprocessing pipelines.",
      "Collaborated on production workflows end-to-end.",
    ],
  },
  {
    role: "SAP MM Intern",
    company: "CETPA Infotech Pvt. Ltd.",
    period: "Aug 2024 – Nov 2024",
    location: "Noida, India",
    color: "#a1a1aa",
    verifyUrl: VERIFY_URL,
    logo: cetpaLogo,
    bullets: [
      "Worked on SAP MM procurement processes.",
      "Managed material and vendor master concepts.",
      "Explored MM–FI integration workflows.",
      "Supported inventory and invoice management.",
    ],
  },
  {
    role: "Machine Learning Trainee",
    company: "CSIR-CMERI",
    period: "Jun 2024 – Jul 2024",
    location: "Ludhiana, India",
    color: "#a1a1aa",
    verifyUrl: VERIFY_URL,
    logo: csirLogo,
    bullets: [
      "Developed predictive ML models for research tasks.",
      "Performed preprocessing and feature engineering.",
      "Evaluated model performance and accuracy.",
      "Applied AI to scientific research workflows.",
    ],
  },
  {
    role: "Technical Intern — Python & SQL",
    company: "Spice Money",
    period: "Jul 2023 – Aug 2023",
    location: "Mohali, India",
    color: "#a1a1aa",
    verifyUrl: VERIFY_URL,
    logo: spicemoneyLogo,
    bullets: [
      "Built Python and SQL automations for data pipelines.",
      "Processed and validated large datasets.",
      "Reduced manual effort significantly with scripts.",
      "Improved overall workflow efficiency.",
    ],
  },
];

export const education = [
  {
    degree: "Bachelor of Technology (B.Tech) — Computer Science and Engineering",
    institution: "Guru Nanak Dev Engineering College, Ludhiana",
    period: "Aug 2022 – Jun 2025",
    location: "Ludhiana, India",
    grade: "8.02",
    detail: "Coursework spanning OOP, DSA, DBMS, OS, Computer Networks, AI/ML and software engineering.",
  },
  {
    degree: "Diploma — Computer Science and Engineering",
    institution: "Mehr Chand Polytechnic College",
    period: "Aug 2019 – Jun 2022",
    location: "Jalandhar, India",
    grade: "7.7",
    detail: "Foundation in programming, databases, computer fundamentals and troubleshooting.",
  },
];

export const skillGroups = [
  {
    title: "Programming",
    icon: "code",
    items: ["Python", "SQL", "C", "C++", "PHP", "HTML5"],
  },
  {
    title: "AI / Machine Learning",
    icon: "brain",
    items: ["PyTorch", "TensorFlow", "Scikit-learn", "YOLOv8", "OpenCV", "SciPy"],
  },
  {
    title: "Flutter",
    icon: "mobile",
    items: ["Flutter", "Dart", "Mobile Dev", "SQLite"],
  },
  {
    title: "Data & Visualization",
    icon: "chart",
    items: ["Pandas", "NumPy", "Matplotlib", "Power BI", "Anaconda"],
  },
  {
    title: "Databases",
    icon: "database",
    items: ["PostgreSQL", "Oracle DB", "MySQL", "SQLite"],
  },
  {
    title: "Tools & Platforms",
    icon: "terminal",
    items: ["Git", "Linux (Red Hat)", "Django", "Flask", "SAP MM"],
  },
];

export const exploring = [
  {
    title: "Python Development",
    sub:
      "Building scalable backend applications, automation tools, REST APIs and production-ready software."
  },
  {
    title: "Data Science",
    sub:
      "Data analysis, feature engineering, predictive modeling and data visualization using modern Python libraries."
  },
  {
    title: "AI & Machine Learning",
    sub:
      "Computer Vision, Deep Learning, Generative AI, LLMs and intelligent business automation."
  },
  {
    title: "Developer Tools",
    sub:
      "Git, Docker, Linux, PostgreSQL, CI/CD workflows and cloud deployment for modern software development."
  }
];