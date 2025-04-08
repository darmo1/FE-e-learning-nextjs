"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRight, Calendar, CheckCircle, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { ColorfulConfetti } from "./confetti-colorful";

export default function SuccessPage() {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-md border border-zinc-200 dark:border-zinc-800 shadow-lg relative overflow-hidden bg-white dark:bg-black">
        {/* Subtle animation effect */}
        {isAnimating && (
          <>
            <ColorfulConfetti />
          </>
        )}

        <CardHeader className="text-center pb-6 border-b border-zinc-100 dark:border-zinc-800">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-800 p-2 flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-black dark:text-white" />
          </div>
          <h2 className="text-xl font-medium text-black dark:text-white">
            Subscription activated
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Your premium plan is now active
          </p>
          <Badge className="absolute top-4 right-4 bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
            Pro
          </Badge>
        </CardHeader>

        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-md">
            <Calendar className="h-5 w-5 text-zinc-700 dark:text-zinc-300 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm text-black dark:text-white">
                Billing cycle
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Next payment on April 3, 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-md">
            <Zap className="h-5 w-5 text-zinc-700 dark:text-zinc-300 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm text-black dark:text-white">
                Pro features unlocked
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                All premium features are now available
              </p>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-md p-4 mt-4">
            <h3 className="font-medium text-sm mb-3 text-black dark:text-white">
              Your Pro plan includes:
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-zinc-700 dark:text-zinc-300" />
                <span className="text-xs text-zinc-700 dark:text-zinc-300">
                  Unlimited projects and deployments
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-zinc-700 dark:text-zinc-300" />
                <span className="text-xs text-zinc-700 dark:text-zinc-300">
                  Advanced analytics and insights
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-zinc-700 dark:text-zinc-300" />
                <span className="text-xs text-zinc-700 dark:text-zinc-300">
                  Priority support and faster build times
                </span>
              </li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 pt-2">
          <Button className="w-full bg-black hover:bg-zinc-800 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 group">
            Explore your dashboard
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
            Need help?{" "}
            <a href="#" className="text-black dark:text-white hover:underline">
              Contact support
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
