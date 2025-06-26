FROM ubuntu:24.04

# Define ambiente não interativo
ENV DEBIAN_FRONTEND=noninteractive
ENV NODE_VERSION=14.17.6

# Instala dependências básicas, Chromium e libs do Puppeteer
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    ca-certificates \
    gnupg \
    build-essential \
    xdg-utils \
    libfontconfig \
    fonts-liberation \
    libappindicator3-1 \
    libasound2t64 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libu2f-udev \
    libxss1 \
    unzip \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Instala Node.js v14.17.6 manualmente
RUN curl -O https://nodejs.org/dist/v14.17.6/node-v14.17.6-linux-x64.tar.xz && \
    tar -xJf node-v14.17.6-linux-x64.tar.xz -C /usr/local --strip-components=1 && \
    rm node-v14.17.6-linux-x64.tar.xz && \
    node -v && npm -v

# Cria diretório de trabalho
WORKDIR /app

# Copia arquivos do projeto
COPY package*.json ./
COPY server.js boleto.html ./

# Instala dependências Node (inclusive puppeteer@13.5.1)
RUN npm install

# Garante re-download do Chromium correto (caso puppeteer use)
RUN node node_modules/puppeteer/install.js || true

# Expõe porta da aplicação
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "start"]