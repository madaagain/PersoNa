import { fail, redirect } from '@sveltejs/kit';
import { sendForm } from '$lib/server/sendForm';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
        const endpoint = "login";
        try {
            var response = await sendForm(endpoint, request);
            var responseData = await response.json();
        } catch (e) {
            console.error(e);
            return fail(500, {errors: {error: "server", message: "Internal Server Error"}});
        }
        if (response.ok){
            cookies.set("session", responseData.token, {
                path: '/',
                httpOnly: false,
                maxAge: 60 * 60 * 24 * 30
            });
            redirect(301, '/chat');
        } else {
            if (responseData && responseData.errors) {
                const errors = responseData.errors;
                return fail(422, { errors });
            } else {
                throw new Error(`Response errors not found for ${endpoint}.`);
            }
        }
    }
};