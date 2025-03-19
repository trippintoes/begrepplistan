# Begrepplistan

En webbapplikation för att visa begrepp, förklaringar och källor i ett kortformat.

## Funktioner

- Visar begrepp som "kort" (cards)
- Varje kort innehåller term, förklaring och källa
- Responsiv layout som fungerar på olika skärmstorlekar
- Kan användas självständigt eller inbäddas via iframe på en annan sida

## Utveckling

```bash
# Installera beroenden
npm install

# Starta utvecklingsserver
npm run dev

# Bygg för produktion
npm run build

# Exportera som statiska filer (för iframe-användning)
npm run build
```

## Användning som iframe

Efter att du har byggt projektet kan du använda det som en iframe på din webbplats:

```html
<iframe src="sökväg/till/begrepplistan/index.html" width="100%" height="600" frameborder="0"></iframe>
``` 