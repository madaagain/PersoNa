<script context="module" lang="ts">
    export type User = "Pam" | "Me";
</script>

<script lang="ts">
    import { onMount } from "svelte";

    export let text: string;
    export let user: User;

    const userList: Record<User, string> = {
        Pam: "/Pam.jpg",
        Me: "/DefaultUser.jpg"
    }
</script>

<div class="w-full h-fit">
    <div class="flex items-center gap-4">
        <img src="{userList[user]}" alt="{user}" class="w-10 aspect-square rounded-full"/>
        <h2 class="font-extrabold text-2xl">{user}</h2>
    </div>
    <p class="mx-14 text-lg" >{text}</p>
</div>
