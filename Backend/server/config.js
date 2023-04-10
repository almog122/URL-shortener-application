const CONFIG = {
    MONGO_DB_URL : 'mongodb://127.0.0.1:27017/',
    COLLECTION_NAME : 'ShortUrls-application',
    PORT : 4000,
    SHORT_URL_BASE: 'http://localhost:4000',
    DOMAIN_LOGO_API_URL: 'http://visiting-rose-nightingale.faviconkit.com',
    DOMAIN_LOGO_API_SIZE: 256,
    QR_CODE_URL : 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=',
    SERVER_ERROR_DB_CONNECTION: "Failed to connect to DB"
}

module.exports = CONFIG