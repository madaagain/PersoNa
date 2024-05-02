# Persona LLM for Sysley based on Mistral

## Structure of Projet

### Client Folder

The `client` folder contains the front end, developed in Svelte with TypeScript and styled using Tailwind CSS. To start the front end:

1. Install the dependencies: `npm install`.
2. Configure the necessary environment variables (see below).
3. Launch the application: `npm run dev`.
4. The API is accessible by default via the URL `http://localhost:5173`.

### Server Folder

The `server` folder contains the backend, developed with Express in TypeScript. It communicates with a MongoDB database and makes local calls to a Mistral AI model via Ollama:


1. Installez et lancez [MongoDB Community](https://www.mongodb.com/docs/manual/administration/install-community/)
2. Installer Ollama : `curl https://ollama.ai/install.sh | sh` et lancez Mistral7B dessus `ollama run mistral`
3. Installez les dépendances : `npm install`.
4. Configurez les variables d'environnement nécessaires (voir ci-dessous).
5. Lancez le serveur : `npm run start`.
6. L'api est accessible par default via l'URL `http://localhost:3000`

1. Install and launch MongoDB Community.
2. Install Ollama: curl https://ollama.ai/install.sh | sh and run Mistral7B on it ollama run mistral.
3. Install the dependencies: npm install.
4. Configure the necessary environment variables (see below).
5. Launch the server: npm run start.
6. The API is accessible by default via the URL http://localhost:3000.

### Environment Variables

Ensure you configure the environment variables contained in the `.env.example` in a personal `.env` file:

### Ollama Calls

The backend makes local calls to Ollama. Ensure that the OllamaBot is properly installed and functioning on the port specified in the environment variables.

### Contributors

#### Big thanks to the team  for this project:

- Leo Outmizguine
- Timothe Jaquot
- Luan Bourbier
- Pablo Peiro

### Video Demo

To see a demonstration of the application in action, you can view the video at the following link: [Screencast_from_2024-01-19_10-22-43.webm]