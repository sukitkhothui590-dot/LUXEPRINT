-- จำนวนเข้าชมบทความ + RPC ให้ anon เรียกเพิ่มยอด (ไม่เปิด RLS update โดยตรง)

alter table public.articles
  add column if not exists view_count integer not null default 0;

comment on column public.articles.view_count is 'จำนวนครั้งที่เปิดดูหน้าบทความ (เผยแพร่)';

create or replace function public.increment_article_views(slug_param text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.articles
  set view_count = view_count + 1
  where slug = slug_param
    and status = 'published';
end;
$$;

comment on function public.increment_article_views(text) is 'เพิ่ม view_count ทีละ 1 เฉพาะบทความที่เผยแพร่ — เรียกจากหน้าเว็บ';

grant execute on function public.increment_article_views(text) to anon, authenticated;
