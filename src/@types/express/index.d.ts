declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: {
      id?: string,
      userGroupId?: string
      name?: string,
      email?: string,
      isAdmin?: boolean
      isSuperUser?: boolean
      isBlocked?: boolean
      blockReasonId?: string
      mustChangePasswordNextLogon?: boolean
      isDisabled?: boolean
    }
  }
}
