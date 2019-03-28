<template>
<a-layout class="base">
    <a-layout-header class="app-header">
        <img :src="logo" class="app-header__logo" alt="Pegadaian" @click="toJobList" />
        <a-button class="app-header__button" @click="toCompanyWebsite(companyUrl)">Company Website</a-button>
    </a-layout-header>
    <a-layout-content class="app-body">
        <router-view />
    </a-layout-content>
    <a-layout-footer class="app-footer">
        Powered by Optimus &copy; 2019
    </a-layout-footer>
</a-layout>
</template>
<script>
export default {
    data() {
        return {
            logo: require('../../assets/pegadaian-logo.png'),
            companyUrl: 'https://pegadaian.co.id'
        }
    },
    methods: {
        toCompanyWebsite(url) {
            window.open(url, '_blank')
        },
        toJobList() {
            this.$router.push('/jobs')
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
