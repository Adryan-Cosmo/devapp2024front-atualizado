
FROM node:20.12.2


RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/*


RUN npm install -g expo-cli


WORKDIR /app


COPY package.json package-lock.json ./


RUN npm install


COPY . .


EXPOSE 19000
EXPOSE 19001
EXPOSE 19002


CMD ["npm", "start"]
