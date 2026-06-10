import { RequireRole } from "@/components/auth/require-role"
import { AdminSidebar } from "@/components/admin-sidebar"
import { ROLES } from "@/lib/constants"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RequireRole allowedRoles={[ROLES.CEO, ROLES.ADMIN]}>
      <div className="flex min-h-screen bg-slate-950">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </RequireRole>
  )
}
