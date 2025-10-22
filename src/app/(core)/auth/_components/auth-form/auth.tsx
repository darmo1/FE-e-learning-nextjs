"use client";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  AuthForm,
  AuthFormWrapper,
  AuthRegister,
  AuthRegisterWrapper,
} from ".";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const Auth = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const register = searchParams.get("register");

  useEffect(() => {
    if(pathname.includes('/auth')){
      logout();
    }
    async function logout() {
      await fetch("/api/logout", {
        method: "POST"
      });
    }

  }, [pathname]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <Tabs defaultValue={register ? "signup" : "login"} className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Welcome </CardTitle>
              <TabsList className="grid w-full max-w-[200px] grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign up</TabsTrigger>
              </TabsList>
            </div>
            <CardDescription>
              Entra con tus credenciales para acceder a la cuenta
            </CardDescription>
          </CardHeader>

          <TabsContent value="login">
            <AuthFormWrapper>
              <AuthForm />
            </AuthFormWrapper>
          </TabsContent>

          <TabsContent value="signup">
            <AuthRegisterWrapper>
              <AuthRegister />
            </AuthRegisterWrapper>
          </TabsContent>
        </Tabs>

        <div
          className={cn(
            "px-8 pb-8 pt-0 text-center text-sm text-muted-foreground"
          )}
        >
          By continuing, you agree to our{" "}
          <Button variant="link" className="px-0 font-normal" size="sm">
            Terms of Service
          </Button>{" "}
          and{" "}
          <Button variant="link" className="px-0 font-normal" size="sm">
            Privacy Policy
          </Button>
        </div>
      </Card>
    </div>
  );
};
