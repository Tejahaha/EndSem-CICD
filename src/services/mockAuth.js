const STORAGE_KEY = "hms_dummy_users";

function loadUsers() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const defaultUsers = [
      { username: "admin", email: "admin@example.com", password: "admin123" },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export async function login({ username, password }) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const users = loadUsers();
  const match = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!match) {
    throw new Error("Invalid username or password");
  }

  return {
    token: "dummy-token-" + username,
    username,
  };
}

export async function signup({ username, email, password }) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const users = loadUsers();

  if (users.some((u) => u.username === username || u.email === email)) {
    throw new Error("User with this username or email already exists");
  }

  const updated = [...users, { username, email, password }];
  saveUsers(updated);

  return "Registration successful (dummy data only)";
}
