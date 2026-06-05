function constantTimeEqual(left, right) {
  const maxLength = Math.max(left.length, right.length);
  let mismatch = left.length ^ right.length;

  for (let index = 0; index < maxLength; index += 1) {
    mismatch |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }

  return mismatch === 0;
}

export function hasValidBasicAuth(header, expectedUsername, expectedPassword) {
  if (!header?.startsWith('Basic ')) {
    return false;
  }

  try {
    const decoded = atob(header.slice(6));
    const separatorIndex = decoded.indexOf(':');

    if (separatorIndex === -1) {
      return false;
    }

    const username = decoded.slice(0, separatorIndex);
    const password = decoded.slice(separatorIndex + 1);

    return (
      constantTimeEqual(username, expectedUsername) &&
      constantTimeEqual(password, expectedPassword)
    );
  } catch {
    return false;
  }
}
