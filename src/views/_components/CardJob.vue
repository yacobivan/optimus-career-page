<template>
<div>
    <a-card class="job">
        <div class="job__description">
            <h3>{{title}}</h3>
            <span>{{department}}</span>
            <span>{{placementCity}}, {{placementCountry}}</span>
        </div>
        <div class="job__button">
            <a-button type="primary" @click="apply">Apply</a-button>
        </div>
    </a-card>
</div>
</template>

<script>
export default {
    props: {
        title: String,
        department: String,
        placementCity: String,
        placementCountry: String
    },
    methods: {
        apply() {
            this.$emit('clickApply')
        }
    }
}
</script>

<style lang="scss" scoped>
.job {
    .job__button {
        margin-top: 24px;
        float: right;
    }
}
</style>


