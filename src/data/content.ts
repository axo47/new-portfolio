export type Lang = "fr" | "en";
export type L<T> = Record<Lang, T>;

export type Kind = "engineering" | "research" | "teaching" | "leadership";

export interface Experience {
  id: string;
  org: string;
  role: L<string>;
  sub?: L<string>;
  period: L<string>;
  kind: Kind;
  bullets: L<string[]>;
  tags: string[];
}

/** Bold segments are wrapped in **double asterisks**. */

export const links = {
  email: "ezzedinehassibkevin@gmail.com",
  linkedin: "https://linkedin.com/in/kevin-ezzedine",
  github: "https://github.com/Axo47",
  site: "https://axo47.github.io",
  cv: { fr: "/cv/Kevin_Ezzedine_CV_FR.pdf", en: "/cv/Kevin_Ezzedine_CV_EN.pdf" } as L<string>,
};

export const ui = {
  nav: {
    top: { fr: "Introduction", en: "Introduction" },
    intersection: { fr: "Intersection", en: "Intersection" },
    research: { fr: "Recherche", en: "Research" },
    experience: { fr: "Expérience", en: "Experience" },
    skills: { fr: "Compétences", en: "Skills" },
    education: { fr: "Formation", en: "Education" },
    awards: { fr: "Bourses", en: "Awards" },
    contact: { fr: "Contact", en: "Contact" },
  } as Record<string, L<string>>,
  hero: {
    label: { fr: "§ 0.1 — Kevin Ezzedine", en: "§ 0.1 — Kevin Ezzedine" },
    abstract: { fr: "Résumé.", en: "Abstract." },
    road: { fr: "Road to PhD", en: "Road to PhD" } as L<string>,
    text: {
      fr: "Étudiant en 4e année du baccalauréat en génie logiciel (GPA 3.89/4.0) à Polytechnique Montréal, avec une mineure en mathématiques (GPA 4.3/4.3) à l'Université de Montréal. Je m'intéresse à l'endroit où les bases de données, les mathématiques appliquées et l'IA se rejoignent. Stagiaire de recherche au DAIS (Polytechnique Montréal) sur les moteurs de requêtes factorisés (FFX, jusqu'à 50x plus rapide), développeur full-stack chez Axians (Azure SQL, Prisma), formateur en IA (PolyAI) et fondateur de PolyMath.",
      en: "Fourth-year Software Engineering student (B.Eng., GPA 3.89/4.0) at Polytechnique Montréal, with a minor in Mathematics (GPA 4.3/4.3) at Université de Montréal. I am drawn to where databases, applied mathematics and AI meet. Research intern at DAIS (Polytechnique Montréal) on factorized query engines (FFX, up to 50x faster), full-stack developer at Axians (Azure SQL, Prisma), AI instructor (PolyAI) and founder of PolyMath.",
    } as L<string>,
    nowLabel: { fr: "En ce moment", en: "Now" },
    now: [
      { org: "Axians Canada", role: { fr: "Développeur full-stack", en: "Full-stack developer" } },
      { org: "Polytechnique Montréal", role: { fr: "Chargé de laboratoire, INF3710", en: "Lab instructor, INF3710" } },
      { org: "PolyMath", role: { fr: "Fondateur et président", en: "Founder & president" } },
    ] as { org: string; role: L<string> }[],
    tri: [
      { name: { fr: "Bases de données", en: "Databases" }, sub: { fr: "table de hachage", en: "hash table" } },
      { name: { fr: "IA", en: "AI" }, sub: { fr: "mot suivant", en: "next token" } },
      { name: { fr: "Mathématiques", en: "Mathematics" }, sub: { fr: "variété différentiable", en: "smooth manifold" } },
      { name: { fr: "Optimisation", en: "Optimization" }, sub: { fr: "ordonnancement", en: "scheduling" } },
    ] as { name: L<string>; sub: L<string> }[],
    triCaption: {
      fr: "Quatre concepts dans les domaines que j'aime : table de hachage 3D, LLM, variété différentiable, ordonnancement par décomposition de matrices.",
      en: "Four concepts from the fields I enjoy: 3D hash table, LLM, smooth manifold, scheduling by matrix decomposition.",
    } as L<string>,
    cv: { fr: "./cv.pdf", en: "./cv.pdf" },
    photoAlt: { fr: "Portrait de Kevin Ezzedine", en: "Portrait of Kevin Ezzedine" },
  },
  intersection: {
    label: { fr: "§ 0.2 — Intersection", en: "§ 0.2 — Intersection" },
    title: {
      fr: "Un point milieu entre les bases de données, l'IA et les mathématiques appliquées.",
      en: "A midpoint between databases, AI and applied mathematics.",
    } as L<string>,
    intro: {
      fr: "Ce qui m'attire, c'est là où ces trois domaines se rejoignent : des données qu'on peut interroger efficacement, des systèmes qui apprennent, et des méthodes qui se démontrent.",
      en: "What draws me is where these three fields meet: data that can be queried efficiently, systems that learn, and methods that can be proven.",
    } as L<string>,
    sets: {
      db: { fr: "Bases de données", en: "Databases" },
      ai: { fr: "IA", en: "AI" },
      math: { fr: "Maths appliquées", en: "Applied Math" },
    } as Record<string, L<string>>,
    pairs: {
      dbAi: { name: { fr: "RAG", en: "RAG" }, note: { fr: "récupération d'information pour les LLM", en: "retrieval for LLMs" } },
      dbMath: { name: { fr: "FFX", en: "FFX" }, note: { fr: "moteur de requêtes factorisé", en: "factorized query engine" } },
      aiMath: { name: { fr: "Optimisation", en: "Optimization" }, note: { fr: "recherche stochastique, probabilités", en: "stochastic search, probability" } },
    } as Record<string, { name: L<string>; note: L<string> }>,
    center: {
      fr: "des systèmes qui interrogent, apprennent et se démontrent",
      en: "systems that query, learn and can be proven",
    } as L<string>,
    figures: [
      { set: "db", caption: { fr: "Programmation dynamique (Bellman) dans l'optimiseur : on calcule le meilleur plan de chaque paire de tables, puis on le réutilise pour joindre la troisième. On garde le coût minimal : (A ⋈ C) ⋈ B coûte 150, contre 600 et 2100.", en: "Dynamic programming (Bellman) in the optimizer: compute the best plan for every pair of tables, then reuse it to join the third. The minimum cost wins: (A ⋈ C) ⋈ B costs 150, against 600 and 2100." } },
      { set: "ai", caption: { fr: "Descente de gradient sur une surface de perte en 3D : θₖ₊₁ = θₖ − η · g(θₖ), où g est le gradient.", en: "Gradient descent on a 3D loss surface: θₖ₊₁ = θₖ − η · g(θₖ), where g is the gradient." } },
      { set: "math", caption: { fr: "Décomposition en valeurs singulières : une application linéaire envoie le cercle sur une ellipse.", en: "Singular value decomposition: a linear map sends the unit circle to an ellipse." } },
    ] as { set: string; caption: L<string> }[],
    remarks: [
      {
        id: "db",
        title: { fr: "Bases de données", en: "Databases" },
        text: {
          fr: "Moteur de requêtes factorisé FFX (C++20), Azure SQL, Prisma, DuckDB, chargé de laboratoire INF3710.",
          en: "FFX factorized query engine (C++20), Azure SQL, Prisma, DuckDB, INF3710 lab instructor.",
        },
      },
      {
        id: "ai",
        title: { fr: "IA", en: "AI" },
        text: {
          fr: "Formateur PolyAI, atelier RAG avec démonstration en direct au GDG, bourse UPIR en intelligence artificielle, PyTorch, TensorFlow, scikit-learn.",
          en: "PolyAI instructor, live RAG workshop at GDG, UPIR scholarship in artificial intelligence, PyTorch, TensorFlow, scikit-learn.",
        },
      },
      {
        id: "math",
        title: { fr: "Mathématiques appliquées", en: "Applied mathematics" },
        text: {
          fr: "Mineure en mathématiques (UdeM), bourse UPIR en mathématiques, théorie des graphes, probabilités et optimisation, fondateur et président de PolyMath.",
          en: "Minor in mathematics (UdeM), UPIR scholarship in mathematics, graph theory, probability and optimization, founder and president of PolyMath.",
        },
      },
    ] as { id: string; title: L<string>; text: L<string> }[],
  },
  research: {
    label: { fr: "§ 1 — Recherche", en: "§ 1 — Research" },
    awards: { fr: "Bourses", en: "Awards" },
    award: { fr: "Bourse", en: "Award" },
  },
  experience: { label: { fr: "§ 2 — Expérience", en: "§ 2 — Experience" } },
  skills: {
    label: { fr: "§ 3 — Répertoire technique", en: "§ 3 — Technical Repertoire" },
    let: { fr: "Soit", en: "Let" },
  },
  education: {
    label: { fr: "§ 0.3 — Formation", en: "§ 0.3 — Education" },
    figures: [
      { set: "db", caption: { fr: "Schéma relationnel : une jointure suit les clés étrangères (Student ⋈ Program ⋈ School).", en: "Relational schema: a join walks the foreign keys (Student ⋈ Program ⋈ School)." } },
      { set: "math", caption: { fr: "Théorème central limite : une planche de Galton fait converger la somme de choix aléatoires vers une loi normale.", en: "Central limit theorem: a Galton board makes a sum of random choices converge to a normal law." } },
      { set: "ai", caption: { fr: "Auto-attention : chaque mot répartit son poids sur les autres, softmax(QKᵀ/√dₖ)V.", en: "Self-attention: each token spreads its weight over the others, softmax(QKᵀ/√dₖ)V." } },
    ] as { set: string; caption: L<string> }[],
  },
  awardsSection: {
    label: { fr: "§ 4 — Bourses", en: "§ 4 — Awards" } as L<string>,
    award: { fr: "Bourse", en: "Award" } as L<string>,
  },
  contact: {
    label: { fr: "§ 5 — Contact", en: "§ 5 — Contact" } as L<string>,
    correspondence: { fr: "Correspondance.", en: "Correspondence." } as L<string>,
    affiliation: { fr: "Polytechnique Montréal · Université de Montréal", en: "Polytechnique Montréal · Université de Montréal" } as L<string>,
    refs: { fr: "Références", en: "References" } as L<string>,
    cv: { fr: "CV (français)", en: "CV (English)" } as L<string>,
    email: { fr: "Courriel", en: "Email" } as L<string>,
    copy: { fr: "copier le courriel", en: "copy email" } as L<string>,
    copied: { fr: "copié ✓", en: "copied ✓" } as L<string>,
    quote: { fr: "« La seule façon d'apprendre les mathématiques est d'en faire. »", en: "\"The only way to learn mathematics is to do mathematics.\"" } as L<string>,
    author: "— Paul Halmos",
    cvFr: { fr: "CV (français)", en: "CV (French)" },
    cvEn: { fr: "CV (anglais)", en: "CV (English)" },
  },
};

export const researchCards: {
  id: string;
  kicker: L<string>;
  title: L<string>;
  text: L<string>;
  metric?: { value: string; label: L<string> };
  tags: string[];
}[] = [
  {
    id: "ffx",
    kicker: { fr: "DAIS — Polytechnique Montréal · mai – oct. 2026", en: "DAIS — Polytechnique Montréal · May – Oct. 2026" },
    title: { fr: "FFX — Moteur de requêtes factorisé", en: "FFX — Factorized Query Engine" },
    text: {
      fr: "Conception d'un système de caching intégré à une architecture push-based qui réutilise les sous-arbres à coût de calcul élevé. Implémentation de 2 opérateurs pipelinés (InLJoinWithCache, Probe), d'une table de hachage à chaînage, et extension du contrôle de flux pour les requêtes linéaires et à embranchements.",
      en: "Designed a caching system integrated into a push-based architecture that reuses high-cost subtrees. Implemented 2 pipelined operators (InLJoinWithCache, Probe) and a chained hashing table, and extended the control flow for linear and branch queries.",
    },
    metric: { value: "50×", label: { fr: "filtres complexes plus rapides", en: "faster complex filters" } },
    tags: ["C++20", "Push-based", "Caching", "Chained hashing"],
  },
];

export const awards: L<string[]> = {
  fr: [
    "Bourse de recherche de premier cycle (BRPC) — CRSNG",
    "Bourse UPIR — Initiation à la recherche au 1er cycle en mathématiques (Polytechnique Montréal)",
    "Bourse UPIR — Initiation à la recherche au 1er cycle en intelligence artificielle (Polytechnique Montréal)",
  ],
  en: [
    "NSERC Undergraduate Student Research Award (USRA / BRPC)",
    "UPIR Scholarship — Undergraduate Research Initiation in Mathematics (Polytechnique Montréal)",
    "UPIR Scholarship — Undergraduate Research Initiation in Artificial Intelligence (Polytechnique Montréal)",
  ],
};

export const experiences: Experience[] = [
  {
    id: "polymath",
    org: "PolyMath",
    role: { fr: "Fondateur et Président", en: "Founder & President" },
    sub: { fr: "Club de mathématiques", en: "Mathematics club" },
    period: { fr: "mai 2026 – présent", en: "May 2026 – present" },
    kind: "leadership",
    bullets: {
      fr: [
        "Créer le premier club de mathématiques à Polytechnique Montréal en fondant et structurant PolyMath avec une équipe fondatrice d'une **dizaine** de membres.",
        "Stimuler la compétition mathématique de haut niveau en organisant un tournoi (style MIT Integration Bee) sur le thème du **développement durable**.",
        "Diversifier les activités du club en organisant un **panel de discussion**, en complément des compétitions et activités de recherche.",
        "Contribuer à la recherche étudiante en réalisant **2 activités de recherche**, dont une étude sur le tri par comparaison à 3 issues et une étude d'approximation de graphes.",
      ],
      en: [
        "Create the first mathematics club at Polytechnique Montréal by founding and structuring PolyMath with a founding team of about **ten** members.",
        "Drive high-level mathematical competition by organizing a tournament (MIT Integration Bee style) on the theme of **sustainable development**.",
        "Diversify the club's activities by organizing a **discussion panel**, in addition to competitions and research activities.",
        "Contribute to undergraduate research by completing **2 research projects**, including a study on 3-way comparison sorting and a graph approximation study.",
      ],
    },
    tags: ["Leadership", "Mathematics", "Research"],
  },
  {
    id: "dais",
    org: "DAIS — Polytechnique Montréal",
    role: { fr: "Stagiaire de recherche", en: "Research Intern" },
    sub: { fr: "Moteur de requêtes factorisé FFX (C++20)", en: "Factorized Query Engine FFX (C++20)" },
    period: { fr: "mai 2026 – oct. 2026", en: "May 2026 – Oct. 2026" },
    kind: "research",
    bullets: {
      fr: [
        "Accélérer le traitement de filtres complexes jusqu'à **50x** en concevant un système de caching intégré à une architecture *push-based*, permettant la réutilisation de sous-arbres à coût de calcul élevé.",
        "Étendre les capacités du moteur en implémentant **2** nouveaux opérateurs pipelinés (`InLJoinWithCache` et `Probe`), ainsi qu'une table de hachage à chaînage pour le système de cache.",
        "Supporter les requêtes linéaires et à embranchements en étendant le contrôle de flux du moteur, incluant les opérations de projection et d'intersection.",
      ],
      en: [
        "Speed up complex filter processing by up to **50x** by designing a caching system integrated into a *push-based* architecture, enabling reuse of high-cost subtrees.",
        "Extend the engine's capabilities by implementing **2** new pipelined operators (`InLJoinWithCache` and `Probe`), along with a chained hashing table for the caching system.",
        "Support linear and branch queries by extending the engine's control flow, including projection and intersection operations.",
      ],
    },
    tags: ["C++20", "Query engines", "Caching"],
  },
  {
    id: "axians",
    org: "Axians Canada",
    role: { fr: "Développeur logiciel full-stack", en: "Full-Stack Software Developer" },
    period: { fr: "mai 2025 – déc. 2026", en: "May 2025 – Dec. 2026" },
    kind: "engineering",
    bullets: {
      fr: [
        "Améliorer la **scalabilité du système** et la **productivité des équipes** de chaque département en concevant et implémentant une architecture microservices adoptée à l'échelle de l'entreprise (**300 personnes**).",
        "Livrer des fonctionnalités **full-stack** en concevant l'architecture (**NestJS/Angular**, Prisma, **Azure SQL**) et en automatisant le CI/CD avec **GitHub Actions**.",
        "Déployer plus d'une **vingtaine** de fonctionnalités web et mobile réparties sur **8 applications** en rédigeant les documents SRS et d'architecture logicielle sur Azure.",
        "Étendre le portefeuille à **9 applications** livrées en collaborant avec des équipes de développeurs basées en **France** sur un projet commun de comptabilisation.",
        "Sécuriser la plateforme en implémentant **SSO Entra ID**, chiffrement AES-256-GCM et protections **XSS/CSRF**.",
      ],
      en: [
        "Improve **system scalability** and **team productivity** across every department by designing and implementing a microservices architecture adopted company-wide (**300 people**).",
        "Ship **full-stack** features by designing the architecture (**NestJS/Angular**, Prisma, **Azure SQL**) and automating CI/CD with **GitHub Actions**.",
        "Deploy over **twenty** web and mobile features across **8 applications** by writing SRS and software architecture documents on Azure.",
        "Expand the portfolio to **9 delivered applications** by collaborating with development teams based in **France** on a joint accounting project.",
        "Secure the platform by implementing **SSO Entra ID**, AES-256-GCM encryption, and **XSS/CSRF** protections.",
      ],
    },
    tags: ["NestJS", "Angular", "Azure", "Prisma", "GitHub Actions"],
  },
  {
    id: "inf3710",
    org: "Polytechnique Montréal",
    role: { fr: "Chargé de laboratoire", en: "Lab Instructor" },
    sub: {
      fr: "INF3710 — Conception et développement des systèmes",
      en: "INF3710 — Software Systems Design and Development",
    },
    period: { fr: "août 2026 – déc. 2026", en: "Aug. 2026 – Dec. 2026" },
    kind: "teaching",
    bullets: {
      fr: [
        "Améliorer la compréhension des concepts en concevant et animant les séances de laboratoire hebdomadaires, incluant slides de présentation et quiz interactifs **Kahoot**.",
        "Réduire le temps de correction des travaux pratiques (**C++**, **Python**, **SQL**, **DuckDB**) en développant un pipeline de correction automatisée sur **Gradescope**, standardisant l'évaluation.",
        "Présenter le contenu du cours à plus de **200 étudiants** répartis sur **4 groupes**, de façon hebdomadaire.",
      ],
      en: [
        "Improve students' understanding of course concepts by designing and running weekly lab sessions, including presentation slides and interactive **Kahoot** quizzes.",
        "Reduce assignment grading time (**C++**, **Python**, **SQL**, **DuckDB**) by developing an automated grading pipeline on **Gradescope**, standardizing evaluation.",
        "Present course content to over **200 students** across **4 groups**, on a weekly basis.",
      ],
    },
    tags: ["Teaching", "Gradescope", "DuckDB"],
  },
  {
    id: "log2420",
    org: "Polytechnique Montréal",
    role: { fr: "Chargé de laboratoire", en: "Lab Instructor" },
    sub: {
      fr: "LOG2420 — Analyse et conception des interfaces utilisateurs",
      en: "LOG2420 — User Interface Analysis and Design",
    },
    period: { fr: "janv. 2026 – avr. 2026", en: "Jan. 2026 – Apr. 2026" },
    kind: "teaching",
    bullets: {
      fr: [
        "Améliorer la compréhension des concepts d'interfaces utilisateurs en concevant et animant les séances de laboratoire hebdomadaires.",
        "Accompagner les étudiants dans la conception de prototypes en les guidant sur les principes d'ergonomie et d'utilisabilité.",
        "Encadrer plus de **28 étudiants** de façon hebdomadaire.",
      ],
      en: [
        "Improve students' understanding of user interface concepts by designing and running weekly lab sessions.",
        "Support students in prototype design by guiding them on ergonomics and usability principles.",
        "Supervise over **28 students** on a weekly basis.",
      ],
    },
    tags: ["UI/UX", "Teaching"],
  },
  {
    id: "gdg",
    org: "Google Developer Group — Polytechnique Montréal",
    role: { fr: "VP Formation", en: "VP of Training" },
    period: { fr: "déc. 2025 – mai 2026", en: "Dec. 2025 – May 2026" },
    kind: "leadership",
    bullets: {
      fr: [
        "Relancer le chapitre **Google Developer Group**, inactif depuis plusieurs mois, en étant recruté pour reconstituer l'équipe organisatrice.",
        "Réunir plus de **100 personnes** par atelier dès la relance en concevant et animant **3 ateliers techniques** (IA, Cloud, DevOps, Mobile) par session.",
        "Introduire les systèmes **RAG** (*Retrieval-Augmented Generation*), sujet encore peu maîtrisé à Polytechnique, en animant un atelier avec démonstration d'implémentation en direct.",
      ],
      en: [
        "Relaunch the **Google Developer Group** chapter, inactive for several months, after being recruited to rebuild the organizing team.",
        "Draw over **100 people** per workshop from the relaunch onward by designing and running **3 technical workshops** (AI, Cloud, DevOps, Mobile) per session.",
        "Introduce **RAG** (*Retrieval-Augmented Generation*) systems, a topic still little known at Polytechnique, by leading a workshop with a live implementation demo.",
      ],
    },
    tags: ["RAG", "Workshops", "Community"],
  },
  {
    id: "propolys",
    org: "Propolys Medtech Program",
    role: { fr: "Entrepreneur", en: "Entrepreneur" },
    period: { fr: "déc. 2025 – mai 2026", en: "Dec. 2025 – May 2026" },
    kind: "leadership",
    bullets: {
      fr: [
        "Transformer un concept médical en projet d'entreprise viable en collaborant aux côtés de **18** entrepreneurs sélectionnés, en développant des compétences en validation de marché.",
        "Confirmer la pertinence du concept en consultant **15** professionnels de la santé lors du processus de validation.",
        "Valider la viabilité du projet en le présentant devant un jury de **5 personnes** à l'issue du programme.",
      ],
      en: [
        "Turn a medical concept into a viable business venture by collaborating alongside **18** selected entrepreneurs, building market validation skills.",
        "Confirm the concept's relevance by consulting **15** healthcare professionals during the validation process.",
        "Validate the project's viability by presenting it to a panel of **5 people** at the program's conclusion.",
      ],
    },
    tags: ["Medtech", "Market validation"],
  },
  {
    id: "polyai",
    org: "PolyAI",
    role: { fr: "Formateur en intelligence artificielle", en: "Artificial Intelligence Instructor" },
    period: { fr: "mai 2025 – mai 2026", en: "May 2025 – May 2026" },
    kind: "teaching",
    bullets: {
      fr: [
        "Débloquer la progression des étudiants sur les concepts difficiles en animant des ateliers de compréhension ciblés.",
        "Accompagner les étudiants via des outils numériques modernes en concevant et dispensant une **dizaine** de ressources pédagogiques interactives.",
        "Faire progresser les participants de la compétition **CodeML** en clarifiant les concepts d'apprentissage automatique nécessaires à l'avancement de leurs projets.",
      ],
      en: [
        "Unblock students' progress on difficult concepts by running targeted comprehension workshops.",
        "Support students through modern digital tools by designing and delivering about **ten** interactive educational resources.",
        "Advance **CodeML** competition participants by clarifying the machine learning concepts needed to move their projects forward.",
      ],
    },
    tags: ["Machine learning", "CodeML", "Teaching"],
  },
];

const same = (a: string[]): L<string[]> => ({ fr: a, en: a });

export const skills: { id: string; title: L<string>; items: L<string[]>; accent?: boolean }[] = [
  { id: "lang", title: { fr: "Langages", en: "Languages" }, items: same(["TypeScript", "JavaScript", "Python", "SQL", "Java", "C/C++"]) },
  { id: "fw", title: { fr: "Frameworks et plateformes", en: "Frameworks & Platforms" }, items: same(["NestJS", "Angular", "Node.js"]) },
  { id: "ml", title: { fr: "IA / ML", en: "AI / ML" }, items: same(["scikit-learn", "PyTorch", "TensorFlow", "OpenCV"]) },
  { id: "data", title: { fr: "Données / bibliothèques", en: "Data / Libraries" }, items: same(["Pandas", "NumPy", "Matplotlib", "Pillow"]) },
  {
    id: "cloud",
    title: { fr: "Cloud & DevOps", en: "Cloud & DevOps" },
    items: same(["Azure App Service", "Entra ID SSO", "Azure SQL", "Blob Storage", "Azure VM", "Container Apps", "GitHub Actions (CI/CD)", "Docker", "Linux", "Git"]),
  },
  { id: "db", title: { fr: "Bases de données / ORM", en: "Databases / ORM" }, items: same(["Azure SQL (SQL Server)", "SQLite", "DuckDB", "Prisma ORM"]) },
  {
    id: "sec",
    title: { fr: "Sécurité", en: "Security" },
    items: {
      fr: ["Chiffrement au niveau des champs (AES-256-GCM)", "JWT"],
      en: ["Field-level encryption (AES-256-GCM)", "JWT"],
    },
  },
  {
    id: "math",
    title: { fr: "Mathématiques", en: "Mathematics" },
    accent: true,
    items: {
      fr: ["Algèbre linéaire", "Mathématiques discrètes", "Calcul multivarié", "Théorie des graphes", "Probabilités & statistiques", "Analyse I"],
      en: ["Linear algebra", "Discrete mathematics", "Multivariable calculus", "Graph theory", "Probability & statistics", "Analysis I"],
    },
  },
];

export const education: {
  school: string;
  degree: L<string>;
  period: L<string>;
  gpa: number;
  /** the school's own scale: 4.0 at Polytechnique, 4.3 at Université de Montréal */
  scale: number;
}[] = [
  {
    school: "Polytechnique Montréal",
    degree: { fr: "Baccalauréat en génie (B. Ing.), Génie logiciel", en: "B.Eng., Software Engineering" },
    period: { fr: "août 2023 – mai 2027", en: "Aug. 2023 – May 2027" },
    gpa: 3.89,
    scale: 4,
  },
  {
    school: "Université de Montréal",
    degree: { fr: "Mineure en mathématiques", en: "Minor in Mathematics" },
    period: { fr: "sept. 2024 – août 2027", en: "Sept. 2024 – Aug. 2027" },
    gpa: 4.3,
    scale: 4.3,
  },
];

