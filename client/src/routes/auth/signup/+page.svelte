<script lang="ts">
    import AuthForm, { type Input, type Alternative } from '$lib/auth/AuthForm.svelte';
    import type { ActionData } from './$types';

    export let form: ActionData;

    let inputs: Input[] = [
        { name: "email", label: "Email"},
        { name: "firstname", label: "Firstname" },
        { name: "lastname", label: "Lastname"},
        { name: "job", label: "Job" },
        { name: "password", label: 'Password', isSecret: true},
        { name: "password", label: 'Confirm password', isSecret: true}
    ];
    let alternative: Alternative = {
        text: "Login",
        url: "/auth/login"
    }
</script>

<AuthForm title="Sign Up" {inputs} alternative={alternative} form={form}/>