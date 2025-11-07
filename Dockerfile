FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci -omit=dev

COPY . .

ENV NODE_ENV=production
ENV PORT=1234

EXPOSE 1234
CMD ["node","app.js"]