/**
 * POST /submit/validation 응답 해석 — ZIP 업로드·제출 확인 단계에서 공통 사용
 * (API는 HTTP 200으로 두고 body.status 로 성공/실패를 구분하는 경우가 있음)
 */

/** API·프록시에 따라 output_var_list 형태가 달라질 수 있음 */
export function normalizeOutputVarList(raw) {
  if (raw == null) return [];
  if (Array.isArray(raw)) {
    return raw.map((x) => String(x).trim()).filter(Boolean);
  }
  if (typeof raw === 'string') {
    return raw
      .split(/[,]|\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

/** 서버 error 객체(BaseErrorResponse.error) → 사용자용 문구 (한/영) */
export function formatValidationErrorDetail(error, tf) {
  if (!error || typeof error !== 'object') {
    return tf(
      '압축 파일 검증에 실패했습니다. main.py와 제출 가이드를 확인해 주세요.',
      'Archive validation failed. Check main.py and the submission guide.'
    );
  }
  const code = error.code;
  const details = error.details || {};

  if (code === 'INVALID_PARAMETERS') {
    const inputUndef = Array.isArray(details.input_undefined) ? details.input_undefined : [];
    const outputUndef = Array.isArray(details.output_undefined) ? details.output_undefined : [];
    if (inputUndef.length > 0 || outputUndef.length > 0) {
      const head = tf(
        'main.py의 main() 함수의 입출력 정보가 플랫폼 스키마와 일치하지 않습니다.',
        'The input/output information for main() in main.py does not match the platform schema.'
      );
      const lines = [];
      if (inputUndef.length > 0) {
        lines.push(
          tf(
            `입력 파라미터에 허용되지 않은 이름: ${inputUndef.join(', ')}`,
            `Disallowed input parameter name(s): ${inputUndef.join(', ')}`
          )
        );
      }
      if (outputUndef.length > 0) {
        lines.push(
          tf(
            `출력 파라미터에 허용되지 않은 이름: ${outputUndef.join(', ')}`,
            `Disallowed output parameter name(s): ${outputUndef.join(', ')}`
          )
        );
      }
      return [head, ...lines].join('\n');
    }
    if (typeof error.message === 'string' && error.message.length > 0) {
      return tf(
        error.message,
        'Parameter names in main() do not match the platform schema. See the server message for details.'
      );
    }
  }

  if (code === 'INVALID_REQUIRED_CODE') {
    return tf(
      'main.py에 제출 가이드에 따라 필요한 실행 코드 블록이 빠져 있습니다. 가이드를 확인해 주세요.',
      'main.py is missing the required execution code block described in the submission guide.'
    );
  }

  if (code === 'NO_MAIN_FUNCTION') {
    return tf(
      "main.py에서 'main' 함수를 찾을 수 없거나 시그니처를 해석할 수 없습니다. 코드를 확인해 주세요.",
      'main.py does not define a recognizable main() function or its signature could not be parsed. Please check your code.'
    );
  }

  if (typeof error.message === 'string' && error.message.length > 0) {
    return error.message;
  }

  return tf(
    '압축 파일 검증에 실패했습니다.',
    'Archive validation failed.'
  );
}

function formatLegacyValidationMessage(message, tf) {
  if (/does not contain a function named ['"]main['"]/i.test(message)) {
    return tf(
      "main.py에 'main' 함수가 없거나 인식할 수 없습니다. 코드를 확인해 주세요.",
      'The main.py file does not contain a recognizable main() function. Please check your code.'
    );
  }
  return message;
}

/**
 * POST /submit/validation JSON 본문 → 사용자 메시지
 * @param {object} body - validResponse.data
 */
export function resolveArchiveValidationMessage(body, tf) {
  const root = body && typeof body === 'object' ? body : {};

  if (
    root.error == null &&
    (root.status === undefined || root.status === null) &&
    typeof root.message === 'string' &&
    root.message.length > 0
  ) {
    return formatLegacyValidationMessage(root.message, tf);
  }

  const statusNum = Number(root.status);
  if (statusNum === 422 && root.error && typeof root.error === 'object') {
    return formatValidationErrorDetail(root.error, tf);
  }

  if (statusNum === 200) {
    const data = root.data ?? {};
    const outputVarList = normalizeOutputVarList(
      data.output_var_list ?? data.outputVarList
    );
    if (outputVarList.length === 0) {
      return tf(
        'main.py에서 플랫폼에 허용된 출력 파라미터(분석 결과)를 찾을 수 없습니다. main()의 반환값 정의를 확인해 주세요.',
        'No allowed output parameters (analysis results) were found from main.py. Check the return values of main().'
      );
    }
  }

  return tf(
    '압축 파일 검증에 실패했습니다. main.py와 제출 가이드를 확인해 주세요.',
    'Archive validation failed. Check main.py and the submission guide.'
  );
}
