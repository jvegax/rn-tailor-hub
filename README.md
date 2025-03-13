# Tailor Restaurants

**Tailor Restaurants** is a React Native CLI application designed for viewing, adding, editing, and deleting restaurants. The app interacts with a provided backend API to manage restaurant data and includes user authentication, restaurant listings, detailed views, and a favorites feature.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Technical Approach](#technical-approach)
- [Key Libraries](#key-libraries)
- [Setup & Running the App](#setup--running-the-app)
- [Testing](#testing)
- [Future Improvements](#future-improvements)
- [Deployment](#deployment)

## Overview

The objective of this technical review is to create a Restaurant application using React Native CLI (no Expo) that enables users to manage restaurant data. The app communicates with a simple backend API (see [Technical Review API](https://github.com/TailorHub-Mad/technical_review_api)) and follows the design guidelines provided in a [Figma design](https://www.figma.com/design/LuwjRZZb3ms0MeAmu7gZch/Tailor-Prueba-t%C3%A9cnica-Junior?node-id=1235-1831&t=QBe1sh3ejkqnEot3-1).

## Features

- **Restaurant List:** Display a list of restaurants fetched from the backend, showing basic information (name, address, and average rating).
- **Restaurant Details:** When a restaurant is selected, navigate to a detailed view with address, contact details, reviews, and more.
- **CRUD Operations:** 
  - *Restaurants*: Implement creating, updating, and deleting restaurants.
  - *Comments*: Implement creating and deleting comments for restaurants.
- **User Authentication:** Secure login and registration are implemented with token-based authentication. Session tokens are stored using MMKV.
- **Favorites:** Users can add or remove restaurants from a favorites list and view their favorites in a dedicated screen.
- **Maps Integration:** A map (using react-native-maps) displays restaurant markers. Tapping a marker shows a badge with the restaurant’s name.
- **Bottom Sheet Search:** On the "Create Restaurant" form, tapping the "Name" input opens a bottom sheet with a search bar and results from the Google Places API. Upon selecting a result, the restaurant’s name, address, and lat/lng are set in the form.
- **Loading and Error Handling:** Global loading states and error messages are managed using a generic NetworkData<T> type, ensuring a smooth user experience.

## Folder Structure

```
.
├── assets                  // SVG icons .tsx format
├── common
│   ├── components          // Reusable UI components (e.g., TextBase, ErrorScreen)
│   └── domain
│       └── NetworkData.ts  // Generic type for network responses
├── core
│   ├── api                 // API base URL's 
│   ├── navigation          // React navigation
│   ├── providers           // App providers
│   │   ├── auth            // Authentication functions (login, logout, refreshToken)
│   ├── react-query         // React query configuration
│   └── cache               // MMKV storage configuration
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
│   │   └── models          // e.g., SearchRestaurantResult type
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

- **React Native CLI:** The project is built using React Native CLI.
- **Forms and Validation:** Forms are managed with **react-hook-form** and validated with **zod**. Custom hooks (e.g., useRestaurantForm) encapsulate form logic.
- **Data Fetching:** **tanstack/react-query** is used for data fetching and caching, providing a robust mechanism for handling loading and error states.
- **Authentication:** User authentication is implemented with token-based authentication. Tokens are stored using **MMKV**. The custom authFetch helper centralizes API requests by injecting tokens and handling token refreshes.
- **Maps and Search:** **react-native-maps** displays restaurant markers on a map. Tapping a marker shows a callout with the restaurant’s name. A bottom sheet (via **@gorhom/bottom-sheet**) is used for searching restaurants through the Google Places API, integrating a search form and result list.
- **Navigation:** Navigation is managed with **react-navigation** using a Drawer for main screens and two navigation stacks: one for authentication (Login/Register) and one for the main app (including tabs for Restaurants, Favorites, and Profile).

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
   git clone https://github.com/yourusername/tailor-restaurants.git
   cd tailor-restaurants
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **iOS Setup:**
   ```bash
   cd ios
   pod install --repo-update
   cd ..
   ```

4. **Running the App:**
   - **iOS:**
     ```bash
     npx react-native run-ios
     ```
   - **Android:**
     ```bash
     npx react-native run-android
     ```

## Testing

The app has been tested end-to-end using Maestro to simulate a full user flow:

- Login
- Navigation between screens
- Creating restaurant reviews
- Editing restaurant details

## Future Improvements

If given more development time, potential improvements include:

- **Offline Support:** Implement caching strategies to support offline usage.
- **Enhanced Error Handling:** More robust error reporting and user feedback.
- **Additional Features:** Advanced search, filtering, and sorting of restaurants.
- **Optimized Performance:** Improve performance on slow networks and large data sets.
- **Design Enhancements:** Further align UI with the provided Figma design and add animations/transitions.

## Deployment

- **Android:** The app has been built and deployed for Android.
