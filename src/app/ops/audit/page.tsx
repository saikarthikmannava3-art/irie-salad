import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function AuditPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Audit Log</h1>
        <p className="text-muted-foreground">System activity tracking and compliance</p>
      </div>
      <Card className="py-16 text-center">
        <FileText size={48} className="mx-auto text-muted-foreground/30 mb-4" />
        <CardTitle className="text-muted-foreground">Coming Soon</CardTitle>
        <CardDescription className="mt-2">
          Comprehensive audit trail for all system activities and changes.
        </CardDescription>
        <ul className="mt-4 text-sm text-muted-foreground space-y-1">
          <li>• Complete activity log for all user actions</li>
          <li>• Data change tracking (created, updated, deleted)</li>
          <li>• Advanced filtering by user, date, action type</li>
          <li>• Export audit logs for compliance reporting</li>
          <li>• Real-time alerts for critical system changes</li>
          <li>• Tamper-proof log storage</li>
        </ul>
      </Card>
    </div>
  );
}
