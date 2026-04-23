// application/services/SecurityService.ts
export class SecurityService {
  async authenticate(_token: string): Promise<boolean> {
    return true
  }

  async checkAccess(_role: string, _action: string): Promise<boolean> {
    return true
  }
}
