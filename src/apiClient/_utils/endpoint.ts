const PORT = 8000;

const endpoint = (suffix: string) => `http://localhost:${PORT}/${suffix}`;

export default endpoint;
