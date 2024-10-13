FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# FROM nginx:1.21.0-alpine

# EXPOSE 30

# COPY --from=builder /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# CMD [ "nginx", "-g", "daemon off;" ]
