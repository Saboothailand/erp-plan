// Supabase 연결 테스트 파일
import { supabase } from './supabase'

export async function testSupabaseConnection() {
  try {
    // 간단한 쿼리로 연결 테스트
    const { data, error } = await supabase
      .from('roles')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('Supabase 연결 오류:', error)
      return false
    }
    
    console.log('Supabase 연결 성공!', data)
    return true
  } catch (error) {
    console.error('Supabase 연결 실패:', error)
    return false
  }
}

// 테스트 함수 실행
testSupabaseConnection()
