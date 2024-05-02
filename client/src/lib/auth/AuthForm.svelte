<script context="module" lang="ts">
    export interface Input {
        name: string;
        label: string;
        isSecret?: boolean;
    }
    export interface Alternative {
        text: string;
        url: string;
    }
</script>

<script lang="ts">
    import type { ActionData } from './$types';

    export let title: string = "title";
    export let inputs: Input[] = [];
    export let loginOption: boolean = false;
    export let alternative: Alternative;
    export let form: ActionData = null;

    let formData: Record<string, string> = {};

    
    function toggleRemember(): void {
        let checkbox = document.getElementById('remember') as HTMLInputElement;
        checkbox.checked = !checkbox.checked;
    }
    
    function deleteError(error: string) {
        form.errors = form.errors.filter((e: string) => e !== error);
    }
</script>

<form method="POST" class="flex flex-col items-center w-full">
    <h3 class="font-bold text-2xl pb-5">{title}</h3>
    {#if form && form.errors}
        <div class="mb-2 w-full">
            {#each form.errors as error}
                <div class="relative rounded-md border border-red-800 bg-red-700 bg-opacity-80 text-md text-white bg-op w-full h-10 py-5 flex items-center justify-center">
                    <p class="text-center">{error.message}</p>
                    <button class="absolute right-1" on:click={() => deleteError(error)}>
                        <svg class="fill-red-900 w-5 h-5 p-0.5 hover:bg-red-500 hover:bg-opacity-60 rounded-full" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                    </button>
                </div>
            {/each}
        </div>
    {/if}
    {#each inputs as { name, label, isSecret }}
        <label for={label} class="flex flex-col w-full text-sm pb-2">
            {label}
            {#if isSecret}
                <input class="rounded-lg h-10 dark:bg-neutral-600 border border-neutral-800 focus:outline outline-1 focus:outline-purple-700 pl-2" name={name} bind:value={formData[label]} type="password" />
            {:else}
                <input class="rounded-lg h-10 dark:bg-neutral-600 border border-neutral-800 focus:outline outline-1 focus:outline-purple-700 pl-2" name={name} bind:value={formData[label]} type="text" />
            {/if}
        </label>
    {/each}
    {#if loginOption}
        <div class="flex w-full px-2 justify-between mt-1 align-middle">
            <div class="flex gap-2 items-center justify-center">
                <input type="checkbox" id="remember" name="remeber" class="w-4 h-4 accent-sisley-purple bg-gray-100 rounded">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <label for="remember" class="text-sm font-medium text-gray-900 dark:text-gray-300" on:click={toggleRemember}>Remember me</label>
            </div>
            <div>
                <a href="/login/recovery">
                    <p class="text-sm font-medium text-gray-900 dark:text-gray-300">Forgot password ?</p>
                </a>
            </div>
        </div>
    {/if}
    <button class="mt-10 w-full h-10 font-bold text-sisley-white bg-sisley-purple rounded-lg shadow-sm" type="submit">{title}</button>
    {#if alternative}
        <a href="{alternative.url}" class="group text-sm mt-2 relative overflow-hidden">
            {alternative.text}
            <div class="bg-sisley-purple rounded-md h-1 w-0 group-hover:w-full transition-all ease-out duration-750"></div>
        </a>
    {/if}
</form>
