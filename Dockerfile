# Используем базовый образ с Node.js
FROM node:12

# Копируем файлы приложения
COPY . /app

# Настройка прав доступа
WORKDIR /app
RUN chown -R www-data:www-data .

# Устанавливаем зависимости для Angular-приложения
RUN npm install

COPY src /app/web

# Экспортируем порт 4200 для Angular-приложения
EXPOSE 4200

# Запускаем Angular-приложение
CMD ["npm", "start"]