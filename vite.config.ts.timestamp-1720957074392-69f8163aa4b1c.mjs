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
    minify: true,
    rollupOptions: {
      external: ["vuedraggable"]
    }
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxKYWZhclxcXFxEb3dubG9hZHNcXFxcaXRudC1mcm9udGVuZC1tYWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxKYWZhclxcXFxEb3dubG9hZHNcXFxcaXRudC1mcm9udGVuZC1tYWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9KYWZhci9Eb3dubG9hZHMvaXRudC1mcm9udGVuZC1tYWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJ1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnXHJcbmltcG9ydCB2dWV0aWZ5IGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZXRpZnknXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW3Z1ZSgpLCB2dWV0aWZ5KCksIFZpdGVQV0EoKV0sXHJcbiAgICBzZXJ2ZXI6e1xyXG4gICAgICAgIHdhdGNoOntcclxuICAgICAgICAgICAgdXNlUG9sbGluZzp0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaG9zdDp0cnVlLFxyXG4gICAgICAgIHN0cmljdFBvcnQ6dHJ1ZSxcclxuICAgICAgICBwb3J0OjgwODBcclxuICAgIH0sXHJcbiAgICAvLyBUT0RPOiBcdTA0M0ZcdTA0M0VcdTA0M0NcdTA0MzVcdTA0M0RcdTA0NEZcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDQzXHUwNDQyXHUwNDM4IFx1MDQzNFx1MDQzOFx1MDQzRFx1MDQzMFx1MDQzQ1x1MDQzOFx1MDQ0N1x1MDQzNVx1MDQ0MVx1MDQzQVx1MDQzOFx1MDQ0NSBcdTA0MzhcdTA0M0FcdTA0M0VcdTA0M0RcdTA0M0VcdTA0M0FcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgbWluaWZ5OiB0cnVlLFxyXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgZXh0ZXJuYWw6IFsndnVlZHJhZ2dhYmxlJ11cclxuICAgICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY3NzOiB7XHJcbiAgICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgICAgICBzY3NzOiB7XHJcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYFxyXG4gICAgICAgICAgICAgICAgICAgIEBpbXBvcnQgXCJ+L2Fzc2V0cy9zdHlsZS9taXhpbnMuc2Nzc1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIEBpbXBvcnQgXCJ+L2Fzc2V0cy9zdHlsZS92YXJzLnNjc3NcIjtcclxuICAgICAgICAgICAgICAgICAgICBAaW1wb3J0IFwifi9hc3NldHMvc3R5bGUvdHlwb2dyYXBoeS5zY3NzXCI7YCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgICBhbGlhczoge1xyXG4gICAgICAgICAgICAnfic6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2VCxPQUFPLFNBQVM7QUFDN1UsU0FBUyxlQUFlLFdBQVc7QUFDbkMsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsZUFBZTtBQUN4QixPQUFPLGFBQWE7QUFMcEIsSUFBTSxtQ0FBbUM7QUFBOEosSUFBTSwyQ0FBMkM7QUFPeFAsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUyxDQUFDLElBQUksR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQUEsRUFDckMsUUFBTztBQUFBLElBQ0gsT0FBTTtBQUFBLE1BQ0YsWUFBVztBQUFBLElBQ2Y7QUFBQSxJQUNBLE1BQUs7QUFBQSxJQUNMLFlBQVc7QUFBQSxJQUNYLE1BQUs7QUFBQSxFQUNUO0FBQUE7QUFBQSxFQUVBLE9BQU87QUFBQSxJQUNILFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNYLFVBQVUsQ0FBQyxjQUFjO0FBQUEsSUFDM0I7QUFBQSxFQUNOO0FBQUEsRUFFQSxLQUFLO0FBQUEsSUFDRCxxQkFBcUI7QUFBQSxNQUNqQixNQUFNO0FBQUEsUUFDRixnQkFBZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUlwQjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLE1BQ3BELEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN4QztBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
