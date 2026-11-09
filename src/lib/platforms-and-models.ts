// Educational directory data. Details are compiled summaries; verify on each official site before applying.
export type WorkPlatform = {
  name: string; parent: string; status: string; tier: 'Expert' | 'Generalist' | 'Enterprise';
  targets: string; pay: string; entry: string; url: string;
};

export type AIModel = {
  name: string; maker: string; version: string; type: 'Reasoning' | 'Multimodal' | 'Open-Weights';
  note: string; trainedVia: string[];
};

export const workPlatforms: WorkPlatform[] = [
  { name: 'Outlier', parent: 'Scale AI', status: 'Private (Meta minority stake)', tier: 'Generalist', targets: 'Writers, coders, STEM and language experts', pay: '$15–$50+/hr', entry: 'Skills screening + project assessments', url: 'https://outlier.ai' },
  { name: 'DataAnnotation.tech', parent: 'Surge AI', status: 'Private, bootstrapped', tier: 'Generalist', targets: 'Strong writers, coders, generalists', pay: '$20–$40+/hr', entry: 'Starter assessment (writing + reasoning)', url: 'https://www.dataannotation.tech' },
  { name: 'Alignerr', parent: 'Labelbox', status: 'Private, VC-backed', tier: 'Expert', targets: 'Domain experts, PhDs, coders', pay: '$15–$150/hr', entry: 'AI interview + domain tests', url: 'https://www.alignerr.com' },
  { name: 'Mindrift', parent: 'Toloka AI', status: 'Private (Bezos Expeditions-backed)', tier: 'Expert', targets: 'Subject experts, writers, linguists', pay: '$15–$50+/hr', entry: 'Qualification tests per project', url: 'https://mindrift.ai' },
  { name: 'Mercor', parent: 'Mercor (independent)', status: 'Private, VC-backed', tier: 'Expert', targets: 'Professionals: law, medicine, finance, code', pay: '$30–$150+/hr', entry: 'AI video interview + profile', url: 'https://mercor.com' },
  { name: 'Micro1', parent: 'Micro1 (independent)', status: 'Private, VC-backed', tier: 'Expert', targets: 'Engineers and domain experts', pay: '$25–$100/hr', entry: 'AI interviewer "Zara" screening', url: 'https://micro1.ai' },
  { name: 'Handshake AI', parent: 'Handshake (Stryder Corp)', status: 'Private', tier: 'Expert', targets: 'Students, grads, PhDs', pay: '$30–$100+/hr', entry: 'Handshake profile + fellowship tests', url: 'https://joinhandshake.com' },
  { name: 'Invisible Technologies', parent: 'Invisible (independent)', status: 'Private', tier: 'Expert', targets: 'AI trainers, advanced reasoning experts', pay: '$15–$60/hr', entry: 'Multi-stage assessments', url: 'https://invisible.co' },
  { name: 'TELUS Digital AI', parent: 'TELUS Corporation', status: 'Public (NYSE: TU)', tier: 'Enterprise', targets: 'Raters, linguists, search evaluators', pay: '$10–$20/hr', entry: 'Rater exam + region checks', url: 'https://www.telusdigital.com' },
  { name: 'Appen', parent: 'Appen Limited', status: 'Public (ASX: APX)', tier: 'Enterprise', targets: 'Raters, transcribers, linguists', pay: '$8–$20/hr', entry: 'Project qualification exams', url: 'https://appen.com' },
  { name: 'RWS TrainAI', parent: 'RWS Holdings', status: 'Public (LSE: RWS)', tier: 'Enterprise', targets: 'Linguists, translators, raters', pay: '$10–$30/hr', entry: 'Language + guideline tests', url: 'https://www.rws.com/artificial-intelligence/train-ai-data-services/' },
  { name: 'Rex.zone', parent: 'Rex.zone (independent)', status: 'Private, early-stage', tier: 'Expert', targets: 'Remote experts, writers, coders', pay: '$25–$45+/hr', entry: 'Profile + skills verification', url: 'https://rex.zone' },
  { name: 'Pasiflora AI', parent: 'Pasiflora (independent)', status: 'Private, early-stage', tier: 'Expert', targets: 'Credentialed SMEs, researchers', pay: '$30–$80+/hr', entry: 'Bloom quiz + credential review', url: 'https://pasiflora.ai' },
  { name: 'OneForma', parent: 'Pactera EDGE', status: 'Private', tier: 'Enterprise', targets: 'Multilingual contributors', pay: '$8–$25/hr', entry: 'Per-project qualifications', url: 'https://www.oneforma.com' },
  { name: 'Prolific', parent: 'Prolific (independent)', status: 'Private, UK-based', tier: 'Generalist', targets: 'Research participants, AI taskers', pay: '$8–$30+/hr', entry: 'Profile + screener studies', url: 'https://www.prolific.com' },
  { name: 'TaskUs', parent: 'TaskUs Inc.', status: 'Public (NASDAQ: TASK)', tier: 'Enterprise', targets: 'Content moderators, AI ops staff', pay: 'Salaried / hourly', entry: 'Standard employment hiring', url: 'https://www.taskus.com' },
  { name: 'Turing', parent: 'Turing (independent)', status: 'Private, VC-backed', tier: 'Expert', targets: 'Senior software engineers, algorithm specialists', pay: '$30–$100+/hr', entry: 'Coding tests + technical interview', url: 'https://www.turing.com' },
  { name: 'xAI AI Tutor', parent: 'xAI', status: 'Private', tier: 'Expert', targets: 'STEM, writing and language specialists', pay: '$35–$65/hr', entry: 'Direct application + domain assessment', url: 'https://x.ai/careers' },
  { name: 'Snorkel Expert Network', parent: 'Snorkel AI', status: 'Private, VC-backed', tier: 'Expert', targets: 'Domain experts for frontier-lab data', pay: '$40–$150/hr', entry: 'Credential review + task trial', url: 'https://snorkel.ai' },
  { name: 'Toloka', parent: 'Toloka AI', status: 'Private (Bezos Expeditions-backed)', tier: 'Generalist', targets: 'Global taskers, raters', pay: '$5–$20/hr', entry: 'Short training tasks', url: 'https://toloka.ai' },
  { name: 'Clickworker', parent: 'Clickworker GmbH', status: 'Private, Germany', tier: 'Generalist', targets: 'Microtaskers, writers, raters', pay: '$5–$15/hr', entry: 'Profile + skill tests', url: 'https://www.clickworker.com' },
  { name: 'iMerit', parent: 'iMerit Technology', status: 'Private', tier: 'Enterprise', targets: 'Annotation specialists, medical labellers', pay: 'Salaried / hourly', entry: 'Employment hiring + training', url: 'https://imerit.net' },
  { name: 'Sama', parent: 'Sama (B Corp)', status: 'Private', tier: 'Enterprise', targets: 'Data annotators (East Africa, Asia)', pay: 'Salaried', entry: 'Employment hiring', url: 'https://www.sama.com' },
  { name: 'CloudFactory', parent: 'CloudFactory Ltd', status: 'Private, UK/Nepal', tier: 'Enterprise', targets: 'Managed workforce annotators', pay: 'Hourly / salaried', entry: 'Application + training cohort', url: 'https://www.cloudfactory.com' },
  { name: 'Welocalize', parent: 'Welocalize Inc.', status: 'Private', tier: 'Enterprise', targets: 'Linguists, search raters', pay: '$10–$25/hr', entry: 'Language + rater exams', url: 'https://www.welocalize.com' },
  { name: 'DataForce', parent: 'TransPerfect', status: 'Private', tier: 'Enterprise', targets: 'Multilingual data contributors', pay: '$8–$25/hr', entry: 'Per-project qualifications', url: 'https://www.dataforce.ai' },
  { name: 'Defined.ai', parent: 'Defined.ai (independent)', status: 'Private', tier: 'Enterprise', targets: 'Speech and language contributors', pay: 'Per task', entry: 'Neevo app qualification', url: 'https://www.defined.ai' },
  { name: 'Centific', parent: 'Centific (ex-Pactera EDGE)', status: 'Private', tier: 'Enterprise', targets: 'Linguists, AI safety raters', pay: '$10–$30/hr', entry: 'Project-based exams', url: 'https://centific.com' },
];


export const aiModels: AIModel[] = [
  { name: 'GPT-5 / o-series', maker: 'OpenAI', version: 'GPT-5, o3, o4-mini', type: 'Reasoning', note: 'Chain-of-thought reasoning for maths, code and science.', trainedVia: ['Outlier', 'Mercor', 'Handshake AI'] },
  { name: 'Claude', maker: 'Anthropic', version: 'Claude Sonnet 4.5, Opus 4.1', type: 'Reasoning', note: 'Strong at coding, writing and safe agentic work.', trainedVia: ['DataAnnotation.tech', 'Mercor', 'Invisible Technologies'] },
  { name: 'Gemini', maker: 'Google DeepMind', version: 'Gemini 2.5 Pro / Flash', type: 'Multimodal', note: 'Text, image, audio and video in one long-context model.', trainedVia: ['TELUS Digital AI', 'Appen', 'Outlier'] },
  { name: 'Llama', maker: 'Meta AI', version: 'Llama 4 Scout / Maverick', type: 'Open-Weights', note: 'Openly downloadable multimodal models.', trainedVia: ['Outlier', 'Alignerr'] },
  { name: 'DeepSeek', maker: 'DeepSeek', version: 'DeepSeek-R1, V3.1', type: 'Open-Weights', note: 'Low-cost open reasoning models.', trainedVia: ['In-house annotation teams'] },
  { name: 'Grok', maker: 'xAI', version: 'Grok 4', type: 'Reasoning', note: 'Real-time X data with heavy reasoning mode.', trainedVia: ['xAI AI Tutor program', 'Mercor'] },
  { name: 'Mistral', maker: 'Mistral AI', version: 'Mistral Large 2, Medium 3', type: 'Open-Weights', note: 'European open and commercial models.', trainedVia: ['Mindrift', 'RWS TrainAI'] },
  { name: 'Command', maker: 'Cohere', version: 'Command A, R+', type: 'Multimodal', note: 'Enterprise search, RAG and multilingual focus.', trainedVia: ['Invisible Technologies', 'Prolific'] },
  { name: 'Gemma', maker: 'Google DeepMind', version: 'Gemma 3', type: 'Open-Weights', note: 'Small open models that run on laptops.', trainedVia: ['Appen', 'OneForma'] },
  { name: 'Amazon Nova', maker: 'Amazon AGI', version: 'Nova Pro / Lite / Premier', type: 'Multimodal', note: 'Multimodal models served through AWS Bedrock.', trainedVia: ['Appen', 'TaskUs'] },
];

export type AITool = { name: string; maker: string; type: 'Evaluation' | 'Annotation' | 'Prompting' | 'Productivity'; use: string; tip: string; url: string };

export const aiTools: AITool[] = [
  { name: 'LMArena (Chatbot Arena)', maker: 'LMSYS / LMArena', type: 'Evaluation', use: 'Compare two model answers side by side and vote — mirrors real preference-ranking work.', tip: 'Practise writing a one-line justification for every vote.', url: 'https://lmarena.ai' },
  { name: 'LangSmith', maker: 'LangChain', type: 'Evaluation', use: 'Trace, test and score LLM outputs against datasets and rubrics.', tip: 'Learn how rubric-based scoring works before evaluator assessments.', url: 'https://www.langchain.com/langsmith' },
  { name: 'Weights & Biases', maker: 'CoreWeave', type: 'Evaluation', use: 'Track experiments and model evaluations used by research teams.', tip: 'Useful vocabulary for AI research and ML ops roles.', url: 'https://wandb.ai' },
  { name: 'Label Studio', maker: 'HumanSignal', type: 'Annotation', use: 'Open-source tool for labelling text, images, audio and video.', tip: 'Install locally to practise annotation before applying.', url: 'https://labelstud.io' },
  { name: 'Argilla', maker: 'Hugging Face', type: 'Annotation', use: 'Collect human feedback and build datasets for fine-tuning and RLHF.', tip: 'Shows exactly how preference data is gathered for model training.', url: 'https://argilla.io' },
  { name: 'CVAT', maker: 'CVAT.ai', type: 'Annotation', use: 'Computer-vision labelling: boxes, polygons and video tracking.', tip: 'Good practice for image-annotation projects.', url: 'https://www.cvat.ai' },
  { name: 'OpenAI Playground', maker: 'OpenAI', type: 'Prompting', use: 'Test prompts, system messages and settings on GPT models.', tip: 'Practise writing adversarial and edge-case prompts.', url: 'https://platform.openai.com/playground' },
  { name: 'Anthropic Console', maker: 'Anthropic', type: 'Prompting', use: 'Draft and evaluate prompts for Claude models.', tip: 'Its prompt-improver shows what strong instructions look like.', url: 'https://console.anthropic.com' },
  { name: 'Google AI Studio', maker: 'Google', type: 'Prompting', use: 'Free playground for Gemini models, including multimodal input.', tip: 'Great for testing image + text reasoning tasks.', url: 'https://aistudio.google.com' },
  { name: 'LM Studio', maker: 'Element Labs', type: 'Prompting', use: 'Run open-weights models (Llama, DeepSeek, Mistral) on your own computer.', tip: 'Compare open models privately and for free.', url: 'https://lmstudio.ai' },
  { name: 'NotebookLM', maker: 'Google', type: 'Productivity', use: 'Summarise guidelines and research papers from your own sources.', tip: 'Load long project guidelines to study them faster.', url: 'https://notebooklm.google' },
  { name: 'Grammarly', maker: 'Grammarly', type: 'Productivity', use: 'Polish written rationales and feedback for clarity.', tip: 'Clear, error-free justifications raise quality scores.', url: 'https://www.grammarly.com' },
];

export type Course = { name: string; provider: string; level: 'Foundations' | 'Prompting & Evaluation' | 'Technical' | 'Certification' | 'AI Safety'; cost: string; duration: string; learn: string; url: string };

export const courses: Course[] = [
  { name: 'Elements of AI', provider: 'University of Helsinki', level: 'Foundations', cost: 'Free', duration: '~30 hrs', learn: 'Plain-language intro to what AI is, can and cannot do.', url: 'https://www.elementsofai.com' },
  { name: 'AI For Everyone', provider: 'DeepLearning.AI (Coursera)', level: 'Foundations', cost: 'Free to audit', duration: '~6 hrs', learn: 'Non-technical overview of AI projects and terminology.', url: 'https://www.coursera.org/learn/ai-for-everyone' },
  { name: 'Google AI Essentials', provider: 'Google (Coursera)', level: 'Foundations', cost: 'Subscription', duration: '~10 hrs', learn: 'Everyday productivity with generative AI and responsible use.', url: 'https://www.coursera.org/learn/google-ai-essentials' },
  { name: 'OpenAI Academy', provider: 'OpenAI', level: 'Foundations', cost: 'Free', duration: 'Self-paced', learn: 'Workshops and guides on using ChatGPT and the API well.', url: 'https://academy.openai.com' },
  { name: 'Prompt Engineering Interactive Tutorial', provider: 'Anthropic', level: 'Prompting & Evaluation', cost: 'Free', duration: '~5 hrs', learn: 'Hands-on lessons in clear instructions, roles and examples.', url: 'https://github.com/anthropics/prompt-eng-interactive-tutorial' },
  { name: 'ChatGPT Prompt Engineering for Developers', provider: 'DeepLearning.AI', level: 'Prompting & Evaluation', cost: 'Free', duration: '~1.5 hrs', learn: 'Prompt patterns for summarising, inferring and transforming text.', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/' },
  { name: 'Evaluating AI Agents', provider: 'DeepLearning.AI', level: 'Prompting & Evaluation', cost: 'Free', duration: '~2 hrs', learn: 'How to score, trace and improve AI agent outputs — core evaluator skill.', url: 'https://www.deeplearning.ai/short-courses/' },
  { name: 'Hugging Face LLM Course', provider: 'Hugging Face', level: 'Technical', cost: 'Free', duration: 'Self-paced', learn: 'Transformers, fine-tuning and datasets with open models.', url: 'https://huggingface.co/learn/llm-course' },
  { name: 'Practical Deep Learning for Coders', provider: 'fast.ai', level: 'Technical', cost: 'Free', duration: '~9 weeks', learn: 'Build and train real models with code from lesson one.', url: 'https://course.fast.ai' },
  { name: 'Neural Networks: Zero to Hero', provider: 'Andrej Karpathy', level: 'Technical', cost: 'Free', duration: '~20 hrs video', learn: 'Build a GPT from scratch to truly understand LLMs.', url: 'https://karpathy.ai/zero-to-hero.html' },
  { name: 'Microsoft Azure AI Fundamentals (AI-900)', provider: 'Microsoft', level: 'Certification', cost: 'Exam ~$99', duration: '~10 hrs prep', learn: 'Entry-level certificate on AI workloads and responsible AI.', url: 'https://learn.microsoft.com/credentials/certifications/azure-ai-fundamentals/' },
  { name: 'AWS Certified AI Practitioner', provider: 'Amazon Web Services', level: 'Certification', cost: 'Exam ~$100', duration: '~15 hrs prep', learn: 'Validates understanding of AI, ML and generative AI concepts.', url: 'https://aws.amazon.com/certification/certified-ai-practitioner/' },
  { name: 'IBM AI Engineering Professional Certificate', provider: 'IBM (Coursera)', level: 'Certification', cost: 'Subscription', duration: '~4 months', learn: 'Machine learning, deep learning and LLM engineering portfolio.', url: 'https://www.coursera.org/professional-certificates/ai-engineer' },
  { name: 'AI Safety Fundamentals', provider: 'BlueDot Impact', level: 'AI Safety', cost: 'Free (cohort)', duration: '~8 weeks', learn: 'Alignment, red-teaming and governance — useful for safety rater roles.', url: 'https://bluedot.org' },
  { name: 'Red Teaming LLM Applications', provider: 'DeepLearning.AI × Giskard', level: 'AI Safety', cost: 'Free', duration: '~1 hr', learn: 'Find jailbreaks, bias and harmful outputs systematically.', url: 'https://www.deeplearning.ai/short-courses/red-teaming-llm-applications/' },
];

export type Tip = { title: string; topic: 'Getting Hired' | 'Interview Help' | 'Doing the Work' | 'Pay & Growth' | 'Reviews & Safety'; advice: string; action: string };

export const tips: Tip[] = [
  { title: 'Treat the assessment like the job', topic: 'Getting Hired', advice: 'Most platforms decide on your first skills test. Read every instruction twice and take your time — speed rarely matters, accuracy does.', action: 'Do assessments when rested, in one sitting.' },
  { title: 'Lead your profile with your specialism', topic: 'Getting Hired', advice: 'Expert projects pay most. Put your degree, language or coding skill in the first line of your profile and CV.', action: 'Rewrite your headline as "Domain + AI evaluation".' },
  { title: 'Apply to 4–6 platforms at once', topic: 'Getting Hired', advice: 'Work comes in waves. Being active on several platforms keeps income steady when one goes quiet.', action: 'Track applications in a simple spreadsheet.' },
  { title: 'Prepare for the AI video interview', topic: 'Interview Help', advice: 'Mercor, Micro1 and others use recorded AI interviews. Look at the camera, answer in 60–90 seconds and give one concrete example each time.', action: 'Practise 3 answers aloud and record yourself.' },
  { title: 'Explain your reasoning out loud', topic: 'Interview Help', advice: 'Reviewers want to hear how you judge a response: accuracy, helpfulness, safety, then style. Say this order clearly.', action: 'Use "What, why, so what" for each judgement.' },
  { title: 'Common questions to rehearse', topic: 'Interview Help', advice: '"Describe a time you found an error others missed." "How would you rate a confident but wrong answer?" "How do you handle unclear guidelines?"', action: 'Write short STAR answers for each.' },
  { title: 'Guidelines beat instinct', topic: 'Doing the Work', advice: 'Quality reviewers score you against the project guide, not your opinion. When unsure, quote the rule you followed in your rationale.', action: 'Keep a one-page summary of each project guide.' },
  { title: 'Write short, specific rationales', topic: 'Doing the Work', advice: 'Two or three sentences naming the exact problem ("states the wrong year in line 2") beat long general comments.', action: 'Name the error, the rule, and the fix.' },
  { title: 'Fact-check with sources', topic: 'Doing the Work', advice: 'Never trust a model\'s facts. Check claims against reliable sources before marking a response correct.', action: 'Keep trusted reference sites bookmarked.' },
  { title: 'Quality unlocks higher pay', topic: 'Pay & Growth', advice: 'Strong review scores move you to reviewer, team lead and expert projects that pay more per hour.', action: 'Ask for feedback after each project batch.' },
  { title: 'Build a skill ladder', topic: 'Pay & Growth', advice: 'Generalist → prompt writing → coding or domain expert → red-teaming. Each step opens better-paid work.', action: 'Pick one course from AI Educate per month.' },
  { title: 'Never pay to join', topic: 'Reviews & Safety', advice: 'Real AI work platforms do not charge fees. Messages asking for payment, crypto or bank logins are scams.', action: 'Only apply through official sites.' },
  { title: 'Read worker reviews first', topic: 'Reviews & Safety', advice: 'Check Reddit, Glassdoor and Trustpilot for recent comments on pay delays, project gaps and support.', action: 'Look at reviews from the last 3 months.' },
];
