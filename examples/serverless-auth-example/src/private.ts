import { APIGatewayEvent } from "aws-lambda"
import { response, checkAuth, User } from "./util"

export async function hello(event: APIGatewayEvent) {
  // returns JWT token payload
  const authorized = checkAuth(event)

  if (authorized) {
    const user = authorized as User

    return response(200, {
      message: `Hello ${user.username}`,
    })
  } else {
    return response(401, {
      status: "error",
      error: "This is a private resource",
    })
  }
}
