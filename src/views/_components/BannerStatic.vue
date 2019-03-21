<template>
<div class="banner-static">
    <img class="banner-static__image" :src="image" />
    <div class="banner-static__shade"></div>
    <div class="banner-static__excerpt">
        <h1 class="excerpt__greeting">{{greeting}}</h1>
        <h3 class="excerpt__tagline">{{tagline}}</h3>
    </div>
</div>
</template>

<script>
export default {
    props: {
        image: String,
        greeting: String,
        tagline: String
    }
}
</script>

<style lang="scss" scoped>
$banner-static-height: 400px;
$shade: rgba(0,0,0,.38);
.banner-static {
    position: relative;
    height: $banner-static-height;
    .banner-static__image {
        height: $banner-static-height;
        width: 100%;
        object-fit: cover;
    }
    .banner-static__shade {
        position: absolute;
        top: 0;
        left: 0;
        height: $banner-static-height;
        width: 100%;
        background-color: $shade;
    }
    .banner-static__excerpt {
        position: absolute;
        bottom: 48px;
        left: 50px;
        .excerpt__greeting {
            color: white;
            margin-bottom: 0;
            font-size: 56px;
        }
        .excerpt__tagline {
            color: rgba(255,255,255,.8);
            margin-bottom: 0;
            font-size: 24px;
            font-weight: 400;
        }
    }
}
</style>


