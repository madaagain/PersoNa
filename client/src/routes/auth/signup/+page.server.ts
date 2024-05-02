import { fail } from '@sveltejs/kit';
import { sendForm } from '$lib/server/sendForm';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
        try {
            const endpoint = "register";
            const response = await sendForm(endpoint, request);
            const responseData = await response.json();
            if (response.ok){
                cookies.set("session", responseData.token, {
                    path: '/',
                    httpOnly: true,
                    sameSite: "strict",
                    maxAge: 60 * 60 * 24 * 30
                });
            } else {
                if (responseData && responseData.errors) {
                    const errors = responseData.errors;
                    return fail(422, { errors });
                } else {
                    throw new Error(`Response errors not found for ${endpoint}.`);
                }
            }
        } catch (e) {
            console.error(e);
            return fail(500, {errors: ['Internal Server Error']});
        }
    }
};