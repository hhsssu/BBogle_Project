FROM node:20 AS build

RUN mkdir /react
WORKDIR /react

COPY package.json .

# RUN npm install --legacy-peer-deps
RUN npm install
<<<<<<< HEAD
#RUN npm install eslint-plugin-import --save-dev
=======
# RUN npm install eslint-plugin-import --save-dev
>>>>>>> 5bd9a3039cdbd13de6dfe88e5651dcdf63b027ac
COPY . .

RUN npm run build

<<<<<<< HEAD
# 빌드된 디렉토리 확인 (디버깅 용도)
RUN ls /react/dist
RUN ls /react/build
=======
RUN ls /react/dist
#RUN ls /react/build
>>>>>>> 5bd9a3039cdbd13de6dfe88e5651dcdf63b027ac
RUN ls

FROM nginx:latest

WORKDIR /

COPY --from=build /react/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
