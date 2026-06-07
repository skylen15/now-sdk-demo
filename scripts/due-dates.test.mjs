import assert from 'node:assert/strict'
import test from 'node:test'
import {
    localDateEndAsServiceNowValue,
    localDateKey,
    parseServiceNowDateTime,
} from '../src/client/utils/due-dates.ts'

test('converts local end-of-day through DST boundaries', () => {
    process.env.TZ = 'America/New_York'

    assert.equal(localDateEndAsServiceNowValue('2026-03-08'), '2026-03-09 03:59:59')
    assert.equal(localDateEndAsServiceNowValue('2026-11-01'), '2026-11-02 04:59:59')
})

test('converts local end-of-day for the target Australia timezone', () => {
    process.env.TZ = 'Australia/Sydney'

    assert.equal(localDateEndAsServiceNowValue('2026-10-04'), '2026-10-04 12:59:59')
})

test('round trips stored UTC values to the selected local calendar date', () => {
    process.env.TZ = 'Asia/Ho_Chi_Minh'
    const stored = localDateEndAsServiceNowValue('2026-06-07')
    const parsed = parseServiceNowDateTime(stored)

    assert.equal(stored, '2026-06-07 16:59:59')
    assert.ok(parsed)
    assert.equal(localDateKey(parsed), '2026-06-07')
})

test('clears optional due dates', () => {
    assert.equal(localDateEndAsServiceNowValue(''), '')
})
