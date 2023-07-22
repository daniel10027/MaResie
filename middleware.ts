export { default } from "next-auth/middleware";

export const config = {
    matcher : [
        "/trips/:path*",
        "/reservations/:path*",
        "/favorites/:path*",
        "/properties/:path*",

    ]
}