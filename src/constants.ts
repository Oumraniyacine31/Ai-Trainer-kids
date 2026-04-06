import { TrainingItem } from './types';

export const AI_BASICS: TrainingItem[] = [
  {
    id: 'ai1_1',
    category: 'ai',
    question: 'What is Artificial Intelligence (AI)?',
    label: 'A machine that can think and learn like humans',
    distractors: ['A type of animal', 'A video game'],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Artificial Intelligence',
    sentence: 'AI is a computer program that can learn and solve problems.',
    difficulty: 1
  },
  {
    id: 'ai1_2',
    category: 'ai',
    question: 'Which of these is an example of AI?',
    label: 'A robot that can talk',
    distractors: ['A pencil', 'A book'],
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Robot',
    sentence: 'Talking robots use AI to understand and speak to us.',
    difficulty: 1
  },
  {
    id: 'ai1_3',
    category: 'ai',
    question: 'Can AI learn from mistakes?',
    label: 'Yes',
    distractors: ['No'],
    imageUrl: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Learning',
    sentence: 'AI gets better by learning from its mistakes, just like you!',
    difficulty: 1
  },
  {
    id: 'ai2_1',
    category: 'ai',
    question: 'What do we call data that helps AI learn?',
    label: 'Training data',
    distractors: ['Homework', 'Toys'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda546697a?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Training Data',
    sentence: 'Training data is like the books AI reads to learn new things.',
    difficulty: 2
  },
  {
    id: 'ai2_2',
    category: 'ai',
    question: 'Which device uses AI?',
    label: 'Smartphone',
    distractors: ['Stone', 'Paper'],
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Smartphone',
    sentence: 'Your smartphone uses AI for things like face unlock and voice commands.',
    difficulty: 2
  },
  {
    id: 'ai2_3',
    category: 'ai',
    question: 'What can AI recognize?',
    label: 'Faces and voices',
    distractors: ['Only numbers', 'Only colors'],
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Recognition',
    sentence: 'AI is very good at recognizing who is in a photo or who is speaking.',
    difficulty: 2
  },
  {
    id: 'ai3_1',
    category: 'ai',
    question: 'Who teaches the AI?',
    label: 'Humans',
    distractors: ['Trees', 'Cars'],
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Humans',
    sentence: 'People write the code and provide the data that teaches AI.',
    difficulty: 3
  },
  {
    id: 'ai3_2',
    category: 'ai',
    question: 'What happens when AI gets more data?',
    label: 'It becomes smarter',
    distractors: ['It sleeps', 'It disappears'],
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Smarter',
    sentence: 'The more information AI has, the better it can solve problems.',
    difficulty: 3
  },
  {
    id: 'ai3_3',
    category: 'ai',
    question: 'Which app uses AI to understand your voice?',
    label: 'Voice assistant',
    distractors: ['Calculator', 'Flashlight'],
    imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Voice Assistant',
    sentence: 'Apps like Siri or Alexa use AI to understand what you say.',
    difficulty: 3
  },
  {
    id: 'ai4_1',
    category: 'ai',
    question: 'Is AI a real brain like humans?',
    label: "No, it's a program",
    distractors: ['Yes, it has a brain', 'It is magic'],
    imageUrl: 'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Program',
    sentence: 'AI mimics a brain using code, but it is not a biological brain.',
    difficulty: 4
  },
  {
    id: 'ai4_2',
    category: 'ai',
    question: 'What is a robot?',
    label: 'A machine that can be programmed',
    distractors: ['A plant', 'A toy only'],
    imageUrl: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Robot',
    sentence: 'A robot is a physical machine that follows computer instructions.',
    difficulty: 4
  },
  {
    id: 'ai4_3',
    category: 'ai',
    question: 'Can AI help people?',
    label: 'Yes (in hospitals, schools, etc.)',
    distractors: ['No', 'Only in games'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Helpful',
    sentence: 'AI helps doctors find diseases and helps teachers help students.',
    difficulty: 4
  }
];

export const HARDWARE: TrainingItem[] = [
  {
    id: 'hw1',
    category: 'hardware',
    label: 'CPU',
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'C P U',
    sentence: 'The CPU is the brain of the computer.',
    difficulty: 1
  },
  {
    id: 'hw1_2',
    category: 'hardware',
    label: 'Keyboard',
    imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Keyboard',
    sentence: 'You use a keyboard to type letters and numbers.',
    difficulty: 1
  },
  {
    id: 'hw1_3',
    category: 'hardware',
    label: 'Mouse',
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Mouse',
    sentence: 'A mouse helps you click and move things on the screen.',
    difficulty: 1
  },
  {
    id: 'hw2',
    category: 'hardware',
    label: 'Motherboard',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Motherboard',
    sentence: 'The motherboard connects all parts of the computer.',
    difficulty: 2
  },
  {
    id: 'hw2_2',
    category: 'hardware',
    label: 'RAM',
    imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'RAM',
    sentence: 'RAM is the short-term memory of the computer.',
    difficulty: 2
  },
  {
    id: 'hw2_3',
    category: 'hardware',
    label: 'Monitor',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Monitor',
    sentence: 'The monitor is the screen where you see your work.',
    difficulty: 2
  },
  {
    id: 'hw3',
    category: 'hardware',
    label: 'SSD Storage',
    imageUrl: 'https://images.unsplash.com/photo-1597872200919-0127a4b09a68?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'S S D',
    sentence: 'An SSD stores your files very quickly.',
    difficulty: 3
  },
  {
    id: 'hw3_2',
    category: 'hardware',
    label: 'GPU',
    imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'G P U',
    sentence: 'The GPU helps the computer show beautiful pictures.',
    difficulty: 3
  },
  {
    id: 'hw3_3',
    category: 'hardware',
    label: 'Sound Card',
    imageUrl: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Sound Card',
    sentence: 'A sound card lets the computer play music and sounds.',
    difficulty: 3
  },
  {
    id: 'hw4',
    category: 'hardware',
    label: 'Power Supply',
    imageUrl: 'https://images.unsplash.com/photo-1587202399702-82353de37560?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Power Supply',
    sentence: 'The power supply gives electricity to the computer.',
    difficulty: 4
  },
  {
    id: 'hw4_2',
    category: 'hardware',
    label: 'Cooling Fan',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Cooling Fan',
    sentence: 'The fan keeps the computer from getting too hot.',
    difficulty: 4
  },
  {
    id: 'hw4_3',
    category: 'hardware',
    label: 'Network Card',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Network Card',
    sentence: 'A network card lets the computer connect to the internet.',
    difficulty: 4
  }
];

export const SOFTWARE: TrainingItem[] = [
  {
    id: 'sw1',
    category: 'software',
    label: 'Operating System',
    imageUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Operating System',
    sentence: 'Windows and macOS are operating systems.',
    difficulty: 1
  },
  {
    id: 'sw1_2',
    category: 'software',
    label: 'App',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'App',
    sentence: 'An app is a program that helps you do things.',
    difficulty: 1
  },
  {
    id: 'sw1_3',
    category: 'software',
    label: 'File',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'File',
    sentence: 'A file is a piece of information stored on a computer.',
    difficulty: 1
  },
  {
    id: 'sw2',
    category: 'software',
    label: 'Web Browser',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Web Browser',
    sentence: 'A web browser lets you visit websites.',
    difficulty: 2
  },
  {
    id: 'sw2_2',
    category: 'software',
    label: 'Folder',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Folder',
    sentence: 'A folder helps you organize your computer files.',
    difficulty: 2
  },
  {
    id: 'sw2_3',
    category: 'software',
    label: 'Programmer',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Programmer',
    sentence: 'A programmer is a person who writes computer code.',
    difficulty: 2
  },
  {
    id: 'sw3',
    category: 'software',
    label: 'Compiler',
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Compiler',
    sentence: 'A compiler translates code into computer language.',
    difficulty: 3
  },
  {
    id: 'sw3_2',
    category: 'software',
    label: 'Database',
    imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Database',
    sentence: 'A database stores a lot of information safely.',
    difficulty: 3
  },
  {
    id: 'sw3_3',
    category: 'software',
    label: 'Framework',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Framework',
    sentence: 'A framework is a set of tools for building apps.',
    difficulty: 3
  },
  {
    id: 'sw4',
    category: 'software',
    label: 'API',
    imageUrl: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'A P I',
    sentence: 'An API lets different programs talk to each other.',
    difficulty: 4
  },
  {
    id: 'sw4_2',
    category: 'software',
    label: 'Encryption',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Encryption',
    sentence: 'Encryption scrambles data to keep it secret.',
    difficulty: 4
  },
  {
    id: 'sw4_3',
    category: 'software',
    label: 'Malware',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Malware',
    sentence: 'Malware is a bad program that can hurt your computer.',
    difficulty: 4
  }
];

export const INTERNET: TrainingItem[] = [
  {
    id: 'int1',
    category: 'internet',
    label: 'Wi-Fi',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Wi-Fi',
    sentence: 'Wi-Fi lets you connect to the internet without wires.',
    difficulty: 1
  },
  {
    id: 'int1_2',
    category: 'internet',
    label: 'Website',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Website',
    sentence: 'A website is a page you visit on the internet.',
    difficulty: 1
  },
  {
    id: 'int1_3',
    category: 'internet',
    label: 'Link',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Link',
    sentence: 'A link takes you to another page when you click it.',
    difficulty: 1
  },
  {
    id: 'int2',
    category: 'internet',
    label: 'IP Address',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'I P Address',
    sentence: 'An IP address is like a home address for your computer.',
    difficulty: 2
  },
  {
    id: 'int2_2',
    category: 'internet',
    label: 'Router',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Router',
    sentence: 'A router sends internet signals to your devices.',
    difficulty: 2
  },
  {
    id: 'int2_3',
    category: 'internet',
    label: 'Email',
    imageUrl: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Email',
    sentence: 'Email is a way to send messages over the internet.',
    difficulty: 2
  },
  {
    id: 'int3',
    category: 'internet',
    label: 'Firewall',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Firewall',
    sentence: 'A firewall blocks bad traffic from entering your network.',
    difficulty: 3
  },
  {
    id: 'int3_2',
    category: 'internet',
    label: 'Cloud',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Cloud',
    sentence: 'The cloud stores your files on the internet.',
    difficulty: 3
  },
  {
    id: 'int3_3',
    category: 'internet',
    label: 'Server',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Server',
    sentence: 'A server is a computer that provides data to other computers.',
    difficulty: 3
  },
  {
    id: 'int4',
    category: 'internet',
    label: 'DNS',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'D N S',
    sentence: 'DNS translates website names into IP addresses.',
    difficulty: 4
  },
  {
    id: 'int4_2',
    category: 'internet',
    label: 'Cybersecurity',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Cybersecurity',
    sentence: 'Cybersecurity keeps you safe on the internet.',
    difficulty: 4
  },
  {
    id: 'int4_3',
    category: 'internet',
    label: 'Protocol',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800',
    pronunciation: 'Protocol',
    sentence: 'A protocol is a set of rules for how data is sent.',
    difficulty: 4
  }
];

export const BADGES = [
  { id: 'ai_expert', name: 'AI Specialist', icon: '🤖', description: 'Mastered the basics of AI!' },
  { id: 'hardware_hero', name: 'Hardware Hero', icon: '⚙️', description: 'Knows all about computer parts!' },
  { id: 'software_wizard', name: 'Software Wizard', icon: '🧙‍♂️', description: 'Understands how programs work!' },
  { id: 'security_guard', name: 'Security Guard', icon: '🛡️', description: 'Expert in internet safety!' }
];
