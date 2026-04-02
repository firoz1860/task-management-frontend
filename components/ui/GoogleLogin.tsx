"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function GoogleLoginButton() {
  const { loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      await loginWithGoogle(credentialResponse.credential);
      toast.success("Logged in with Google!");
      router.push("/tasks");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Google login failed");
    }
  };

  return (
    <div className="w-full flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => toast.error("Google login failed")}
        theme="outline"
        size="large"
      />
    </div>
  );
}
