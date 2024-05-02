<script lang="ts">
    import HomeSvg from "$lib/chat/menu/svg/Home.svelte";
    import FilesSvg from "$lib/chat/menu/svg/Files.svelte";
    import LogoutSvg from "$lib/chat/menu/svg/Logout.svelte";
    import type { ComponentType } from "svelte";

    interface ButtonInfo {
        link: string;
        svg: ComponentType;
    }

    type ButtonName = "Home" | "Files" | "Logout";

    export let name: ButtonName;

    const buttonList: Record<ButtonName, ButtonInfo> = {
        Home: {link: "/", svg: HomeSvg},
        Files: {link: "https://drive.google.com/drive/folders/18UZLfCvBUrHzH8wWzSHMRUKQHG46-yPN", svg: FilesSvg},
        Logout: {link: "/auth/login", svg: LogoutSvg}
    };

    let currentButton: ButtonInfo = buttonList[name];


</script>

<a href="{currentButton.link}"><button class="flex items-center w-full px-4 py-2 text-sisley-dark bg-gray-100 hover:bg-gray-200 rounded-lg dark:bg-gray-800 dark:text-gray-200">
    <svelte:component this="{currentButton.svg}" />
    <span class="mx-4 font-bold">{name}</span>
</button></a>