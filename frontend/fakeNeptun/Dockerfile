FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache g++ make python3

COPY package*.json ./

RUN npm install --legacy-peer-deps --force

RUN npm install @angular/platform-browser@19.2.0 @angular/platform-browser-dynamic@19.2.0 --legacy-peer-deps --force

COPY . .

RUN npm run build --configuration=production

FROM nginx:alpine

COPY --from=builder /app/dist/fake-neptun/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]