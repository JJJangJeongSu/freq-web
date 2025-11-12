/**
 * 닉네임 검증 규칙 및 상수
 */

// 닉네임 길이 제한
export const NICKNAME_MIN_LENGTH = 2;
export const NICKNAME_MAX_LENGTH = 10;

// 기본 패턴: 한글, 영문, 숫자, 언더스코어만 허용
const BASIC_PATTERN = /^[가-힣a-zA-Z0-9_]+$/;

// 금지 패턴들
const HAS_WHITESPACE = /\s/; // 공백, 탭, 줄바꿈
const HAS_CONTROL_CHARS = /[\x00-\x1F\x7F]/; // 제어문자
const HAS_INVISIBLE_CHARS = /[\u200B-\u200D\uFEFF\u00AD]/; // 보이지 않는 문자 (Zero-width space, soft hyphen 등)
const STARTS_OR_ENDS_WITH_UNDERSCORE = /^_|_$/; // 시작/끝 언더스코어
const HAS_CONSECUTIVE_UNDERSCORES = /__+/; // 연속 언더스코어 (2개 이상)
// 이모지 패턴 (대부분의 이모지 범위 포함)
const HAS_EMOJI = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2300}-\u{23FF}\u{2B50}\u{2B55}\u{231A}-\u{231B}\u{23E9}-\u{23EF}\u{25AA}-\u{25AB}\u{25B6}\u{25C0}\u{25FB}-\u{25FE}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{3030}\u{303D}\u{3297}\u{3299}]/u;

export interface NicknameValidationResult {
  isValid: boolean;
  errorMessage: string | null;
}

/**
 * 닉네임 유효성 검증 함수 (포괄적)
 * 모든 규칙을 체크하고 첫 번째 에러 메시지 반환
 */
export function validateNickname(nickname: string): NicknameValidationResult {
  // 빈 문자열 체크
  if (!nickname || nickname.length === 0) {
    return {
      isValid: false,
      errorMessage: '닉네임을 입력해주세요.',
    };
  }

  // 공백 체크
  if (HAS_WHITESPACE.test(nickname)) {
    return {
      isValid: false,
      errorMessage: '닉네임에 공백을 포함할 수 없습니다.',
    };
  }

  // 제어문자 체크
  if (HAS_CONTROL_CHARS.test(nickname)) {
    return {
      isValid: false,
      errorMessage: '닉네임에 사용할 수 없는 문자가 포함되어 있습니다.',
    };
  }

  // 보이지 않는 문자 체크
  if (HAS_INVISIBLE_CHARS.test(nickname)) {
    return {
      isValid: false,
      errorMessage: '닉네임에 보이지 않는 문자가 포함되어 있습니다.',
    };
  }

  // 이모지 체크
  if (HAS_EMOJI.test(nickname)) {
    return {
      isValid: false,
      errorMessage: '닉네임에 이모지를 사용할 수 없습니다.',
    };
  }

  // 길이 체크 (최소)
  if (nickname.length < NICKNAME_MIN_LENGTH) {
    return {
      isValid: false,
      errorMessage: `닉네임은 ${NICKNAME_MIN_LENGTH}자 이상이어야 합니다.`,
    };
  }

  // 길이 체크 (최대)
  if (nickname.length > NICKNAME_MAX_LENGTH) {
    return {
      isValid: false,
      errorMessage: `닉네임은 ${NICKNAME_MAX_LENGTH}자 이하여야 합니다.`,
    };
  }

  // 기본 패턴 체크 (한글, 영문, 숫자, 언더스코어만)
  if (!BASIC_PATTERN.test(nickname)) {
    return {
      isValid: false,
      errorMessage: '닉네임은 한글, 영문, 숫자, 언더스코어(_)만 사용 가능합니다.',
    };
  }

  // 시작/끝 언더스코어 체크
  if (STARTS_OR_ENDS_WITH_UNDERSCORE.test(nickname)) {
    return {
      isValid: false,
      errorMessage: '닉네임은 언더스코어(_)로 시작하거나 끝날 수 없습니다.',
    };
  }

  // 연속 언더스코어 체크
  if (HAS_CONSECUTIVE_UNDERSCORES.test(nickname)) {
    return {
      isValid: false,
      errorMessage: '닉네임에 연속된 언더스코어(_)를 사용할 수 없습니다.',
    };
  }

  // 모든 검증 통과
  return {
    isValid: true,
    errorMessage: null,
  };
}

/**
 * 닉네임 가이드 메시지
 */
export const NICKNAME_GUIDE_MESSAGE = `${NICKNAME_MIN_LENGTH}-${NICKNAME_MAX_LENGTH}자의 한글, 영문, 숫자, 언더스코어(_)만 사용 가능합니다. (공백, 이모지, 특수문자 불가)`;
