# project structure

```
verbos_backend/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── core/
│   │   ├── __init__.py
│   │   └── config.py
│   ├── db/
│   │   ├── __init__.py
│   │   ├── session.py
│   │   └── migrations/
│   ├── docs/
│   │   ├── __init__.py
│   │   ├── router.py
│   │   ├── schemas.py
│   │   └── models.py
│   │── notes/
│   │   ├── __init__.py
│   │   ├── router.py
│   │   ├── schemas.py
│   │   └── models.py
│   ├── todos/
│   │   ├── __init__.py
│   │   ├── router.py
│   │   ├── schemas.py
│   │   └── models.py
│   ├── users/
│       ├── __init__.py
│       ├── router.py
│       ├── schemas.py
│       └── models.py
├── .env
├── requirements.txt
└── .gitignore
```

- The structure followed by verbos is  well-organized pattern for building a scalable and maintainable FastAPI application. It follows the principles of modularity and separation of concerns. 

