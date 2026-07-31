"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const REASONS = ["Cheating", "Toxic Behavior", "Inappropriate Name", "Other"];

export function ReportModal({
  playerId,
  playerName,
  open,
  onOpenChange,
}: {
  playerId: string;
  playerName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit() {
    if (!reason) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetPlayerId: playerId, reason, details }),
      });
      if (res.ok) {
        toast.success(`Report against ${playerName} submitted.`);
      }
    } catch {
      // silent for V1
    } finally {
      setBusy(false);
      onOpenChange(false);
      setReason("");
      setDetails("");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Report Player</DialogTitle>
          <DialogDescription>
            Reporting <span className="font-semibold text-foreground">{playerName}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Reason</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {REASONS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Details (optional)</Label>
            <textarea
              className="w-full rounded-md border bg-background px-3 py-2 text-sm min-h-[60px] resize-none"
              placeholder="Describe the issue..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!reason || busy}>
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Submit Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
