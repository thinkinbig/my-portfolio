export const en = {
  header: {
    name: "Zeyu Li",
    title: "Portfolio",
    navigation: {
      visualizations: "Data Visualization",
      blog: "Blog"
    }
  },
  hero: {
    title: "Zeyu Li",
    role: "Computer Science Student / Backend Developer",
    introduction: "Currently studying distributed systems and cloud-native technologies. Gained hands-on experience with Java and Golang through academic projects and internships. Passionate about high-performance computing and microservices architecture. Eager to apply theoretical knowledge in practical projects.",
    viewProjects: "View Projects",
    contactMe: "Contact Me"
  },
  sections: {
    skills: "Skills",
    projects: "Projects",
    experience: "Education",
    contact: "Contact",
  },
  education: {
    title: "Education",
    tum: {
      school: "Technical University of Munich",
      degree: "Master of Science in Computer Science",
      time: "2024 - Present",
      courses: [
        "Distributed Systems",
        "Cloud Computing",
        "System Programming",
        "Machine Learning",
        "Software Engineering"
      ]
    },
    kit: {
      school: "Karlsruhe Institute of Technology",
      degree: "Bachelor of Science in Computer Science",
      time: "2019 - 2024",
      location: "Karlsruhe, Germany"
    }
  },
  skills: {
    distribution: 'Skills Distribution',
    labels: {
      Frontend: 'Frontend',
      Backend: 'Backend',
      DevOps: 'DevOps',
      'ML/AI': 'ML/AI'
    },
    frontend: {
      title: "Frontend Development",
      items: [
        {
          name: "TypeScript / JavaScript",
          level: 90,
          description: "Proficient in type-safe development with TypeScript, deep understanding of JavaScript async programming"
        },
        {
          name: "React / Next.js",
          level: 85,
          description: "Building modern web applications with React ecosystem, familiar with SSR and CSR"
        },
        {
          name: "Vue.js",
          level: 80,
          description: "Understanding Vue's reactivity system, capable of developing and maintaining large Vue projects"
        },
        {
          name: "Angular",
          level: 75,
          description: "Mastering dependency injection and modular development in Angular, experience with enterprise applications"
        },
        {
          name: "Node.js / Express",
          level: 85,
          description: "Developing RESTful APIs with Node.js, understanding event loop and async programming model"
        },
        {
          name: "RESTful API",
          level: 90,
          description: "Designing and implementing REST-compliant APIs with focus on security and scalability"
        }
      ]
    },
    backend: {
      title: "Backend Development",
      items: [
        {
          name: "Java / Spring",
          level: 95,
          description: "4 years of Java development, proficient in Spring Boot/Cloud microservices, deep understanding of OOP design patterns"
        },
        {
          name: "Systems Programming",
          level: 85,
          description: "Completed TUM systems programming course, implemented memory allocator, thread library, HTTP server and Shell, proficient in Linux systems programming and performance optimization"
        },
        {
          name: "Distributed Systems",
          level: 90,
          description: "Deep understanding of distributed systems theory, implemented consensus algorithms in Go, familiar with Paxos, Raft protocols, practical system design experience"
        },
        {
          name: "Middleware",
          level: 88,
          description: "Proficient with Kafka, Redis, RocketMQ, RabbitMQ, ZooKeeper, understanding of their internal mechanisms"
        },
        {
          name: "Network Programming",
          level: 85,
          description: "Mastery of gRPC, HTTP, WebSocket protocols, experience in network server development"
        },
        {
          name: "High-Performance",
          level: 85,
          description: "Understanding of concurrent programming models, proficient with Linux performance analysis and tuning tools, experience in high-performance system design and optimization"
        },
        {
          name: ".NET / C#",
          level: 85,
          description: "Experience in enterprise ERP system plugin development, proficient with C# and .NET framework, familiar with enterprise application architecture"
        },
        {
          name: "Databases",
          level: 88,
          description: "Expert in MySQL optimization and internals, proficient with PostgreSQL and MongoDB, understanding of distributed database partitioning and redundancy design"
        }
      ]
    },
    devops: {
      title: "DevOps & Cloud",
      items: [
        {
          name: "CI/CD",
          level: 85,
          description: "Proficient with GitLab CI/CD workflows, automation scripts, and DevOps best practices"
        },
        {
          name: "Containerization",
          level: 88,
          description: "Experience with Docker, Docker-Compose and Kubernetes, capable of writing Dockerfiles and orchestration configs"
        },
        {
          name: "Cloud Platforms",
          level: 85,
          description: "Worked with Google Cloud, AWS, Azure, understanding of cloud-native architecture and scaling strategies"
        },
        {
          name: "Automation",
          level: 85,
          description: "Python automation scripts for system monitoring and maintenance, familiar with common DevOps tools"
        }
      ]
    },
    ml: {
      title: "Machine Learning",
      items: [
        {
          name: "Deep Learning",
          level: 80,
          description: "Understanding of neural network architectures, familiar with CNN, Transformer models, and deep learning frameworks"
        },
        {
          name: "Classical ML",
          level: 82,
          description: "Proficient in clustering algorithms, linear models, decision trees, SVM, and model evaluation techniques"
        },
        {
          name: "LLM Applications",
          level: 78,
          description: "Understanding of prompt engineering and fine-tuning, experience with RAG systems using LangChain, familiar with LLM application development"
        }
      ]
    }
  },
  projects: {
    title: "Projects",
    backToHome: "Back to Home",
    details: {
      introduction: "Introduction",
      requirements: "Requirements",
      technologies: "Technologies",
      challenges: "Challenges",
      architecture: "System Architecture"
    },
    items: [
      {
        id: "web-ide",
        title: "Online IDE Development",
        description: "A microservices-based online code editing and compilation platform supporting Java source file editing, compilation, and management. Deployed on Google Cloud Platform, [click to visit](http://34.32.7.125).",
        introduction: `A web-based integrated development environment where users can write, manage, and compile Java source code directly in the browser without installing any local compilers or development tools. Built with a microservices architecture, providing core features like project management, code editing, and compilation execution.

System includes multiple microservices:
- Service Registry (Eureka): Service discovery
- API Gateway: System entry point and request routing
- Compiler Service: Provides compilation functionality
- Dark Mode Service: Manages user dark mode preferences
- Project Service: Handles project-related data, integrates with PostgreSQL
- Angular UI: User interaction frontend

All services run in Docker containers and are automatically deployed to Google Cloud Platform using GitLab CI/CD.`,
        requirements: [
          "Project and source code file management (CRUD)",
          "Java source code compilation and execution",
          "OAuth 2.0 (GitLab LRZ) authentication",
          "Microservices architecture with independent deployment",
          "API Gateway for request routing and authentication",
          "Dark mode support (auto-switches every 30 seconds to showcase functionality)",
          "Containerized deployment with Docker",
          "Service auto-discovery and registration"
        ],
        technologies: [
          "Frontend: Angular + Monaco Editor + NgRx",
          "Frontend Deployment: Nginx Reverse Proxy + Performance Optimization",
          "Backend: Spring Boot Microservices",
          "Database: PostgreSQL / Redis Caching",
          "Authentication: OAuth 2.0 (GitLab LRZ)",
          "Containerization: Docker + Kubernetes",
          "API Gateway: Spring Cloud Gateway",
          "Service Discovery: Spring Cloud Eureka",
          "CI/CD: GitLab CI/CD + Docker Registry",
          "Cloud Deployment: Google Cloud Platform (GKE)",
          "Monitoring: Prometheus + Grafana",
          "Load Balancing: Nginx + Spring Cloud LoadBalancer"
        ],
        challenges: [
          "How to efficiently handle concurrent compilation requests from multiple users (optimized to 200-500ms response time)",
          "How to ensure code execution security (preventing malicious code execution)",
          "How to optimize API Gateway performance (handling high concurrent requests)",
          "How to improve Web IDE user experience (smooth code editing and error feedback)",
          "How to ensure system scalability and fault tolerance (service auto-scaling)",
          "How to build efficient CI/CD pipelines (automated testing and deployment)",
          "How to optimize container image size and build speed (reducing deployment time)",
          "How to implement service high availability (30-60s service auto-recovery)"
        ],
        tags: ["Spring Cloud", "Angular", "Microservices", "Docker"],
        image: "/images/web-ide.jpg",
        architecture: {
          title: "System Architecture",
          description: "The system adopts a microservices architecture, managing requests through an API Gateway, with independently deployed and scalable microservices. Deployed on Google Cloud Platform, [click to visit](http://34.32.7.125). Service registry uses Eureka for service auto-discovery and registration.",
          architectureImage: "/images/web-ide-arch.png"
        },
        notice: "Notice: This demo project is hosted on Google Cloud Platform ([click to visit](http://34.32.7.125)) and will be available until May 1st, 2025.",
      },
      {
        id: "tum-sysprog",
        title: "Systems Programming Practice",
        description: "Participated in TUM systems programming course, implemented memory allocator, thread library, HTTP server and Shell, mastered Linux systems programming and performance optimization",
        introduction: "Participated in the Technical University of Munich's systems programming course, gaining deep understanding of operating system principles and systems programming through four core experiments. The project covers memory management, concurrent programming, network programming, and process management, with each experiment requiring careful consideration of performance optimization and resource management.",
        requirements: [
          "Implement malloc/free memory allocator with multiple allocation strategies",
          "Develop POSIX-compliant thread library with thread creation, synchronization primitives, and scheduler",
          "Build high-performance HTTP/1.1 server supporting concurrent connections and static file serving",
          "Implement Shell with pipes, redirection, and job control",
          "All components must pass strict correctness and performance tests",
          "Code must comply with POSIX standards and run in Linux environment"
        ],
        technologies: [
          "Programming Language: C11",
          "Operating System: Linux",
          "Memory Management: First-fit/Best-fit/Worst-fit strategies",
          "Concurrency Primitives: Mutex, Condition Variable, Semaphore",
          "Network Programming: Socket API, HTTP/1.1 protocol",
          "Process Management: Fork, Exec, Signal, Job Control",
          "Debugging Tools: GDB, Valgrind, strace"
        ],
        challenges: [
          "How to design efficient memory allocation algorithms to reduce fragmentation and improve allocation speed",
          "How to implement core thread library functionality, including context switching and synchronization primitives",
          "How to optimize HTTP server concurrent performance to handle many concurrent connections",
          "How to properly handle signals and job control in Shell",
          "How to write robust system-level code avoiding memory leaks and race conditions"
        ],
        tags: ["C", "Linux", "Systems Programming", "High Performance"],
        image: "/images/linux-system.jpg",
      },
      {
        id: "erp-plugins",
        title: "ERP System Plugin Development",
        description: "Developed backend plugins for enterprise ERP system, implementing business process automation and data processing functionalities",
        introduction: "Development of customized plugins for a large manufacturing enterprise's ERP system, extending system functionality through plugins to achieve specific business process automation. The project employs modular design to ensure plugin maintainability and extensibility.",
        requirements: [
          "Develop plugins compliant with enterprise ERP system architecture",
          "Implement production planning automation functionality",
          "Develop data analysis and report generation features",
          "Provide REST API interfaces for third-party system integration",
          "Ensure plugin performance and stability",
          "Create comprehensive technical documentation and user manuals",
          "Implement dynamic inventory monitoring and alerting based on supply chain BOM tree",
          "Develop cost management and analysis system for supply chain optimization"
        ],
        technologies: [
          "Backend: C# / .NET Framework",
          "Database: SQL Server",
          "ORM: Entity Framework",
          "API: ASP.NET Web API",
          "Reporting: SSRS",
          "Testing: NUnit, Moq",
          "Documentation: Swagger/OpenAPI"
        ],
        challenges: [
          "### Legacy System Integration\n" +
          "- Built with outdated Qt component library\n" +
          "- Complex and non-intuitive UI design\n" +
          "- High learning curve for new developers\n" +
          "- Limited documentation and tribal knowledge\n" +
          "- Challenges in maintaining consistency with modern UI standards",
          "### Domain Knowledge Gap\n" +
          "- Limited understanding of manufacturing industry business processes\n" +
          "- High communication cost with domain experts\n" +
          "- Complex business rules and workflows\n" +
          "- Implemented Domain-Driven Design (DDD) to:\n" +
          "  - Bridge communication gap with ubiquitous language\n" +
          "  - Model complex business processes\n" +
          "  - Create bounded contexts for different business areas\n" +
          "  - Ensure business logic consistency",
          "### Stakeholder Alignment\n" +
          "- Different stakeholders had varying expectations for the same features\n" +
          "- Production managers focused on efficiency metrics\n" +
          "- Financial team emphasized cost tracking accuracy\n" +
          "- Warehouse staff prioritized inventory operation simplicity\n" +
          "- Solutions implemented:\n" +
          "  - Developed modular features to accommodate different needs\n"
        ],
        tags: ["C#", ".NET", "Enterprise", "Plugin Development"],
        image: "/images/erp-plugins.png",
        architecture: {
          title: "System Architecture",
          description: "Illustrates the overall plugin system architecture, including integration with the ERP core system and data flow processes."
        },
      },
      {
        id: "rag-system",
        title: "RAG System for Educational Content",
        description: "Developed a RAG system using Llama2 at KIT Institute for Anthropomatics and Robotics, focusing on enhancing lecture material accessibility.",
        introduction: "As a research student at IAR-KIT, implemented a retrieval-augmented generation system to make lecture content more interactive. The system processes lecture slides and course materials to provide accurate, context-aware responses to student queries.",
        requirements: [
          "Process and vectorize KIT lecture slides and materials",
          "Implement efficient retrieval system for educational content",
          "Fine-tune Llama2 for academic context",
          "Create evaluation metrics for answer quality",
          "Design user-friendly Q&A interface",
          "Support multiple question types and formats"
        ],
        technologies: [
          "Llama2 for text generation",
          "FAISS for vector storage",
          "Sentence-transformers for embeddings",
          "Python FastAPI backend",
          "Streamlit for demo interface",
          "Hugging Face transformers",
          "PyTorch for model handling"
        ],
        challenges: [
          "### Academic Content Processing\n" +
          "- Developed specialized tokenization for technical content\n" +
          "- Handled mathematical formulas and diagrams\n" +
          "- Maintained context across lecture sections",
          "### Model Optimization\n" +
          "- Fine-tuned Llama2 for academic domain\n" +
          "- Balanced response accuracy and generation speed\n" +
          "- Implemented efficient context window management",
          "### Educational Accuracy\n" +
          "- Ensured responses align with course material\n" +
          "- Developed verification against source slides\n" +
          "- Created academic-focused evaluation metrics"
        ],
        tags: ["RAG", "Llama2", "NLP", "Research"],
        image: "/images/rag-system.png"
      }
    ]
  },
  contact: {
    title: "Contact Me",
    email: {
      label: "Email",
      value: "[lizeyu1101@gmail.com](mailto:lizeyu1101@gmail.com)"
    },
    github: {
      label: "GitHub",
      value: "[github.com/thinkinbig](https://github.com/thinkinbig)"
    },
    linkedin: {
      label: "LinkedIn",
      value: "[linkedin.com/in/zeyu-li-44242930a/](https://www.linkedin.com/in/zeyu-li-44242930a/)"
    },
    location: {
      label: "Location",
      value: "[Munich, Germany](https://www.google.com/maps/place/M%C3%BCnchen,+Germany)"
    }
  },
  notFound: {
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist or has been moved.",
    backHome: "Back to Home"
  },
  visualizations: {
    title: "Data Visualizations",
    d3: {
      title: "D3.js Examples",
      description: "Interactive data visualizations created with D3.js, showcasing various chart types and animation effects.",
      viewDetails: "View Details"
    },
    helloworld: {
      title: "Hello World",
      description: "A simple Hello World example demonstrating basic data visualization concepts.",
      viewDetails: "View Details"
    },
    knowledgeGraph: {
      title: "Knowledge Graph",
      description: "An interactive knowledge graph built with Notion database, showing relationships between concepts.",
      viewDetails: "View Details"
    }
  }
} as const; 