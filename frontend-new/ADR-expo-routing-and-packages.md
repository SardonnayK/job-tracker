# Architectural Decision Record: Expo Routing and Expo-Specific Packages

## Status

Accepted

## Context

With the decision to implement URL-based routing and deep linking, it is important to standardize on a routing solution that is well-supported in the Expo ecosystem. Expo Router provides a file-based routing system that integrates seamlessly with Expo projects and supports both web and native platforms. Additionally, Expo offers a suite of packages that enhance development and user experience.

## Decision

We will use Expo Router for all navigation and routing needs in the frontend application. All screens and detail pages will be defined using the file-based routing convention provided by Expo Router. Where possible, we will prefer Expo-specific packages (e.g., expo-linking, expo-constants, expo-file-system) for features such as deep linking, environment configuration, and file management.

### Key Points

- Use Expo Router for navigation and deep linking.
- Organize screens using the file-based routing structure (e.g., `app/jobs/[jobId].tsx`).
- Use Expo packages for platform features and integrations.
- Avoid custom navigation solutions unless Expo Router cannot meet requirements.

## Consequences

- Simplifies routing and navigation setup, especially for deep linking and web/native parity.
- Reduces boilerplate and leverages Expo's best practices.
- Ensures future maintainability and easier onboarding for new developers familiar with Expo.
- All future navigation and platform integrations should use Expo packages where available.

## References

- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [Expo Packages Directory](https://docs.expo.dev/versions/latest/)

---

_Created: 2025-06-20_
