import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/Nikhil9182/Wordle-Game",
  plugins: [tailwindcss(), react()],
});
