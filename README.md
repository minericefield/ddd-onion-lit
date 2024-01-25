# ddd-onion-lit

Implementing onion architecture.

## Generate the aggregate root from the factory

In this branch, as an alternative implementation approach, the user aggregate root is generated through the factory.

This pattern offers several advantages:

- The client (mainly application services) can delegate the enforcement of invariants related to generation to the factory.
- The client does not need to be familiar with the internal structure of the aggregate root.
- The client does not have to generate or hold objects inside the boundary.

On the other hand, the construction of the user aggregate root is not complicated, and all of its properties are exposed.
In such cases, there is an argument that implementing a factory might be considered excessive.
