# Kanban-доска на React

Доска задач (Kanban) для управления задачами.

## Технологии

- React
- Vite
- styled-components
- React Router

## Запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

## Форматирование и проверка кода

```bash
npm run format
npm run lint
```

## E2E-тесты

Тесты лежат в `.e2e` и используют локальный mock API вместо боевого бэкенда.
Каждый прогон самодостаточен: mock API поднимается на порту `4174`, dev-сервер Vite —
на `4175`, после проверки оба останавливаются.

```bash
npm install --prefix .e2e
npm run e2e         # полный набор проверок
npm run e2e:smoke   # сценарий пользователя: вход -> доска -> карточка -> выход
npm run e2e:form    # закрытие формы создания задачи
```

Путь к Chrome можно переопределить переменной окружения `CHROME_PATH`
(по умолчанию `C:\Program Files\Google\Chrome\Application\chrome.exe`).

Реальный API используется по умолчанию (`https://wedev-api.sky.pro/api`).
Чтобы приложение работало без интернета, запустите dev-сервер с
`VITE_API_URL=http://127.0.0.1:4174/api` — этот режим используют E2E-тесты.
