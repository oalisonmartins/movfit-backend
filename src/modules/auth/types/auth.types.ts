export type AuthOutput = {
  accessToken: string
}

export type JwtPayload = {
  sub: string
  jti: string
  iat: number
  exp: number
}
