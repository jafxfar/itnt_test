// vite.config.ts
import vue from "file:///C:/Users/Jafar/Downloads/itnt-frontend-main/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/Jafar/Downloads/itnt-frontend-main/node_modules/vite/dist/node/index.js";
import path from "node:path";
import { VitePWA } from "file:///C:/Users/Jafar/Downloads/itnt-frontend-main/node_modules/vite-plugin-pwa/dist/index.js";
import vuetify from "file:///C:/Users/Jafar/Downloads/itnt-frontend-main/node_modules/vite-plugin-vuetify/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\Jafar\\Downloads\\itnt-frontend-main";
var __vite_injected_original_import_meta_url = "file:///C:/Users/Jafar/Downloads/itnt-frontend-main/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [vue(), vuetify(), VitePWA()],
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    strictPort: true,
    port: 8080
  },
  // TODO: поменять пути динамических иконок
  build: {
    minify: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
                    @import "~/assets/style/mixins.scss";
                    @import "~/assets/style/vars.scss";
                    @import "~/assets/style/typography.scss";`
      }
    }
  },
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxKYWZhclxcXFxEb3dubG9hZHNcXFxcaXRudC1mcm9udGVuZC1tYWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxKYWZhclxcXFxEb3dubG9hZHNcXFxcaXRudC1mcm9udGVuZC1tYWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9KYWZhci9Eb3dubG9hZHMvaXRudC1mcm9udGVuZC1tYWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJ1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnXHJcbmltcG9ydCB2dWV0aWZ5IGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZXRpZnknXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW3Z1ZSgpLCB2dWV0aWZ5KCksIFZpdGVQV0EoKV0sXHJcbiAgICBzZXJ2ZXI6e1xyXG4gICAgICAgIHdhdGNoOntcclxuICAgICAgICAgICAgdXNlUG9sbGluZzp0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaG9zdDp0cnVlLFxyXG4gICAgICAgIHN0cmljdFBvcnQ6dHJ1ZSxcclxuICAgICAgICBwb3J0OjgwODBcclxuICAgIH0sXHJcbiAgICAvLyBUT0RPOiBcdTA0M0ZcdTA0M0VcdTA0M0NcdTA0MzVcdTA0M0RcdTA0NEZcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDQzXHUwNDQyXHUwNDM4IFx1MDQzNFx1MDQzOFx1MDQzRFx1MDQzMFx1MDQzQ1x1MDQzOFx1MDQ0N1x1MDQzNVx1MDQ0MVx1MDQzQVx1MDQzOFx1MDQ0NSBcdTA0MzhcdTA0M0FcdTA0M0VcdTA0M0RcdTA0M0VcdTA0M0FcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgbWluaWZ5OiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBjc3M6IHtcclxuICAgICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIHNjc3M6IHtcclxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgXHJcbiAgICAgICAgICAgICAgICAgICAgQGltcG9ydCBcIn4vYXNzZXRzL3N0eWxlL21peGlucy5zY3NzXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgQGltcG9ydCBcIn4vYXNzZXRzL3N0eWxlL3ZhcnMuc2Nzc1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIEBpbXBvcnQgXCJ+L2Fzc2V0cy9zdHlsZS90eXBvZ3JhcGh5LnNjc3NcIjtgLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAgICd+JzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZULE9BQU8sU0FBUztBQUM3VSxTQUFTLGVBQWUsV0FBVztBQUNuQyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFVBQVU7QUFDakIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sYUFBYTtBQUxwQixJQUFNLG1DQUFtQztBQUE4SixJQUFNLDJDQUEyQztBQU94UCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTLENBQUMsSUFBSSxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUM7QUFBQSxFQUNyQyxRQUFPO0FBQUEsSUFDSCxPQUFNO0FBQUEsTUFDRixZQUFXO0FBQUEsSUFDZjtBQUFBLElBQ0EsTUFBSztBQUFBLElBQ0wsWUFBVztBQUFBLElBQ1gsTUFBSztBQUFBLEVBQ1Q7QUFBQTtBQUFBLEVBRUEsT0FBTztBQUFBLElBQ0gsUUFBUTtBQUFBLEVBQ1o7QUFBQSxFQUVBLEtBQUs7QUFBQSxJQUNELHFCQUFxQjtBQUFBLE1BQ2pCLE1BQU07QUFBQSxRQUNGLGdCQUFnQjtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSXBCO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsTUFDcEQsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3hDO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
