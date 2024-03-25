# Yabsdelal backend

***

Репозиторий - https://github.com/arturir/yabsdelal-backend


***

## Описание

Api для управления прайс-листом сайта сервисного центра с возможностью отправки заявок в Telegram

## Роуты и методы

### /models

GET /models - возвращает все модели телефонов имеющиеся в БД

POST /models - добавляет новую модель в БД

GET /models/brand/:brandId - фильтрует модели по переданному id бренда

PATCH /models/:id/name - изменяет название модели телефона

PATCH /models/:id/brand - изменяет бренд модели телефона

DELETE /models/:id/:serviceId - удаляет услугу в укзанной модели телефона

PATCH /models/:id/:serviceId - изменяет услугу в укзанной модели телефона

POST /models/:id - добавляет услугу в укзанной модели телефона

DELETE /models/:id - удаляет модель телефона

### /brands

GET /brands - возвращает все бренды телефонов имеющиеся в БД

POST /brands - добавляет новую бренд в БД

DELETE /brands/:id - удаляет бренд телефона

### /request

POST /order - отправляет заявку на ремонт

POST /callback - отправляет заявку на обратный звонок