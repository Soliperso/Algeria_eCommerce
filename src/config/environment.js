/**
 * Environment Configuration Utility
 * Safely access environment variables with fallbacks and validation
 */

// Application Configuration
export const APP_CONFIG = {
    name: import.meta.env.VITE_APP_NAME || 'Algeria Commerce',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment: import.meta.env.NODE_ENV || 'development',
    isDevelopment: import.meta.env.NODE_ENV === 'development',
    isProduction: import.meta.env.NODE_ENV === 'production',
};

// API Configuration
export const API_CONFIG = {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
};

// Feature Flags
export const FEATURES = {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    chatSupport: import.meta.env.VITE_ENABLE_CHAT_SUPPORT === 'true',
    pwa: import.meta.env.VITE_ENABLE_PWA === 'true',
    pushNotifications: import.meta.env.VITE_ENABLE_PUSH_NOTIFICATIONS === 'true',
};

// Business Configuration
export const BUSINESS_CONFIG = {
    name: import.meta.env.BUSINESS_NAME || 'Algeria Commerce',
    email: import.meta.env.BUSINESS_EMAIL || 'contact@algeriacommerce.dz',
    phone: import.meta.env.BUSINESS_PHONE || '+213 555 123 456',
    address: import.meta.env.BUSINESS_ADDRESS || '123 Rue Didouche Mourad, Algiers, Algeria',
};

// Currency and Localization
export const LOCALE_CONFIG = {
    defaultCurrency: import.meta.env.DEFAULT_CURRENCY || 'DZD',
    defaultLocale: import.meta.env.DEFAULT_LOCALE || 'ar-DZ',
    supportedLocales: import.meta.env.SUPPORTED_LOCALES?.split(',') || ['ar-DZ', 'en-US', 'fr-FR'],
};

// Tax and Shipping Configuration
export const COMMERCE_CONFIG = {
    taxRate: parseFloat(import.meta.env.DEFAULT_TAX_RATE) || 0.19,
    freeShippingThreshold: parseInt(import.meta.env.FREE_SHIPPING_THRESHOLD) || 50000,
};

// Google Services
export const GOOGLE_CONFIG = {
    mapsApiKey: import.meta.env.GOOGLE_MAPS_API_KEY,
    analyticsId: import.meta.env.GOOGLE_ANALYTICS_ID,
    clientId: import.meta.env.GOOGLE_CLIENT_ID,
};

// Social Media Configuration
export const SOCIAL_CONFIG = {
    facebook: {
        appId: import.meta.env.FACEBOOK_APP_ID,
    },
};

// Validation Functions
export const validateRequiredEnvVars = () => {
    const requiredVars = [];
    const missingVars = [];

    // Add required environment variables here
    const requiredInProduction = [
        'VITE_API_BASE_URL',
        'DATABASE_URL',
        'JWT_SECRET',
    ];

    if (APP_CONFIG.isProduction) {
        requiredInProduction.forEach(varName => {
            if (!import.meta.env[varName]) {
                missingVars.push(varName);
            }
        });

        if (missingVars.length > 0) {
            throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
        }
    }
};

// Initialize and validate configuration
export const initializeConfig = () => {
    try {
        validateRequiredEnvVars();
        console.log(`🚀 ${APP_CONFIG.name} v${APP_CONFIG.version} initialized in ${APP_CONFIG.environment} mode`);

        if (APP_CONFIG.isDevelopment) {
            console.log('📊 Available features:', FEATURES);
        }
    } catch (error) {
        console.error('❌ Configuration Error:', error.message);
        throw error;
    }
};

// Export all configurations
export default {
    APP_CONFIG,
    API_CONFIG,
    FEATURES,
    BUSINESS_CONFIG,
    LOCALE_CONFIG,
    COMMERCE_CONFIG,
    GOOGLE_CONFIG,
    SOCIAL_CONFIG,
    validateRequiredEnvVars,
    initializeConfig,
};
