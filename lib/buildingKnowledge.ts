// Bouwkennis database voor Yannick chatbot
// Realistische kosten, doorlooptijden en bouwtermen

export interface BuildingService {
  name: string;
  description: string;
  averageCost: string;
  duration: string;
  keyFeatures: string[];
  commonQuestions: string[];
  tips: string[];
}

export interface ProjectType {
  name: string;
  description: string;
  services: string[];
  costRange: string;
  duration: string;
  considerations: string[];
}

export const BUILDING_SERVICES: Record<string, BuildingService> = {
  nieuwbouw: {
    name: "Nieuwbouw",
    description: "Complete nieuwbouw van woningen en bijgebouwen",
    averageCost: "€2.000 - €3.500 per m²",
    duration: "4-12 maanden",
    keyFeatures: [
      "Architectuur en ontwerp",
      "Fundering en grondwerk",
      "Structuur en draagwerk",
      "Dakconstructie",
      "Gevelafwerking",
      "Installaties (elektra, sanitair, verwarming)",
      "Afwerking en inrichting"
    ],
    commonQuestions: [
      "Wat is het bouwbudget?",
      "Heb je al een architect?",
      "Welke afmetingen?",
      "Energiezuinig bouwen?",
      "Bouwvergunning nodig?"
    ],
    tips: [
      "Plan ruim budget voor onvoorziene kosten (10-15%)",
      "Kies voor duurzame bouwmaterialen",
      "Denk aan toekomstige uitbreidingsmogelijkheden",
      "Laat bodemonderzoek doen"
    ]
  },

  crepi: {
    name: "Crepi Gevelafwerking",
    description: "Professionele crepi afwerking voor gevelrenovatie",
    averageCost: "€50 - €120 per m²",
    duration: "1-3 weken",
    keyFeatures: [
      "Gevelreiniging en voorbereiding",
      "Isolatie aanbrengen",
      "Crepi aanbrengen (2-3 lagen)",
      "Kleurkeuze en afwerking",
      "Garantie op afwerking"
    ],
    commonQuestions: [
      "Welke crepi soort wil je?",
      "Kleurkeuze al gemaakt?",
      "Isolatie gewenst?",
      "Bestaande gevel conditie?"
    ],
    tips: [
      "Crepi beschermt tegen weersinvloeden",
      "Verbetering van isolatiewaarde",
      "Moderne uitstraling",
      "Onderhoudsvrij voor 15-20 jaar"
    ]
  },

  ramenDeuren: {
    name: "Ramen en Deuren",
    description: "Vervanging en renovatie van ramen en deuren",
    averageCost: "€800 - €2.500 per raam/deur",
    duration: "1-2 dagen per opening",
    keyFeatures: [
      "HR++ of triple glas",
      "Verschillende profielen (PVC, hout, alu)",
      "Inbraakwerend beslag",
      "Ventilatie en rolluiken",
      "Garantie op montage"
    ],
    commonQuestions: [
      "Welk materiaal wil je?",
      "Dubbel of triple glas?",
      "Rolluiken gewenst?",
      "Inbraakwerend?",
      "Ventilatie systeem?"
    ],
    tips: [
      "HR++ glas bespaart tot 30% op energiekosten",
      "PVC is onderhoudsvrij",
      "Hout geeft warme uitstraling",
      "Aluminium is sterk en modern"
    ]
  },

  renovatie: {
    name: "Renovatie",
    description: "Complete woningrenovatie en verbouwing",
    averageCost: "€500 - €1.500 per m²",
    duration: "2-6 maanden",
    keyFeatures: [
      "Badkamer en keuken renovatie",
      "Elektrische installatie",
      "Sanitaire werken",
      "Vloerafwerking",
      "Wandafwerking",
      "Verwarming en ventilatie"
    ],
    commonQuestions: [
      "Welke ruimtes renoveren?",
      "Budget per ruimte?",
      "Stijl voorkeur?",
      "Tijdelijke woonruimte?",
      "Vergunningen nodig?"
    ],
    tips: [
      "Begin met de technische installaties",
      "Plan logische volgorde van werken",
      "Houd rekening met droogtijden",
      "Budget voor kwaliteitsmaterialen"
    ]
  }
};

export const PROJECT_TYPES: Record<string, ProjectType> = {
  villa: {
    name: "Moderne Villa",
    description: "Nieuwbouw van een moderne villa",
    services: ["nieuwbouw", "ramenDeuren"],
    costRange: "€400.000 - €800.000",
    duration: "8-12 maanden",
    considerations: [
      "Groot perceel vereist",
      "Architectuur belangrijk",
      "Energiezuinig bouwen",
      "Luxe afwerking"
    ]
  },

  rijwoning: {
    name: "Rijwoning",
    description: "Nieuwbouw of renovatie van rijwoning",
    services: ["nieuwbouw", "renovatie", "crepi"],
    costRange: "€250.000 - €450.000",
    duration: "6-10 maanden",
    considerations: [
      "Beperkte perceelsbreedte",
      "Burengerucht overwegen",
      "Parkeermogelijkheden",
      "Gevelafwerking cruciaal"
    ]
  },

  appartement: {
    name: "Appartement Renovatie",
    description: "Complete renovatie van appartement",
    services: ["renovatie", "ramenDeuren"],
    costRange: "€50.000 - €150.000",
    duration: "2-4 maanden",
    considerations: [
      "VVE goedkeuring nodig",
      "Geluidsisolatie",
      "Beperkte ruimte",
      "Tijdelijk verhuizen"
    ]
  }
};

export const BUILDING_TERMS: Record<string, string> = {
  "crepi": "Minerale of kunsthars gebonden gevelafwerking die je woning een moderne uitstraling geeft en beschermt tegen weersinvloeden",
  "hr++ glas": "Hoog rendement dubbel glas met argon gasvulling en warmtereflecterende coating - bespaart tot 30% op energiekosten",
  "bouwvergunning": "Officiële toestemming van de gemeente om te mogen bouwen of verbouwen - nodig voor de meeste projecten",
  "epc": "EnergiePrestatieCertificaat - toont energiezuinigheid van je woning",
  "riolering": "Afvoer van afvalwater en regenwater - moet voldoen aan strenge normen",
  "isolatie": "Materiaal dat warmte binnen en kou buiten houdt - belangrijk voor energiekosten",
  "fundering": "De basis van je woning - moet stevig zijn om verzakking te voorkomen",
  "gevel": "De buitenmuren van je woning - eerste indruk en bescherming tegen weer"
};

export const COST_ESTIMATES: Record<string, { min: number; max: number; unit: string }> = {
  "crepi-per-m2": { min: 50, max: 120, unit: "€/m²" },
  "ramen-pvc": { min: 800, max: 1200, unit: "€/raam" },
  "ramen-hout": { min: 1200, max: 2500, unit: "€/raam" },
  "ramen-alu": { min: 1500, max: 3000, unit: "€/raam" },
  "badkamer-compleet": { min: 8000, max: 20000, unit: "€/badkamer" },
  "keuken-compleet": { min: 10000, max: 30000, unit: "€/keuken" },
  "nieuwbouw-per-m2": { min: 2000, max: 3500, unit: "€/m²" },
  "renovatie-per-m2": { min: 500, max: 1500, unit: "€/m²" }
};

export const MATERIAL_OPTIONS: Record<string, string[]> = {
  ramen: ["PVC (onderhoudsvrij)", "Hardhout (warm)", "Aluminium (sterk)", "Staal (industrieel)"],
  deuren: ["PVC", "Hardhout", "Aluminium", "Composiet", "Glas"],
  gevel: ["Minerale crepi", "Siliconen crepi", "Kunsthars crepi", "Steenstrip"],
  dak: ["Pannen", "Leien", "Bitumen", "Groendak", "Zink"]
};

export const COMMON_QUESTIONS: string[] = [
  "Wat is je budget?",
  "Wanneer wil je starten?",
  "Welke stijl heb je in gedachten?",
  "Heb je al offertes gevraagd?",
  "Zijn er speciale wensen?",
  "Hoe groot is het project?",
  "Welke ruimtes zijn belangrijk?",
  "Energiezuinig bouwen?",
  "Bouwvergunning al aangevraagd?",
  "Tijdelijk verhuizen mogelijk?"
];

export function getServiceInfo(service: string): BuildingService | undefined {
  return BUILDING_SERVICES[service.toLowerCase()];
}

export function getProjectTypeInfo(project: string): ProjectType | undefined {
  return PROJECT_TYPES[project.toLowerCase()];
}

export function getTermDefinition(term: string): string {
  return BUILDING_TERMS[term.toLowerCase()] || "Ik ken deze term niet, kun je het uitleggen?";
}

export function estimateCost(service: string, size?: number): string {
  const estimate = COST_ESTIMATES[service];
  if (!estimate) return "Prijs op aanvraag";

  const average = (estimate.min + estimate.max) / 2;
  const total = size ? average * size : average;

  return `€${estimate.min.toLocaleString()} - €${estimate.max.toLocaleString()} ${estimate.unit}${size ? ` = €${Math.round(total).toLocaleString()}` : ''}`;
}

export function getMaterialOptions(category: string): string[] {
  return MATERIAL_OPTIONS[category.toLowerCase()] || [];
}

export function generateFollowUpQuestions(userInput: string, currentTopic: string): string[] {
  const questions: string[] = [];

  // Detect service type from user input
  const serviceKeywords = {
    nieuwbouw: ['nieuwbouw', 'nieuw huis', 'bouwen', 'villa', 'woning'],
    crepi: ['crepi', 'gevel', 'buitenmuur', 'afwerking'],
    ramenDeuren: ['ramen', 'deuren', 'glas', 'kozijn'],
    renovatie: ['renovatie', 'verbouwen', 'opknappen', 'moderniseren']
  };

  for (const [service, keywords] of Object.entries(serviceKeywords)) {
    if (keywords.some(keyword => userInput.toLowerCase().includes(keyword))) {
      const serviceInfo = getServiceInfo(service);
      if (serviceInfo) {
        questions.push(...serviceInfo.commonQuestions.slice(0, 2));
      }
    }
  }

  // Add general questions if no specific service detected
  if (questions.length === 0) {
    questions.push(...COMMON_QUESTIONS.slice(0, 2));
  }

  return questions;
}

export function generatePriceEstimate(service: string, details: any): string {
  let estimate = "";

  switch (service) {
    case 'crepi':
      const area = details.area || 100;
      estimate = `Voor ${area}m² crepi reken je op €${(area * 75).toLocaleString()} - €${(area * 100).toLocaleString()}`;
      break;
    case 'ramen':
      const windows = details.windows || 5;
      estimate = `Voor ${windows} ramen: €${(windows * 1000).toLocaleString()} - €${(windows * 1500).toLocaleString()}`;
      break;
    case 'nieuwbouw':
      const size = details.size || 150;
      estimate = `Nieuwbouw ${size}m²: €${(size * 2500).toLocaleString()} - €${(size * 3000).toLocaleString()}`;
      break;
    default:
      estimate = "Ik maak graag een persoonlijke offerte voor je project!";
  }

  return estimate;
}
