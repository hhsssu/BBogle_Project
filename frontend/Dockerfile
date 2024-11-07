FROM node:20 AS build

RUN mkdir /react

WORKDIR /react

COPY package.json .

# RUN npm install --legacy-peer-deps
RUN npm install
# RUN npm install eslint-plugin-import --save-dev
COPY . .

RUN npm run build

RUN ls /react/dist
#RUN ls /react/build
RUN ls

FROM nginx:latest

WORKDIR /

COPY --from=build /react/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
