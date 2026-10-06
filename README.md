# LunchBorås

## Beskrivning

LunchBorås är en mobilapp för personer som vill hitta lunchrestauranger i Borås.

Appen visar restauranger, dagens lunch, öppettider och adresser. Användaren kan söka efter restauranger, filtrera restauranger, öppna en restaurangs detaljsida och spara restauranger som favoriter.

Appen är byggd med React Native, Expo, TypeScript och Expo Router.

## Funktioner

- Visa restauranger i Borås
- Söka efter restauranger
- Filtrera restauranger efter kategori
- Visa restaurangens detaljer
- Visa dagens lunch
- Visa öppettider och adress
- Lägga till och ta bort restauranger från favoriter
- Visa sparade favoriter
- Välja profilbild
- Haptisk feedback när användaren trycker på favorit
- Skicka lokala notiser
- Hämta restaurang- och lunchdata med Web API

## Teknik

- React Native
- Expo
- TypeScript
- Expo Router
- Git
- GitHub

## Så bygger och kör du projektet

### 1. Klona projektet

```bash
git clone https://github.com/shahadAlroomi/LunchBoraas.git

2. Gå till projektmappen
cd LunchBoraas

3. Installera dependencies
npm install

4. Starta projektet
npx expo start

5. Öppna appen
Appen kan köras med Expo Go.
Skanna QR-koden med Expo Go eller använd en Android Emulator.
React Native-komponenter
View
Används som en container för att strukturera innehållet på skärmar och komponenter.
Text
Används för att visa text, exempelvis restaurangnamn, adresser och information.
Image
Används för att visa restaurangbilder och profilbilder.
Pressable
Används för interaktiva element som knappar, favoritknappen och navigation.
ScrollView
Används för att kunna scrolla innehållet på skärmarna.
TextInput
Används i sökfunktionen för att användaren ska kunna skriva in en restaurang.
Expo SDK-moduler
expo-location
Används för att begära användarens position och hämta aktuell position.
expo-image-picker
Används på profilsidan för att låta användaren välja en profilbild från enheten.
expo-haptics
Används för haptisk feedback när användaren interagerar med favoritfunktionen.
expo-notifications
Används för att skapa och testa lokala lunchnotiser.
Expo Router
Projektet använder Expo Router för navigation.
Appens navigation består bland annat av:
- Home
- Mina favoriter
- Min sida
- Restaurant Details
Restaurangdetaljerna använder en dynamisk route:
restaurant/[id].tsx

Restaurangens ID skickas som parameter när användaren trycker på en restaurang.
På detaljsidan hämtas parametern med:
const { id } = useLocalSearchParams();

Det gör att samma detaljsida kan användas för olika restauranger.
Web API
Appen hämtar data från ett externt Web API med JavaScript fetch och async/await.
Restaurangdata hämtas från:
https://www.matochmat.se/restauranger/boras/lunch/

Appen hämtar restauranginformation och lunchdata och visar informationen i React Native.
Exempel på tekniker som används:
const response = await fetch(API_URL);
const data = await response.text();

och:
const response = await fetch(...);

Data bearbetas sedan innan den visas i appen.
Git och GitHub
Git och GitHub har använts under hela utvecklingen.
Arbetet har delats upp i mindre delar och olika branches har använts för olika funktioner.
Exempel på branches:
- create-expo-project-with-typescript
- create-app-navigation
- create-home-screen
- create-restaurant-details-screen
- create-favorites-screen
- create-bottom-tabs
- expo-location
Projektets GitHub-repository:
https://github.com/shahadAlroomi/LunchBoraas


AI-användning

Under utvecklingen av LunchBorås har jag använt ChatGPT som ett stöd i arbetet.
Jag har använt AI bland annat för:
- Förklaringar av React Native, Expo och TypeScript.
- Hjälp med felsökning av TypeScript- och Expo-relaterade problem.
- Förslag på kodstruktur och komponenter.
- Hjälp med Expo Router och navigation.
- Förklaringar av hooks, useState, useEffect och fetch.
- Hjälp med att förstå felmeddelanden och hitta möjliga lösningar.
Jag har verifierat AI-genererad kod genom att läsa och förstå koden, köra projektet i Expo Go och testa funktionerna i appen.
När jag fått felmeddelanden har jag kontrollerat vad felet berodde på och testat ändringarna i projektet.
AI har därför använts som ett stöd under utvecklingen. Jag har själv gått igenom, implementerat, testat och verifierat funktionerna i projektet.

Uppfyllda krav
Godkänt (G)
- [x] Minst 4 React Native-komponenter används
- [x] Minst 4 Expo SDK-moduler används
- [x] Expo Router används för navigation
- [x] Minst en skärm använder en dynamisk route och tar emot en parameter
- [x] Git och GitHub används
- [x] Projektet innehåller en README.md
- [X] Uppgiften är inlämnad i tid
- [x] Alla krav för G är uppfyllda
- [ ] Ytterligare extern modul från reactnative.directory används
- [x] Appen hämtar data från ett Web API
- [x] Användningen av AI-verktyg är dokumenterad i README

Reflektion
Under utvecklingen av LunchBorås har jag fått arbeta med React Native, Expo, TypeScript och Expo Router.
En del av arbetet har varit att förstå hur navigation med dynamiska routes fungerar och hur data kan skickas mellan olika delar av appen.
Jag har också fått arbeta med API-anrop, fetch, async/await, state och hooks.
Det som varit mest utmanande har varit att felsöka TypeScript- och Expo-relaterade problem och att få olika delar av appen att fungera tillsammans.
Jag har lärt mig att det är viktigt att bygga appen stegvis, testa varje funktion och använda Git för att kunna följa utvecklingen och gå tillbaka om något blir fel.
Om jag skulle göra projektet igen skulle jag planera datastrukturen och API-hanteringen ännu tidigare och testa varje större funktion direkt efter att den implementerats.
```
