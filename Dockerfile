# версия node
FROM node:20

# рабочая папка
WORKDIR /usr/src/app 

# копируются файлы
COPY . .

# переходим в папку front устанавливаются зависимости и производиться сборка
WORKDIR /usr/src/app/front
RUN npm i
RUN npm run build

# переходим в папку back устанавливаются зависимости
WORKDIR /usr/src/app/back
RUN npm i

# открываем порт
EXPOSE 3001

# запускаем приложение
CMD [ "node", "app.js" ]