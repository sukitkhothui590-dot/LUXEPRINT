# Deploy (Vercel + Next.js ใน `web/`)

ใน repo นี้แอป Next.js อยู่ที่โฟลเดอร์ **`web/`** (รากมีแค่สคริปต์ `npm run build` ชี้เข้าไป)

## Vercel (แนะนำ)

1. [vercel.com](https://vercel.com) → **Add New…** → **Project** → Import Git repo นี้
2. สำคัญ: เปิด **Settings → General → Root Directory** ตั้งเป็น **`web`**  
   (ถ้าไม่ตั้ง Vercel จะหา `next.config` ไม่เจอที่ราก)
3. **Settings → Environment Variables** (ใส่ทั้ง Production / Preview ตามต้องการ):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy** — build คำสั่งจะเป็น `npm run build` ใน `web/` อัตโนมัติ

ไฟล์ `web/vercel.json` ตั้ง `framework: nextjs` และ region `sin1` (Singapore — ใกล้ไทย) แก้ได้ตามต้องการ

## Vercel CLI (`npx vercel`)

ถ้าในโปรเจกต์ตั้ง **Root Directory = `web`** อยู่ ต้องรันคำสั่งจาก **ราก repo** (`luxeprint/`) เท่านั้น  
ถ้ารันจาก `luxeprint/web/` จะ error แบบ path `...\web\web` ไม่มี

```bash
cd F:\luxeprint
npx vercel
npx vercel --prod
```

หรือใช้สคริปต์ที่ราก:

```bash
npm run vercel
npm run vercel:prod
```

## ทดสอบ build แบบ production ในเครื่อง

```bash
npm run build
```

(รันจากราก repo — จะ build โฟลเดอร์ `web/`)

## Supabase

รัน SQL ใน `supabase/migrations/` บนโปรเจกต์ Supabase ให้ครบก่อนให้ฟีเจอร์ auth / บทความ / view count ทำงานบน production
