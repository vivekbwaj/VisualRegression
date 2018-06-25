FROM node:8-slim

RUN apt-get update && \
    apt-get install -yq gconf-service bzip2 libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
    libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
    ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget && \
    wget https://github.com/Yelp/dumb-init/releases/download/v1.2.1/dumb-init_1.2.1_amd64.deb && \
    dpkg -i dumb-init_*.deb && rm -f dumb-init_*.deb && \
    apt-get clean && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

# Install puppeteer so it's available in the container.
RUN yarn global add puppeteer@1.1.0 npm-cli-login && yarn cache clean

ENV NODE_PATH="/usr/local/share/.config/yarn/global/node_modules:${NODE_PATH}"

RUN groupmod -g 999 node && \
	usermod -u 999 node 

RUN groupadd -g 1000 jenkins && \
    useradd -u 1000 -g 1000 -m -s /bin/bash jenkins

USER jenkins

ENTRYPOINT ["dumb-init", "--"]
