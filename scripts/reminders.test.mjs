import assert from 'node:assert/strict'
import test from 'node:test'
import { localDateTimeAsServiceNowValue } from '../src/client/utils/reminder-dates.ts'

test('clearing reminder writes empty value', () => {
    assert.equal(localDateTimeAsServiceNowValue(''), '')
})

test('local reminder converts to ServiceNow UTC internal format', () => {
    const input = '2030-01-02T03:04'
    const expected = new Date(input).toISOString().slice(0, 19).replace('T', ' ')
    assert.equal(localDateTimeAsServiceNowValue(input), expected)
})
