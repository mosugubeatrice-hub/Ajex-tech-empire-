import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BUSINESS_CONFIG } from "@/lib/config"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-slate-900 flex items-center justify-center p-4 pt-24">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">Verify Your Email</h1>
          <p className="text-gray-300 mt-2">One more step to activate your account</p>
        </div>

        <Card className="border-0 shadow-xl bg-slate-800/50 backdrop-blur border border-blue-500/20">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl text-white">Check Your Inbox</CardTitle>
            <CardDescription className="text-gray-300">
              We've sent a verification link to your email address
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                Click the link in your email to confirm your address and access your {BUSINESS_CONFIG.name} account.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-gray-400">
                Don't see the email? Check your spam folder or try signing up again.
              </p>

              <div className="pt-2">
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    className="w-full border-blue-500/30 text-gray-300 hover:bg-blue-500/10 bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-blue-500/20">
              <p className="text-xs text-gray-500">
                Questions? Contact us at{" "}
                <a href={`mailto:${BUSINESS_CONFIG.email.support}`} className="text-blue-400 hover:text-blue-300">
                  {BUSINESS_CONFIG.email.support}
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
