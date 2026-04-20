// domain/value-objects/AuthoritySource.ts
export class AuthoritySource {
  constructor(
    public readonly institutionName: string,
    public readonly evidenceType: string,
    public readonly evidenceUrl: string,
  ) {}
}
