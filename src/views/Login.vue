<!-- src/views/Login.vue -->
<template>
    <div>
      <button @click="login">Login with OAuth</button>
    </div>
  </template>
  
  <script>
  import { generateCodeVerifier, generateCodeChallenge } from '@/utils/pkce';
  
  export default {
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

      if (access_token) {
        // 获取授权码
        console.log('access_token:', access_token);
        // 接下来，你可以用这个授权码去请求access_token
      }
      // 移除事件监听器
      window.removeEventListener('message', this.handleAuthMessage, false);
    }
    }
  };
  </script>