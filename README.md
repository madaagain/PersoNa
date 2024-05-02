# ChatBot pour Sisley

## Structure du Projet

### Dossier Client

Le dossier `client` contient le front, développé en Svelte avec TypeScript et stylisé avec Tailwind CSS. Pour démarrer le front-end :

1. Installez les dépendances : `npm install`.
2. Configurez les variables d'environnement nécessaires (voir ci-dessous).
3. Lancez l'application : `npm run dev`.
4. L'api est accessible par default via l'URL `http://localhost:5173`

### Dossier Server

Le dossier `server` contient le back, développé avec Express en TypeScript. Il communique avec une base de données MongoDB et effectue des appels locaux à un model de Mistral AI via Ollama :

1. Installez et lancez [MongoDB Community](https://www.mongodb.com/docs/manual/administration/install-community/)
2. Installer Ollama : `curl https://ollama.ai/install.sh | sh` et lancez Mistral7B dessus `ollama run mistral`
3. Installez les dépendances : `npm install`.
4. Configurez les variables d'environnement nécessaires (voir ci-dessous).
5. Lancez le serveur : `npm run start`.
6. L'api est accessible par default via l'URL `http://localhost:3000`

#### Variables d'Environnement

Assurez-vous de configurer les variables d'environnement contenue dans les `.env.example` dans un fichier personnel `.env` :

### Appel à Ollama

Le back-end effectue des appels à Ollama en local. Assurez-vous que OllamaBot est correctement installé et fonctionne sur le port spécifié dans les variables d'environnement.
