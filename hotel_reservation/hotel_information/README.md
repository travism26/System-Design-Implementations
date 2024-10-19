# Hotel Management Service

This service is responsible for managing hotel information, including hotels, rooms, and reservations. This is more of an internal service that will be used by internal users. This will allow us to manage the hotel information in a centralized manner.

## Information

This service provides the following features and endpoints for authorized hotel staff:

1. View upcoming reservations

   - GET /api/reservations/upcoming

2. Reserve a room for a customer

   - POST /api/reservations

3. Cancel a reservation (This wont actually delete the reservation, it will just mark it as cancelled)

   - DELETE /api/reservations/:id

4. View hotel information

   - GET /api/hotels/:id

5. Update room availability

   - PATCH /api/rooms/:id/availability

6. Check-in a guest

   - POST /api/reservations/:id/check-in

7. Check-out a guest

   - POST /api/reservations/:id/check-out

8. View guest information
   - GET /api/guests/:id

Note: All endpoints require authentication and proper authorization for hotel staff.

## Authentication

This service uses JWT for authentication. The JWT is expected to be sent in the Authorization header as a Bearer token.

## Authorization

This service uses role-based access control (RBAC) for authorization. The following roles are available:

- **Hotel Staff**: Can view upcoming reservations, reserve a room for a customer, cancel a reservation, view hotel information, update room availability, check-in a guest, and check-out a guest.
- **Hotel Manager**: Can perform all actions that a hotel staff can perform, plus additional actions such as managing hotel information, room availability, and guest information.

## Environment Variables

# Design patterns used

- **Hexagonal Architecture**: This is used to separate the business logic from the external interfaces. This allows us to easily switch between different persistence mechanisms or external interfaces in the future.
