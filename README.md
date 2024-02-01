# Server project

Веб-интерфейс для управления серверами.

## Реализовано

### Задание 1

Добавлена кнопка перезапуска сервера (R), находится во вкладке инфо и иммитирует
перезапуск сервера.
Добавлено логирование действия перезапуска и последующего запуска сервера пользователем

### Задание 2

Добавлен таб для взаимодействия с группами (Вкладка Группы)
Добавлена возможность создать, редактировать, удалить группу
Добавлена возможность выбора группы при создании и редактирования сервера
Название группы появляется во вкладке инфо (group)

## Описание

У нас есть список серверов, у которых мы можем указать хост, логин, пароль, группу.

Из веб-интерфейса мы можем запускать и останавливать сервера.
Действия пользователя по запуску и остановке сервера журналируются.

Каждый из серверов выполняет задания.
В веб-интерфейсе на графике мы видим по дням сколько заданий сервер выполнил.

Т.к. система тестовая, то задания мы просто генерируем на каждый сервер.

[Скриншоты](web.md)

## Технический стек

db: mongodb

backend: node.js c фреймворком express.js, работа с бд через mongoose

frontend: фреймворк angular.js, шаблонизатор pug, оформление bootstrap css, графики chart.js

## Задания

### задание 1

действие "перезапуск" для сервера:

а) добавить кнопку с действием в сервер

б) добавить журналирование этого действия

### задание 2

добавить CRUD-операции для групп серверов

а) добавить отдельный таб для работы с группами

б) вывести список групп,

в) добавить кнопку добавления группы, добавить форму добавления группы, сохранять группу

г) сделать выбор групп в форме добавления сервера

### задание 3

добавить общий график (монитор) по всем заданиям серверов за день по часам

а) на графике по оси Х вывести часы от 0 до 23

б) вывести столбцы в каждом часе количество выполненных заданий каждым сервером

в) в каждом часе количество столбцов - это количество серверов

г) над графиком сделать выбор даты (чтобы можно посмотреть задания по часам за любой день),
по умолчанию текущий день

## запуск

должны быть установлены: nodejs, mongodb

> git clone https://github.com/antirek/server-project.git // клонируем этот репозиторий

> cd server-project // переходим в директорию проекта

> npm install // устанавливаем зависимости

> npm run build // делаем сборку (вебпак собирает скрипт для фронтенда)

> npm run start:web // запускаем наш сервер

переходим в браузере на http://localhost:3000

по необходимости конфигурируем подключение к mongodb в config/default.js

## вопросы для обсуждения

- что можно улучшить в этом проекте?

- какие проблемы есть в этом проекте?

- на каком стеке можно реализовать подобную функциональность быстрее?
