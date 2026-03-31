# EA_React-Native

Hecho con backend: https://github.com/Jannogueira/EA_Sem5_APIRest_Backend

A professional React Native application built with **TypeScript** and **Expo Router**, designed for cross-platform compatibility (iOS & Android). This project follows modern development practices, featuring a modular architecture, tab-based navigation, and integrated API services.

---

## 🚀 Tech Stack

- **Core Framework**: React Native (via Expo SDK 50+)
- **Language**: TypeScript
- **Navigation**: Expo Router (File-based routing)
- **Styling**: StyleSheet / CSS-in-JS
- **Networking**: Fetch API / Custom Service Layer
- **Icons**: @expo/vector-icons
- **Environment**: Node.js & npm/yarn

---

## ✨ Features & Functionalities

- **📱 Mobile-First Design**: Optimized for both iOS and Android devices using native components.
- **Example Usage**: Includes fully functional examples of listings, details views, and forms.
- **🗂️ Tab Navigation**: Implemented using Expo Router's directory-based routing `(tabs)`.
- **🖼️ Modal Integration**: Custom modal components for "Create" and "Edit" operations (Users, Organizations).
- **🔌 Robust API Layer**: Centralized API configuration with platform-specific handling (localhost for web, specific IP for physical devices/emulators).
- **🔒 Type Safety**: Full TypeScript support across components, services, and navigation props.

---

## 📂 Folder Structure

```
├── app/                  # Expo Router pages and navigation
│   ├── (tabs)/           # Main tab screens (e.g., Users, Organizations)
│   ├── index.tsx         # Entry screen
│   └── _layout.tsx       # Root layout configuration
├── components/           # Reusable UI components
│   └── modals/           # Modal forms (CreateUser, EditOrganization, etc.)
├── services/             # API communication layer
│   ├── api.ts            # Base URL and networking config
│   ├── users.ts          # User-related API endpoints
│   └── organizations.ts  # Organization-related endpoints
├── styles/               # Shared style definitions
├── assets/               # Images, fonts, and static resources
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- Expo Go app on your mobile device (for physical testing) or Android Studio/Xcode (for simulators).

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Jannogueira/EA_React-Native.git
    cd EA_React-Native
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Project

To start the development server:

```bash
npx expo start
```

- **Run on Android Emulator**: Press `a` in the terminal.
- **Run on iOS Simulator**: Press `i` in the terminal (macOS only).
- **Run on Physical Device**: Scan the QR code with the **Expo Go** app.

---

## ⚙️ API Configuration

The project uses a centralized configuration for API requests in `services/api.ts`. It handles different environments (Android Emulator vs. Physical Device vs. Web).

**Important**: If you are running on a physical device, update the `physicalDeviceIP` variable to match your machine's local IP address.

```typescript
// services/api.ts
import { Platform } from 'react-native';

const getBaseUrl = () => {
    const physicalDeviceIP = '192.168.1.22'; // UPDATE THIS with your PC's IP

    if (Platform.OS === 'android') {
        return `http://${physicalDeviceIP}:1337`;
        // Or for emulator only: return `http://10.0.2.2:1337`;
    } else if (Platform.OS === 'ios') {
        return `http://${physicalDeviceIP}:1337`;
    } else {
        return 'http://localhost:1337';
    }
};

export const API_BASE_URL = getBaseUrl();
```

---

## 📝 Example Usage

### 1. Creating an API Service

Define your API calls in the `services/` directory to keep components clean.

```typescript
// services/users.ts
import { API_BASE_URL } from './api';

export interface User {
  id: number;
  name: string;
  email: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
```

### 2. Using Data in a Component

```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { fetchUsers, User } from '../services/users';

export default function UsersScreen() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await fetchUsers();
    setUsers(data);
  };

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
```

---

## 📏 Best Practices & Conventions

- **Component Structure**: Keep components small and focused. Reusable UI elements go in `components/`, while screens go in `app/`.
- **Modals**: Use the `components/modals/` directory for overlay content like forms or alerts.
- **Styling**: Use `StyleSheet.create` for performance. Avoid inline styles where possible.
- **State Management**: Use React Hooks (`useState`, `useEffect`) for local state.
- **Typing**: Always define interfaces for your data models (e.g., `User`, `Organization`) to leverage TypeScript's power.

---

## 📄 License

This project is licensed under the MIT License.
