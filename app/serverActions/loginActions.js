




"use server";

import { signIn } from "../auth";
import { DBConnection } from "../utils/config/db";

export async function loginAction(loginDetails) {
  await DBConnection();

  console.log("sample login", loginDetails);

  try {
    const response = await signIn("credentials", {
      email: loginDetails.email,
      password: loginDetails.password,
      redirect: false,
    });

    console.log("response:", response);

    if (!response || response.error) {
      return {
        success: false,
        status: 401,
        message: "Invalid credentials or user not found",
      };
    }

    return {
      success: true,
      status: 200,
      message: "Login successful",
    };
  } catch (error) {
    console.log("LOGIN ERROR:", error);

    return {
      success: false,
      status: 500,
      message:
        error?.message?.includes("CredentialsSignin")
          ? "Please register first"
          : "An error occurred",
    };
  }
}