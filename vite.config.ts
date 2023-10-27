import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                assetFileNames: 'squire-editor.min.css',
                entryFileNames: 'squire-editor.min.js'
            }
        }
    }
})