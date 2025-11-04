/**
 * Tailwind CSS configuration file
 * @type {import('tailwindcss').Config}
 */
export default {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                pretendard: ['Pretendard', 'Helvetica', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
