Dear Viewer! backend stuff was easy, simple crud functionality, i done it eazy, next i moved for frontend stuff becouse of slider was priority i start with that... also becouse of there was no written that need to be done using typescript, i choose to done with javascript(for time saving), but im working only with typescript more than 2 years btw. with bonus points, i done only search part, ofc another parts is easy to done and i can just no time for this.. styling took my time.. I see that priority is also to be good markup developer, in my github there is many old repositories, where is my markup projects, i think its will shows that i was spending big time for markup.. Thanks you for your time and opportunity! <3 

backend took about 1 hour and 20min
frontend took about 2 hour 30 min 

# Task Manager App

```bash
cd backend && npm install
cd frontend && npm install
```

## Run

Backend (port 4000):

```bash
cd backend && node server.js
```

Frontend (port 3000):

```bash
cd frontend && npm run dev
```

Open http://localhost:3000

## API

Base URL: `http://localhost:4000/api/tasks`

- `GET /api/tasks` - get all tasks
- `POST /api/tasks` - create a task
- `PUT /api/tasks/:id` - update a task
- `DELETE /api/tasks/:id` - delete a task
- `PATCH /api/tasks/:id/toggle` - toggle completed
