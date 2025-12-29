const constants = {
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api",
};

const queryKeys = {
  USERS: "USERS",
};

export { constants, queryKeys };
