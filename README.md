# laravel-react-todo-app
Todo app with auth (React SPA with laravel api)

1. Clone repository
2. Go to repository root and run ./start.sh

3. By default project is available as localhost

Tradeoffs and assumptions:
1. Did not implement token invalidation logic on time basis
2. Did not implement token refetch functionality on expire
3. If some manual actions are performed (for example log out through Postman) - token remains in local storage and breaks app logic as this token not actual for backend (can be removed on specific response codes from backend - just didn't implement it for simple todo list)
4. Built JS and CSS are not separated by small files - for prod it could be usable
5. For bigger apps may make sence to separate frontend from backend. Then frontend may be splitted to microfrontends
6. Store can be managed by RTK query with tags (didn't implement it as it was 1st try of RTK query and I wanted more control over the store)
7. For bigger projects it may be appropriate to move selectors for separate files
