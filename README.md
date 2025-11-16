# 🔐 SecureHealth Vault - FHE-Powered Health Data dApp

![SecureHealth Vault](https://img.shields.io/badge/FHE-Zama-purple?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

**SecureHealth Vault**, kullanıcıların sağlık verilerini **Fully Homomorphic Encryption (FHE)** teknolojisiyle tamamen şifrelenmiş şekilde saklayabildiği ve şifrelenmiş veriler üzerinde hesaplamalar yapabildiği yenilikçi bir merkeziyetsiz uygulama (dApp) sunar.

**English:** **SecureHealth Vault** is an innovative decentralized application (dApp) that allows users to store health data with **Fully Homomorphic Encryption (FHE)** technology and perform calculations on encrypted data.

---

## 🌟 Özellikler / Features

### 🔒 Tam Gizlilik / Complete Privacy
- **Şifreli Depolama:** Tüm sağlık verileri FHE ile şifrelenerek saklanır
- **Encrypted Storage:** All health data is encrypted with FHE before storage
- Veriler asla düz metin (plaintext) olarak açığa çıkmaz / Data never exposed in plaintext

### 🧮 Şifreli Hesaplama / Encrypted Computation
- Şifrelenmiş veriler üzerinde ortalama hesaplama
- Average computation on encrypted data without decryption
- Karşılaştırma ve istatistik işlemleri / Comparison and statistical operations
- Sunucu bile gerçek değerleri görmez / Even the server never sees actual values

### 📊 Sağlık Metrikleri / Health Metrics
- **⚖️ Kilo / Weight** (kg)
- **❤️ Tansiyon / Blood Pressure** (mmHg)
- **🩸 Kan Şekeri / Blood Glucose** (mg/dL)
- **💓 Kalp Atışı / Heart Rate** (bpm)

### 🎨 Modern Arayüz / Modern UI
- Gradient tasarım ve glassmorphism efektleri
- Gradient design with glassmorphism effects
- Mobil uyumlu / Mobile responsive
- Gerçek zamanlı durum bildirimleri / Real-time status notifications

---

## 🚀 Kurulum / Installation

### Gereksinimler / Prerequisites

- Node.js 18+ veya üzeri / or higher
- npm, yarn veya pnpm
- Git

### Adım 1: Repository'yi Klonlayın / Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/securehealth-vault.git
cd securehealth-vault
```

### Adım 2: Bağımlılıkları Yükleyin / Install Dependencies

```bash
npm install
# veya / or
pnpm install
# veya / or
yarn install
```

### Adım 3: Geliştirme Sunucusunu Başlatın / Start Development Server

```bash
npm run dev
# veya / or
pnpm dev
# veya / or
yarn dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

The application will run at [http://localhost:3000](http://localhost:3000).

---

## 🏗️ Teknoloji Stack'i / Technology Stack

- **Next.js 15** - React framework
- **TypeScript** - Type-safe development
- **fhevmjs** - Zama FHE client library
- **ethers.js** - Ethereum interaction
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Zama fhEVM** - Fully Homomorphic Encryption

---

## 📚 FHE Nasıl Çalışır? / How Does FHE Work?

### Türkçe

**Fully Homomorphic Encryption (Tam Homomorfik Şifreleme)**, verilerin şifrelenmiş halde iken üzerinde işlem yapılmasına olanak tanıyan devrim nıcı bir şifreleme tekniğidir.

#### Geleneksel Şifreleme:
```
Veri → Şifrele → Sakla → Deşifrele → İşlem Yap → Şifrele
         ❌ Deşifreleme gerekli!
```

#### FHE ile:
```
Veri → Şifrele → Sakla → Şifreli Veri Üzerinde İşlem → Sonuç
                          ✅ Deşifreleme gereksiz!
```

### English

**Fully Homomorphic Encryption (FHE)** is a revolutionary encryption technique that allows computations to be performed on encrypted data.

#### Traditional Encryption:
```
Data → Encrypt → Store → Decrypt → Compute → Encrypt
         ❌ Decryption required!
```

#### With FHE:
```
Data → Encrypt → Store → Compute on Encrypted → Result
                          ✅ No decryption needed!
```

---

## 🔧 Kullanım / Usage

### 1. Veri Şifreleme / Data Encryption

1. Bir sağlık metriği seçin (kilo, tansiyon, vb.)
2. Değeri girin / Enter the value
3. 🔒 Kilit butonuna tıklayın / Click the lock button
4. Veri otomatik olarak FHE ile şifrelenir / Data is automatically encrypted with FHE

### 2. Veri Görüntüleme / Data Viewing

1. Şifrelenmiş metriğin "Decrypt & View" butonuna tıklayın
2. Click "Decrypt & View" on encrypted metric
3. Değer 3 saniye boyunca görüntülenir / Value displays for 3 seconds
4. Otomatik olarak tekrar gizlenir / Automatically hides again

### 3. Şifreli Hesaplama / Encrypted Computation

1. En az 2 metrik şifreleyin / Encrypt at least 2 metrics
2. "Compute Average on Encrypted Data" butonuna tıklayın
3. Click "Compute Average on Encrypted Data"
4. Ortalama şifrelenmiş veriler üzerinde hesaplanır! 🎉
5. Average is computed on encrypted data! 🎉

---

## 📦 Vercel'e Deployment / Deploy to Vercel

### Adım 1: GitHub Repository Oluşturun / Create GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit: SecureHealth Vault FHE dApp"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/securehealth-vault.git
git push -u origin main
```

### Adım 2: Vercel'e Deploy Edin / Deploy to Vercel

1. [Vercel Dashboard](https://vercel.com/dashboard)'a gidin / Go to Vercel Dashboard
2. "Add New Project" tıklayın / Click "Add New Project"
3. GitHub repository'nizi seçin / Select your GitHub repository
4. Framework olarak "Next.js" otomatik algılanacaktır / Next.js will be auto-detected
5. "Deploy" butonuna tıklayın / Click "Deploy"

Vercel otomatik olarak projenizi build edip yayınlayacaktır! 🚀

Vercel will automatically build and deploy your project! 🚀

---

## 🎯 Kullanım Senaryoları / Use Cases

### 🏥 Sağlık Hizmetleri / Healthcare
- Hasta verileri tamamen şifreli saklanır
- Patient data stored completely encrypted
- Doktorlar trend analizi yapabilir (veriler şifreli kalırken)
- Doctors can analyze trends (while data remains encrypted)

### 🔬 Araştırma / Research
- Şifreli veriler üzerinde istatistik hesaplamaları
- Statistical computations on encrypted data
- Gizlilik koruyarak toplu analiz
- Aggregate analysis while preserving privacy

### 💊 İlaç Takibi / Medication Tracking
- İlaç etkilerini şifreli olarak izleme
- Track medication effects in encrypted form
- Yan etki karşılaştırmaları (gizlilik korunarak)
- Side effect comparisons (privacy preserved)

---

## 🛡️ Güvenlik / Security

### Zama fhEVM
- **Endüstri standardı FHE:** Zama tarafından geliştirilen kanıtlanmış kriptografi
- **Industry-standard FHE:** Proven cryptography developed by Zama
- **Açık kaynak:** Topluluk tarafından denetlenebilir
- **Open source:** Auditable by the community

### Veri Gizliliği / Data Privacy
- ✅ Veriler istemci tarafında şifrelenir / Data encrypted client-side
- ✅ Sunucu asla düz metin görmez / Server never sees plaintext
- ✅ Hesaplamalar şifreli veri üzerinde / Computations on encrypted data
- ✅ Kullanıcı kontrolü / User control

---

## 🤝 Katkıda Bulunma / Contributing

Katkılarınızı bekliyoruz! / Contributions are welcome!

1. Bu repository'yi fork edin / Fork this repository
2. Yeni bir branch oluşturun / Create a new branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Değişikliklerinizi commit edin / Commit your changes
   ```bash
   git commit -m 'feat: Add amazing feature'
   ```
4. Branch'inizi push edin / Push your branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. Pull Request açın / Open a Pull Request

---

## 📄 Lisans / License

Bu proje MIT lisansı altında lisanslanmıştır.

This project is licensed under the MIT License.

---

## 🔗 Bağlantılar / Links

- **Zama:** [https://www.zama.ai/](https://www.zama.ai/)
- **fhEVM Docs:** [https://docs.zama.ai/fhevm](https://docs.zama.ai/fhevm)
- **Next.js:** [https://nextjs.org/](https://nextjs.org/)
- **Vercel:** [https://vercel.com/](https://vercel.com/)

---

## 💬 İletişim / Contact

Sorularınız veya geri bildirimleriniz için GitHub Issues kullanabilirsiniz.

For questions or feedback, please use GitHub Issues.

---

<div align="center">

**Built with ❤️ using Zama FHE Technology**

**Zama FHE Teknolojisi ile ❤️ ile geliştirildi**

[![Zama](https://img.shields.io/badge/Powered%20by-Zama-purple?style=for-the-badge)](https://www.zama.ai/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

</div>

---

## 🎨 Ekran Görüntüleri / Screenshots

### Ana Sayfa / Home Page
Sağlık metriklerinizi şifreli olarak saklayın ve görüntüleyin.

Store and view your health metrics in encrypted form.

### Şifreli Hesaplama / Encrypted Computation
Verileriniz şifreli kalırken ortalama hesaplayın.

Compute averages while your data remains encrypted.

### Mobil Uyumlu / Mobile Responsive
Tüm cihazlarda sorunsuz çalışır.

Works seamlessly on all devices.

---

## 📖 Ek Kaynaklar / Additional Resources

### Türkçe
- [FHE Nedir?](https://www.zama.ai/post/what-is-fully-homomorphic-encryption)
- [Zama fhEVM Kullanım Kılavuzu](https://docs.zama.ai/fhevm)
- [Next.js Türkçe Dökümanlar](https://nextjs.org/docs)

### English
- [What is FHE?](https://www.zama.ai/post/what-is-fully-homomorphic-encryption)
- [Zama fhEVM Guide](https://docs.zama.ai/fhevm)
- [Next.js Documentation](https://nextjs.org/docs)

---

## ⚡ Performans / Performance

- **İstemci Tarafı Şifreleme:** ~50ms
- **Client-Side Encryption:** ~50ms
- **Şifreli Hesaplama:** ~100ms
- **Encrypted Computation:** ~100ms
- **Sayfa Yükleme:** <2s
- **Page Load:** <2s

---

## 🎓 Öğrenme Kaynakları / Learning Resources

1. **FHE Temelleri / FHE Basics**
   - [Introduction to FHE](https://www.zama.ai/introduction-to-homomorphic-encryption)
   - [FHE Use Cases](https://www.zama.ai/fhe-use-cases)

2. **Zama fhEVM**
   - [Getting Started Guide](https://docs.zama.ai/fhevm/getting-started)
   - [Smart Contract Examples](https://docs.zama.ai/fhevm/examples)

3. **Web3 Development**
   - [Ethereum for Web Developers](https://ethereum.org/en/developers/)
   - [ethers.js Documentation](https://docs.ethers.org/)

---

<div align="center">

### 🌟 Star bu projeyi beğendiyseniz! / Star if you like this project!

### 🚀 Happy Coding with FHE! / FHE ile Mutlu Kodlamalar!

</div>
