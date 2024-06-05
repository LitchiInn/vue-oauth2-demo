<!-- src/views/Login.vue -->
<template>
    <div>
      <n-space>
        <n-button @click="login" strong secondary round type="success">Login with OAuth</n-button>
        <n-button @click="logout" strong secondary round type="success">Logout with OAuth</n-button>
      </n-space>
    </div>
  </template>
  
  <script>
  import { generateCodeVerifier, generateCodeChallenge } from '@/utils/pkce';
  import api from '@/utils/api';
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  import { NButton, NSpace } from 'naive-ui'

  export default {
    components: {
      NButton, NSpace
    },
    name: "TokenComponent",
    data() {
        return {
            token: null
        };
    },
    methods: {
      async login() {
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = await generateCodeChallenge(codeVerifier);
        const clientId = 'your-client-id';
        const redirectUri = encodeURIComponent('http://localhost:5173/callback');
        const scope = encodeURIComponent('all');
        const responseType = 'code';
        const state = 'your-unique-state';
  
        localStorage.setItem('code_verifier', codeVerifier);
  
        const authUrl = `http://yourdomain/sign/authz/oauth/v20/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;


        const left = (screen.width/2 - 400)
        const top = (screen.height/2 - 350)

        window.open(authUrl, 'oauth window','location=no,menubar=yes, directories=yes, location=no, titlebar=yes, toolbar=yes, resizable=yes, width=800, height=700, top='+top+', left='+left)

        window.addEventListener('message', this.handleAuthMessage, false);
      },

      handleAuthMessage(event) {
      if (event.origin !== 'http://localhost:5173') {
        return;
      }
      
      const { access_token } = event.data;
      this.token = access_token;

      if (access_token) {
        // 获取授权码
        console.log('access_token:', access_token);
        toast("登录成功，token为" + access_token, {
        autoClose: 3000,
      });
        // 接下来，你可以用这个授权码去请求access_token
      }
      // 移除事件监听器
      window.removeEventListener('message', this.handleAuthMessage, false);
    },
    async logout() {
      if (this.token) {

        await api.get('/sign/authz/oauth/v20/logout',{
        headers: {
            'Authorization': 'Bearer ' + this.token
        }
      }).then(
        toast("登出成功", {
        autoClose: 3000,
      })
      ).catch(error => {
        console.log(error)
      })
      
      
      let redirect_uri = encodeURIComponent('http://localhost:5173')
      let logout = `http://sso.litchinn.com/sign/force/logout?redirect_uri=${redirect_uri}`
      }
    }
    }
  };
  </script>