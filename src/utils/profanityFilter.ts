import { PROFANITY_LIST } from '@/constants/profanity';

/**
 * 텍스트에 욕설이 포함되어 있는지 검사합니다.
 *
 * @param text - 검사할 텍스트
 * @returns 욕설이 포함되어 있으면 true, 아니면 false
 *
 * @remarks
 * - 완전 일치만 차단 (단어 전체가 일치해야 차단)
 * - 대소문자 구분 없이 검사 (영문의 경우)
 * - 공백 trim 처리
 * - 완성형 한글만 검사 (자음/모음 분리는 검사 안함)
 *
 * @example
 * ```typescript
 * containsProfanity("시발"); // true
 * containsProfanity("좋은닉네임"); // false
 * containsProfanity("FUCK"); // true (대소문자 구분 안함)
 * containsProfanity("  shit  "); // true (trim 처리)
 * ```
 */
export function containsProfanity(text: string): boolean {
  // 입력값이 없거나 빈 문자열인 경우
  if (!text || text.trim().length === 0) {
    return false;
  }

  // 공백 제거 후 소문자로 변환
  const normalizedText = text.trim().toLowerCase();

  // 욕설 리스트에서 하나라도 완전 일치하면 true 반환
  return PROFANITY_LIST.some(profanity => {
    const normalizedProfanity = profanity.toLowerCase();
    return normalizedText === normalizedProfanity;
  });
}
