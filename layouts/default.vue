<template>
    <div class="layout-default">
        <div class="layout-main">
            <nuxt />
        </div>
        <div class="layout-menu-bar">
            <menu-bar></menu-bar>
        </div>
    </div>
</template>

<script>
import MenuBar from "@/components/public/menuBar/index";
export default {
    components: {
        MenuBar
    }
};
</script>

