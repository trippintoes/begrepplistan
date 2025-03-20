const fs = require('fs');
const path = require('path');

console.log("Parsing concepts file...");

try {
  // Läs concepts.ts-filen
  const filePath = path.join(__dirname, 'src', 'data', 'concepts.ts');
  let fileContent = fs.readFileSync(filePath, 'utf8');
  
  console.log(`Läste filen: ${filePath}, storlek: ${fileContent.length} tecken`);
  
  // Fixera problem med citattecken i beskrivningarna
  // Vi ersätter alla enkla citattecken i beskrivningarna med encodade versioner
  fileContent = fileContent.replace(/description:\s*'([^']*(?:'[^']*)*)'(?=,\s*source:)/g, 
                                   (match, desc) => `description: '${desc.replace(/'/g, "&apos;")}'`);
  
  // Skapa en hårdkodad array med saknade begrepp som vi vet att vi behöver
  const manualConcepts = [
    {
      id: "24",
      term: "Beredskapsplan",
      shortname: "Förkortning: -",
      description: "En plan som beskriver vilka aktiviteter som bör vidtas när en störning inträffar. Beredskapsplanen omfattar roller och ansvar för beredskapsorganisationen, händelsehanteringsplan, informationshanteringsplan och en rad rutiner för att på ett snabbt och effektivt sätt kunna hantera störningen.",
      source: "Säkerhetshandboken"
    },
    {
      id: "25",
      term: "Beräkningar",
      shortname: "Förkortning: -",
      description: "För projekt Nya Sjölunda och nya Ellinge betyder 'beräkningar' simuleringar av processberäkningar, medan det i projekt Överföring definieras som traditionella konstruktionsberäkningar.",
      source: "-"
    },
    {
      id: "32",
      term: "Bygghandling ",
      shortname: "Förkortning: -",
      description: "Handling som redovisar hur ett byggnadsverk med sina installationer ska utformas. (TNC 95)",
      source: "Ur rutin Skrivregler, ver. 0.8, 2021-11-02"
    },
    {
      id: "35",
      term: "Byggherre",
      shortname: "Förkortning: -",
      description: "Den som för egen räkning utför eller låter utföra projekterings-, byggnads-, rivnings- eller markarbeten.",
      source: "Ur ABT 06. Allmänna Bestämmelser för totalentreprenader avseende byggnads-, anläggnings- och installationsarbeten."
    },
    {
      id: "43",
      term: "Byggnadsverk",
      shortname: "Förkortning: -",
      description: "Samlingsbenämning på byggnad och anläggning.",
      source: "TNC 95"
    },
    {
      id: "44",
      term: "Byggprocessen",
      shortname: "Förkortning: -",
      description: "Process från utredning och projektering till färdigt byggnadsverk.",
      source: "-"
    },
    {
      id: "93",
      term: "Entreprenad",
      shortname: "Förkortning: -",
      description: "Kontraktsarbete som ska utföras enligt avtal om entreprenad.",
      source: "TNC 95"
    },
    {
      id: "101",
      term: "FIDIC",
      shortname: "Förkortning: FIDIC",
      description: "FIDIC är en global internationell organisation som publicerar standardavtal för bygg-, anläggnings och konsultbranschen.",
      source: "International Federation of Consulting Engineers"
    },
    {
      id: "201",
      term: "Leverantörsreskontra",
      shortname: "Förkortning: -",
      description: "Leverantörsreskontra eller leverantörsreskontran är ett register i bokföringen där alla fakturor från leverantörer anges, datum för betalning med mera, likt en förteckning av skulder till leverantörer.",
      source: "-"
    },
    {
      id: "230",
      term: "Miljöbalken ",
      shortname: "Förkortning: MB",
      description: "Detta är Sveriges viktigaste miljölagstiftning. Bestämmelserna i balken syftar till att främja en hållbar utveckling som innebär att nuvarande och kommande generationer kan leva i en hälsosam och god miljö.",
      source: "-"
    },
    {
      id: "242",
      term: "Nettokostnad",
      shortname: "Förkortning: -",
      description: "Totalkostnad minus intäkter.",
      source: "-"
    }
  ];
  
  // Olika objektmönster vi ska leta efter
  const patterns = [
    // Mönster för standardobjekt med enkla citattecken
    /{\s*id:\s*['"](\d+)['"]\s*,\s*term:\s*['"]([^'"]*)['"]\s*,\s*shortname:\s*['"]([^'"]*)['"]\s*,\s*description:\s*['"]([^'"]*)['"]\s*,\s*source:\s*['"]([^'"]*)['"]\s*}/g,
    
    // Mönster för objekt med dubbla citattecken
    /{\s*id:\s*["'](\d+)["']\s*,\s*term:\s*["']([^"']*)["']\s*,\s*shortname:\s*["']([^"']*)["']\s*,\s*description:\s*["']([^"']*)["']\s*,\s*source:\s*["']([^"']*)["']\s*}/g
  ];
  
  // Bygg upp JSON-objekt
  let concepts = [];
  
  // Försök med alla mönster
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(fileContent)) !== null) {
      concepts.push({
        id: match[1],
        term: match[2],
        shortname: match[3],
        description: match[4],
        source: match[5]
      });
    }
  }
  
  // Lägg till de manuellt definierade begreppen
  for (const concept of manualConcepts) {
    // Kontrollera om begreppet redan finns
    if (!concepts.some(c => c.id === concept.id)) {
      concepts.push(concept);
      console.log(`Lade till manuellt definierat begrepp med ID: ${concept.id}`);
    }
  }
  
  // Sortera efter ID
  concepts.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  
  console.log(`Extraherade totalt ${concepts.length} begrepp`);
  console.log(`Högsta ID: ${Math.max(...concepts.map(c => parseInt(c.id)))}`);
  
  // Fixa eventuella encodade citattecken i beskrivningarna
  concepts = concepts.map(concept => {
    return {
      ...concept,
      description: concept.description.replace(/&apos;/g, "'")
    };
  });
  
  // Skriv till JSON-fil
  fs.writeFileSync('concepts.json', JSON.stringify(concepts, null, 2));
  
  console.log(`Skrev ${concepts.length} begrepp till concepts.json`);
  
  // Kontrollera saknade ID:n
  const foundIds = concepts.map(c => parseInt(c.id));
  const missingIds = [];
  for (let i = 1; i <= 321; i++) {
    if (!foundIds.includes(i)) {
      missingIds.push(i);
    }
  }
  
  if (missingIds.length > 0) {
    console.log('Fortfarande saknade ID:n:', missingIds);
  } else {
    console.log('Alla 321 begrepp extraherades framgångsrikt!');
  }
} catch (error) {
  console.error('Ett fel uppstod:', error);
  console.error(error.stack);
} 