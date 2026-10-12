export type Information = { intro: string; sections: { heading: string; text: string }[] };

export const demoInformation: Record<string, Information> = {
  'AI Work': { intro: 'Explore the human skills behind AI: writing, evaluation, research and specialist knowledge.', sections: [
    { heading: 'Jobs and placements', text: 'Compare the role, required skills, location eligibility and project format. AI training often involves freelance tasks rather than a guaranteed salaried position.' },
    { heading: 'Referrals', text: 'A referral introduces a candidate to a platform or team. It does not guarantee acceptance. Prepare a concise skills summary and verify the official application process.' },
  ] },
  Referrals: { intro: 'A practical guide to professional introductions in AI work.', sections: [
    { heading: 'Prepare your introduction', text: 'Describe your subject expertise, languages, availability and one relevant work example. Ask a trusted contact whether they can introduce you to a suitable team.' },
    { heading: 'Example referral note', text: '“I have experience reviewing technical writing and can evaluate answers for clarity and accuracy. I am interested in remote AI evaluation projects and can share a short work sample.”' },
    { heading: 'Protect your application', text: 'Apply through an official company channel. Never pay for a referral or share passwords, identity documents or banking details with an unverified intermediary.' },
  ] },
  'AI Dev Platforms': { intro: 'Understand the companies and platforms connecting human expertise with AI development.', sections: [
    { heading: 'Compare companies', text: 'Outlier, TELUS Digital and Alignerr illustrate different AI-work models. Compare supported countries, assessments, project availability and payment conditions on official company channels.' },
    { heading: 'Follow platform developments', text: 'Watch for changes in qualification requirements, task types and data-handling policies. A directory profile is a starting point for research, not an endorsement or hiring guarantee.' },
  ] },
  'AI Learning': { intro: 'Build the foundations to assess AI output and contribute thoughtful human feedback.', sections: [
    { heading: 'Tools', text: 'Explore writing assistants, spreadsheets and coding environments. Choose the tool for the task and avoid uploading confidential project data without permission.' },
    { heading: 'Models', text: 'Learn how language models, image models and multimodal systems differ, and why every output still needs human judgement.' },
    { heading: 'Education', text: 'Start with accuracy and clarity, practise comparing responses, then develop expertise in your chosen subject area.' },
  ] },
  'AI Tools': { intro: 'A starter toolkit for research, writing and evaluation.', sections: [
    { heading: 'Writing and reasoning assistants', text: 'ChatGPT, Claude and Gemini are examples of conversational tools for drafting and comparing ideas. Check factual claims independently; fluent wording is not evidence of accuracy.' },
    { heading: 'Research and organisation', text: 'Use spreadsheets to track criteria, source links and decisions. Keep consistent notes so another reviewer can understand how you reached a judgement.' },
    { heading: 'Coding workflows', text: 'A code editor and a safe test environment help review generated code. Check correctness, edge cases and security instead of accepting a plausible-looking answer.' },
  ] },
  'AI Models': { intro: 'Understand what different AI systems produce and how to evaluate them.', sections: [
    { heading: 'Language models', text: 'Generate and interpret text. Evaluate factual accuracy, instruction following, reasoning and whether the response addresses the user’s actual question.' },
    { heading: 'Image and multimodal models', text: 'Image models generate or interpret visuals; multimodal systems combine text, images or audio. Review fidelity, accessibility, bias and consistency across inputs.' },
    { heading: 'Choose by task', text: 'Compare quality, cost, speed and privacy requirements. No model is best at every task, and model capabilities change over time.' },
  ] },
  'Join AI FLEX Connect': { intro: 'A community centred on practical skills, informed decisions and human expertise.', sections: [
    { heading: 'AI training resources', text: 'Explore introductions to training roles, evaluation criteria and responsible handling of project data.' },
    { heading: 'Practical tips and work updates', text: 'Use application checklists, portfolio ideas and platform comparison guidance to plan your next step.' },
    { heading: 'Your starting point', text: 'Choose an AI work category, review the introductory lessons and identify the skills you want to practise. This demonstration provides a membership overview, not an account or subscription.' },
  ] },
  Register: { intro: 'Plan your AI FLEX Connect member profile.', sections: [
    { heading: 'Professional interests', text: 'A member profile would include preferred roles, subject expertise, languages and learning goals to help organise relevant resources.' },
    { heading: 'Example member journey', text: 'A writer selects AI Trainer, reads the evaluation guide and prepares two writing samples. A developer selects coding projects and practises checking generated solutions.' },
    { heading: 'Account boundaries', text: 'This demonstration does not create an account or collect personal information. You can explore all role profiles and learning guides without registering.' },
  ] },
  'About us': { intro: 'AI FLEX Connect brings information, opportunity discovery and practical AI learning together.', sections: [
    { heading: 'Our focus', text: 'Help people understand where human judgement contributes to AI: training, evaluation, annotation, research and safety.' },
    { heading: 'Informed discovery', text: 'Clear role descriptions and skill guidance help visitors compare possible paths. Illustrative directory entries demonstrate the experience; they are not live recruitment offers.' },
  ] },
};

export const lessonSections = [
  [
    { heading: '1. Understand the task', text: 'AI trainers create examples and feedback; evaluators compare outputs; annotators label data. Read the task instructions and ask what a successful result should look like.' },
    { heading: '2. Practise with a small example', text: 'Write a short explanation of a topic you know. Review it for accuracy, clarity and completeness. Explain one improvement in a sentence.' },
    { heading: '3. Prepare to apply', text: 'Gather relevant work samples, check country eligibility and review payment terms. Never assume a qualification assessment guarantees ongoing projects.' },
  ],
  [
    { heading: 'Use a consistent rubric', text: 'Check correctness, relevance, instruction following and safety separately. A response can be well written but factually wrong.' },
    { heading: 'Compare two answers', text: 'For the question “How can I verify a job offer?”, prefer an answer that recommends official company contacts and checks for payment requests over one that simply says “trust your instincts”.' },
    { heading: 'Explain your judgement', text: 'Point to a specific strength or error and state its impact. Keep feedback objective, concise and supported by evidence.' },
  ],
  [
    { heading: 'Be specific', text: 'Define the audience, desired outcome and constraints. “Summarise this article for a beginner in five bullets” is more useful than “make it better”.' },
    { heading: 'Separate fact from interpretation', text: 'Check names, dates and numerical claims against reliable sources. Flag uncertainty instead of inventing an explanation.' },
    { heading: 'Practise a revision', text: 'Take a vague paragraph, remove unsupported claims and rewrite it with one clear main point. Explain what changed and why.' },
  ],
];

export const updateSections = [
  [ { heading: 'What the work involves', text: 'Evaluation projects can ask contributors to compare answers, check search relevance or review specialist content. Language fluency and domain knowledge are often more important than a technical degree.' }, { heading: 'What to check', text: 'Confirm location eligibility, qualification steps, payment frequency and whether project volume is guaranteed. Treat advertised rates as conditional until the official terms are clear.' } ],
  [ { heading: 'The human contribution', text: 'People recognise context, nuance and practical consequences that automated scores can miss. Expert review helps distinguish a plausible response from a useful and accurate one.' }, { heading: 'Build valuable habits', text: 'Document your reasoning, verify sources and test edge cases. Careful judgement and clear communication transfer across many AI roles.' } ],
  [ { heading: 'Before you submit', text: 'Verify the company’s official domain, read the role requirements and prepare relevant samples. Avoid recruiters who demand upfront fees.' }, { heading: 'Before you accept', text: 'Check contractor status, payment terms, confidentiality requirements and task expectations. Keep a copy of the terms and understand how support or disputes are handled.' } ],
];