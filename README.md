# EA React Native Project

Aquest projecte és una aplicació de React Native per a la gestió d'usuaris i organitzacions, desenvolupada amb **Expo** i **Expo Router**.

## Estructura del Projecte

```text
.
├── app/                  # Rutes de l'aplicació (Expo Router)
│   ├── (tabs)/           # Pantalles de la barra de navegació (Usuaris, Organitzacions, etc.)
│   ├── index.tsx         # Punt d'entrada de l'aplicació
│   └── _layout.tsx       # Disseny arrel (Root Layout)
├── components/           # Components React reutilitzables
│   └── modals/           # Finestres modals (Crear usuari, Editar org, etc.)
├── services/             # Lògica de comunicació amb l'API (Backend)
│   ├── api.ts            # Configuració de la URL base (IP/Localhost)
│   ├── users.ts          # Serveis d'usuaris
│   └── organizations.ts  # Serveis d'organitzacions
├── styles/               # Fitxers d'estils (CSS-in-JS)
├── assets/               # Recursos estàtics (Imatges, icones)
├── app.json              # Configuració d'Expo
├── package.json          # Dependències i scripts de npm
└── tsconfig.json         # Configuració de TypeScript
```

## Com iniciar el projecte

Segueix aquests passos per posar en marxa l'aplicació:

### 1. Instal·lació de dependències
Assegura't de tenir Node.js instal·lat i executa:
```bash
npm install
```

### 2. Iniciar el servidor de desenvolupament
Inicia Metro Bundler amb Expo:
```bash
npx expo start
```

### 3. Execució en dispositius
Un cop el servidor estigui funcionant, pots obrir l'app de les següents maneres:
- **Android Emulator**: Prem `a` a la terminal.
- **iOS Simulator**: Prem `i` a la terminal.
- **Expo Go**: Escaneja el codi QR amb el teu mòbil real (Android o iOS).
- **Web**: Prem `w` a la terminal.

## Configuració de l'API
Si necessites canviar la IP del backend, recorda modificar el fitxer `services/api.ts`.
