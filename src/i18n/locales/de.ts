export const de = {
  header: {
    name: "Zeyu Li",
  },
  hero: {
    title: "Zeyu Li",
    role: "Informatik Student / Backend-Entwickler Praktikant",
    introduction: "Studiere derzeit verteilte Systeme und Cloud-Native-Technologien. Praktische Erfahrung mit Java und Golang durch akademische Projekte und Praktika. Begeistert von Hochleistungsrechnen und Microservices-Architektur. Engagiert, theoretisches Wissen in praktischen Projekten anzuwenden.",
    viewProjects: "Projekte ansehen",
    contactMe: "Kontakt"
  },
  sections: {
    skills: "Fähigkeiten",
    projects: "Projekte",
    experience: "Praktika",
    contact: "Kontakt",
  },
  skills: {
    frontend: {
      title: "Frontend-Entwicklung",
      items: [
        {
          name: "TypeScript / JavaScript",
          level: 90,
          description: "Versiert in typsicherer Entwicklung mit TypeScript, tiefes Verständnis der JavaScript-Async-Programmierung"
        },
        {
          name: "React / Next.js",
          level: 85,
          description: "Entwicklung moderner Webanwendungen mit React-Ökosystem, vertraut mit SSR und CSR"
        },
        {
          name: "Vue.js",
          level: 80,
          description: "Verständnis des Vue-Reaktivitätssystems, Entwicklung und Wartung großer Vue-Projekte"
        },
        {
          name: "Angular",
          level: 75,
          description: "Beherrschung von Dependency Injection und modularer Entwicklung in Angular, Erfahrung mit Unternehmensanwendungen"
        },
        {
          name: "Node.js / Express",
          level: 85,
          description: "Entwicklung von RESTful APIs mit Node.js, Verständnis von Event Loop und asynchroner Programmierung"
        },
        {
          name: "RESTful API",
          level: 90,
          description: "Entwurf und Implementierung REST-konformer APIs mit Fokus auf Sicherheit und Skalierbarkeit"
        }
      ]
    },
    backend: {
      title: "Backend-Entwicklung",
      items: [
        {
          name: "Java / Spring",
          level: 95,
          description: "4 Jahre Java-Entwicklung, versiert in Spring Boot/Cloud Microservices, tiefes Verständnis von OOP-Designmustern"
        },
        {
          name: "Systemprogrammierung",
          level: 85,
          description: "Absolvierung des TUM-Systemprogrammierungskurses, Implementierung von Speicher-Allocator, Thread-Bibliothek, HTTP-Server und Shell, versiert in Linux-Systemprogrammierung und Leistungsoptimierung"
        },
        {
          name: "Verteilte Systeme",
          level: 90,
          description: "Tiefes Verständnis der Theorie verteilter Systeme, Implementierung von Konsensalgorithmen in Go, vertraut mit Paxos, Raft-Protokollen, praktische Systemdesign-Erfahrung"
        },
        {
          name: "Middleware",
          level: 88,
          description: "Versiert in Kafka, Redis, RocketMQ, RabbitMQ, ZooKeeper, Verständnis ihrer internen Mechanismen"
        },
        {
          name: "Netzwerkprogrammierung",
          level: 85,
          description: "Beherrschung von gRPC, HTTP, WebSocket-Protokollen, Erfahrung in der Netzwerkserver-Entwicklung"
        },
        {
          name: "Hochleistung",
          level: 85,
          description: "Verständnis von Concurrent-Programming-Modellen, versiert in Linux-Performance-Analyse und Optimierungswerkzeugen, Erfahrung in Hochleistungssystemdesign und -optimierung"
        },
        {
          name: ".NET / C#",
          level: 85,
          description: "Erfahrung in der Entwicklung von Enterprise-ERP-System-Plugins, versiert in C# und .NET-Framework, vertraut mit Enterprise-Anwendungsarchitektur"
        },
        {
          name: "Datenbanken",
          level: 88,
          description: "Experte für MySQL-Optimierung und Interna, versiert in PostgreSQL und MongoDB, Verständnis von verteiltem Datenbank-Partitionierung und Redundanzdesign"
        }
      ]
    },
    devops: {
      title: "DevOps & Cloud",
      items: [
        {
          name: "CI/CD",
          level: 85,
          description: "Versiert in GitLab CI/CD-Workflows, Automatisierungsskripten und DevOps-Best-Practices"
        },
        {
          name: "Containerisierung",
          level: 88,
          description: "Erfahrung mit Docker, Docker-Compose und Kubernetes, Fähigkeit zum Schreiben von Dockerfiles und Orchestrierungskonfigurationen"
        },
        {
          name: "Cloud-Plattformen",
          level: 85,
          description: "Erfahrung mit Google Cloud, AWS, Azure, Verständnis von Cloud-Native-Architektur und Skalierungsstrategien"
        },
        {
          name: "Automatisierung",
          level: 85,
          description: "Python-Automatisierungsskripte für Systemüberwachung und -wartung, vertraut mit gängigen DevOps-Tools"
        }
      ]
    },
    ml: {
      title: "Maschinelles Lernen",
      items: [
        {
          name: "Deep Learning",
          level: 80,
          description: "Verständnis von neuronalen Netzwerkarchitekturen, vertraut mit CNN, Transformer-Modellen und Deep-Learning-Frameworks"
        },
        {
          name: "Klassisches ML",
          level: 82,
          description: "Versiert in Clustering-Algorithmen, linearen Modellen, Entscheidungsbäumen, SVM und Modellbewertungstechniken"
        },
        {
          name: "LLM-Anwendungen",
          level: 78,
          description: "Verständnis von Prompt-Engineering und Fine-Tuning, Erfahrung mit RAG-Systemen unter Verwendung von LangChain, vertraut mit LLM-Anwendungsentwicklung"
        }
      ]
    }
  },
  projects: {
    title: "Projekte",
    backToHome: "Zurück zur Startseite",
    details: {
      introduction: "Einführung",
      requirements: "Anforderungen",
      technologies: "Technologien",
      challenges: "Herausforderungen",
      architecture: "Systemarchitektur"
    },
    items: [
      {
        id: "web-ide",
        title: "Online-IDE-Entwicklung",
        description: "Eine mikroservicebasierte Online-Plattform für Code-Bearbeitung und Kompilierung mit Unterstützung für Java-Quelldateien. Bereitgestellt auf Google Cloud Platform, [hier klicken](http://34.32.7.125).",
        introduction: `Eine webbasierte Entwicklungsumgebung, in der Benutzer Java-Quellcode direkt im Browser schreiben, verwalten und kompilieren können, ohne lokale Compiler oder Entwicklungstools installieren zu müssen. Aufgebaut mit einer Mikroservice-Architektur, die Kernfunktionen wie Projektverwaltung, Code-Bearbeitung und Kompilierungsausführung bietet.

System umfasst mehrere Mikroservices:
- Service Registry (Eureka): Service-Discovery
- API Gateway: Systemeingangspunkt und Request-Routing
- Compiler Service: Stellt Kompilierungsfunktionalität bereit
- Dark Mode Service: Verwaltet Benutzer-Dark-Mode-Einstellungen
- Project Service: Handhabt projektbezogene Daten, Integration mit PostgreSQL
- Angular UI: Frontend für Benutzerinteraktion

Alle Services laufen in Docker-Containern und werden automatisch über GitLab CI/CD auf Google Cloud Platform bereitgestellt.`,
        requirements: [
          "Projekt- und Quellcode-Dateiverwaltung (CRUD)",
          "Java-Quellcode-Kompilierung und -Ausführung",
          "OAuth 2.0 (GitLab LRZ) Authentifizierung",
          "Mikroservice-Architektur mit unabhängiger Bereitstellung",
          "API-Gateway für Request-Routing und Authentifizierung",
          "Dark-Mode-Unterstützung (automatischer Wechsel alle 30 Sekunden zur Funktionsdemonstration)",
          "Containerisierte Bereitstellung mit Docker",
          "Service-Auto-Discovery und -Registrierung"
        ],
        technologies: [
          "Frontend: Angular + Monaco Editor + NgRx",
          "Frontend-Deployment: Nginx Reverse Proxy + Leistungsoptimierung",
          "Backend: Spring Boot Mikroservices",
          "Datenbank: PostgreSQL / Redis Caching",
          "Authentifizierung: OAuth 2.0 (GitLab LRZ)",
          "Containerisierung: Docker + Kubernetes",
          "API-Gateway: Spring Cloud Gateway",
          "Service-Discovery: Spring Cloud Eureka",
          "CI/CD: GitLab CI/CD + Docker Registry",
          "Cloud-Deployment: Google Cloud Platform (GKE)",
          "Monitoring: Prometheus + Grafana",
          "Lastverteilung: Nginx + Spring Cloud LoadBalancer"
        ],
        challenges: [
          "Wie man gleichzeitige Kompilierungsanfragen von mehreren Benutzern effizient handhabt (optimiert auf 200-500ms Antwortzeit)",
          "Wie man Code-Ausführungssicherheit gewährleistet (Verhinderung bösartiger Code-Ausführung)",
          "Wie man die API-Gateway-Leistung optimiert (Handhabung vieler gleichzeitiger Anfragen)",
          "Wie man die Web-IDE-Benutzererfahrung verbessert (flüssige Code-Bearbeitung und Fehler-Feedback)",
          "Wie man Systemskalierbarkeit und Fehlertoleranz sicherstellt (Service-Auto-Skalierung)",
          "Wie man effiziente CI/CD-Pipelines aufbaut (automatisierte Tests und Bereitstellung)",
          "Wie man Container-Image-Größe und Build-Geschwindigkeit optimiert (Reduzierung der Bereitstellungszeit)",
          "Wie man Service-Hochverfügbarkeit implementiert (30-60s Service-Auto-Recovery)"
        ],
        tags: ["Spring Cloud", "Angular", "Mikroservices", "Docker"],
        image: "/images/web-ide.jpg",
        architecture: {
          title: "Systemarchitektur",
          description: "Das System verwendet eine Mikroservices-Architektur, verwaltet Anfragen über ein API-Gateway und verfügt über unabhängig bereitgestellte und skalierbare Mikroservices. Bereitgestellt auf Google Cloud Platform, [hier klicken](http://34.32.7.125). Service-Registry nutzt Eureka für Service-Auto-Discovery und -Registrierung."
        },
        architectureImage: "/images/web-ide-arch.png"
      },
      {
        id: "tum-sysprog",
        title: "Systemprogrammierung Praktikum",
        description: "Teilnahme am TUM-Systemprogrammierungskurs, Implementierung von Speicher-Allocator, Thread-Bibliothek, HTTP-Server und Shell, Beherrschung der Linux-Systemprogrammierung und Leistungsoptimierung",
        introduction: "Teilnahme am Systemprogrammierungspraktikum der Technischen Universität München, tiefgehendes Verständnis von Betriebssystemprinzipien und Systemprogrammierung durch vier Kernexperimente. Das Projekt umfasst Speicherverwaltung, nebenläufige Programmierung, Netzwerkprogrammierung und Prozessverwaltung, wobei jedes Experiment sorgfältige Berücksichtigung von Leistungsoptimierung und Ressourcenverwaltung erfordert.",
        requirements: [
          "Implementierung eines malloc/free Speicher-Allocators mit mehreren Allokationsstrategien",
          "Entwicklung einer POSIX-konformen Thread-Bibliothek mit Thread-Erstellung, Synchronisationsprimitiven und Scheduler",
          "Aufbau eines hochleistungsfähigen HTTP/1.1-Servers mit Unterstützung für gleichzeitige Verbindungen und statisches Dateiserving",
          "Implementierung einer Shell mit Pipes, Umleitung und Job-Control",
          "Alle Komponenten müssen strenge Korrektheit- und Leistungstests bestehen",
          "Code muss POSIX-Standards entsprechen und in Linux-Umgebung laufen"
        ],
        technologies: [
          "Programmiersprache: C11",
          "Betriebssystem: Linux",
          "Speicherverwaltung: First-fit/Best-fit/Worst-fit Strategien",
          "Nebenläufigkeitsprimitive: Mutex, Condition Variable, Semaphore",
          "Netzwerkprogrammierung: Socket API, HTTP/1.1 Protokoll",
          "Prozessverwaltung: Fork, Exec, Signal, Job Control",
          "Debugging-Tools: GDB, Valgrind, strace"
        ],
        challenges: [
          "Wie man effiziente Speicherallokationsalgorithmen entwirft, um Fragmentierung zu reduzieren und Allokationsgeschwindigkeit zu verbessern",
          "Wie man Kernfunktionalität der Thread-Bibliothek implementiert, einschließlich Kontextwechsel und Synchronisationsprimitive",
          "Wie man die gleichzeitige Leistung des HTTP-Servers optimiert, um viele gleichzeitige Verbindungen zu handhaben",
          "Wie man Signale und Job-Control in der Shell korrekt handhabt",
          "Wie man robusten Systemcode schreibt und dabei Speicherlecks und Race Conditions vermeidet"
        ],
        tags: ["C", "Linux", "Systemprogrammierung", "Hochleistung"],
        image: "/images/linux-system.jpg",
      },
      {
        id: "erp-plugins",
        title: "ERP-System Plugin-Entwicklung",
        description: "Entwicklung von Backend-Plugins für Enterprise-ERP-System, Implementierung von Geschäftsprozessautomatisierung und Datenverarbeitungsfunktionen",
        introduction: "Entwicklung maßgeschneiderter Plugins für das ERP-System eines großen Produktionsunternehmens, Erweiterung der Systemfunktionalität durch Plugins zur Automatisierung spezifischer Geschäftsprozesse. Das Projekt verwendet modulares Design, um die Wartbarkeit und Erweiterbarkeit der Plugins sicherzustellen.",
        requirements: [
          "Entwicklung von Plugins gemäß der Enterprise-ERP-Systemarchitektur",
          "Implementierung von Produktionsplanungsautomatisierung",
          "Entwicklung von Datenanalyse- und Berichtserstellungsfunktionen",
          "Bereitstellung von REST-API-Schnittstellen für Drittsystemintegration",
          "Sicherstellung der Plugin-Leistung und -Stabilität",
          "Erstellung umfassender technischer Dokumentation und Benutzerhandbücher"
        ],
        technologies: [
          "Backend: C# / .NET Framework",
          "Datenbank: SQL Server",
          "ORM: Entity Framework",
          "API: ASP.NET Web API",
          "Berichtswesen: SSRS",
          "Tests: NUnit, Moq",
          "Dokumentation: Swagger/OpenAPI"
        ],
        challenges: [
          "Funktionserweiterung ohne Beeinträchtigung des Kernsystems",
          "Verarbeitung großer Mengen gleichzeitiger Datenverarbeitungsanfragen",
          "Sicherstellung der Plugin-Abwärtskompatibilität",
          "Optimierung der Leistung komplexer Geschäftslogik",
          "Aufrechterhaltung der Datenverarbeitungsgenauigkeit und -konsistenz"
        ],
        tags: ["C#", ".NET", "Enterprise", "Plugin-Entwicklung"],
        image: "/images/erp-plugins.jpg",
        architecture: {
          title: "Systemarchitektur",
          description: "Veranschaulicht die Gesamtarchitektur des Plugin-Systems, einschließlich der Integration mit dem ERP-Kernsystem und der Datenflussprozesse."
        },
        architectureImage: "/images/erp-arch.png"
      }
    ]
  }
}; 