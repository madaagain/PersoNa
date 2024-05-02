<script lang="ts">
    import TextBox, { type User } from "$lib/chat/TextBox.svelte";
    import ButtonMenu from "$lib/chat/menu/ButtonMenu.svelte";
    import { onMount, afterUpdate } from 'svelte';
    import { PUBLIC_API_URL } from '$env/static/public';
    import { goto } from "$app/navigation";

    interface Message {
        text: string;
        user: User;
    }

    let messages: Message[] = [{text: "Bonjour! Je suis Pam, l'assistant de Sisley. Mon rôle est de simplifier votre vie professionnelle en répondant à toutes vos questions liées aux ressources humaines, à la finance et à la DSI. N'hésitez pas à me solliciter pour obtenir des informations ou une assistance, je suis là pour vous rendre le quotidien plus facile et plus fluide. À votre service !", user: "Pam"}];
    let prompt: string = "";
    let chatbox: HTMLDivElement;

    let token = "";

    function getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts: any = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    onMount(() => {
        token = getCookie("session");
        if (!token){
            goto("/auth/login");
        }
    });

    async function sendPrompt(prompt: string){
        try {
            const response = await fetch(`${PUBLIC_API_URL}/prompt`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({
                    "query": `${prompt}`
                })
            });

            if (response.body){
                console.log("test");
                const reader = response.body.getReader();
                let result;
    
                while (!(result = await reader.read()).done) {
                    const chunk = new TextDecoder("utf-8").decode(result.value);
                    messages[0].text += chunk;
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    function submitPrompt(){
        if (prompt != ""){
            messages = [{text: prompt, user: "Me"}, ...messages];
            messages = [{text: "", user: "Pam"}, ...messages];
            sendPrompt(prompt);
            prompt = "";
        }
    }

    afterUpdate(() => {
        chatbox.scrollTop = chatbox.scrollHeight;
    })
</script>

<div class="flex bg-sisley-white h-screen">
    <div class="flex flex-col items-center gap-6 w-1/5 h-screen px-4 py-8 overflow-y-auto border-r rtl:border-r-0 rtl:border-l bg-white shadow-xl">
        <p class="text-center text-sisley-purple font-bold text-2xl py-2 px-4">Pam by Sisley</p>
        <div class="flex flex-col items-center">
            <img class="object-cover w-32 aspect-square rounded-full" src="/Pam.jpg" alt="avatar">
            <div class="flex flex-col items-center mt-2 -mx-2">
                <h4 class="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">Lea Martinet</h4>
                <p class="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">Lea_martinet@example.com</p>
            </div>
        </div>
        <nav class="flex flex-col flex-1 mt-6 gap-2 w-full">
            <ButtonMenu name="Home"/>
            <ButtonMenu name="Files"/>
            <ButtonMenu name="Logout"/>
        </nav>
        <img class="w-48 pb-4 absolute bottom-0 mt-4" src="/Logo.png" alt="Sisley Logo">
    </div>
    <div class="flex flex-col items-center w-full px-72 pt-12">
        <div bind:this={chatbox} class="flex flex-col-reverse gap-4 h-5/6 w-full overflow-y-scroll">
            {#each messages as message}
                <TextBox text={message.text} user={message.user} />
            {/each}
        </div>
        <div class="flex justify-center items-center h-1/6 w-3/4">
            <form class="w-full">
                <div class="flex bg-sisley-grey bg-opacity-55 font-bold text-black rounded-2xl h-14 py-2 px-4 shadow-md">
                    <!-- svelte-ignore a11y-autofocus -->
                    <input bind:value={prompt} type="text" class="w-full h-full bg-transparent outline-none" autofocus />
                    <button on:click={submitPrompt}><img class="w-6" src="/chat/send.svg" alt="send"/></button>
                </div>
            </form>
        </div>
    </div>
</div>