<template>
    <div class="container-fluid container--footer">
        <div class="container">
            <div class="row">
                <div class="col-6 col-md-3">
                    <img :src="sniLogo" class="footer__brand" />
                    <address class="my-4">
                        <h6>PT. Solusi Net Internusa</h6>
                        <span class="text-muted">
                            Sahid Sudirman Center 55D<br>
                            Jl. Jendral Sudirman Kav. 86<br>
                            Karet Tengsin
                        </span>
                    </address>
                </div>
            </div>
            <div class="row">
                <div class="col-12 text-center">
                    <span class="text-muted"><small>Copyright &copy; 2019 PT. Solusi Net Internusa</small></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            digisignLogo: require('../../assets/digisign-light.png'),
            sniLogo: require('../../assets/sni-light.png')
        }
    }
}
</script>
<style lang="scss" scoped>
.container--footer {
    padding-top: 24px;
    padding-bottom: 24px;
    background-color: #FAFAFA;
    .footer__brand {
        height: 40px;
        width: auto;
    }
}
</style>

