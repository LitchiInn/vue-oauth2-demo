# vue-oauth2-demo

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## 参数修改

1. 修改 `/src/utils/api.js` 中 baseURL
2. 修改 `/src/view/Login.vue` 中 clientId 和 authUrl
3. 修改 `/src/view/Callback.vue`中 clientId 和 clientSecret