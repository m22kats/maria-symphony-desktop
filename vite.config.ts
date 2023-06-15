import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
// import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 4200
  }
});

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: [
//       { find: "@", replacement: path.resolve(__dirname, "src") },
//       {
//         find: "@features",
//         replacement: path.resolve(__dirname, "src/features"),
//       },
//     ],
//   },
// });