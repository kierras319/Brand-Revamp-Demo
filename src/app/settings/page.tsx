"use client";

import { useRef, useState } from "react";
import { AlertTriangle, Download, HeartHandshake, ShieldCheck, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { clearAllData, exportAllData, importAllData } from "@/lib/storage";

export default function SettingsPage() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [confirmingClear, setConfirmingClear] = useState(false);

  function handleExport() {
    const json = exportAllData();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `anchor-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Backup downloaded" });
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importAllData(String(reader.result));
        toast({ title: "Data imported — reload to see it everywhere" });
        window.location.reload();
      } catch {
        toast({ title: "Import failed", description: "That file isn't a valid backup.", variant: "destructive" });
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleClear() {
    if (!confirmingClear) {
      setConfirmingClear(true);
      return;
    }
    clearAllData();
    toast({ title: "All data cleared" });
    setConfirmingClear(false);
    window.location.reload();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">Your data, your device.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Privacy
          </CardTitle>
          <CardDescription>
            Anchor stores everything locally in this browser — there&apos;s no account, no server, and
            nothing is sent anywhere. That also means your data lives only on this device and browser,
            so back it up regularly and don&apos;t clear your browser storage without exporting first.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Backup &amp; restore</CardTitle>
          <CardDescription>Export a copy of your data, or restore from a previous backup.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button onClick={handleExport}>
            <Download className="h-4 w-4" /> Export backup
          </Button>
          <Button variant="outline" onClick={handleImportClick}>
            <Upload className="h-4 w-4" /> Import backup
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={handleFileChange}
          />
        </CardContent>
      </Card>

      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Clear all data
          </CardTitle>
          <CardDescription>
            This permanently deletes everything in Anchor on this device. Export a backup first if you
            might want it later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={handleClear}>
            <Trash2 className="h-4 w-4" />
            {confirmingClear ? "Click again to confirm" : "Clear all data"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <HeartHandshake className="h-5 w-5 text-primary" />
            If you need support
          </CardTitle>
          <CardDescription className="space-y-2">
            <span className="block">
              Anchor is a personal tracking tool, not a substitute for professional care or medical
              advice. Keep working with your psychiatrist and care team, especially around medication
              changes.
            </span>
            <span className="block">
              If you&apos;re in crisis or having thoughts of harming yourself, call or text{" "}
              <strong className="text-foreground">988</strong> (Suicide &amp; Crisis Lifeline, US) — or,
              if you&apos;re outside the US, contact your local emergency number.
            </span>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
