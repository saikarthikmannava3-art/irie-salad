import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Users & Permissions</h1>
        <p className="text-muted-foreground">User management and role-based access control</p>
      </div>
      <Card className="py-16 text-center">
        <Shield size={48} className="mx-auto text-muted-foreground/30 mb-4" />
        <CardTitle className="text-muted-foreground">Coming Soon</CardTitle>
        <CardDescription className="mt-2">
          Role-based access control with granular permission management.
        </CardDescription>
        <ul className="mt-4 text-sm text-muted-foreground space-y-1">
          <li>• User creation and profile management</li>
          <li>• Role-based permissions (Admin, Manager, Staff)</li>
          <li>• Department-specific access control</li>
          <li>• Activity logs and user session tracking</li>
          <li>• Two-factor authentication (2FA)</li>
          <li>• Password policies and security settings</li>
        </ul>
      </Card>
    </div>
  );
}
