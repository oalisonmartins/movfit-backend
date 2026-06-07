export type AuthOutput = {
  accessToken: string
  refreshToken: string
}

export type JwtPayload = {
  sub: string
  jti: string
  iat: number
  exp: number
}
