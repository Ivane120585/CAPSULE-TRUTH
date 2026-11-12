import { describe, expect, it } from 'vitest'
import {
  isAllowedCapsuleImageType,
  isCapsuleFileSizeAllowed,
  isValidIpfsCid,
  validateCapsuleMetadata,
} from './capsuleValidation'

describe('validateCapsuleMetadata', () => {
  it('trims and accepts valid metadata', () => {
    expect(validateCapsuleMetadata('  Memory  ', '  A description  ')).toEqual({
      title: 'Memory',
      description: 'A description',
    })
  })

  it('rejects blank and oversized fields', () => {
    expect(validateCapsuleMetadata('   ', 'Description')).toHaveProperty('error')
    expect(validateCapsuleMetadata('x'.repeat(121), 'Description')).toHaveProperty('error')
    expect(validateCapsuleMetadata('Title', 'x'.repeat(2001))).toHaveProperty('error')
  })

  it('accepts supported image types and rejects unsupported types', () => {
    expect(isAllowedCapsuleImageType('image/png')).toBe(true)
    expect(isAllowedCapsuleImageType('image/svg+xml')).toBe(false)
    expect(isAllowedCapsuleImageType(null)).toBe(false)
  })

  it('accepts non-empty images up to 10 MB', () => {
    expect(isCapsuleFileSizeAllowed(1)).toBe(true)
    expect(isCapsuleFileSizeAllowed(10 * 1024 * 1024)).toBe(true)
    expect(isCapsuleFileSizeAllowed(10 * 1024 * 1024 + 1)).toBe(false)
    expect(isCapsuleFileSizeAllowed(0)).toBe(false)
  })

  it('accepts only base32 CIDv1 identifiers for content links', () => {
    expect(isValidIpfsCid(`bafy${'a'.repeat(30)}`)).toBe(true)
    expect(isValidIpfsCid(`BAFY${'A'.repeat(30)}`)).toBe(false)
    expect(isValidIpfsCid('not-a-cid')).toBe(false)
  })
})
