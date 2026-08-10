FROM node:22.0.0-alpine

ENV NODE_ENV=production
ENV DB=postgres://elbrus:elbrus@91.219.189.115:5432/pipeline_filtings_krioarmatura

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 80
EXPOSE 443

CMD ["node", "./src/app.js"]