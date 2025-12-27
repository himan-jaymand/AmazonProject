// server/server.js

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// // بارگذاری متغیرهای محیطی از فایل .env
// require('dotenv').config({ path: '../.env' }); 

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware (اجازه‌ی دریافت داده‌های JSON و CORS)
// app.use(express.json());
// app.use(cors());

// // =======================================================
// // ۱. اتصال به پایگاه داده
// // =======================================================
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB Atlas متصل شد ✅'))
//   .catch(err => {
//     console.error('خطا در اتصال MongoDB:', err.message);
//     process.exit(1); // در صورت شکست اتصال، برنامه را متوقف کن
//   });

// // =======================================================
// // ۲. تعریف یک Endpoint ساده (برای تست)
// // =======================================================

// // مسیر اصلی برای چک کردن سلامت سرور
// app.get('/', (req, res) => {
//     res.send('Amazon Clone API در حال کار است!');
// });

// // (در اینجا روت‌های محصولات، کاربران و سبد خرید اضافه خواهند شد)
// // مثال: app.use('/api/products', productRoutes);

// // =======================================================
// // ۳. شروع گوش دادن سرور
// // =======================================================
// app.listen(PORT, () => {
//     console.log(`سرور بر روی پورت ${PORT} شروع به کار کرد 🚀`);
// });