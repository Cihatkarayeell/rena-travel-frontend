# Webpack Frontend Starter Kit

Modern frontend geliştirme için webpack tabanlı başlangıç kiti.

## Özellikler

- Webpack 5 ile modern modül paketleme
- SASS/SCSS desteği
- Babel ile ES6+ JavaScript desteği
- Hot Module Replacement (HMR)
- Otomatik asset optimizasyonu
- CSS/JS minification
- Autoprefixer desteği
- BrowserSync ile canlı yenileme
- Production ve development modları
- Asset yönetimi (resimler, fontlar)

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build oluştur
npm run build
```

## Proje Yapısı

```
.
├── src/
│   ├── html/
│   ├── js/
│   ├── sass/
│   ├── img/
│   ├── font/
│   └── root-files/
├── webpack.config.js
└── package.json
```

## Komutlar

- `npm run dev`: Geliştirme sunucusunu başlatır (http://localhost:3000)
- `npm run build`: Production build oluşturur
- `npm run watch`: Dosya değişikliklerini izler
- `npm run clean`: Dist klasörünü temizler
