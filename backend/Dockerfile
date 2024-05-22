# Verwende das offizielle Node.js-Image als Basis
FROM node:20

# Setze das Arbeitsverzeichnis im Container
WORKDIR /usr/src/app

# Kopiere die package.json und yarn.lock Dateien
COPY package.json yarn.lock ./

# Installiere die Projektabhängigkeiten
RUN yarn install

# Kopiere den Rest der Anwendungsquelle
COPY . .


# Starte die Anwendung
CMD ["yarn", "start"]