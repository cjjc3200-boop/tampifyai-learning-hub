/* TampifyAI Learning Hub — curriculum. Free-tier lesson bodies included; Pro bodies live in data-pro-a.js and data-pro-b.js */
window.CONFIG = {
  PRO_PRICE_MONTH: 9.99,
  PRO_PRICE_YEAR: 100,
  // PASTE YOUR REAL CHECKOUT LINKS HERE (one line each):
  CHECKOUT_MONTHLY: "CHECKOUT_MONTHLY",
  CHECKOUT_YEARLY: "CHECKOUT_YEARLY",
  // Optional: codes that unlock Pro locally (e.g. for testing / manual sales)
  ACCESS_CODES: ["TAMPIFY-PRO"]
};

window.TRACKS = [
  { id:"foundations", tier:"free", icon:"AI", title:"AI Foundations", desc:"What AI is, how it learns, and where it already runs your day.", lessons:[
    { id:"f1", xp:50, title:"What is AI?", body:`<p><strong>Artificial intelligence</strong> is the idea of getting computers to do things that normally need a human brain: recognising a face, understanding a sentence, choosing a move in a game.</p><p>Modern AI is mostly <strong>machine learning</strong> &mdash; instead of being handed every rule, a program learns patterns from examples. Show it a million photos labelled cat and dog and it works out the difference itself.</p><p>Think of it as a very fast apprentice. It has read more than any person could, but it still needs clear instructions and a human to check the work.</p><ul><li><strong>Narrow AI:</strong> great at one task. Everything you use today is narrow.</li><li><strong>General AI:</strong> a human-level all-rounder. Does not exist yet.</li></ul><p>By the end of this track you will know how these systems work, where you already use them, and what they still get wrong.</p>` },
    { id:"f2", xp:50, title:"How AI Learns", body:`<p>Machine learning follows a simple loop: <strong>guess, check, adjust, repeat</strong>.</p><p>The model makes a prediction, sees how wrong it was, and nudges its internal numbers (called <strong>weights</strong>) to do a little better next time. Do that millions of times and the wrongness shrinks.</p><ul><li><strong>Training data</strong> is the practice set.</li><li><strong>Weights</strong> are what the model actually learns.</li><li><strong>Loss</strong> scores how wrong it is &mdash; the number training tries to shrink.</li></ul><p>The key insight: nobody programs the final behaviour. It <em>emerges</em> from the data and the feedback loop. That is why the quality of your data sets the ceiling on the quality of your model.</p>` },
    { id:"f3", xp:50, title:"AI vs ML vs Deep Learning", body:`<p>These three words get used as if they mean the same thing. They are layers of a set:</p><ul><li><strong>AI</strong> &mdash; the whole field: any machine doing something smart.</li><li><strong>Machine learning</strong> &mdash; the biggest slice of AI, where a model learns from data instead of being hand-coded.</li><li><strong>Deep learning</strong> &mdash; machine learning using <strong>neural networks</strong> with many layers, which power image, speech and language AI.</li></ul><p>The analogy: AI is the ocean, machine learning is the sea, deep learning is a current inside it.</p><p>When someone says AI today they almost always mean deep learning &mdash; and usually an <strong>LLM</strong> (large language model) trained on enormous amounts of text.</p>` },
    { id:"f4", xp:50, title:"Where You Already Use AI", body:`<p>You are already an AI user &mdash; most people just do not notice.</p><ul><li>Your phone's face unlock (computer vision).</li><li>Maps predicting traffic and rerouting (forecasting).</li><li>Streaming recommendations (pattern matching).</li><li>Autocorrect and search suggestions (language models).</li><li>Bank fraud alerts (anomaly detection).</li></ul><p>Spotting these in the wild is a real skill. Once you can name what a system is doing &mdash; predicting, classifying, generating, ranking &mdash; you can reason about how it works and where it fails.</p><p><strong>Practice:</strong> today, notice three times AI quietly helped you, and name the task it did.</p>` },
    { id:"f5", xp:50, title:"AI Myths Busted", body:`<ul><li><strong>"AI knows everything."</strong> No &mdash; it predicts likely text and can be confidently wrong (a hallucination).</li><li><strong>"AI will replace every job next year."</strong> It automates <em>tasks</em> fast and whole <em>jobs</em> slowly. Most roles change rather than vanish.</li><li><strong>"AI is objective."</strong> It learns from human data, so it can inherit human bias.</li><li><strong>"You must be a coder."</strong> A growing share of AI work is prompting, evaluation and design.</li><li><strong>"Bigger is always better."</strong> A small model that fits the task often beats a giant one.</li></ul><p>Keeping a clear head about what AI is and is not is the difference between using it well and being fooled by it.</p>` },
    { id:"f6", xp:50, title:"AI Ethics & Safety", body:`<p>Building with AI means making choices with real consequences. The four you meet most:</p><ul><li><strong>Bias:</strong> unfair outcomes learned from skewed data.</li><li><strong>Privacy:</strong> the personal data used to train and run models.</li><li><strong>Accountability:</strong> who is responsible when an AI makes a harmful call.</li><li><strong>Transparency:</strong> telling people when they are dealing with AI.</li></ul><p>A useful habit is the <strong>human in the loop</strong> rule: for any high-stakes decision &mdash; health, money, safety &mdash; keep a person who can review and override the model.</p><p><strong>Practice:</strong> pick one AI you use and write one sentence on a risk it carries and who should own it.</p>` }
  ]},
  { id:"prompting", tier:"free", icon:"PR", title:"Prompt Engineering", desc:"Get dramatically better answers by writing briefs, not wishes.", lessons:[
    { id:"p1", xp:50, title:"Anatomy of a Prompt", body:`<p>A prompt is a brief, not a wish. Weak prompts get weak answers because the model fills the gaps with guesses.</p><p>Good prompts carry five things:</p><ul><li><strong>Task</strong> &mdash; what you want done.</li><li><strong>Role</strong> &mdash; who the model should act as.</li><li><strong>Context</strong> &mdash; the background it needs.</li><li><strong>Format</strong> &mdash; how the answer should look.</li><li><strong>Constraints</strong> &mdash; length, tone, what to avoid.</li></ul><p><strong>Before:</strong> "Write about marketing."<br/><strong>After:</strong> "Act as a startup marketer. Write 3 Instagram captions (max 15 words each, friendly tone) for a coffee subscription aimed at students."</p><p>Same model, wildly different usefulness.</p>` },
    { id:"p2", xp:50, title:"Give AI a Role", body:`<p>Giving the model a role is the cheapest upgrade in prompting. It switches on a whole vocabulary of expertise.</p><p>"You are an experienced nutritionist" makes it reach for nutrient reasoning. "You are a strict code reviewer" makes it hunt for bugs instead of praise.</p><p>Tips for strong roles:</p><ul><li>Be specific: "senior product manager at a B2B SaaS startup" beats "expert".</li><li>Add a stance: "...who is skeptical of hype".</li><li>Stack with audience: "...explaining to a 13-year-old".</li></ul><p><strong>Practice:</strong> take any request and prepend one of: teacher, editor, engineer, coach, critic. Compare the outputs.</p>` },
    { id:"p3", xp:50, title:"Context Is King", body:`<p>Models do not know your situation. Context is how you transfer it.</p><p>Give them:</p><ul><li><strong>Audience</strong> &mdash; who is this for?</li><li><strong>Goal</strong> &mdash; what should happen after they read it?</li><li><strong>Background</strong> &mdash; facts, history, constraints.</li><li><strong>Examples</strong> &mdash; a sample of the style you want.</li></ul><p>There is a hard limit: the model has a <strong>context window</strong> &mdash; a fixed amount of text it can hold at once. Everything relevant should be inside it; everything irrelevant is noise that can muddy the answer.</p><p>Rule of thumb: paste the <em>right</em> 200 words, not the <em>wrong</em> 2,000.</p>` },
    { id:"p4", xp:50, title:"Few-Shot Examples", body:`<p>Showing beats telling. Instead of describing the output you want, give the model a couple of examples and let it copy the pattern.</p><ul><li><strong>Input:</strong> "I love this place" &rarr; <strong>Output:</strong> Positive</li><li><strong>Input:</strong> "Long wait, cold food" &rarr; <strong>Output:</strong> Negative</li><li><strong>Now:</strong> "Great vibe, overpriced" &rarr;</li></ul><p>The model completes the pattern &mdash; usually correctly, even for cases you never listed. Two or three well-chosen examples ("few-shot") often beat a long paragraph of instructions, especially for tone and format.</p><p><strong>Practice:</strong> teach the model your own writing style with two sample sentences, then have it write a new one.</p>` },
    { id:"p5", xp:50, title:"Iterate & Refine", body:`<p>The first answer is a draft, not a verdict. Good prompters work in rounds.</p><ul><li><strong>Ask for options:</strong> "give me 5 versions".</li><li><strong>React by name:</strong> "version 3, but shorter and warmer".</li><li><strong>Ask it to self-check:</strong> "review that for errors and fix them".</li><li><strong>Change one thing at a time</strong> so you learn what worked.</li></ul><p>If it keeps missing, the fix is usually upstream: the instruction was vague. Rewrite the brief rather than nagging the model.</p><p>Treat it as a conversation with a fast collaborator who never gets bored &mdash; the quality comes from your judgment steering it.</p>` }
  ]},
  { id:"careers", tier:"free", icon:"TC", title:"Tech Careers 101", desc:"The map of AI jobs, and how to start without a degree.", lessons:[
    { id:"c1", xp:50, title:"The AI Job Landscape", body:`<p>AI created new jobs and reshaped old ones. The titles worth knowing:</p><ul><li><strong>Prompt engineer / AI operations</strong> &mdash; designing and tuning AI workflows.</li><li><strong>Data analyst / scientist</strong> &mdash; turning data into decisions.</li><li><strong>ML engineer</strong> &mdash; building and deploying models.</li><li><strong>AI product manager</strong> &mdash; deciding what to build with AI.</li><li><strong>AI ethicist / policy</strong> &mdash; keeping systems fair and legal.</li></ul><p>Two truths to hold: many roles are <strong>hybrid</strong> (AI skill plus a domain like health, law or marketing), and <strong>portfolio beats credentials</strong> &mdash; a small real project you can explain outshines a certificate.</p>` },
    { id:"c2", xp:50, title:"Three Paths You Can Start Now", body:`<p>You do not have to pick a lifetime label at 16. Pick a <strong>direction</strong>.</p><ul><li><strong>Builder</strong> &mdash; likes making things work. Start: Python, small automations, a tiny app.</li><li><strong>Analyst</strong> &mdash; likes finding the story in numbers. Start: spreadsheets, then SQL and charts.</li><li><strong>Translator</strong> &mdash; likes people and problems. Start: prompting, writing, organising AI tools for a team.</li></ul><p>All three are in demand. The fastest way to choose is to <strong>try each for a week</strong> and notice which one you lose track of time doing.</p><p><strong>Practice:</strong> write down which path you would test first and one small first project.</p>` },
    { id:"c3", xp:50, title:"Skills That Actually Matter", body:`<p>Tools change every few months; these do not:</p><ul><li><strong>Clear writing</strong> &mdash; now the main way you direct AI.</li><li><strong>Curiosity</strong> &mdash; reading docs and testing beats memorising.</li><li><strong>Problem framing</strong> &mdash; turning a vague goal into a solvable one.</li><li><strong>Comfort with data</strong> &mdash; spotting what a number does and does not prove.</li><li><strong>Collaboration</strong> &mdash; most work is people and AI together.</li></ul><p>Employers increasingly hire for <strong>demonstrated</strong> skill: a project, a fix, a write-up. Learn one tool deeply instead of ten shallowly &mdash; the pattern transfers to the next tool.</p>` },
    { id:"c4", xp:50, title:"Breaking In Without a Degree", body:`<p>A degree is one route, not the only one.</p><ul><li><strong>Build in public.</strong> Post small projects; they are your proof.</li><li><strong>Do real tasks.</strong> Freelance, volunteer, or automate a job you already have.</li><li><strong>Learn one role's stack.</strong> Go deep on the few tools that role uses.</li><li><strong>Network lightly.</strong> Comment thoughtfully, help in communities, ask specific questions.</li><li><strong>Show the work.</strong> A three-sentence write-up of a problem you solved beats a CV line.</li></ul><p>Entry paths include AI support, junior analyst, automation specialist and content-plus-AI roles &mdash; all reachable without a CS degree.</p>` }
  ]},

  { id:"ml", tier:"pro", icon:"ML", title:"ML Deep Dive", desc:"How models actually learn, fail, and ship.", lessons:[
    { id:"m1", xp:75, title:"Supervised Learning" },
    { id:"m2", xp:75, title:"Unsupervised Learning" },
    { id:"m3", xp:75, title:"Reinforcement Learning" },
    { id:"m4", xp:75, title:"Overfitting & Testing" },
    { id:"m5", xp:75, title:"Models in Production" }
  ]},
  { id:"python", tier:"pro", icon:"Py", title:"Python for AI", desc:"From first line of code to a working AI script.", lessons:[
    { id:"py1", xp:75, title:"Why Python" },
    { id:"py2", xp:75, title:"Variables & Types" },
    { id:"py3", xp:75, title:"Lists & Loops" },
    { id:"py4", xp:75, title:"Functions" },
    { id:"py5", xp:75, title:"AI Libraries & Your First Script" }
  ]},
  { id:"automation", tier:"pro", icon:"AU", title:"AI Automation & No-Code", desc:"Automate real work without writing code.", lessons:[
    { id:"a1", xp:75, title:"The Automation Mindset" },
    { id:"a2", xp:75, title:"Your First Workflow" },
    { id:"a3", xp:75, title:"Connecting Apps" },
    { id:"a4", xp:75, title:"AI Steps in Workflows" },
    { id:"a5", xp:75, title:"No-Code AI Builders" }
  ]},
  { id:"cyber", tier:"pro", icon:"CS", title:"Cybersecurity", desc:"Defend systems in the age of AI-powered attacks.", lessons:[
    { id:"s1", xp:75, title:"Threat Landscape" },
    { id:"s2", xp:75, title:"Passwords & Authentication" },
    { id:"s3", xp:75, title:"Phishing & Social Engineering" },
    { id:"s4", xp:75, title:"AI in Security" },
    { id:"s5", xp:75, title:"Careers in Cyber" }
  ]},
  { id:"data", tier:"pro", icon:"DS", title:"Data Science", desc:"Turn raw numbers into confident decisions.", lessons:[
    { id:"d1", xp:75, title:"The Data Mindset" },
    { id:"d2", xp:75, title:"Cleaning Data" },
    { id:"d3", xp:75, title:"Finding Patterns" },
    { id:"d4", xp:75, title:"Visualizing Data" },
    { id:"d5", xp:75, title:"From Data to Decisions" }
  ]},
  { id:"entrepreneur", tier:"pro", icon:"EN", title:"AI Entrepreneurship", desc:"Build and sell an AI-powered product of your own.", lessons:[
    { id:"e1", xp:75, title:"Finding AI Opportunities" },
    { id:"e2", xp:75, title:"Validating an Idea" },
    { id:"e3", xp:75, title:"Building with AI Tools" },
    { id:"e4", xp:75, title:"Pricing & Packaging" },
    { id:"e5", xp:75, title:"Launch & Grow" }
  ]}
];
