/**
 * ZIP 중앙 디렉터리만 읽어 파일 경로 목록 반환 (압축 해제 없음).
 * 서버가 paths를 주지 않을 때 클라이언트 폴백용. Zip slip 경로는 제외.
 */

const SIG_CENTRAL_FILE = 0x02014b50;
const SIG_EOCD = 0x06054b50;

function isSafeMemberPath(name) {
  const norm = String(name).replace(/\\/g, '/').replace(/^\//, '');
  if (!norm || norm.endsWith('/')) return false;
  return !norm.split('/').includes('..');
}

/**
 * @param {ArrayBuffer} ab
 * @returns {string[]}
 */
export function listZipPathsFromArrayBuffer(ab) {
  if (!ab || ab.byteLength < 22) {
    throw new Error('Invalid ZIP');
  }
  const view = new DataView(ab);
  const cdOffset = findCentralDirectoryOffset(view, ab.byteLength);
  if (cdOffset == null || cdOffset >= ab.byteLength) {
    throw new Error('ZIP central directory not found');
  }

  const paths = [];
  const decoder = new TextDecoder('utf-8');
  let pos = cdOffset;

  while (pos + 46 <= ab.byteLength) {
    const sig = view.getUint32(pos, true);
    if (sig !== SIG_CENTRAL_FILE) break;

    const fileNameLen = view.getUint16(pos + 28, true);
    const extraLen = view.getUint16(pos + 30, true);
    const commentLen = view.getUint16(pos + 32, true);

    const nameStart = pos + 46;
    const nameEnd = nameStart + fileNameLen;
    if (nameEnd > ab.byteLength) break;

    const nameBytes = new Uint8Array(ab, nameStart, fileNameLen);
    let name = decoder.decode(nameBytes);
    name = name.replace(/\\/g, '/');
    if (isSafeMemberPath(name)) {
      paths.push(name);
    }

    pos += 46 + fileNameLen + extraLen + commentLen;
  }

  return [...new Set(paths)].sort((a, b) => a.localeCompare(b));
}

function findCentralDirectoryOffset(view, byteLength) {
  const min = Math.max(0, byteLength - 65557);
  for (let i = byteLength - 22; i >= min; i--) {
    if (view.getUint32(i, true) === SIG_EOCD) {
      const offset = view.getUint32(i + 16, true);
      if (offset !== 0xffffffff) return offset;
    }
  }
  return null;
}
