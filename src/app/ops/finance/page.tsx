import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { IndianRupee } from "lucide-react";

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Finance</h1>
        <p className="text-muted-foreground">Financial management and accounting</p>
      </div>
      <Card className="py-16 text-center">
        <IndianRupee size={48} className="mx-auto text-muted-foreground/30 mb-4" />
        <CardTitle className="text-muted-foreground">Coming Soon</CardTitle>
        <CardDescription className="mt-2">
          Complete financial management suite with P&L, ledger, and expense tracking.
        </CardDescription>
        <ul className="mt-4 text-sm text-muted-foreground space-y-1">
          <li>• Profit & Loss statements</li>
          <li>• Revenue and expense tracking</li>
          <li>• General ledger and chart of accounts</li>
          <li>• Vendor payment management</li>
          <li>• GST/Tax reporting and filing</li>
          <li>• Integration with accounting software (Tally, Zoho Books)</li>
        </ul>
      </Card>
    </div>
  );
}
