<?php
// LinkedIn Profile Data - Update with actual data from https://www.linkedin.com/in/imdaad-shajahan-75094229a
// Please manually copy your LinkedIn information here

$profile = [
    'name' => 'Imdaad Shajahan',
    'headline' => 'Data Scientist | Machine Learning Engineer | Full Stack Developer',
    'about' => 'A passionate Data Scientist specializing in machine learning, predictive analytics, and turning complex data into actionable business insights. I craft intelligent solutions that drive innovation and efficiency across industries.',
    'profile_image' => 'https://media.licdn.com/dms/image/D5603AQF...', // Replace with your actual LinkedIn profile image URL
    'location' => 'Your City, Country',
    'email' => 'your.email@example.com', // Replace with your email
    'linkedin' => 'https://www.linkedin.com/in/imdaad-shajahan-75094229a',
    'github' => 'https://github.com/yourusername', // Add if you have GitHub
    'phone' => '+1 (123) 456-7890' // Replace with your phone
];

$experience = [
    // Add your work experience from LinkedIn
    [
        'title' => 'Data Scientist',
        'company' => 'Company Name',
        'duration' => 'Jan 2023 - Present',
        'location' => 'Location',
        'description' => 'Led data science initiatives, developed ML models, and delivered actionable insights.'
    ],
    [
        'title' => 'Machine Learning Engineer',
        'company' => 'Previous Company',
        'duration' => 'Jun 2021 - Dec 2022',
        'location' => 'Location',
        'description' => 'Built and deployed ML pipelines, collaborated with cross-functional teams.'
    ]
    // Add more as needed
];

$education = [
    // Add your education from LinkedIn
    [
        'degree' => 'Master of Science in Data Science',
        'school' => 'University Name',
        'year' => '2020 - 2022',
        'description' => 'Specialized in machine learning, statistics, and big data technologies.'
    ],
    [
        'degree' => 'Bachelor of Science in Computer Science',
        'school' => 'University Name',
        'year' => '2016 - 2020',
        'description' => 'Foundation in programming, algorithms, and software engineering.'
    ]
];

$skills = [
    // Add your skills from LinkedIn
    'Python', 'R', 'SQL', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch',
    'Data Visualization', 'Tableau', 'Power BI', 'AWS', 'Docker', 'Git', 'JavaScript', 'React'
];

$projects = [
    // Add your projects from LinkedIn or portfolio
    // Get project images from your LinkedIn projects section
    [
        'title' => 'Predictive Analytics Dashboard',
        'description' => 'Developed a comprehensive dashboard for predictive analytics using Python, Flask, and React. Implemented ML models for forecasting and real-time data visualization.',
        'technologies' => ['Python', 'Flask', 'React', 'TensorFlow', 'PostgreSQL'],
        'image' => 'https://media.licdn.com/dms/image/...', // Replace with actual project image from LinkedIn
        'github' => 'https://github.com/yourusername/project1',
        'demo' => 'https://demo-link.com'
    ],
    [
        'title' => 'NLP Text Classification System',
        'description' => 'Built an NLP system for text classification using BERT and fine-tuned models. Achieved 95% accuracy on custom datasets.',
        'technologies' => ['Python', 'Transformers', 'Hugging Face', 'FastAPI'],
        'image' => 'https://media.licdn.com/dms/image/...', // Replace with actual project image from LinkedIn
        'github' => 'https://github.com/yourusername/project2',
        'demo' => 'https://demo-link.com'
    ],
    [
        'title' => 'Computer Vision Object Detection',
        'description' => 'Implemented YOLO-based object detection system for real-time video analysis. Deployed on edge devices with optimized performance.',
        'technologies' => ['Python', 'OpenCV', 'YOLO', 'TensorFlow', 'Raspberry Pi'],
        'image' => 'https://media.licdn.com/dms/image/...', // Replace with actual project image from LinkedIn
        'github' => 'https://github.com/yourusername/project3',
        'demo' => 'https://demo-link.com'
    ]
    // Add more projects
];

$certifications = [
    // AWS Certifications
    [
        'name' => 'AWS Certified Machine Learning - Specialty',
        'provider' => 'aws',
        'category' => 'cloud',
        'status' => 'active'
    ],
    [
        'name' => 'AWS Certified Solutions Architect - Associate',
        'provider' => 'aws',
        'category' => 'cloud',
        'status' => 'active'
    ],
    [
        'name' => 'AWS Certified Developer - Associate',
        'provider' => 'aws',
        'category' => 'cloud',
        'status' => 'active'
    ],
    [
        'name' => 'AWS Certified Data Analytics - Specialty',
        'provider' => 'aws',
        'category' => 'data',
        'status' => 'active'
    ],

    // Google Cloud Certifications
    [
        'name' => 'Google Cloud Professional Data Engineer',
        'provider' => 'google',
        'category' => 'cloud',
        'status' => 'active'
    ],
    [
        'name' => 'Google Cloud Professional Machine Learning Engineer',
        'provider' => 'google',
        'category' => 'data',
        'status' => 'active'
    ],
    [
        'name' => 'Google Cloud Professional Cloud Architect',
        'provider' => 'google',
        'category' => 'cloud',
        'status' => 'active'
    ],
    [
        'name' => 'TensorFlow Developer Certificate',
        'provider' => 'tensorflow',
        'category' => 'data',
        'status' => 'active'
    ],

    // Microsoft Azure Certifications
    [
        'name' => 'Microsoft Azure AI Engineer Associate',
        'provider' => 'azure',
        'category' => 'cloud',
        'status' => 'active'
    ],
    [
        'name' => 'Microsoft Azure Data Scientist Associate',
        'provider' => 'azure',
        'category' => 'data',
        'status' => 'active'
    ],
    [
        'name' => 'Microsoft Azure Solutions Architect Expert',
        'provider' => 'azure',
        'category' => 'cloud',
        'status' => 'active'
    ],
    [
        'name' => 'Microsoft Certified: Azure Database Administrator Associate',
        'provider' => 'azure',
        'category' => 'data',
        'status' => 'active'
    ],

    // Other Cloud & DevOps
    [
        'name' => 'Docker Certified Associate',
        'provider' => 'docker',
        'category' => 'devops',
        'status' => 'active'
    ],
    [
        'name' => 'Kubernetes Certified Administrator',
        'provider' => 'k8s',
        'category' => 'devops',
        'status' => 'active'
    ],
    [
        'name' => 'Certified Kubernetes Application Developer',
        'provider' => 'k8s',
        'category' => 'devops',
        'status' => 'active'
    ],

    // Security & Ethics
    [
        'name' => 'Certified Ethical Hacker (CEH)',
        'provider' => 'ceh',
        'category' => 'security',
        'status' => 'active'
    ],
    [
        'name' => 'CompTIA Security+',
        'provider' => 'comptia',
        'category' => 'security',
        'status' => 'active'
    ]
];

$achievements = [
    // Data Science & Analytics
    [
        'name' => 'IBM Data Science Professional Certificate',
        'provider' => 'ibm',
        'category' => 'data',
        'status' => 'completed'
    ],
    [
        'name' => 'Deep Learning Specialization (Coursera)',
        'provider' => 'coursera',
        'category' => 'data',
        'status' => 'completed'
    ],
    [
        'name' => 'Machine Learning by Andrew Ng (Coursera)',
        'provider' => 'coursera',
        'category' => 'data',
        'status' => 'completed'
    ],
    [
        'name' => 'Data Science Specialization (Johns Hopkins)',
        'provider' => 'jhu',
        'category' => 'data',
        'status' => 'completed'
    ],

    // Programming & Development
    [
        'name' => 'Python Institute PCAP: Programming Essentials in Python',
        'provider' => 'python',
        'category' => 'programming',
        'status' => 'completed'
    ],
    [
        'name' => 'Oracle Certified Java Programmer',
        'provider' => 'oracle',
        'category' => 'programming',
        'status' => 'completed'
    ],
    [
        'name' => 'MongoDB Certified Developer Associate',
        'provider' => 'mongodb',
        'category' => 'programming',
        'status' => 'completed'
    ],

    // Business Intelligence
    [
        'name' => 'Tableau Desktop Specialist',
        'provider' => 'tableau',
        'category' => 'business',
        'status' => 'completed'
    ],
    [
        'name' => 'Power BI Data Analyst Associate',
        'provider' => 'powerbi',
        'category' => 'business',
        'status' => 'completed'
    ],

    // Project Management
    [
        'name' => 'Scrum Master Certified (SMC)',
        'provider' => 'scrum',
        'category' => 'management',
        'status' => 'completed'
    ],
    [
        'name' => 'PRINCE2 Foundation',
        'provider' => 'prince2',
        'category' => 'management',
        'status' => 'completed'
    ]
];

$linkedin_posts = [
    // Add links to your recent LinkedIn posts
    'https://www.linkedin.com/posts/imdaad-shajahan-75094229a_post1',
    'https://www.linkedin.com/posts/imdaad-shajahan-75094229a_post2',
    'https://www.linkedin.com/posts/imdaad-shajahan-75094229a_post3'
];
?>