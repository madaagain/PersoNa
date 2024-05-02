<script lang="ts">
    import { onMount } from 'svelte';

    var token: string;

    function getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts: any = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    onMount(() => {
        token = getCookie("session");
    });
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
<div class="h-screen md:flex">
    <div class="relative overflow-hidden md:flex w-full bg-gradient-to-tr bg-sisley-purple justify-around items-center hidden">
        <div>
            <div class="animate__animated animate__fadeIn animate__slideInLeft">
                <h1 class="text-white font-bold text-6xl font-sans font-sylsey">Salut, je m'appelle Pam.</h1>
                <p class="text-white text-2xl font-sylsey mt-1">Je suis là pour vous conseiller!</p>
            </div>
        </div>
    </div>
    <div class="text-white font-bold font-sans absolute top-0 left-0 p-4 text-3xl font-sylsey z-10">
        <p>Pam by Sisley</p>
    </div>
    <div class="flex md:w-1/2 justify-center py-10 items-center bg-white animate__animated animate__slideInUp">
        <div class="bg-white flex flex-col items-center">
            <h1 class="text-gray-800 font-bold font-sylsey text-2xl mb-4">Commencez!</h1>
            <div class="flex flex-col items-center mb-4">
                {#if token}
                <a href="/chat"><button type="submit" class="w-32 bg-sisley-purple py-2 rounded-md text-white font-semibold font-sylsey mb-2 mr-2">Parler à Pam</button></a>
                <a href="/auth/login"><span class="text-sm mt-2 hover:text-sisley-purple font-sylsey cursor-pointer">Se déconnecter?</span></a>
                {:else}
                <div class="flex">
                    <a href="/auth/login"><button type="submit" class="w-32 bg-sisley-purple py-2 rounded-md text-white font-semibold font-sylsey mb-2 mr-2">Se connecter</button></a>
                    <a href="/auth/signup"><button type="submit" class="w-32 bg-sisley-purple py-2 rounded-md text-white font-semibold font-sylsey mb-2">S'inscrire</button></a>
                </div>
                <button class="text-sm mt-2 hover:text-sisley-purple font-sylsey cursor-pointer">Mot de passe oublié?</button>
                {/if}
            </div>
            <img class="w-48 pb-4 absolute bottom-0 mt-4" src="/Logo.png" alt="Sisley Logo">
        </div>
    </div>
</div>
