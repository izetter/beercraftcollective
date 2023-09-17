import path from 'path';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				about: resolve(__dirname, 'pages/about/about.html'),
				admin: resolve(__dirname, 'pages/admin/admin.html'),
				adminLogin: resolve(__dirname, 'pages/admin-login/adminLogin.html'),
				cart: resolve(__dirname, 'pages/cart/cart.html'),
				contact: resolve(__dirname, 'pages/contact/contact.html'),
				newUser: resolve(__dirname, 'pages/new-user/newUser.html'),
				userLogin: resolve(__dirname, 'pages/user-login/userLogin.html'),
			},
		},
	},
});
