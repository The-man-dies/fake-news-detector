// domain/value-objects/InboxSubject.ts
export class InboxSubject {
  constructor(
    public readonly id: string,
    public readonly theme: string,
    public readonly description: string,
  ) {}
}
