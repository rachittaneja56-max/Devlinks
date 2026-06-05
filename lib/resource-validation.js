const MAX_TITLE_LENGTH = 120;
const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_URL_LENGTH = 2048;

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function validateResourceInput(input) {
  const title = cleanString(input?.title);
  const description = cleanString(input?.description);
  const url = cleanString(input?.url);

  if (!title || !description || !url) {
    return { error: 'Title, URL, and description are required' };
  }

  if (title.length > MAX_TITLE_LENGTH) {
    return { error: `Title must be ${MAX_TITLE_LENGTH} characters or fewer` };
  }

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return {
      error: `Description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer`,
    };
  }

  if (url.length > MAX_URL_LENGTH) {
    return { error: `URL must be ${MAX_URL_LENGTH} characters or fewer` };
  }

  try {
    const parsedUrl = new URL(url);

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return { error: 'URL must use HTTP or HTTPS' };
    }
  } catch {
    return { error: 'URL must be valid' };
  }

  return {
    data: {
      title,
      url,
      description,
    },
  };
}
