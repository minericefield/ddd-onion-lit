# ddd-onion-lit

Implementing onion architecture.

# Concept

TODO

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
