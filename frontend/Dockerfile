# Verwende die offizielle Node.js-Image als Basis
FROM node:20

# Setze das Arbeitsverzeichnis im Container
WORKDIR /usr/src/app

# Kopiere die package.json und package-lock.json Dateien
COPY package*.json ./

# Installiere die Projektabhängigkeiten
RUN yarn install

# Kopiere den Rest der Anwendungsquelle
COPY . .

# Expose the port the app runs on (vite default is 5173)
EXPOSE 5173


# Starte einen einfachen Server für die statischen Inhalte
CMD ["yarn", "run", "dev"]
