import liftCorrect from "@/assets/lift-correct.jpg";
import mechanicalAids from "@/assets/mechanical-aids.jpg";
import handTools from "@/assets/hand-tools.jpg";
import generalSafety from "@/assets/general-safety.jpg";

export type Slide =
  | { kind: "title"; title: string; subtitle?: string; kicker?: string; letters?: string[] }
  | {
      kind: "image";
      title: string;
      subtitle?: string;
      image: string;
      alt: string;
      bullets: string[];
      lead?: string;
    }
  | { kind: "columns"; title: string; subtitle?: string; columns: { heading: string; items: string[] }[] }
  | { kind: "letters"; title: string; subtitle?: string; rows: { letter: string; label: string; detail: string }[]; note?: string }
  | { kind: "checklist"; title: string; subtitle?: string; lead?: string; steps: { label: string; detail: string }[] }
  | { kind: "quiz"; title: string; subtitle?: string; questions: string[] };

export type Module = {
  id: string;
  name: string;
  code: string;
  category: "Manual Handling" | "Safety School";
  duration: number; // minutes
  validityMonths: number;
  summary: string;
  cover: string;
  slides: Slide[];
};

const manualHandling: Module = {
  id: "manual-handling-smart",
  name: "Manual Handling — The SMART Model",
  code: "MH-SMART",
  category: "Manual Handling",
  duration: 45,
  validityMonths: 12,
  summary: "New hire induction covering safe lifting, the SMART model, TILE assessment and mechanical aids.",
  cover: liftCorrect,
  slides: [
    {
      kind: "title",
      kicker: "New Hire Induction Programme",
      title: "Manual Handling & Safety Training",
      subtitle: "The SMART Model for Safe Lifting — Smarter Appliances Ltd, London & Home Counties",
      letters: ["S", "M", "A", "R", "T"],
    },
    {
      kind: "image",
      title: "What is Manual Handling?",
      subtitle: "Understanding the risks we face every day",
      image: liftCorrect,
      alt: "Engineer lifting a boxed appliance with correct posture",
      lead: "Any activity that requires physical effort to move or support a load.",
      bullets: [
        "Lifting boxes, appliances and equipment",
        "Carrying tools and materials",
        "Pushing trolleys and sack trucks",
        "Pulling, holding or restraining items",
        "Placing items at height or low level",
      ],
    },
    {
      kind: "columns",
      title: "Why This Training Matters",
      subtitle: "Protecting yourself, your colleagues and the business",
      columns: [
        {
          heading: "Injury Prevention",
          items: ["Back pain, sprains and strains end careers", "MSDs are the most common UK workplace injury", "Almost all of it is preventable"],
        },
        {
          heading: "Legal Duty",
          items: ["Manual Handling Operations Regulations 1992", "Avoid, assess, reduce risk", "Employees must follow safe systems of work"],
        },
        {
          heading: "Team Culture",
          items: ["Look out for each other", "Ask for a team lift — no ego", "Report near misses same day"],
        },
      ],
    },
    {
      kind: "letters",
      title: "The SMART Model",
      subtitle: "Five steps to safe manual handling",
      rows: [
        { letter: "S", label: "Stable Base", detail: "Feet apart, balanced, firm footing" },
        { letter: "M", label: "Midrange Holding", detail: "Hold the load close, at waist height" },
        { letter: "A", label: "Aligned", detail: "Back straight and neutral — no slouching" },
        { letter: "R", label: "Ready to Move", detail: "Plan the lift, check the route, brace your core" },
        { letter: "T", label: "Turn, Don't Twist", detail: "Move your feet — never twist your spine" },
      ],
      note: "Every lift is a decision. Use SMART every time — no shortcuts.",
    },
    {
      kind: "columns",
      title: "S — Stable Base",
      subtitle: "Your foundation for a safe lift",
      columns: [
        {
          heading: "Do",
          items: ["Feet shoulder-width apart", "One foot slightly behind the other", "Firm, non-slip footing", "Approved safety footwear"],
        },
        {
          heading: "Don't",
          items: ["Lift with feet together", "Stand on uneven ground unprepared", "Wear loose or worn footwear", "Rush your stance"],
        },
      ],
    },
    {
      kind: "columns",
      title: "M — Midrange Holding",
      subtitle: "Hold it close, hold it right",
      columns: [
        {
          heading: "Why Midrange",
          items: ["Closer load = less lower-back strain", "The spine is a lever — distance multiplies force", "Waist height uses your strongest muscles"],
        },
        {
          heading: "Key Tips",
          items: ["Elbows tucked in, not flared", "Grip with the whole hand", "Squat to a low load — don't bend at the waist", "Never carry a load that blocks your view"],
        },
      ],
    },
    {
      kind: "columns",
      title: "A — Aligned",
      subtitle: "Protect your spine with good posture",
      columns: [
        {
          heading: "Correct Alignment",
          items: ["Ears over shoulders, shoulders over hips", "Chin tucked — look ahead", "Core engaged", "Load centred, not off to one side"],
        },
        {
          heading: "Common Mistakes",
          items: ["Bending at the waist with straight legs", "Arching the back mid-lift", "Rounded, C-shaped spine", "Holding your breath"],
        },
      ],
    },
    {
      kind: "checklist",
      title: "R — Ready to Move",
      subtitle: "Plan before you lift",
      lead: "Assess the task, plan the route and brace your core before every lift.",
      steps: [
        { label: "Assess", detail: "How heavy? Awkward? Can I lift it alone?" },
        { label: "Plan", detail: "Where is it going? Is the route clear?" },
        { label: "Grip", detail: "Secure hold? Are handles available?" },
        { label: "Core", detail: "Brace your stomach muscles before you lift" },
        { label: "Signal", detail: "Team lifting? Agree a count and communicate" },
      ],
    },
    {
      kind: "columns",
      title: "T — Turn, Don't Twist",
      subtitle: "The most common cause of back injury",
      columns: [
        {
          heading: "Do — Turn Your Feet",
          items: ["Pivot with small steps", "Keep hips and shoulders facing the same way", "Set the load down, then reposition", "Rotate with your legs"],
        },
        {
          heading: "Don't — Twist Your Spine",
          items: ["Swing a load by rotating your torso", "Reach sideways while loaded", "Pivot on one planted foot", "Throw or toss items"],
        },
      ],
    },
    {
      kind: "image",
      title: "Mechanical Aids & TILE",
      subtitle: "Use the right tool for the job",
      image: mechanicalAids,
      alt: "Sack truck and trolley moving appliances in a warehouse aisle",
      lead: "TILE — Task, Individual, Load, Environment. Run it before every non-routine lift.",
      bullets: [
        "Trolley / sack truck — boxes and appliances on flat surfaces",
        "Hoist / crane — heavy or awkward loads",
        "Team lift — bulky items, agreed count",
        "Adjustable bench — bring work to waist height",
      ],
    },
    {
      kind: "quiz",
      title: "Knowledge Check",
      subtitle: "Assessor marks answers before recording the pass",
      questions: [
        "What does the 'M' in SMART stand for?",
        "Why should you hold a load close to your body?",
        "What should you do instead of twisting your spine?",
        "Name two mechanical aids that reduce manual handling risk.",
        "What does TILE stand for?",
      ],
    },
    {
      kind: "letters",
      title: "Remember SMART — Every Lift, Every Time",
      subtitle: "Your safety is your responsibility",
      rows: [
        { letter: "S", label: "Stable Base", detail: "Feet apart, balanced, firm footing" },
        { letter: "M", label: "Midrange Holding", detail: "Hold close to the body, at waist height" },
        { letter: "A", label: "Aligned", detail: "Spine neutral, no slouching" },
        { letter: "R", label: "Ready to Move", detail: "Plan, assess, brace your core" },
        { letter: "T", label: "Turn, Don't Twist", detail: "Move your feet — never your spine" },
      ],
      note: "If a load feels too heavy or awkward — STOP. Ask for help. Use an aid.",
    },
  ],
};

const generalSafetyModule: Module = {
  id: "safety-school-general",
  name: "Safety School — General Workplace Safety",
  code: "SS-GEN",
  category: "Safety School",
  duration: 30,
  validityMonths: 12,
  summary: "PPE, housekeeping, slips and trips, fire awareness and incident reporting for engineers and warehouse staff.",
  cover: generalSafety,
  slides: [
    {
      kind: "title",
      kicker: "Safety School — Module 1",
      title: "General Workplace Safety",
      subtitle: "PPE, housekeeping, fire awareness and reporting — Smarter Appliances Ltd",
    },
    {
      kind: "image",
      title: "Your PPE",
      subtitle: "Worn correctly, every job, every site",
      image: generalSafety,
      alt: "PPE laid out in a warehouse: hi-vis, boots, gloves, goggles",
      lead: "PPE is the last line of defence — never the first control.",
      bullets: [
        "Safety boots on all sites and in the warehouse",
        "Cut-resistant gloves when handling panels or glass",
        "Eye protection for drilling, cutting and grinding",
        "Hi-vis in yard, loading bay and delivery areas",
      ],
    },
    {
      kind: "columns",
      title: "Slips, Trips & Housekeeping",
      subtitle: "The most common cause of on-site injury",
      columns: [
        {
          heading: "Keep It Clear",
          items: ["Cables routed and covered", "Packaging cleared as you go", "Spills signed and cleaned immediately", "Walkways and fire exits never blocked"],
        },
        {
          heading: "Customer Homes",
          items: ["Protect floors with mats", "Warn the customer before moving appliances", "Keep children and pets out of the work zone", "Take waste away with you"],
        },
      ],
    },
    {
      kind: "checklist",
      title: "Fire, Electrical & Emergencies",
      subtitle: "Know it before you need it",
      lead: "Isolate first, test, then work. If in doubt, stop and call the supervisor.",
      steps: [
        { label: "Isolate", detail: "Power off at the isolator, prove dead before touching terminals" },
        { label: "Inspect", detail: "Check leads and plugs for damage before use" },
        { label: "Escape", detail: "Know the exit route and assembly point on every site" },
        { label: "Extinguish", detail: "Only tackle a small fire if trained and safe to do so" },
        { label: "Report", detail: "All incidents and near misses logged the same day" },
      ],
    },
    {
      kind: "quiz",
      title: "Knowledge Check",
      subtitle: "Assessor marks answers before recording the pass",
      questions: [
        "Name three items of PPE required in the warehouse.",
        "What do you do first when you find a spill?",
        "What must you do before working on an appliance's electrics?",
        "When must a near miss be reported?",
      ],
    },
  ],
};

const handToolsModule: Module = {
  id: "safety-school-hand-tools",
  name: "Safety School — Hand & Power Tool Safety",
  code: "SS-TOOL",
  category: "Safety School",
  duration: 30,
  validityMonths: 12,
  summary: "Correct selection, inspection, use and storage of hand and portable power tools.",
  cover: handTools,
  slides: [
    {
      kind: "title",
      kicker: "Safety School — Module 2",
      title: "Hand & Power Tool Safety",
      subtitle: "Right tool, good condition, correct technique — Smarter Appliances Ltd",
    },
    {
      kind: "image",
      title: "Right Tool, Right Job",
      subtitle: "Most tool injuries come from improvisation",
      image: handTools,
      alt: "Hand tools, gloves and goggles laid out on a workbench",
      lead: "Never use a tool for a job it wasn't designed for.",
      bullets: [
        "No screwdrivers as chisels or levers",
        "No pliers as spanners",
        "Correct blade or bit for the material",
        "Insulated tools for any electrical work",
      ],
    },
    {
      kind: "columns",
      title: "Inspect Before Use",
      subtitle: "A ten second check prevents most incidents",
      columns: [
        {
          heading: "Check",
          items: ["Handles secure, no splits", "Cutting edges sharp and clean", "Leads, plugs and guards intact", "PAT label in date"],
        },
        {
          heading: "Remove From Service",
          items: ["Mushroomed heads or bent shafts", "Exposed conductors or taped leads", "Missing guards", "Tag it, log it, tell the supervisor"],
        },
      ],
    },
    {
      kind: "checklist",
      title: "Safe Use & Storage",
      subtitle: "During the job and after it",
      steps: [
        { label: "Secure", detail: "Clamp the workpiece — never hold it in your free hand" },
        { label: "Cut Away", detail: "Always cut away from your body and other people" },
        { label: "Retract", detail: "Blades retracted the moment the cut is finished" },
        { label: "Guard", detail: "Never remove or defeat a guard on a power tool" },
        { label: "Store", detail: "Tools back in the case or roll — never loose in a van footwell" },
      ],
    },
    {
      kind: "quiz",
      title: "Knowledge Check",
      subtitle: "Assessor marks answers before recording the pass",
      questions: [
        "Give two examples of using a tool for the wrong job.",
        "What do you check on a power tool before use?",
        "Which direction should you always cut?",
        "What do you do with a damaged tool?",
      ],
    },
  ],
};

export const MODULES: Module[] = [manualHandling, generalSafetyModule, handToolsModule];

export const getModule = (id: string) => MODULES.find((m) => m.id === id);
