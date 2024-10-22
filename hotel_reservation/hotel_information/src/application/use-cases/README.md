# Use Cases

## Purpose

The `use-cases` directory is a crucial component of the hexagonal architecture (also known as ports and adapters architecture). It represents the application layer and contains the business logic of our hotel reservation system. Use cases define the core operations and workflows of our application, independent of any external concerns like databases, UI, or external services.

## Our Approach

In this implementation, I took a streamlined approach to organizing our use cases:

1. **Entity-Centric Use Cases**: Instead of creating separate use cases for each action on each entity, I've created a single use case class for each main entity (e.g., `HotelUseCase`, `RoomUseCase`).

2. **Comprehensive Methods**: Within each entity-specific use case, I've implemented methods that cover all standard operations (Create, Read, Update, Delete) as well as any additional business logic specific to that entity.

3. **Reduced Boilerplate**: This approach significantly reduces boilerplate code and improves code organization, making it easier to understand and maintain the overall structure of our application logic.

4. **Flexibility and Scalability**: While keeping the code concise, this structure still allows for easy addition of more complex, business-specific operations within each entity's use case as needed.

5. **Clear Separation of Concerns**: Each use case class clearly encapsulates all operations related to a specific entity, maintaining a clear separation of concerns while providing a unified interface for entity-specific operations.

This approach strikes a balance between granularity and simplicity, making our use cases more readable and easier to understand while still adhering to the principles of hexagonal architecture. It allows for efficient management of entity-specific operations without the overhead of excessive file creation and navigation.

## Examples

1. `HotelUseCase`: Encapsulates all hotel-related operations such as retrieving, creating, updating, and deleting hotel information.
2. `RoomUseCase`: Manages all room-related functionalities, including room details retrieval, registration, modification, and removal.

These use cases interact with their respective repositories, ensuring that business logic remains separate from data access concerns, in line with hexagonal architecture principles.
