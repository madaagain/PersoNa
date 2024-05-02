import { PUBLIC_API_URL } from '$env/static/public';

export async function sendForm(endpoint: string, request: Request) {
    const formData = await request.formData();
    const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
    const response = await fetch(`${PUBLIC_API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonData
    });
    if (response.status === 404) {
        throw new Error(`Endpoint "${endpoint}" not found.`);
    }
    return response;
}
