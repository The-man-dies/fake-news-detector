import { describe, expect, test } from 'vitest'
import { Citizen } from './Citizen'
import { DomainError } from '../../shared/errors'

describe('Citizen', () => {
  test('submitWatcherApplication returns a pending application for eligible citizen', () => {
    const citizen = new Citizen('actor-1', 'Alice', 'alice@example.com')

    const application = citizen.submitWatcherApplication('Je veux contribuer')

    expect(application.actorId).toBe(citizen.id)
    expect(application.motivation).toBe('Je veux contribuer')
    expect(application.status).toBe('PENDING')
  })

  test('submitWatcherApplication throws DomainError for watcher citizen', () => {
    const watcher = new Citizen(
      'actor-2',
      'Bob',
      'bob@example.com',
      'CITIZEN',
      'ACTIVE',
      'WATCHER',
    )

    expect(() => watcher.submitWatcherApplication('Motivation')).toThrow(
      DomainError,
    )
  })

  test('submitWatcherApplication throws DomainError for banned citizen', () => {
    const citizen = new Citizen('actor-3', 'Eve', 'eve@example.com')
    citizen.ban('SPAM')

    expect(() => citizen.submitWatcherApplication('Motivation')).toThrow(
      DomainError,
    )
  })
})
