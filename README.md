# KioskGameUi

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.5.
---

##Features

- Kiosk-style screen flow (attract → login → game → result / session expired)
- Integration with backend Spin-to-Win API
- Modern Angular standalone application setup
- UI built with **PrimeNG**, **PrimeFlex**, and **PrimeIcons**
- Responsive, fullscreen-friendly layout

---

##Tech Stack

- **Angular 21**
- **TypeScript**
- **RxJS**
- **PrimeNG 21**
- **PrimeFlex**
- **PrimeIcons**
- **Angular CLI 21.0.5**

---

##Requirements

Angular CLI       : 21.0.5
Angular           : 21.0.7
Node.js           : 24.11.1
Package Manager   : npm 11.6.2
Operating System  : win32 x64

---
##Development Server
IDE: VS CODE

To start a local development server:
install packages
```bash
npm install
```

then

```bash
npm start
```

or

```bash
ng serve
```

Once running, open your browser at:

```
http://localhost:4200/
```

The application will automatically reload when source files change.

---

##Building the Project

To build the project:

```bash
npm run build
```

or

```bash
ng build
```

The build artifacts will be output to the `dist/` directory.  
Production builds are optimized for performance and size.

---

##Code Scaffolding

Angular CLI provides scaffolding tools to generate new features.

To generate a new component:

```bash
ng generate component component-name
```

For a full list of schematics:

```bash
ng generate --help
```

---

##Testing

To run unit tests:

```bash
npm test
```

or

```bash
ng test
```

---

##Styling

Global styles and UI libraries include:

- `primeicons`
- `primeflex`
- `styles.scss`

Configured in `angular.json`:

- `node_modules/primeicons/primeicons.css`
- `node_modules/primeflex/primeflex.css`
- `src/styles.scss`

---

##Backend Integration

This frontend is intended to work with the **KioskGame backend service**.

Typical backend endpoints include:
- `POST /api/game/login/{playerId}`
- `GET /api/game/status/{playerId}`
- `POST /api/game/play/{playerId}`

> The API base URL should be configured in the Angular service or environment configuration as needed.

---

##Planned Enhancements

- Environment-based API configuration (dev / prod)
- Improved kiosk animations and transitions
- Enhanced error and session-expired handling
- Deployment to GitHub Pages
- Live backend integration demo

---

##Additional Resources

For more information on Angular CLI, visit:  
https://angular.dev/tools/cli

---

##License
A-aron Lim
This project is intended for educational and portfolio purposes.

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
