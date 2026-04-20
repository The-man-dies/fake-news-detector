// application/services/SecurityService.ts
export class SecurityService {
  async authenticate(token: string): Promise<boolean> {
    return true
  }

  async checkAccess(role: string, action: string): Promise<boolean> {
    return true
  }
}
