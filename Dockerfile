# Используем базовый образ с Node.js
FROM node:12

# Копируем файлы приложения
COPY . /app

# Настройка прав доступа
WORKDIR /app
RUN chown -R www-data:www-data .

# Устанавливаем зависимости для Angular-приложения
WORKDIR /app/frontend
RUN npm install-g npm@6 \
    && npm install
# Экспортируем порт 9000 для Angular-приложения
EXPOSE 4200

# Запускаем Angular-приложение
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]