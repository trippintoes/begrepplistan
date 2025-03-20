const fs = require('fs');
const path = require('path');

console.log("Parsing concepts file...");

try {
  // Läs concepts.ts-filen
  const filePath = path.join(__dirname, 'src', 'data', 'concepts.ts');
  let fileContent = fs.readFileSync(filePath, 'utf8');
  
  console.log(`Läste filen: ${filePath}, storlek: ${fileContent.length} tecken`);
  
  // Extrahera innehållet mellan de yttre hakparenteserna för concepts-arrayen
  const match = fileContent.match(/export const concepts: Concept\[\] = \[([\s\S]*?)\];/);
  
  if (!match) {
    throw new Error('Kunde inte hitta concepts-arrayen i filen');
  }
  
  const conceptsArrayContent = match[1];
  
  // Dela upp arrayen i individuella begrepp-objekt
  // Varje objekt börjar med { och slutar med },
  const objectPattern = /\{\s*id:\s*['"](\d+)['"],[\s\S]*?source:\s*['"]([^'"]*)['"]\s*,?\s*\}/g;
  
  // Bygg upp JSON-objekt
  let concepts = [];
  let objectMatch;
  
  while ((objectMatch = objectPattern.exec(conceptsArrayContent)) !== null) {
    // Extrahera hela objektsträngen
    const fullMatch = objectMatch[0];
    
    // Extrahera ID:t
    const idMatch = fullMatch.match(/id:\s*['"](\d+)['"]/);
    const id = idMatch ? idMatch[1] : null;
    
    // Extrahera term
    const termMatch = fullMatch.match(/term:\s*['"]([^'"]*)['"]/);
    const term = termMatch ? termMatch[1] : '';
    
    // Extrahera shortname
    const shortnameMatch = fullMatch.match(/shortname:\s*['"]([^'"]*)['"]/);
    const shortname = shortnameMatch ? shortnameMatch[1] : '';
    
    // Extrahera description - detta är mer komplext eftersom beskrivningar kan innehålla citattecken
    let descriptionMatch = fullMatch.match(/description:\s*['"]([^'"]*)['"]/);
    // Om det inte fungerade, prova att matcha allt mellan description: och source:
    if (!descriptionMatch) {
      descriptionMatch = fullMatch.match(/description:\s*['"](.+?)['"]\s*,\s*source:/s);
    }
    const description = descriptionMatch ? descriptionMatch[1] : '';
    
    // Extrahera source
    const sourceMatch = fullMatch.match(/source:\s*['"]([^'"]*)['"]/);
    const source = sourceMatch ? sourceMatch[1] : '';
    
    if (id) {
      concepts.push({
        id,
        term,
        shortname,
        description,
        source
      });
    }
  }
  
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
      id: "26",
      term: "Besiktning",
      shortname: "Förkortning: -",
      description: "Granskning för att avgöra om ett objekt uppfyller ställda krav.",
      source: "TNC 95"
    },
    {
      id: "32",
      term: "Bygghandling ",
      shortname: "Förkortning: -",
      description: "Handling som redovisar hur ett byggnadsverk med sina installationer ska utformas. (TNC 95)",
      source: "Ur rutin Skrivregler, ver. 0.8, 2021-11-02"
    },
    {
      id: "33",
      term: "Byggnadsregister",
      shortname: "Förkortning: -",
      description: "BYGGREDA definieras av SCB som register över byggnader. Kan även avse det egna byggnadsregistret för Sjölunda och Ellinge.",
      source: "-"
    },
    {
      id: "35",
      term: "Byggherre",
      shortname: "Förkortning: -",
      description: "Den som för egen räkning utför eller låter utföra projekterings-, byggnads-, rivnings- eller markarbeten.",
      source: "Ur ABT 06. Allmänna Bestämmelser för totalentreprenader avseende byggnads-, anläggnings- och installationsarbeten."
    },
    {
      id: "36",
      term: "Databärare",
      shortname: "Förkortning: -",
      description: "Fysiskt underlag för handlingar/uppgifter.",
      source: "-"
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
      id: "45",
      term: "Dagvatten",
      shortname: "Förkortning: -",
      description: "Dagvatten är regn-, spol- och smältvatten som rinner på hårdgjorda ytor eller på genomsläpplig mark. Det tillförs avloppsledningsnätet och avleds genom dagvattenledningar och diken till recipienten.",
      source: "Affärsplan 2019 2030 https://intranet.vaverket.local/nyheter/Sidor/affarsplanen-ar-pa-plats.aspx"
    },
    {
      id: "93",
      term: "Entreprenad",
      shortname: "Förkortning: -",
      description: "Kontraktsarbete som ska utföras enligt avtal om entreprenad.",
      source: "TNC 95"
    },
    {
      id: "94",
      term: "Kommunikation",
      shortname: "Förkortning: KOM",
      description: "Ett ömsesidigt utbyte av tankar, idéer, åsikter mellan två eller flera parter.",
      source: "Funktion Kommunikation"
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
  
  // Skriv till JSON-fil med korrekt encoding
  // UTF-8 med BOM för att säkerställa korrekt teckenkodning för svenska tecken
  const jsonString = JSON.stringify(concepts, null, 2);
  fs.writeFileSync('concepts.json', '\ufeff' + jsonString, 'utf8');
  
  console.log(`Skrev ${concepts.length} begrepp till concepts.json med UTF-8 encoding`);
  
  // Kontrollera saknade ID:n
  const foundIds = concepts.map(c => parseInt(c.id));
  const missingIds = [];
  for (let i = 1; i <= 321; i++) {
    if (!foundIds.includes(i)) {
      missingIds.push(i);
    }
  }
  
  if (missingIds.length > 0) {
    console.log('Extraherade totalt', concepts.length, 'begrepp');
    console.log('Fortfarande saknade ID:n:', missingIds.join(', '));
    console.log('Antal saknade ID:n:', missingIds.length);
  } else {
    console.log('Alla 321 begrepp extraherades framgångsrikt!');
  }
} catch (error) {
  console.error('Ett fel uppstod:', error);
  console.error(error.stack);
} 