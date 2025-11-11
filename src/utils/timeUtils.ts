/**
 * 상대 시간 표시 유틸리티
 * "방금 전", "5분 전", "2시간 전", "3일 전" 형식으로 변환
 */
export function getRelativeTime(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();

  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return '방금 전';
  if (diffMins < 60) return `${diffMins}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  return `${diffDays}일 전`;
}

/**
 * 날짜를 YYYY-MM-DD 형식으로 포맷팅
 * @param dateString ISO 8601 날짜 문자열 또는 Date 객체로 변환 가능한 문자열
 * @returns YYYY-MM-DD 형식의 날짜 문자열
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);

    // Invalid Date 체크
    if (isNaN(date.getTime())) {
      return dateString;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  } catch (error) {
    // 파싱 실패 시 원본 문자열 반환
    return dateString;
  }
}
