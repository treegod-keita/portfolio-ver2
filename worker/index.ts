export default {
    async fetch(request: Request, env: Env) {
        const username = env.BASIC_AUTH_USERNAME;
        const password = env.BASIC_AUTH_PASSWORD;

        const authString = `${username}:${password}`;
        const expectedAuth = `Basic ${btoa(authString)}`;

        const authHeader = request.headers.get("Authorization");

        if (!authHeader || authHeader !== expectedAuth) {
            return new Response("401 Unauthorized", {
                status: 401,
                headers: {
                    "WWW-Authenticate": 'Basic realm="Secure Area"',
                    "Content-Type": "text/plain",
                },
            });
        }
        return env.ASSETS.fetch(request);
    },
} satisfies ExportedHandler<Env>;
