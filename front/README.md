Области хранения данных:

- база данных на сервере
- BFF
- redux store

Сущности приложения:

- пользователь: БД(данные), BFF(сессия), стор(отображение в браузре?)
- клиент: БД(список клиентов), стор(отображение в браузере)
- проект: БД(список проетов), стор(отображение в браузере)
- финансы: БД(список расходов), стор(отображение в браузере)

Таблицы БД:

1 Пользователь (user)
	- id
	- login
	- password

2 Клиент (client)

- id
- name
- birthday
- phone
- email
- telegram
- WhatsApp

3 Проект (projekt)

- id
- client
- date of shooting
- shooting time
- duration of shooting
- booking a location
- payment location
- cost shooting
- prepayment
- calculation
- deadline
- project completed

4 Финансы (finance)

- id
- date
- expense item
- sum

Схема состояния на BFF:

- сессия пользователя:
  - id
  - login
  - password

Схема для redux store (на клиенте)

- projects (массив project):

  - id
  - date
  - time
  - client name

- project:

  - id
  - client
  - date of shooting
  - shooting time
  - duration of shooting
  - booking a location
  - payment location
  - cost shooting
  - prepayment
  - calculation
  - deadline
  - project completed

- clients (массив client):

  - id
  - name
  - phone
  - telegram
  - WhatsApp

- client:

  - id
  - name
  - birthday
  - phone
  - email
  - telegram
  - WhatsApp
  - projects (массив):
    - id
    - date
    - time
    - client name

- finance:
  - sum
  - date
  - expense item
