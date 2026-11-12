export const MAX_CAPSULE_FILE_SIZE = 10 * 1024 * 1024

export const ALLOWED_CAPSULE_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]

export function isAllowedCapsuleImageType(type: string | null): boolean {
  return type !== null && ALLOWED_CAPSULE_IMAGE_TYPES.includes(type)
}

export function isCapsuleFileSizeAllowed(size: number): boolean {
  return size > 0 && size <= MAX_CAPSULE_FILE_SIZE
}

export function isValidIpfsCid(cid: unknown): cid is string {
  return typeof cid === 'string' && /^b[a-z2-7]{20,120}$/.test(cid)
}

export function validateCapsuleMetadata(title: unknown, description: unknown) {
  if (typeof title !== 'string' || !title.trim()) {
    return { error: 'Capsule title is required' }
  }
  if (title.trim().length > 120) {
    return { error: 'Capsule title must be 120 characters or fewer' }
  }
  if (typeof description !== 'string' || !description.trim()) {
    return { error: 'Capsule description is required' }
  }
  if (description.trim().length > 2000) {
    return { error: 'Capsule description must be 2000 characters or fewer' }
  }

  return { title: title.trim(), description: description.trim() }
}
