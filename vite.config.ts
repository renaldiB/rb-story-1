import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'flow-images-plugin',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && (req.url.startsWith('/Flow%20Images/') || req.url.startsWith('/Flow Images/'))) {
            const decodedUrl = decodeURIComponent(req.url.split('?')[0]);
            const filePath = path.join(process.cwd(), decodedUrl);
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              res.setHeader('Content-Type', 'image/png');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          }
          next();
        });
      },
      closeBundle() {
        const src = path.join(process.cwd(), 'Flow Images');
        const dest = path.join(process.cwd(), 'dist', 'Flow Images');
        if (fs.existsSync(src)) {
          fs.cpSync(src, dest, {
            recursive: true,
            filter: (source) => {
              const basename = path.basename(source);
              if (/[#?…—]/.test(basename)) return false;
              if (basename.endsWith('.jpg')) return false;
              return true;
            },
          });
        }
      },
    },
  ],
})
