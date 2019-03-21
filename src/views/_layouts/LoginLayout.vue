<template>
<div class="login">
    <a-card class="login__card">
        <a-form layout="vertical" @submit="clickLogin" :form="form">
            <a-form-item> 
                <a-input 
                    v-model="auth.email" 
                    v-decorator="['email', { 
                        rules: [
                            {
                                required: true,
                                message: 'Email wajib diisi'
                            }
                        ]
                    }]"
                    placeholder="Email account">
                    <a-icon slot="prefix" type='user' style="color:rgba(0,0,0,.2)"/>    
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input 
                    v-model="auth.password" 
                    v-decorator="['password', { 
                        rules: [
                            {
                                required: true,
                                message: 'Password wajib diisi'
                            }
                        ]
                    }]"
                    type="password"
                    placeholder="Password">
                    <a-icon slot="prefix" type='lock' style="color:rgba(0,0,0,.2)"/>    
                </a-input>
            </a-form-item>
            <div class="form-actions">
                <a-button type="primary" htmlType="submit">Login</a-button>
            </div>
            <a-alert class="alert" :message="errorMessage" v-show="isLoginAlertVisible" banner />
        </a-form>
    </a-card>
</div>
</template>
<script>

export default {
    data() {
        return {
            form: this.$form.createForm(this),
            auth: {
                email: '',
                password: ''
            },
            isLoginAlertVisible: false,
            errorMessage: ''
        }
    },
    methods: {
        clickLogin(e) {
            // e.preventDefault();
            // this.form.validateFields((err, values) => {
            //     if (!err) {
            //         this.login();
            //     } else {
            //         this.errorMessage = 'Email and password should not be empty.'
            //         this.isLoginAlertVisible = true
            //     }
            // })
        },
        login() {
            // firebaseConfig.auth().signInWithEmailAndPassword(this.auth.email, this.auth.password)
            // .catch(error => {
            //     this.errorMessage = error.message
            //     this.isLoginAlertVisible = true
            // })
        }
    }
}
</script>
<style lang="scss" scoped>
.login {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #FAFAFA;
    .login__card {
        width: 100%;
        max-width: 480px;
        margin: 0 16px;
    }
}
.alert {
    margin-top: 1rem;
}
.form-actions {
    text-align: right;
}
</style>
