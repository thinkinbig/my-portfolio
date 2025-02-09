export const zh = {
  header: {
    name: "李泽宇",
  },
  hero: {
    title: "李泽宇",
    role: "计算机科学在读 / 后端开发实习生",
    introduction: "在校期间专注于分布式系统和云原生技术的学习与实践。通过项目和实习积累了 Java、Golang 开发经验，对高性能编程和微服务架构有浓厚兴趣。热衷于将理论知识应用到实际项目中。",
    viewProjects: "查看项目",
    contactMe: "联系我"
  },
  sections: {
    skills: "技术栈",
    projects: "项目经历",
    experience: "教育经历",
    contact: "联系方式",
  },
  education: {
    title: "教育经历",
    tum: {
      school: "慕尼黑工业大学",
      degree: "计算机科学硕士",
      time: "2024 - 至今",
      courses: [
        "分布式系统",
        "云计算",
        "系统编程",
        "机器学习",
        "软件工程"
      ]
    },
    kit: {
      school: "卡尔斯鲁厄理工学院",
      degree: "计算机科学学士",
      time: "2019 - 2024",
      location: "卡尔斯鲁厄, 德国"
    }
  },
  projects: {
    title: "项目经历",
    backToHome: "返回首页",
    details: {
      introduction: "项目介绍",
      requirements: "项目要求",
      technologies: "使用技术",
      challenges: "遇到的挑战",
      architecture: "系统架构"
    },
    items: [
      {
        id: "web-ide",
        title: "在线 IDE 开发",
        description: "基于微服务架构的在线代码编辑和编译平台，支持 Java 源码文件的在线编辑、编译和管理。已部署在 Google Cloud Platform，[点击访问](http://34.32.7.125)。",
        introduction: `
一个基于 Web 的集成开发环境，用户可以直接在浏览器中编写、管理和编译 Java 源码文件，无需在本地安装任何编译器或开发工具。采用微服务架构设计，提供了项目管理、源码编辑、编译执行等核心功能。

### 系统架构
系统包含以下微服务：
- **Service Registry (Eureka)**: 服务发现与注册中心
- **API Gateway**: 系统入口，统一的请求路由
- **Compiler Service**: 提供 Java 代码编译功能
- **Dark Mode Service**: 管理用户暗色模式偏好
- **Project Service**: 处理项目相关数据，集成 PostgreSQL
- **Angular UI**: 用户交互前端界面

### 部署情况
所有服务都在 Docker 容器中运行，使用 GitLab CI/CD 进行自动化部署到 Google Cloud Platform。

- 访问地址：[http://34.32.7.125](http://34.32.7.125)
- 部署平台：Google Cloud Platform (GKE)
- 运行状态：**在线** ✅
`,
        requirements: [
          `#### 项目管理
- 支持项目创建、编辑、删除
- 源码文件的版本管理
- 在线编辑器的自动保存`,

          `#### 编译功能
- Java 源码实时编译
- 编译错误实时反馈
- 支持多文件项目`,

          `#### 用户认证
- OAuth 2.0 集成
- GitLab LRZ 账号登录
- 用户会话管理`,

          `#### 微服务架构
- 服务独立部署
- 自动服务发现
- 负载均衡`,

          `#### API 网关
- 请求路由
- 认证授权
- 限流控制`,

          `#### 主题切换
- 支持亮色/暗色模式
- 每30秒自动切换（演示）
- 主题持久化`,

          `#### 容器化部署
- Docker 容器化
- Kubernetes 编排
- 自动扩缩容`,

          `#### 服务治理
- 自动服务发现
- 健康检查
- 故障转移`
        ],
        technologies: [
          `### 前端技术
- **框架**: Angular 16 + Monaco Editor
- **状态管理**: NgRx
- **部署**: Nginx + 性能优化`,

          `### 后端技术
- **框架**: Spring Boot/Cloud
- **数据库**: PostgreSQL + Redis
- **认证**: OAuth 2.0`,

          `### 容器化
- **容器**: Docker + Kubernetes
- **服务网关**: Spring Cloud Gateway
- **服务发现**: Eureka`,

          `### CI/CD
- **流水线**: GitLab CI/CD
- **镜像仓库**: Docker Registry
- **部署**: GKE`,

          `### 监控告警
- **监控**: Prometheus
- **可视化**: Grafana
- **日志**: ELK Stack`,

          `### 负载均衡
- **前端**: Nginx
- **后端**: Spring Cloud LoadBalancer
- **会话**: Redis`
        ],
        challenges: [
          "如何高效处理多用户并发编译请求（优化至 200-500ms 响应时间）",
          "如何保证代码执行安全性（防止恶意代码执行）",
          "如何优化 API 网关性能（处理高并发请求）",
          "如何提升 Web IDE 用户体验（流畅的代码编辑和错误反馈）",
          "如何保证系统可扩展性和容错性（服务自动扩缩容）",
          "如何搭建高效的 CI/CD 流水线（自动化测试和部署）",
          "如何优化容器镜像大小和构建速度（减少部署时间）",
          "如何实现服务高可用（30-60秒故障恢复）"
        ],
        tags: ["Spring Cloud", "Angular", "微服务", "Docker"],
        image: "/images/web-ide.jpg",
        architecture: {
          title: "系统架构图",
          description: "该系统采用微服务架构，通过 API 网关统一管理请求，各个微服务独立部署和扩展。系统部署在 Google Cloud Platform，[点击访问](http://34.32.7.125)。服务注册中心使用 Eureka，支持服务自动发现和注册。",
          architectureImage: "/images/web-ide-arch.png"
        },
        notice: "注意：此演示项目部署在 Google Cloud Platform 上（[点击访问](http://34.32.7.125)），将持续运行至 2025 年 5 月 1 日。",
      },
      {
        id: "tum-sysprog",
        title: "系统编程实践",
        description: "参与 TUM 系统编程课程，实现内存分配器、线程库、HTTP服务器和Shell，掌握Linux系统编程和性能优化技术",
        introduction: "参与慕尼黑工业大学的系统编程实践课程，通过四个核心实验深入理解操作系统原理和系统编程。项目涵盖了内存管理、并发编程、网络编程和进程管理等核心领域，每个实验都需要考虑性能优化和资源管理。",
        requirements: [
          "实现 malloc/free 内存分配器，支持多种分配策略",
          "开发兼容 POSIX 的线程库，实现线程创建、同步原语和调度器",
          "构建高性能 HTTP/1.1 服务器，支持并发连接和静态文件服务",
          "实现支持管道、重定向和作业控制的 Shell",
          "所有组件需通过严格的正确性和性能测试",
          "代码需符合 POSIX 标准并在 Linux 环境下运行"
        ],
        technologies: [
          "编程语言：C11",
          "操作系统：Linux",
          "内存管理：First-fit/Best-fit/Worst-fit 策略",
          "并发原语：Mutex、Condition Variable、Semaphore",
          "网络编程：Socket API、HTTP/1.1 协议",
          "进程管理：Fork、Exec、Signal、Job Control",
          "调试工具：GDB、Valgrind、strace"
        ],
        challenges: [
          "如何设计高效的内存分配算法，减少内存碎片和提高分配速度",
          "如何实现线程库的核心功能，包括上下文切换和同步原语",
          "如何优化 HTTP 服务器的并发性能，处理大量并发连接",
          "如何正确处理 Shell 中的信号和作业控制",
          "如何编写健壮的系统级代码，避免内存泄漏和竞态条件"
        ],
        tags: ["C", "Linux", "系统编程", "高性能编程"],
        image: "/images/linux-system.jpg",
      },
      {
        id: "erp-plugins",
        title: "ERP系统插件开发",
        description: "为企业级 ERP 系统开发后台插件，实现业务流程自动化和数据处理功能",
        introduction: "为大型制造企业的 ERP 系统开发定制化插件，通过插件扩展系统功能，实现特定的业务流程自动化。项目采用模块化设计，确保插件的可维护性和可扩展性。",
        requirements: [
          "开发符合企业 ERP 系统架构的插件模块",
          "实现生产计划自动排程功能",
          "开发数据分析和报表生成功能",
          "提供 REST API 接口供其他系统集成",
          "确保插件的性能和稳定性",
          "编写完整的技术文档和用户手册",
          "实现基于供应链 BOM 树的库存动态监测和报警",
          "开发供应链成本管理与分析系统，实现成本优化"
        ],
        technologies: [
          "后端：C# / .NET Framework",
          "数据库：SQL Server",
          "ORM：Entity Framework",
          "API：ASP.NET Web API",
          "报表工具：SSRS",
          "测试：NUnit, Moq",
          "文档：Swagger/OpenAPI"
        ],
        challenges: [
          "### 遗留系统集成\n" +
          "- 基于老旧的 Qt 组件库构建\n" +
          "- 复杂且不直观的 UI 设计\n" +
          "- 开发人员学习成本高\n" +
          "- 文档有限，知识传承困难\n" +
          "- 难以与现代 UI 标准保持一致",

          "### 领域知识差距\n" +
          "- 对制造业业务流程理解有限\n" +
          "- 与领域专家沟通成本高\n" +
          "- 业务规则和工作流程复杂\n" +
          "- 采用领域驱动设计 (DDD)：\n" +
          "  - 通过统一语言桥接沟通鸿沟\n" +
          "  - 对复杂业务流程进行建模\n" +
          "  - 为不同业务领域创建限界上下文\n" +
          "  - 确保业务逻辑一致性\n",

          "### 利益相关者协调\n" +
          "- 不同利益相关者对同一功能有不同期望\n" +
          "- 生产经理关注效率指标\n" +
          "- 财务团队强调成本追踪准确性\n" +
          "- 仓储人员优先考虑库存操作简便性\n" +
          "- 解决方案：\n" +
          "  - 开发模块化功能以适应不同需求\n"
        ],
        tags: ["C#", ".NET", "企业应用", "插件开发"],
        image: "/images/erp-plugins.png",
        architecture: {
          title: "系统架构图",
          description: "展示了插件系统的整体架构，包括与 ERP 核心系统的集成方式，以及数据流转过程。",
        },
      },
      {
        id: "rag-system",
        title: "教育内容 RAG 系统",
        description: "在 KIT 人类学与机器人研究所开发基于 Llama2 的 RAG 系统，致力于提高课程材料的可访问性。",
        introduction: "作为 IAR-KIT 的研究助理，实现了一个检索增强生成系统，使课程内容更具交互性。该系统处理讲义和课程材料，为学生提供准确、上下文感知的问答服务。",
        requirements: [
          "处理和向量化 KIT 讲义和教材",
          "实现教育内容的高效检索系统",
          "针对学术场景微调 Llama2",
          "创建答案质量评估指标",
          "设计用户友好的问答界面",
          "支持多种问题类型和格式"
        ],
        technologies: [
          "Llama2 用于文本生成",
          "FAISS 用于向量存储",
          "Sentence-transformers 用于嵌入",
          "Python FastAPI 后端",
          "Streamlit 用于演示界面",
          "Hugging Face transformers",
          "PyTorch 用于模型处理"
        ],
        challenges: [
          "### 学术内容处理\n" +
          "- 开发针对技术内容的专门分词\n" +
          "- 处理数学公式和图表\n" +
          "- 维护跨讲座章节的上下文",
          "### 模型优化\n" +
          "- 针对学术领域微调 Llama2\n" +
          "- 平衡响应准确性和生成速度\n" +
          "- 实现高效的上下文窗口管理",
          "### 教育准确性\n" +
          "- 确保响应与课程材料一致\n" +
          "- 开发基于源讲义的验证\n" +
          "- 创建面向学术的评估指标"
        ],
        tags: ["RAG", "Llama2", "NLP", "研究"],
        image: "/images/rag-system.png"
      }
    ]
  },
  skills: {
    distribution: '技能分布',
    labels: {
      Frontend: '前端开发',
      Backend: '后端开发',
      DevOps: '运维开发',
      'ML/AI': '机器学习'
    },
    frontend: {
      title: "前端开发",
      items: [
        {
          name: "TypeScript / JavaScript",
          level: 90,
          description: "熟练使用 TypeScript 进行类型安全的开发，深入理解 JavaScript 异步编程"
        },
        {
          name: "React / Next.js",
          level: 85,
          description: "使用 React 生态系统构建现代化 Web 应用，熟悉 SSR 和 CSR"
        },
        {
          name: "Vue.js",
          level: 80,
          description: "了解 Vue 的响应式原理，能够开发和维护中大型 Vue 项目"
        },
        {
          name: "Angular",
          level: 75,
          description: "掌握 Angular 的依赖注入和模块化开发，有企业级应用开发经验"
        },
        {
          name: "Node.js / Express",
          level: 85,
          description: "使用 Node.js 开发 RESTful API，了解事件循环和异步编程模型"
        },
        {
          name: "RESTful API",
          level: 90,
          description: "设计并实现符合 REST 规范的 API，注重安全性和可扩展性"
        }
      ]
    },
    backend: {
      title: "后端开发",
      items: [
        {
          name: "Java / Spring",
          level: 95,
          description: "四年 Java 开发经验，精通 Spring Boot/Cloud 微服务开发，深入理解面向对象设计模式"
        },
        {
          name: "系统编程",
          level: 85,
          description: "参与 TUM 系统编程课程，实现过内存分配器、线程库、HTTP 服务器和 Shell，熟悉 Linux 系统编程和性能优化"
        },
        {
          name: "分布式系统",
          level: 90,
          description: "深入理解分布式系统理论，使用 Go 实现过分布式共识算法，熟悉 Paxos、Raft 等协议，有实际的系统设计经验"
        },
        {
          name: "中间件",
          level: 88,
          description: "熟练使用 Kafka、Redis、RocketMQ、RabbitMQ、ZooKeeper 等中间件，了解其实现原理"
        },
        {
          name: "网络编程",
          level: 85,
          description: "掌握 gRPC、HTTP、WebSocket 等协议，有网络服务器开发经验"
        },
        {
          name: "高性能编程",
          level: 85,
          description: "了解并发编程模型，熟练使用 Linux 性能分析和调优工具，有高性能系统设计和优化经验"
        },
        {
          name: ".NET / C#",
          level: 85,
          description: "企业级 ERP 系统插件开发经验，熟悉 C# 和 .NET 框架，了解企业应用架构设计"
        },
        {
          name: "数据库",
          level: 88,
          description: "精通 MySQL 性能优化和内部原理，熟悉 PostgreSQL、MongoDB 等数据库，了解分布式数据库分区策略和数据冗余设计"
        }
      ]
    },
    devops: {
      title: "DevOps & 云服务",
      items: [
        {
          name: "CI/CD",
          level: 85,
          description: "熟练使用 GitLab CI/CD 工作流，编写自动化部署脚本，掌握 DevOps 最佳实践"
        },
        {
          name: "容器技术",
          level: 88,
          description: "熟悉 Docker、Docker-Compose 和 Kubernetes，能够编写 Dockerfile 和容器编排配置"
        },
        {
          name: "云平台",
          level: 85,
          description: "使用过 Google Cloud、AWS、Azure 等云平台，了解云原生架构和扩展策略"
        },
        {
          name: "自动化运维",
          level: 85,
          description: "编写 Python 自动化脚本，实现系统监控和运维自动化，熟悉常见运维工具"
        }
      ]
    },
    ml: {
      title: "机器学习",
      items: [
        {
          name: "深度学习",
          level: 80,
          description: "理解神经网络基础架构，熟悉 CNN、Transformer 等模型，了解深度学习框架的使用"
        },
        {
          name: "传统机器学习",
          level: 82,
          description: "掌握聚类算法、线性模型、决策树、支持向量机等经典算法，了解模型评估方法"
        },
        {
          name: "LLM 应用",
          level: 78,
          description: "了解 Prompt 工程和微调技术，使用 LangChain 构建过 RAG 系统，熟悉大语言模型应用开发"
        }
      ]
    }
  },
  contact: {
    title: "联系方式",
    email: {
      label: "邮箱",
      value: "[lizeyu1101@gmail.com](mailto:lizeyu1101@gmail.com)"
    },
    github: {
      label: "GitHub",
      value: "[https://github.com/thinkinbig](https://github.com/thinkinbig)"
    },
    linkedin: {
      label: "领英",
      value: "[https://www.linkedin.com/in/zeyu-li-44242930a/](https://www.linkedin.com/in/zeyu-li-44242930a/)"
    },
    location: {
      label: "所在地",
      value: "[慕尼黑, 德国](https://www.google.com/maps/place/M%C3%BCnchen,+Germany)"
    }
  }
}; 