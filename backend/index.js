const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist/envelope-app')));

const products = [
  { id: 1, name: 'Cup', image: 'assets/envelope.jpg', price: 1200, quantity: 1 },
  { id: 2, name: 'Товар 2', image: 'assets/product2.jpg', price: 950, quantity: 1 },
  { id: 3, name: 'Товар 3', image: 'assets/product3.jpg', price: 740, quantity: 1 },
  { id: 4, name: 'Товар 4', image: 'assets/product4.jpg', price: 1500, quantity: 1 },
  { id: 5, name: 'Товар 5', image: 'assets/product4.jpg', price: 500, quantity: 1 },
  { id: 6, name: 'Товар 6', image: 'assets/product4.jpg', price: 185, quantity: 1 }
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/feedback', (req, res) => {
  const feedback = req.body;
  console.log('Получен feedback:', feedback);

  const filePath = path.join(__dirname, 'feedback.json');
  let feedbacks = [];

  if (fs.existsSync(filePath)) {
    try {
      feedbacks = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (e) {
      console.error('Ошибка чтения feedback.json:', e);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  feedbacks.push({
    ...feedback,
    date: new Date().toISOString()
  });

  try {
    fs.writeFileSync(filePath, JSON.stringify(feedbacks, null, 2));
    res.status(200).json({ message: 'Обратная связь отправлена!' });
  } catch (err) {
    console.error('Ошибка записи в feedback.json:', err);
    res.status(500).json({ message: 'Не удалось сохранить отзыв' });
  }
});

app.post('/order', (req, res) => {
  const order = req.body;
  if (!order || !order.name || !order.email || !order.items || !order.total) {
    return res.status(400).json({ message: 'Некорректный заказ' });
  }

  const filePath = path.join(__dirname, 'orders.json');
  let orders = [];

  if (fs.existsSync(filePath)) {
    try {
      orders = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (e) {
      console.error('Ошибка чтения orders.json:', e);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  order.date = new Date().toISOString();
  orders.push(order);

  try {
    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));
  } catch (err) {
    console.error('Ошибка записи в orders.json:', err);
    return res.status(500).json({ message: 'Не удалось сохранить заказ' });
  }

  console.log('\n[НОВЫЙ ЗАКАЗ]');
  console.log(`Имя: ${order.name}`);
  console.log(`Email: ${order.email}`);
  console.log(`Сумма: ${order.total} ₽`);
  console.log('Товары:');
  order.items.forEach(i => {
    console.log(` - ${i.name} x${i.quantity} = ${i.price * i.quantity} ₽`);
  });

  res.status(200).json({ message: 'Заказ получен' });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});