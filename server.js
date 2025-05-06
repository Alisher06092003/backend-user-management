import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { User } from './models/user.js'; // 🔥 To‘g‘ri yo‘l!

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// 🔥 MongoDB ulash
mongoose.connect('mongodb://127.0.0.1:27017/sms_panel', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('✅ MongoDB ulanish muvaffaqiyatli!'))
.catch(err => console.error('❌ MongoDB ulanishda xatolik:', err));

// Ro‘yxatdan o‘tish va foydalanuvchilar ro‘yxatiga qo‘shish
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save(); // 🔥 MongoDB ga saqlaymiz
        res.status(201).json({ message: '✅ Foydalanuvchi muvaffaqiyatli qo‘shildi!' });
    } catch (error) {
        res.status(500).json({ error: '❌ Xatolik yuz berdi!' });
    }
});

// Ro‘yxatdagi barcha foydalanuvchilarni GET orqali olish
app.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // 🔥 Bazadan foydalanuvchilarni olish
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: '❌ Xatolik yuz berdi!' });
    }
});

// Foydalanuvchini o‘chirish
app.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        console.log("🧐 O‘chirish uchun ID:", userId); // 🔥 Konsolga chiqaramiz!

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: '❌ Foydalanuvchi topilmadi!' });
        }
        res.status(200).json({ message: '🗑️ Foydalanuvchi Chindanxam o‘chirmoqchi misiz?' });
    } catch (error) {
        console.error("🔥 Xatolik:", error); // 🔥 Konsolga xatolikni chiqaramiz!
        res.status(500).json({ error: '❌ Serverda xatolik yuz berdi!' });
    }
});

// Serverni ishga tushirish
app.listen(port, () => {
    console.log(`✅ Server ishga tushdi: http://localhost:${port}`);
});