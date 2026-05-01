import { describe, expect, test } from 'vitest'
import { Notification } from './Notification'
import { DomainError } from '../../shared/errors'

describe('Notification', () => {
  test('creates PUBLICATION notification when publicationId is provided', () => {
    const notification = Notification.create(
      'PUBLICATION',
      'Publication',
      'Verdict final disponible',
      'actor-1',
      'publication-1',
    )

    expect(notification.type).toBe('PUBLICATION')
    expect(notification.publicationId).toBe('publication-1')
    expect(notification.actorId).toBe('actor-1')
  })

  test('throws DomainError when PUBLICATION has no publicationId', () => {
    expect(() =>
      Notification.create('PUBLICATION', 'Publication', 'Message', 'actor-1'),
    ).toThrow(DomainError)
  })

  test('throws DomainError when CORRECTION has blank publicationId', () => {
    expect(() =>
      Notification.create('CORRECTION', 'Correction', 'Message', 'actor-1', '   '),
    ).toThrow(DomainError)
  })

  test('creates ALERT notification with optional publicationId', () => {
    const withoutPublication = Notification.create(
      'ALERT',
      'Alerte',
      'Nouvel evenement',
      'actor-1',
    )
    const withPublication = Notification.create(
      'ALERT',
      'Alerte',
      'Nouvel evenement',
      'actor-1',
      'publication-99',
    )

    expect(withoutPublication.publicationId).toBeUndefined()
    expect(withPublication.publicationId).toBe('publication-99')
  })
})
