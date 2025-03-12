# Untitled

# Tailor Restaurants

**Tailor Restaurants** is a React Native CLI application designed for viewing, adding, editing, and deleting restaurants. The app interacts with a provided backend API to manage restaurant data and includes user authentication, restaurant listings, detailed views, and a favorites feature.

## Table of Contents

- [Overview](https://www.notion.so/1b475ccd92c98056a426f73cc3f22ccd?pvs=21)
- [Features](https://www.notion.so/1b475ccd92c98056a426f73cc3f22ccd?pvs=21)
- [Folder Structure](https://www.notion.so/1b475ccd92c98056a426f73cc3f22ccd?pvs=21)
- [Technical Approach](https://www.notion.so/1b475ccd92c98056a426f73cc3f22ccd?pvs=21)
- [Key Libraries](https://www.notion.so/1b475ccd92c98056a426f73cc3f22ccd?pvs=21)
- [Setup & Running the App](https://www.notion.so/1b475ccd92c98056a426f73cc3f22ccd?pvs=21)
- [Testing](https://www.notion.so/1b475ccd92c98056a426f73cc3f22ccd?pvs=21)
- [Future Improvements](https://www.notion.so/1b475ccd92c98056a426f73cc3f22ccd?pvs=21)
- [Deployment](https://www.notion.so/1b475ccd92c98056a426f73cc3f22ccd?pvs=21)

## Overview

The objective of this technical review is to create a Restaurant application using React Native CLI (no Expo) that enables users to manage restaurant data. The app communicates with a simple backend API (see [Technical Review API](https://github.com/TailorHub-Mad/technical_review_api)) and follows the design guidelines provided in a [Figma design](https://www.figma.com/design/LuwjRZZb3ms0MeAmu7gZch/Tailor-Prueba-t%C3%A9cnica-Junior?node-id=1235-1831&t=QBe1sh3ejkqnEot3-1).

## Features

- **Restaurant List:**
    
    Display a list of restaurants fetched from the backend, showing basic information (name, address, and average rating).
    
- **Restaurant Details:**
    
    When a restaurant is selected, navigate to a detailed view with address, contact details, reviews, and more.
    
- **CRUD Operations:**
    
    Implement adding a new restaurant, editing existing restaurant details, and deleting restaurants.
    
- **User Authentication:**
    
    Secure login and registration are implemented with token-based authentication. Session tokens are stored using MMKV.
    
- **Favorites:**
    
    Users can add or remove restaurants from a favorites list and view their favorites in a dedicated screen.
    
- **Maps Integration:**
    
    A map (using react-native-maps) displays restaurant markers. Tapping a marker shows a badge with the restaurant’s name.
    
- **Bottom Sheet Search:**
    
    On the "Create Restaurant" form, tapping the "Name" input opens a bottom sheet with a search bar and results from the Google Places API. Upon selecting a result, the restaurant’s name, address, and lat/lng are set in the form.
    
- **Loading and Error Handling:**
    
    Global loading states and error messages are managed using a generic `NetworkData<T>` type, ensuring a smooth user experience.
    

## Folder Structure

```
kotlin
Copiar
.
├── assets
│   └── (icons, images, etc.)
├── common
│   ├── components          // Reusable UI components (e.g., TextBase, ErrorScreen)
│   └── domain
│       └── NetworkData.ts  // Generic type for network responses
├── core
│   ├── api.ts              // API base URL and helper functions
│   ├── auth.ts             // Authentication functions (login, logout, refreshToken)
│   ├── authEmitter.ts      // Global event emitter for authentication events
│   └── cache.ts            // MMKV storage configuration
├── features
│   ├── auth
│   │   ├── data            // API calls for authentication
│   │   ├── hooks           // Custom hooks for auth (e.g., useAuthFetch)
│   │   ├── models          // Auth models/types
│   │   └── utils           // Utility functions
│   ├── comments
│   │   ├── data
│   │   ├── hooks
│   │   ├── models
│   │   └── utils
│   ├── places
│   │   ├── data            // Google Places API functions
│   │   ├── hooks
│   │   ├── models          // e.g., SearchRestaurantResult type
│   │   └── utils
│   └── restaurants
│       ├── data            // API calls for restaurant CRUD operations
│       ├── hooks           // Custom hooks (e.g., useGetRestaurants, useRestaurantForm)
│       ├── models          // Restaurant and Review models
│       └── utils           // Data mapping functions (e.g., mapToRestaurant)
├── views
│   ├── auth                // Screens for Login, Register, etc.
│   ├── bottomTabs          // Main tab screens (Restaurants, Favorites, Profile)
│   └── modals              // Modals for creating a restaurant, searching, etc.
└── README.md

```

## Technical Approach

- **React Native CLI:**
    
    The project is built using React Native CLI (not Expo). This approach provides more control over native configurations.
    
- **Forms and Validation:**
    
    Forms are managed with **react-hook-form** and validated with **zod**. Custom hooks (e.g., `useRestaurantForm`) encapsulate form logic.
    
- **Data Fetching:**
    
    **tanstack/react-query** is used for data fetching and caching, providing a robust mechanism for handling loading and error states.
    
    A generic type `NetworkData<T>` is used to represent network request states.
    
- **Authentication:**
    
    User authentication is implemented with token-based authentication. Tokens are stored using **MMKV**. The custom `authFetch` helper centralizes API requests by injecting tokens and handling token refreshes.
    
- **Maps and Search:**
    
    **react-native-maps** displays restaurant markers on a map. Tapping a marker shows a callout with the restaurant’s name. A bottom sheet (via **@gorhom/bottom-sheet**) is used for searching restaurants through the Google Places API, integrating a search form and result list.
    
- **Navigation:**
    
    Navigation is managed with **react-navigation** using a Drawer for main screens and two navigation stacks: one for authentication (Login/Register) and one for the main app (including tabs for Restaurants, Favorites, and Profile).
    

## Key Libraries

- **react-hook-form:** For form management.
- **@tanstack/react-query:** For backend API calls and caching.
- **zod:** For form validation.
- **react-native-maps:** For displaying maps and markers.
- **@gorhom/bottom-sheet:** For creating bottom sheet modals.
- **MMKV:** For local storage (caching tokens, etc.).

## Setup & Running the App

1. **Clone the repository:**
    
    ```bash
    bash
    Copiar
    git clone https://github.com/yourusername/tailor-restaurants.git
    cd tailor-restaurants
    
    ```
    
2. **Install dependencies:**
    
    ```bash
    bash
    Copiar
    yarn install
    # or
    npm install
    
    ```
    
3. **iOS Setup:**
    
    ```bash
    bash
    Copiar
    cd ios
    pod install --repo-update
    cd ..
    
    ```
    
4. **Running the App:**
    - **iOS:**
        
        ```bash
        bash
        Copiar
        npx react-native run-ios
        
        ```
        
    - **Android:**
        
        ```bash
        bash
        Copiar
        npx react-native run-android
        
        ```
        

## Testing

The app has been tested end-to-end using Maestro to simulate a full user flow:

- Login
- Navigation between screens
- Creating restaurant reviews
- Editing restaurant details

For additional testing, unit tests have been written for key frontend components and e2e tests have been implemented using Detox (if applicable).

## Future Improvements

If given more development time, potential improvements include:

- **Enhanced Error Handling:** More robust error reporting and user feedback.
- **Optimized Performance:** Improve performance on slow networks and large data sets.
- **Offline Support:** Implement caching strategies to support offline usage.
- **Additional Features:** Advanced search, filtering, and sorting of restaurants.
- **Design Enhancements:** Further align UI with the provided Figma design and add animations/transitions.

## Deployment

- **Android:**
    
    The app has been built and deployed for Android. (Include a link to the APK or the Play Store if available.)
    
- **iOS:**
    
    Due to Apple's requirements, iOS distribution requires a paid Apple Developer account.
    

## Submission Guidelines

- The source code is pushed to a public GitHub repository.
- This README includes all instructions on how to run the app.
- If the app has been deployed, the deployment links are included.

---

This README covers the project's purpose, structure, technical decisions, and instructions for running the app. It is tailored to your React Native CLI project without any Expo references.