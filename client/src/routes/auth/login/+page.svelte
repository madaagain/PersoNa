<script lang="ts">
    import AuthForm, { type Input, type Alternative } from '$lib/auth/AuthForm.svelte';
    import type { ActionData } from './$types';

    export let form: ActionData;

    let inputs: Input[] = [
        { name: "email", label: 'Email'},
        { name: "password", label: 'Password', isSecret: true }
    ];
    let alternative: Alternative = {
        text: "Create account",
        url: "/auth/signup"
    }
</script>

<AuthForm title="Login" {inputs} loginOption alternative={alternative} form={form} />
