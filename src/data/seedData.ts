import { Course, Branch, Offer, SiteSettings, CourseCategory } from '../types';

export const INITIAL_BRANCHES: Branch[] = [
  {
    id: 'branch-1-maksudabad',
    name: 'Branch 1 - Maksudabad Campus',
    plotNo: 'Plot No. 48',
    address: 'Plot No. 48, Maksudabad, opposite Bank of Baroda, Nangloi Stand, Najafgarh, New Delhi - 110043',
    landmark: 'Opposite Bank of Baroda, Nangloi Stand',
    locality: 'Maksudabad, Najafgarh',
    phone: '8700573469',
    timing: '8:00 AM - 8:00 PM (Monday to Saturday)',
    facilities: ['High-speed Air-conditioned Computer Labs', 'AI Project Workstations', 'Projector Classroom', 'Dedicated Doubt Clearing Sessions', 'Wi-Fi Enabled Campus'],
    mapQuery: 'Advance AI Institute Plot 48 Maksudabad opposite Bank of Baroda Nangloi Stand Najafgarh',
    isActive: true,
    notes: 'Main administrative and admissions branch near Nangloi Stand.'
  },
  {
    id: 'branch-2-khera-more',
    name: 'Branch 2 - Khera More Center',
    plotNo: 'Plot No. 34',
    address: 'Plot No. 34, Khera More, above Bio Science Lab, Najafgarh, New Delhi - 110043',
    landmark: 'Above Bio Science Lab, Khera More',
    locality: 'Khera More, Najafgarh',
    phone: '8700573469',
    timing: '8:30 AM - 7:30 PM (Monday to Saturday)',
    facilities: ['Multimedia & Video Editing Suite', 'Accounting & Tally Lab', 'Modern Lecture Hall', 'Weekend Professional Batches'],
    mapQuery: 'Plot No 34 Khera More above Bio Science Lab Najafgarh New Delhi',
    isActive: true,
    notes: 'Specialized center for Accounting, Graphic Design, and Multimedia programs.'
  },
  {
    id: 'branch-3-gupta-market',
    name: 'Branch 3 - Gupta Market Branch',
    plotNo: 'Plot No. 1',
    address: 'Plot No. 1, opposite Gupta Market, Najafgarh, New Delhi - 110043',
    landmark: 'Opposite Gupta Market',
    locality: 'Najafgarh (Admin editable/confirmable)',
    phone: '8700573469',
    timing: '9:00 AM - 7:00 PM (Monday to Saturday)',
    facilities: ['Teacher Training Study Center', 'University Correspondence Guidance Cell', 'Interview Preparation Room'],
    mapQuery: 'Plot No 1 opposite Gupta Market Najafgarh New Delhi',
    isActive: true,
    notes: 'Primary counseling center for B.Ed, JBT, NTT, and University distance programs.'
  }
];

export const INITIAL_OFFERS: Offer[] = [
  {
    id: 'offer-new-session-scholarship',
    title: 'New Session Technology Scholarship: 25% Off',
    discountPercentage: 25,
    description: 'Special fee concession for students enrolling in AI Tools, Generative AI, or Full-Stack Development batches.',
    applicableCategories: ['AI & Advanced Tools', 'Software Development'],
    validTill: 'Limited Period Offer',
    terms: 'Applicable upon full upfront semester payment or early registration. Valid across all 3 Najafgarh branches.',
    active: true
  },
  {
    id: 'offer-diploma-career-boost',
    title: 'Diploma Career Boost: Flat 20% Off',
    discountPercentage: 20,
    description: 'Get 20% off on ADCA and DCA 1-year and 6-month certified diplomas with free interview skills training.',
    applicableCategories: ['Diploma Programs'],
    validTill: 'End of Month',
    terms: 'Valid on first-come-first-served basis for first 30 admissions of the batch.',
    active: true
  },
  {
    id: 'offer-women-tech-empowerment',
    title: 'Women in IT & Teaching Grant: 30% Off',
    discountPercentage: 30,
    description: 'Encouraging female aspirants in Teacher Training (NTT / JBT / B.Ed guidance) and Data Analytics.',
    applicableCategories: ['Teacher Training (NTT/JBT/B.Ed)', 'Data & Analytics'],
    validTill: 'Ongoing Session',
    terms: 'Requires valid government student ID during branch verification.',
    active: true
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  instituteName: 'Advance AI Institute',
  phone: '8700573469',
  isWhatsAppEnabled: true,
  admissionsOpen: true,
  announcement: 'Admissions Open for 2026 batches! Visit your nearest Najafgarh branch or apply online for free demo classes.'
};

export const INITIAL_COURSES: Course[] = [
  {
    id: 'ai-tools-generative-ai',
    name: 'AI Tools, Generative AI & Prompt Engineering',
    category: 'AI & Advanced Tools',
    description: 'Master practical generative AI workflows, ChatGPT, Claude, Midjourney, automating business tasks, prompt engineering frameworks, and no-code AI integrations.',
    eligibility: '10th / 12th / College students or working professionals',
    duration: '2 Months (Fast-track) / 3 Months (Standard)',
    fee: 14000,
    discount: 25,
    finalFee: 10500,
    branchAvailability: ['Branch 1 - Maksudabad Campus', 'Branch 2 - Khera More Center', 'Branch 3 - Gupta Market Branch'],
    active: true,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    admissionNotes: 'Hands-on practicals with live AI access in computer labs. Certificate of completion awarded.',
    syllabus: [
      'Foundations of Generative AI & LLMs',
      'Advanced Prompt Engineering & Chain-of-Thought',
      'AI for Office Automation, Writing & Presentations',
      'Image & Video Generation with AI Tools',
      'Building Custom AI Agents & API Workflows'
    ],
    isExample: true
  },
  {
    id: 'python-data-science-ai',
    name: 'Python Programming with Data Science & AI',
    category: 'Software Development',
    description: 'Comprehensive Python training starting from core syntax to OOP, Pandas, NumPy, Matplotlib, exploratory data analysis, and introductory Machine Learning.',
    eligibility: '10+2 with basic mathematics or coding enthusiasm',
    duration: '3 Months / 50 Hours Practical',
    fee: 16000,
    discount: 20,
    finalFee: 12800,
    branchAvailability: ['Branch 1 - Maksudabad Campus', 'Branch 2 - Khera More Center'],
    active: true,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    admissionNotes: 'Includes 5 real-world portfolio projects and code reviews.',
    syllabus: [
      'Python Syntax, Control Flow & Data Structures',
      'Object Oriented Programming in Python',
      'NumPy & Pandas for High Performance Data Handling',
      'Data Visualization using Matplotlib & Seaborn',
      'Mini Project: Predictive Analytics & Automation'
    ],
    isExample: true
  },
  {
    id: 'fullstack-web-development',
    name: 'Full Stack Web Development (MERN Stack)',
    category: 'Software Development',
    description: 'Build modern responsive web applications from scratch. Covers HTML5, CSS3, Tailwind CSS, JavaScript ES6+, React, Node.js, Express, and database management.',
    eligibility: '10+2 / Undergraduates / Career Changers',
    duration: '6 Months (Comprehensive)',
    fee: 28000,
    discount: 30,
    finalFee: 19600,
    branchAvailability: ['Branch 1 - Maksudabad Campus', 'Branch 2 - Khera More Center'],
    active: true,
    image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=800&q=80',
    admissionNotes: 'Includes portfolio website deployment, Git/GitHub training, and mock technical interviews.',
    syllabus: [
      'HTML5, Modern CSS, Responsive Design & Tailwind',
      'Modern JavaScript (ES6+, Async/Await, DOM)',
      'React Components, State, Hooks & Router',
      'Node.js & Express REST APIs',
      'Database integration, Authentication & Cloud Hosting'
    ],
    isExample: true
  },
  {
    id: 'c-cpp-programming',
    name: 'C and C++ Programming Fundamentals',
    category: 'Software Development',
    description: 'Build an rock-solid foundation in computer logic, procedural programming in C, pointers, memory management, and Object-Oriented Programming (OOP) in C++.',
    eligibility: 'School students, BCA/B.Tech/B.Sc IT students',
    duration: '2.5 Months',
    fee: 9000,
    discount: 15,
    finalFee: 7650,
    branchAvailability: ['Branch 1 - Maksudabad Campus', 'Branch 2 - Khera More Center', 'Branch 3 - Gupta Market Branch'],
    active: true,
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80',
    admissionNotes: 'Ideal for university curriculum clearing and building strong competitive programming logic.',
    syllabus: [
      'C Logic Building, Arrays, Strings, and Functions',
      'Pointers, Memory Allocation & Structures',
      'C++ Classes, Objects, Constructors & Destructors',
      'Inheritance, Polymorphism & Operator Overloading',
      'File Handling & Standard Template Library (STL)'
    ],
    isExample: true
  },
  {
    id: 'java-fullstack-core',
    name: 'Java Development & Core Enterprise Concepts',
    category: 'Software Development',
    description: 'Master Core Java, Object-Oriented Design, Collections Framework, Multithreading, Exception Handling, JDBC database connectivity, and enterprise fundamentals.',
    eligibility: '12th pass / Diploma / BCA / B.Tech students',
    duration: '3.5 Months',
    fee: 15000,
    discount: 20,
    finalFee: 12000,
    branchAvailability: ['Branch 1 - Maksudabad Campus', 'Branch 2 - Khera More Center'],
    active: true,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    admissionNotes: 'Lab assignments matched with corporate Java recruitment tests.',
    syllabus: [
      'Core Java OOP Principles & Syntax',
      'Java Collections Framework & Generics',
      'Exception Handling & Multithreading',
      'JDBC Database Integration',
      'Introduction to Spring Boot & REST Services'
    ],
    isExample: true
  },
  {
    id: 'sql-relational-databases',
    name: 'SQL & Relational Database Management',
    category: 'Data & Analytics',
    description: 'Learn SQL querying, joins, subqueries, indexing, stored procedures, normalization, and database administration with MySQL and PostgreSQL.',
    eligibility: 'Open to all graduates and technical learners',
    duration: '1.5 Months',
    fee: 8000,
    discount: 15,
    finalFee: 6800,
    branchAvailability: ['Branch 1 - Maksudabad Campus', 'Branch 2 - Khera More Center', 'Branch 3 - Gupta Market Branch'],
    active: true,
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
    admissionNotes: 'Includes database schema modeling and real analytics query optimizations.',
    syllabus: [
      'Relational Database Architecture & ER Diagrams',
      'SELECT Queries, Filtering, Aggregations & Grouping',
      'Complex Multi-Table Joins & Subqueries',
      'Data Manipulation (INSERT, UPDATE, DELETE)',
      'Indexes, Views & Stored Procedures'
    ],
    isExample: true
  },
  {
    id: 'tally-prime-gst',
    name: 'Tally Prime with GST, TDS & E-Way Billing',
    category: 'Accounting & Taxation',
    description: 'Professional computerized accounting course. Master ledger management, voucher entry, inventory tracking, GST computation, returns filing, and payroll.',
    eligibility: 'Commerce students, business owners, or 10+2 any stream',
    duration: '2.5 Months',
    fee: 10000,
    discount: 20,
    finalFee: 8000,
    branchAvailability: ['Branch 1 - Maksudabad Campus', 'Branch 2 - Khera More Center', 'Branch 3 - Gupta Market Branch'],
    active: true,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    admissionNotes: '100% practical accounting using live business invoices and tax return formats.',
    syllabus: [
      'Accounting Basics & Company Creation in Tally Prime',
      'Vouchers, Daybook & Inventory Management',
      'GST Setup, IGST, CGST, SGST & Tax Invoices',
      'TDS & TCS Calculations and Returns',
      'Balance Sheet, Profit & Loss Finalization'
    ],
    isExample: true
  },
  {
    id: 'advanced-excel-analytics',
    name: 'Advanced Excel, Dashboards & Financial Modeling',
    category: 'Office & Fundamentals',
    description: 'Go far beyond basics with Advanced Excel: VLOOKUP, XLOOKUP, INDEX-MATCH, Pivot Tables, Power Query, Dynamic Array Formulas, and interactive executive dashboards.',
    eligibility: 'Basic computer awareness',
    duration: '1.5 Months',
    fee: 7000,
    discount: 20,
    finalFee: 5600,
    branchAvailability: ['Branch 1 - Maksudabad Campus', 'Branch 2 - Khera More Center', 'Branch 3 - Gupta Market Branch'],
    active: true,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    admissionNotes: 'Hands-on practice files provided for each session with shortcut cheatsheets.',
    syllabus: [
      'Advanced Formula Mastery (XLOOKUP, SUMIFS, LAMBDA)',
      'Pivot Tables, Slicers & Calculated Fields',
      'Data Cleansing with Power Query',
      'Executive KPI Dashboard Design',
      'Macro Recording & Automation Basics'
    ],
    isExample: true
  },
  {
    id: 'computer-fundamentals-ms-office',
    name: 'Computer Fundamentals & MS Office Pro',
    category: 'Office & Fundamentals',
    description: 'Essential computer literacy covering Windows operating system, Microsoft Word, Excel, PowerPoint, Outlook, Internet security, email etiquette, and typing speed.',
    eligibility: 'Open to all beginners and school students',
    duration: '2 Months',
    fee: 6000,
    discount: 15,
    finalFee: 5100,
    branchAvailability: ['Branch 1 - Maksudabad Campus', 'Branch 2 - Khera More Center', 'Branch 3 - Gupta Market Branch'],
    active: true,
    image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=800&q=80',
    admissionNotes: 'Daily hands-on lab practice with English and Hindi typing software.',
    syllabus: [
      'Computer Hardware & Windows OS Navigation',
      'MS Word: Business letters, formatting & documentation',
      'MS Excel: Basic calculations, formulas & tables',
      'MS PowerPoint: Professional animated presentations',
      'Internet, Cyber Hygiene & Cloud Storage'
    ],
    isExample: true
  },
  {
    id: 'data-analytics-powerbi',
    name: 'Data Analytics with Power BI & Business Intelligence',
    category: 'Data & Analytics',
    description: 'Transform raw data into compelling business insights. Learn Power BI Desktop, DAX formulas, interactive reports, data modeling, and storytelling.',
    eligibility: 'Graduates, MBA students, or analytics aspirants',
    duration: '2 Months',
    fee: 15000,
    discount: 25,
    finalFee: 11250,
    branchAvailability: ['Branch 1 - Maksudabad Campus', 'Branch 2 - Khera More Center'],
    active: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    admissionNotes: 'Includes portfolio projects based on real retail and e-commerce datasets.',
    syllabus: [
      'Power BI Architecture & Data Connectors',
      'Data Transformation with Power Query Editor',
      'Data Modeling, Relationships & Star Schema',
      'DAX Calculations: Measures vs Calculated Columns',
      'Publishing & Sharing Power BI Reports'
    ],
    isExample: true
  },
  {
    id: 'graphic-design-multimedia',
    name: 'Graphic Design & Multimedia Pro (Photoshop, Illustrator)',
    category: 'Graphic & Multimedia',
    description: 'Learn visual communication, branding design, typography, photo retouching in Adobe Photoshop, vector art in Adobe Illustrator, and CorelDraw.',
    eligibility: '10th / 12th pass with creative interest',
    duration: '3 Months',
    fee: 14000,
    discount: 20,
    finalFee: 11200,
    branchAvailability: ['Branch 1 - Maksudabad Campus', 'Branch 2 - Khera More Center'],
    active: true,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    admissionNotes: 'Students create professional design portfolios (logos, social media ads, brochures).',
    syllabus: [
      'Design Principles, Color Theory & Typography',
      'Adobe Photoshop: Photo manipulation & digital art',
      'Adobe Illustrator: Vector graphics, logos & icons',
      'CorelDraw: Printing press & flex banner designs',
      'Client Presentation & Freelancing Essentials'
    ],
    isExample: true
  },
  {
    id: 'video-editing-motion-graphics',
    name: 'Professional Video Editing & Motion Graphics',
    category: 'Graphic & Multimedia',
    description: 'Master video storytelling with Adobe Premiere Pro and motion graphics with After Effects. Covers pacing, color grading, audio cleanup, visual effects, and reels.',
    eligibility: '10+2 / Content Creators / Media Enthusiasts',
    duration: '3 Months',
    fee: 16000,
    discount: 20,
    finalFee: 12800,
    branchAvailability: ['Branch 2 - Khera More Center'],
    active: true,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    admissionNotes: 'Access to dedicated high-performance editing rigs at Khera More center.',
    syllabus: [
      'Premiere Pro Timeline, Cuts, Transitions & Storyflow',
      'Audio Syncing, Sound Design & Background Scores',
      'Color Correction & Cinematic Color Grading',
      'After Effects: Lower thirds, title animations & VFX',
      'Exporting optimized formats for YouTube, Instagram & TV'
    ],
    isExample: true
  },
  {
    id: 'adca-diploma-one-year',
    name: 'ADCA (Advanced Diploma in Computer Applications)',
    category: 'Diploma Programs',
    description: 'Comprehensive 1-Year Government-standard Diploma covering computer fundamentals, office automation, Advanced Excel, Tally Prime with GST, Web Design, and C Programming.',
    eligibility: '10th or 12th pass from any recognized board',
    duration: '1 Year (12 Months)',
    fee: 22000,
    discount: 25,
    finalFee: 16500,
    branchAvailability: ['Branch 1 - Maksudabad Campus', 'Branch 2 - Khera More Center', 'Branch 3 - Gupta Market Branch'],
    active: true,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    admissionNotes: 'Most popular career diploma for private and government job preparation. Dual semester exam.',
    syllabus: [
      'Semester 1: Computer Fundamentals, Windows, MS Office Pro & Internet',
      'Semester 1: Advanced Excel with Dashboarding & Typing Proficiency',
      'Semester 2: Computerized Accounting with Tally Prime & GST',
      'Semester 2: Web Designing (HTML/CSS) & Programming Fundamentals',
      'Semester 2: Final Practical Project & Viva Voce'
    ],
    isExample: true
  },
  {
    id: 'dca-diploma-six-months',
    name: 'DCA (Diploma in Computer Applications)',
    category: 'Diploma Programs',
    description: 'Intensive 6-Month Diploma focused on core office productivity, MS Word, Excel, PowerPoint, database basics, and commercial accounting in Tally.',
    eligibility: '10th or 12th pass',
    duration: '6 Months',
    fee: 12000,
    discount: 20,
    finalFee: 9600,
    branchAvailability: ['Branch 1 - Maksudabad Campus', 'Branch 2 - Khera More Center', 'Branch 3 - Gupta Market Branch'],
    active: true,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    admissionNotes: 'Ideal qualification for office assistants, data entry operators, and administrative staff.',
    syllabus: [
      'IT Fundamentals & Operating System Utilities',
      'Advanced Document Processing in MS Word',
      'Spreadsheet Management & Formulas in MS Excel',
      'Multimedia Presentations & Email Systems',
      'Accounting Basics & Tally Entry'
    ],
    isExample: true
  },
  {
    id: 'pgdca-diploma',
    name: 'PGDCA (Post Graduate Diploma in Computer Applications)',
    category: 'Diploma Programs',
    description: 'Post-graduate level diploma designed for degree holders aiming to transition into software development, systems analysis, database management, and advanced computing.',
    eligibility: 'Graduation in any discipline',
    duration: '1 Year (2 Semesters)',
    fee: 26000,
    discount: 20,
    finalFee: 20800,
    branchAvailability: ['Branch 1 - Maksudabad Campus', 'Branch 3 - Gupta Market Branch'],
    active: true,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    admissionNotes: 'Semester examinations and project submission required.',
    syllabus: [
      'Advanced Computer Concepts & Systems Architecture',
      'Object Oriented Programming & Data Structures',
      'Relational Database Management Systems (RDBMS)',
      'Software Engineering & Software Quality Assurance',
      'Project Development & Dissertation'
    ],
    isExample: true
  },
  {
    id: 'bed-admission-guidance',
    name: 'B.Ed (Bachelor of Education) Admission Guidance',
    category: 'Teacher Training (NTT/JBT/B.Ed)',
    description: 'Expert academic counseling, enrollment assistance, syllabus guidance, and practical file preparation support for B.Ed correspondence programs from recognized state universities.',
    eligibility: 'Graduation / Post Graduation with min 50% marks',
    duration: '2 Years (University Academic Schedule)',
    fee: 55000,
    discount: 15,
    finalFee: 46750,
    branchAvailability: ['Branch 3 - Gupta Market Branch', 'Branch 1 - Maksudabad Campus'],
    active: true,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    admissionNotes: 'Important Note: Advance AI Institute provides educational counseling, study materials, and practical file guidance. Degrees are granted directly by the respective UGC/NCTE recognized universities.',
    syllabus: [
      'Childhood and Growing Up & Contemporary India and Education',
      'Learning and Teaching & Pedagogy of School Subjects',
      'Knowledge and Curriculum & Assessment for Learning',
      'Creating an Inclusive School & Health, Physical & Yoga Education',
      'Practical Teaching Internship & Portfolio Preparation'
    ],
    isExample: true
  },
  {
    id: 'jbt-deled-guidance',
    name: 'JBT / D.El.Ed Admission Counseling & Coaching',
    category: 'Teacher Training (NTT/JBT/B.Ed)',
    description: 'Complete guidance and classroom coaching for Junior Basic Training (JBT) / Diploma in Elementary Education (D.El.Ed) aspirants for primary school teaching careers.',
    eligibility: '10+2 with minimum 50% marks',
    duration: '2 Years (University / Board Schedule)',
    fee: 45000,
    discount: 15,
    finalFee: 38250,
    branchAvailability: ['Branch 3 - Gupta Market Branch', 'Branch 1 - Maksudabad Campus'],
    active: true,
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    admissionNotes: 'Includes mock tests for CTET / State TET preparation alongside academic coursework.',
    syllabus: [
      'Child Development & Educational Psychology',
      'Pedagogy of Primary Mathematics & Language Education',
      'Environmental Studies (EVS) Pedagogy',
      'School Experience Programme & Micro-Teaching',
      'Action Research & Continuous Comprehensive Evaluation'
    ],
    isExample: true
  },
  {
    id: 'ntt-nursery-teacher-training',
    name: 'NTT (Nursery Teacher Training Diploma)',
    category: 'Teacher Training (NTT/JBT/B.Ed)',
    description: 'Certified pre-primary teacher training course. Learn child psychology, modern Montessori methods, art and craft, rhyme dramatization, and kindergarten classroom management.',
    eligibility: '10+2 in any stream (open to all female candidates)',
    duration: '1 Year / 2 Years Option',
    fee: 18000,
    discount: 25,
    finalFee: 13500,
    branchAvailability: ['Branch 3 - Gupta Market Branch', 'Branch 2 - Khera More Center'],
    active: true,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    admissionNotes: 'Includes teaching practicals, flash card making workshops, and direct school placement assistance.',
    syllabus: [
      'Child Psychology & Early Childhood Care Education (ECCE)',
      'Montessori Methods & Play-way Teaching Techniques',
      'Art, Craft, Origami & Classroom Wall Decoration',
      'Rhyme Recitation, Storytelling & Puppet Theatre',
      'Teaching Internship at Reputed Play Schools'
    ],
    isExample: true
  },
  {
    id: 'university-correspondence-degrees',
    name: 'University Correspondence Programs (BA / B.Com / MA / M.Com)',
    category: 'University Correspondence',
    description: 'Distance and online education counseling for working professionals and students seeking flexible graduation and post-graduation degrees from recognized state and central universities.',
    eligibility: '10+2 for UG; Graduation for PG programs',
    duration: '3 Years (UG) / 2 Years (PG)',
    fee: 25000,
    discount: 15,
    finalFee: 21250,
    branchAvailability: ['Branch 3 - Gupta Market Branch', 'Branch 1 - Maksudabad Campus'],
    active: true,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    admissionNotes: 'Advance AI Institute provides counseling, documentation support, and exam preparation. Degrees conferred by recognized UGC/DEB universities.',
    syllabus: [
      'Document Verification & University Registration Assistance',
      'Printed and Digital Study Material Distribution',
      'Assignment Guidance & Submission Assistance',
      'Weekend Tutorial & Doubt Clearing Classes',
      'Exam Hall Ticket & Result Coordination'
    ],
    isExample: true
  }
];

export const CATEGORIES: CourseCategory[] = [
  'AI & Advanced Tools',
  'Software Development',
  'Data & Analytics',
  'Accounting & Taxation',
  'Graphic & Multimedia',
  'Diploma Programs',
  'Teacher Training (NTT/JBT/B.Ed)',
  'University Correspondence',
  'Office & Fundamentals'
];
