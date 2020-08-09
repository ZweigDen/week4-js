var path='https://course-ec-api.hexschool.io/api';
new Vue({
    el: '#app',
    data:{
        user:{
            email:'',
            password:''
        },
        token:''
    },
    methods: {
        signin() {
            const api = `${path}/auth/login`;
            axios.post(api, this.user)
                .then((res) => {
                    console.log(res);
                    const token = res.data.token;
                    const expired = res.data.expired;

                    document.cookie = `token=${token}; expires=${new Date(expired * 1000)}; path=/`;
                    window.location = '/product.html';

                }).catch((error) => {
                    console.log(error);
                });
        },
        forgetPassword() {
            $('#forgetCard').modal('show');
        }
    }
})