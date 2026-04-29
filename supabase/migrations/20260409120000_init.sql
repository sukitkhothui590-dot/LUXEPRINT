-- LuxePrint / LabelCraft — Supabase schema, RLS, storage, seed
-- Run via Supabase SQL editor or: supabase db push

-- ---------------------------------------------------------------------------
-- Profiles (links to auth.users; is_admin gates CMS + storage)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  is_admin boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, is_admin)
  values (new.id, false)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(
    (select p.is_admin from public.profiles p where p.id = auth.uid()),
    false
  );
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Articles
-- ---------------------------------------------------------------------------
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  body_html text not null default '',
  category text not null default '',
  status text not null default 'draft',
  cover_image_url text,
  cover_image_alt text,
  read_time_min int not null default 5,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint articles_status_check check (status in ('draft', 'published'))
);

create index if not exists articles_status_published_at_idx
  on public.articles (status, published_at desc);

alter table public.articles enable row level security;

create policy "Public reads published articles"
  on public.articles for select
  using (status = 'published');

create policy "Admins read all articles"
  on public.articles for select
  using (public.is_admin());

create policy "Admins insert articles"
  on public.articles for insert
  with check (public.is_admin());

create policy "Admins update articles"
  on public.articles for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins delete articles"
  on public.articles for delete
  using (public.is_admin());

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Contact form
-- ---------------------------------------------------------------------------
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  service_slug text,
  message text,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

alter table public.contact_submissions enable row level security;

create policy "Anyone can submit contact"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (true);

create policy "Admins read contact submissions"
  on public.contact_submissions for select
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage: article cover images
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('article-covers', 'article-covers', true)
on conflict (id) do nothing;

create policy "Public read article covers"
  on storage.objects for select
  using (bucket_id = 'article-covers');

create policy "Admins upload article covers"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'article-covers'
    and public.is_admin()
  );

create policy "Admins update article covers"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'article-covers' and public.is_admin())
  with check (bucket_id = 'article-covers' and public.is_admin());

create policy "Admins delete article covers"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'article-covers' and public.is_admin());

-- ---------------------------------------------------------------------------
-- Seed (mock blog posts — safe to re-run)
-- ---------------------------------------------------------------------------
insert into public.articles (
  slug, title, excerpt, body_html, category, status,
  cover_image_url, cover_image_alt, read_time_min, published_at
) values
(
  'print-ready-pdf',
  'เตรียมไฟล์ PDF ให้พร้อมพิมพ์: เช็กลิสต์ก่อนส่งงาน',
  'โหมดสี มาร์จิน ฟอนต์ฝัง และความละเอียด — ตรวจให้ครบก่อนส่งให้ LabelCraft Studio หรือโรงพิมพ์ เพื่อลดรอบแก้และให้สีใกล้เคียงที่สุด',
  '<p>ไฟล์ PDF เป็นรูปแบบที่ล็อกเลย์เอาต์และฟอนต์ได้ดี เหมาะกับการส่งงานพิมพ์มืออาชีพ ก่อนส่งมอบให้ทีม LabelCraft Studio หรือพาร์ทเนอร์โรงพิมพ์ของคุณ ตั้งค่าเอกสารให้เป็น CMYK เมื่องานต้องลงสีบนกระดาษหรือวัสดุจริง และเช็กมาร์จินปลอดภัยไม่ชิดขอบตัดจนเกินไป</p><p>ฟอนต์ควรฝัง (embed) หรือแปลงเป็น outline แล้ว ภาพประกอบควรมีความละเอียดสัมพันธ์กับขนาดที่พิมพ์จริง — ภาพเบลอมักมาจากการขยายไฟล์ความละเอียดต่ำ</p><p>หากมี Spot UV ฟอยล์ หรือเลเยอร์พิเศษ ให้แยกไฟล์ตามสเปกที่รับ และทำ proof สีเมื่อเป็นงานสำคัญ เพื่อให้ผลลัพธ์ตรงกับที่คุณกำหนด</p>',
  'เทคนิคงานพิมพ์',
  'published',
  '/Preparation/1%20(2).png',
  'เตรียมไฟล์งานพิมพ์ PDF มาตรฐานพร้อมทำงาน',
  6,
  '2026-03-18T12:00:00Z'
),
(
  'business-card-paper',
  'เลือกกระดาษนามบัตรอย่างไรให้เข้ากับแบรนด์',
  'จากอาร์ตมัน มะลิ ถึงเนื้อพิเศษ — วัสดุส่งผลต่อความรู้สึกตอนสัมผัสและภาพลักษณ์ธุรกิจ คัดให้ตรงบรีฟก่อนสั่งพิมพ์กับ LabelCraft Studio',
  '<p>นามบัตรไม่ใช่แค่ข้อมูลติดต่อ แต่เป็นวัตถุที่ผู้รับจับต้องก่อนเสมอ กระดาษอาร์ตมันให้สีคม เข้าถึงง่าย เหมาะงานทั่วไป ส่วนมะลิหรือเนื้อหนาขึ้นเล็กน้อยจะให้ความรู้สึกพรีเมียมขึ้นมา</p><p>ถ้าใช้ปั๊มฟอยล์หรือปั๊มนูน ควรเลือกกระดาษที่หนาและยืดหยุ่นพอ ไม่ให้เกิดรอยแตกลายตอนกดปั๊ม — ปรึกษาทีมงานก่อนสั่งจำนวนมากเพื่อเลือกเกรดที่เหมาะกับเทคนิค</p><p>ขอตัวอย่างชิ้นงานเทียบมือสัมผัสและแสงจริงก่อนตัดสินใจ จะช่วยให้ผลลัพธ์เมื่อพิมพ์กับ LabelCraft Studio ตรงกับภาพที่คุณวางไว้</p>',
  'แบรนด์ & ดีไซน์',
  'published',
  '/card/card1.webp',
  'นามบัตรงานพิมพ์คุณภาพ กระดาษและฟินิช',
  5,
  '2026-03-02T12:00:00Z'
),
(
  'uv-spot-vs-foil',
  'Spot UV กับฟอยล์ปั๊ม: ต่างกันอย่างไร และเลือกเมื่อไหร่',
  'ทั้งคู่เน้นจุดบนบรรจุภัณฑ์หรือนามบัตร แต่ให้ลุคและต้นทุนต่างกัน — สรุปให้เลือกตรงโจทย์ก่อนจบแบบกับทีมงานเรา',
  '<p>Spot UV คือการเคลือบเงาเฉพาะจุดบนพื้นแมตต์ เกิดคอนทราสต์ทันสมัย เหมาะกับโลโก้หรือลวดลายที่ต้องการมิติแบบเงาเงา</p><p>ฟอยล์ปั๊ม (ทอง เงิน หรือลายพิเศษ) ให้ความรู้สึกหรู ดึงสายตาในแสง มักมีต้นทุนต่อชิ้นสูงกว่า UV ในบางประเภทงาน</p><p>การเลือกขึ้นกับงบ สไตล์แบรนด์ และพื้นวัสดุ — บางดีไซน์ใช้ร่วมกันได้ แต่ควรหลีกเลี่ยงการซ้อนจุดที่ทำให้อ่านยาก ทีม LabelCraft Studio ช่วยประเมินทางเลือกให้เหมาะกับชิ้นงานจริง</p>',
  'เทคนิคงานพิมพ์',
  'published',
  '/UV/1593b0dd54bb45315352e75acd732ce9.jpg',
  'งานพิมพ์ UV เน้นจุดบนพื้นผิวและบรรจุภัณฑ์',
  4,
  '2026-02-20T12:00:00Z'
),
(
  'sticker-material-guide',
  'คู่มือเลือกวัสดุสติ๊กเกอร์: PVC, PP และกระดาษ',
  'ฉลากสินค้ากับงานติดกล่องต้องการความทนแตกต่างกัน — เริ่มจากการใช้งานจริง แล้วเลือกวัสดุและกาวให้ตรงก่อนผลิต',
  '<p>สติ๊กเกอร์ PVC กันน้ำและทนสารได้ดี เหมาะกับฉลากที่โดนความชื้นหรือใช้ในครัว PP มักบางและยืดหยุ่น เหมาะกับพื้นผิวโค้ง</p><p>สติ๊กเกอร์กระดาษเหมาะงานระยะสั้นหรือบรรจุภัณฑ์แห้ง ราคาเป็นมิตรแต่ทนสภาพแวดล้อมน้อยกว่า</p><p>ทดสอบการยึดเกาะบนพื้นผิวจริงของบรรจุภัณฑ์ และเลือกกาวถาวรหรือถอดได้ตามการใช้งาน ทีม LabelCraft Studio แนะนำสเปกให้ตรงกับไลน์การผลิตของคุณ</p>',
  'ข่าวสาร',
  'published',
  '/sticker/Sticker1.webp',
  'สติ๊กเกอร์และฉลากสินค้าคุณภาพสูง',
  7,
  '2026-02-05T12:00:00Z'
),
(
  'eco-packaging-notes',
  'บรรจุภัณฑ์ยั่งยืน: สิ่งที่แบรนด์ควรถามก่อนสั่งพิมพ์',
  'รีไซเคิลได้ หมึกที่เหมาะสม หรือลดวัสดุซ้อน — คำถามที่ช่วยให้แพ็กเกจสื่อสารตรงกับค่าของแบรนด์',
  '<p>หลายแบรนด์ต้องการสื่อสารความยั่งยืน การเลือกกระดาษรีไซเคิลหรือใบรับรองที่น่าเชื่อถือควรยืนยันกับผู้ผลิตว่าห่วงโซ่การผลิดและหมึกสอดคล้องกับเป้าหมายจริง</p><p>การลดชั้นวัสดุหรือขนาดกล่องให้พอดีสินค้าช่วยลดของเสียและต้นทุนขนส่ง เป็นเวิร์กโฟลว์ที่ยั่งยืนควบคู่ดีไซน์</p><p>ระบุบนฉลากว่าผู้บริโภคจะแยกหรือกำจัดอย่างไร เพื่อให้ข้อความบนบรรจุภัณฑ์ตรงกับพฤติกรรมจริง — ทีม LabelCraft Studio พร้อมหารือตัวเลือกวัสดุและปริมาณที่เหมาะสม</p>',
  'ข่าวสาร',
  'published',
  '/bag/c0699839c1dadcc38bd8745b8b4e0462.jpg',
  'ถุงและบรรจุภัณฑ์พิมพ์ลายแบรนด์',
  5,
  '2026-01-22T12:00:00Z'
)
on conflict (slug) do nothing;
