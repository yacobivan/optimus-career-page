<template>
<div class="container-fluid content-body-bg">
    <div class="container content-body">
        <slot />
    </div>
</div>
</template>
<script>
export default {
    props: {
        heading: String
    }
}
</script>
<style lang="scss" scoped>
.content-heading-bg {
    background-color: white;
}
.content-body {
    padding-top: 48px;
    padding-bottom: 48px;
}
</style>


