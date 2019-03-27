<template>
<div class="container-fluid content-heading-bg">
    <div class="container content-heading d-flex flex-column justify-content-end py-4">
        <h3 class="content-heading__heading">{{heading}}</h3>
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
    background-color: #424242;
}
.content-heading {
    min-height: 160px;
    .content-heading__heading {
        color: white;
    }
}
</style>


