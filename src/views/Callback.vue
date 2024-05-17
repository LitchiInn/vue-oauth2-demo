<!-- src/views/Callback.vue -->
<template>
    <div>
      {{ token }}
    </div>
  </template>
  
  <script>
  import api from '@/utils/api';
  
  export default {
    name: "NameComponent",
    data() {
        return {
            token: 'Logging in...'
        };
    },

    async mounted() {
      const code = new URLSearchParams(window.location.search).get('code');
      const codeVerifier = localStorage.getItem('code_verifier');
      const clientId = 'your-client-id';
      const clientSecret = 'your-client-secret';
      const redirectUri = 'http://localhost:5173/callback';
      const grantType = 'authorization_code';

      const credentials = `${clientId}:${clientSecret}`;
      const base64Credentials = btoa(credentials);
      try {
        const response = await api.post('/sign/authz/oauth/v20/token', {
          grant_type: grantType,
          code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier
        },
        {
        headers: {
            'Authorization': `Basic ${base64Credentials}`
        }
      });

      let access_token = response.data.access_token;
      this.token = 'logged in ' + access_token;

      // 将信息发送回父窗口
    if (window.opener) {
      window.opener.postMessage({ access_token}, 'http://localhost:5173');
      window.close();
    }
        console.log('Login successful: ', response.data);
      } catch (error) {
        console.error('Login failed: ', error);
      }
    }
  };
  </script>