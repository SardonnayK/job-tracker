# Architectural Decision Record: Routing and Deep Linking

## Status

Accepted

## Context

The frontend application currently uses a screen-based navigation system without explicit URL routing. This limits the ability to deep link to specific screens or resources (e.g., jobs, users), and makes it difficult to share or bookmark specific app states.

## Decision

We will implement explicit URL-based routing for all major screens and detail pages. Each screen will have a unique URL path, and detail pages will include resource IDs to support deep linking.

### Example Routes

- `/Home` — Home screen
- `/QR_Scanner` — QR Scanner screen
- `/settings` — Settings screen
- `/jobs/:jobId` — Job details (deep linkable)
- `/user/:userId` — User details (deep linkable)

## Consequences

- Enables deep linking, bookmarking, and sharing of specific app states.
- Improves navigation consistency and user experience.
- Requires refactoring navigation logic to use a router (e.g., React Navigation with linking support for web/native).
- All future screens and detail pages should follow this routing convention.

## References

- [React Navigation Documentation](https://reactnavigation.org/docs/getting-started)
- [Deep Linking in React Navigation](https://reactnavigation.org/docs/deep-linking)

---

_Created: 2025-06-20_
