-- 기존 테이블 백업 (선택사항)
-- ALTER TABLE mission_posts RENAME TO mission_posts_backup;

-- 새로운 메시지 테이블 생성
CREATE TABLE mission_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL, -- 비공개, 연락용
  message TEXT NOT NULL, -- 공개 메시지
  ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_hidden BOOLEAN DEFAULT FALSE -- 관리자 차단용
);

-- 인덱스
CREATE INDEX idx_mission_messages_created_at ON mission_messages(created_at DESC);
CREATE INDEX idx_mission_messages_email ON mission_messages(email);

-- RLS (Row Level Security) 설정
ALTER TABLE mission_messages ENABLE ROW LEVEL SECURITY;

-- 1. 누구나 조회 가능 (공개 메시지)
CREATE POLICY "Public messages are viewable by everyone" 
ON mission_messages FOR SELECT 
USING (is_hidden = FALSE);

-- 2. 누구나 작성 가능 (익명)
CREATE POLICY "Anyone can insert messages" 
ON mission_messages FOR INSERT 
WITH CHECK (true);

-- 3. 업데이트/삭제는 불가 (관리자만 가능 - Supabase 대시보드에서 처리)
