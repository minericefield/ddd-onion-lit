# ddd-onion-lit

Implementing onion architecture.

# Concept

- [[DDD] Tactical Design Patterns Part 1: Domain Layer](https://dev.to/minericefield/ddd-tactical-design-patterns-part-1-domain-layer-j38)
- [[DDD] Tactical Design Patterns Part 2: Application Layer](https://dev.to/minericefield/ddd-tactical-design-patterns-part-2-application-layer-e14)
- [[DDD] Tactical Design Patterns Part 3: Presentation/Infrastructure Layer](https://dev.to/minericefield/ddd-tactical-design-patterns-part-3-presentationinfrastructure-layer-2e4f)

# use case model
![](doc/use%20case%20model.png)

# domain model
![](doc/domain%20model.png)

# Development

##### For mysql.
```
docker compose up -d
```
Mapped port is 3306.

##### Install dependencies.
```
yarn install
```

##### Launch app.
```
yarn start:dev
```
Check it out at [localhost:3000/swagger](http://localhost:3000/swagger) .

##### If you want to create example users.
```
yarn start:commander SeedUser
```
You can login by `test@example.com` .

# Other implementation approaches
- [Generate the aggregate root from the factory](https://github.com/minericefield/ddd-onion-lit/tree/variations/user-factory)
