import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['tests/**/*.test.js'],
        coverage: {
            include: [
                'src/lib/request-validation.js',
                'src/lib/path-containment-policy.js',
                'src/lib/production-route-policy.js'
            ],
            provider: 'v8',
            reporter: ['text'],
            thresholds: {
                branches: 80,
                functions: 80,
                lines: 80,
                statements: 80
            }
        }
    }
});
