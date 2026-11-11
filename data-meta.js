/* TampifyAI Learning Hub — badges, challenges, feed, careers */
window.BADGES = [
  { id:"first", icon:"✨", name:"First Steps", desc:"Finish your first lesson", test:(s)=>s.done>=1 },
  { id:"five", icon:"🔥", name:"Getting Warm", desc:"Finish 5 lessons", test:(s)=>s.done>=5 },
  { id:"fifteen", icon:"🚀", name:"On a Roll", desc:"Finish 15 lessons", test:(s)=>s.done>=15 },
  { id:"streak3", icon:"⚡", name:"Three-Day Spark", desc:"Reach a 3-day streak", test:(s)=>s.streak>=3 },
  { id:"streak7", icon:"🔥", name:"Week Warrior", desc:"Reach a 7-day streak", test:(s)=>s.streak>=7 },
  { id:"foundation", icon:"🧠", name:"AI Literate", desc:"Complete AI Foundations", test:(s)=>s.trackDone.foundations },
  { id:"prompt", icon:"📝️", name:"Prompt Pro", desc:"Complete Prompt Engineering", test:(s)=>s.trackDone.prompting },
  { id:"reader", icon:"📰", name:"Well Read", desc:"Read 3 AI feed articles", test:(s)=>s.articles>=3 },
  { id:"challenge", icon:"🏆", name:"Challenger", desc:"Finish a challenge", test:(s)=>s.challengesDone>=1 },
  { id:"master", icon:"👑", name:"Master", desc:"Reach level 5 (Master)", test:(s)=>s.level>=5 }
];

window.LEVELS = [
  { n:1, name:"Novice", at:0 },
  { n:2, name:"Learner", at:300 },
  { n:3, name:"Practitioner", at:800 },
  { n:4, name:"Specialist", at:1600 },
  { n:5, name:"Master", at:3000 }
];

window.CHALLENGES = [
  { id:"ch1", tier:"free", days:3, xp:150, title:"Prompt a Week", desc:"Write one real prompt a day for three days and note what changed the output.", tasks:["Write and run 3 prompts on a real task","Change one variable and compare outputs","Save your best prompt and reuse it"] },
  { id:"ch2", tier:"free", days:5, xp:250, title:"Spot the AI", desc:"Find AI in your everyday tools for five days.", tasks:["Name 3 AI features you used today","Explain what task each one does","Find one AI failure and explain why"] },
  { id:"ch3", tier:"free", days:7, xp:300, title:"Career Explorer", desc:"Research three AI jobs across a week.", tasks:["Pick 3 roles from the Careers page","Write one sentence on each day-to-day","List the skills each needs","Name your first step for one"] },
  { id:"ch4", tier:"pro", days:5, xp:300, title:"Automate One Task", desc:"Build a real no-code automation this week.", tasks:["Pick a repetitive task you do","Design trigger, actions, output","Build and test it once","Measure the time saved"] },
  { id:"ch5", tier:"pro", days:7, xp:400, title:"First AI Script", desc:"Write and run a Python AI script.", tasks:["Install one AI library","Run a 5-line example","Change an input and re-run","Save the script for reuse"] },
  { id:"ch6", tier:"pro", days:7, xp:400, title:"Ship a Mini Tool", desc:"Build and use one small AI tool end to end.", tasks:["Pick a use case you understand","Write the prompt as a brief","Build it with a no-code builder","Use it once for real"] }
];

window.FEED = [
  { id:"a1", tag:"Models", date:"Nov 8, 2026", title:"Why small, focused models keep winning", teaser:"Bigger is not always better. Task-tuned models are cheaper, faster and often more accurate for a single job.", body:`<p>For a while the story was simple: bigger models won. That story is getting more complicated.</p><p>Small, task-specific models are often <strong>cheaper to run, faster to answer, and just as accurate</strong> for one narrow job &mdash; classifying tickets, tagging documents, routing questions.</p><h3>What changed</h3><ul><li>Fine-tuning and distillation got easier and cheaper.</li><li>Teams learned that most tasks do not need world knowledge.</li><li>Serving costs scale with size, so fit matters to the bottom line.</li></ul><h3>What it means for you</h3><p>Do not reach for the largest model by default. Match the model to the task; reserve the giants for genuinely open-ended work. The skill is <strong>choosing well</strong>, not choosing big.</p>` },
  { id:"a2", tag:"Careers", date:"Nov 6, 2026", title:"The AI job that did not exist two years ago", teaser:"AI operations is becoming a real entry role — organising prompts, tools and quality checks for a team.", body:`<p>A new job title is spreading through companies: <strong>AI operations</strong> (sometimes "AI ops").</p><p>It is the work of making AI reliable for a team: writing and maintaining prompts, connecting tools, checking outputs, and training colleagues.</p><h3>Why it is a strong entry point</h3><ul><li>It rewards judgment and organisation more than deep maths.</li><li>It sits close to the business, so you learn fast.</li><li>It is reachable without a computer-science degree.</li></ul><p>If you like process, writing and troubleshooting, it may be the most direct door into AI work available today.</p>` },
  { id:"a3", tag:"Safety", date:"Nov 4, 2026", title:"Hallucinations are a feature of how this works", teaser:"Models predict plausible text. That is exactly why they can be confidently wrong — and why verification is your job.", body:`<p>A language model does not look things up; it <strong>predicts likely next words</strong>. Fluency and accuracy are separate things, which is why a model can state a false fact with total confidence.</p><h3>The practical rule</h3><ul><li>Treat every specific fact, number or citation as <strong>unverified</strong> until you check it.</li><li>Ask the model for its reasoning and its uncertainty.</li><li>For high-stakes work, keep a human review step.</li></ul><p>This is not a bug you wait to be patched. It is the nature of the tool &mdash; which is why judgment remains the scarce skill.</p>` }
];

window.CAREERS = [
  { t:"Prompt Engineer", sal:"$70k–$140k", d:"Design, test and tune prompts and AI workflows so tools give reliable results at scale.", p:["Clear writing","AI tool fluency","Testing and iteration","Domain knowledge"] },
  { t:"Data Analyst", sal:"$60k–$110k", d:"Turn messy data into decisions: clean it, explore it, and tell its story.", p:["Spreadsheets","SQL","Charts and statistics","Business sense"] },
  { t:"ML Engineer", sal:"$110k–$200k", d:"Build, train and deploy models, and keep them healthy in production.", p:["Python","ML fundamentals","Cloud and MLOps","Software engineering"] },
  { t:"Data Scientist", sal:"$100k–$180k", d:"Investigate questions with statistics and models, and turn findings into strategy.", p:["Python and stats","Experiment design","Storytelling","Curiosity"] },
  { t:"AI Product Manager", sal:"$110k–$180k", d:"Decide what to build with AI and why, balancing users, feasibility and safety.", p:["Product thinking","AI literacy","Communication","Prioritisation"] },
  { t:"AI Ethicist / Policy", sal:"$80k–$150k", d:"Keep AI fair, legal and trustworthy, and set the rules teams follow.", p:["Critical thinking","Policy and law","Writing","Stakeholder skills"] },
  { t:"Cybersecurity Analyst", sal:"$70k–$130k", d:"Watch for and respond to attacks, and harden systems against them.", p:["Networking","Threat awareness","Tools and logs","Calm under pressure"] },
  { t:"Automation Specialist", sal:"$65k–$120k", d:"Connect apps and build AI workflows that remove repetitive work across a team.", p:["No-code tools","Process mapping","APIs basics","Problem-solving"] },
  { t:"AI Startup Founder", sal:"variable", d:"Spot an AI opportunity, validate it cheaply, and grow a product you own.", p:["Opportunity spotting","Sales","Shipping fast","Resilience"] }
];
