import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors()); // CORS ni yoqamiz

const users = []; // 🔥 Foydalanuvchilar ro‘yxatini yaratish (bo‘sh array)

// Ro‘yxatdagi barcha foydalanuvchilarni GET orqali olish
app.get('/users', (req, res) => {
    res.status(200).json(users); // 🔥 Endi xatolik chiqmaydi!
});

// Ro‘yxatdan o‘tish va foydalanuvchilar ro‘yxatiga qo‘shish
app.post('/register', (req, res) => {
    const { name, surname, phone1, phone2, team } = req.body;

    if (!name || !surname || !phone1 || !team) {
        return res.status(400).json({ message: 'Barcha majburiy maydonlarni to‘ldiring!' });
    }

    const newUser = { name, surname, phone1, phone2, team };
    users.push(newUser); // 🔥 Foydalanuvchilar ro‘yxatiga qo‘shamiz

    res.status(201).json({ message: 'Ro‘yxatdan o‘tish muvaffaqiyatli!' });
});

// Serverni ishga tushirish
app.listen(port, () => {
    console.log(`Server ishga tushdi: http://localhost:${port}`);
});

app.delete('/users/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);

    if (index < 0 || index >= users.length) {
        return res.status(400).json({ message: 'Noto‘g‘ri index!' });
    }

    users.splice(index, 1); // 🔥 Ro‘yxatdan foydalanuvchini o‘chirish

    res.status(200).json({ message: 'Foydalanuvchi o‘chirildi!' });
});